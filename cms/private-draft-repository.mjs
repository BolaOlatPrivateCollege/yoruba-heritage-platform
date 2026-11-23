/**
 * Private local editorial draft store (single-process development adapter).
 *
 * NO HTTP routes, credentials, public export, publishing or community intake.
 * Do not deploy as a production database. The caller must authenticate the
 * actor on the server; passing a role here is NOT authentication.
 *
 * Records and audit intents are committed together via one atomic file rename.
 * Multi-process locking, database backups, encryption and recovery are out of scope.
 */
import {mkdir,lstat,readFile,writeFile,rename,unlink,chmod} from 'node:fs/promises';
import {join,resolve,dirname} from 'node:path';
import {randomUUID} from 'node:crypto';
import {editorialRecordSchema} from '../web/src/lib/editorial-content-contract.ts';
import {planEditorialChange} from '../web/src/lib/editorial-workflow.ts';

const FILE='editorial-private-state.json';
const MAX_BYTES=20*1024*1024;
const ROLES=new Set(['owner','editor','reviewer']);
const copy=value=>structuredClone(value);

function requireActor(actor){
 if(!actor||typeof actor.id!=='string'||!/^[-0-9a-f]{36}$/i.test(actor.id)||!ROLES.has(actor.role)){
  throw new Error('Authenticated editorial actor required from trusted server');
 }
}
function readOnlySnapshot(state){return copy(state)}
async function readState(filename){
 let raw;
 try{raw=await readFile(filename,'utf8')}
 catch(error){if(error.code==='ENOENT')return {version:1,records:{},audit:[]};throw error}
 if(Buffer.byteLength(raw)>MAX_BYTES)throw new Error('Private editorial file exceeds size limit');
 const parsed=JSON.parse(raw);
 if(!parsed||parsed.version!==1||!parsed.records||typeof parsed.records!=='object'||Array.isArray(parsed.records)||!Array.isArray(parsed.audit)){
  throw new Error('Invalid private editorial store format');
 }
 for(const [id,value] of Object.entries(parsed.records)){
  const record=editorialRecordSchema.parse(value);
  if(record.id!==id)throw new Error('Private record ID mismatch');
 }
 return parsed;
}
async function persist(filename,state){
 const raw=JSON.stringify(state);
 if(Buffer.byteLength(raw)>MAX_BYTES)throw new Error('Private editorial store capacity exceeded');
 const temporary=join(dirname(filename),'.editorial-'+randomUUID()+'.tmp');
 try{
  await writeFile(temporary,raw,{encoding:'utf8',mode:0o600,flag:'wx'});
  await chmod(temporary,0o600);
  await rename(temporary,filename);
 }finally{
  await unlink(temporary).catch(error=>{if(error.code!=='ENOENT')throw error});
 }
}
/** Opens local private storage without creating web endpoints. */
export async function openPrivateDraftRepository(directory){
 if(typeof directory!=='string'||!directory.trim())throw new Error('Private directory is required');
 const absolute=resolve(directory);
 await mkdir(absolute,{recursive:true,mode:0o700});
 const stat=await lstat(absolute);
 if(!stat.isDirectory()||stat.isSymbolicLink())throw new Error('Private directory must not be a symlink');
 await chmod(absolute,0o700);
 const filename=join(absolute,FILE);
 try{
  const fileStat=await lstat(filename);
  if(!fileStat.isFile()||fileStat.isSymbolicLink())throw new Error('Unsafe private state file');
  await chmod(filename,0o600);
 }catch(error){if(error.code!=='ENOENT')throw error}
 let state=await readState(filename);
 let chain=Promise.resolve();
 const locked=operation=>{
  const result=chain.then(operation);
  chain=result.then(()=>{},()=>{});
  return result;
 };
 return {
  async createDraft(actor,input){
   requireActor(actor);
   if(actor.role!=='owner'&&actor.role!=='editor')throw new Error('Draft creation denied');
   return locked(async()=>{
    const draft=editorialRecordSchema.parse(input);
    if(draft.editorialState!=='draft'||draft.revision!==1||draft.lastEditorId!==actor.id){
     throw new Error('New drafts require state draft, revision 1 and the authenticated author');
    }
    if(state.records[draft.id]||Object.values(state.records).some(x=>x.slug===draft.slug)){
     throw new Error('Duplicate draft ID or slug');
    }
    const next={...state,records:{...state.records,[draft.id]:draft},audit:[
     ...state.audit,{recordId:draft.id,fromRevision:0,toRevision:1,
      fromState:null,toState:'draft',action:'create_draft',actorId:actor.id,at:new Date().toISOString()}
    ]};
    await persist(filename,next);state=next;
    return copy(draft);
   });
  },
  async applyAction(actor,recordId,action){
   requireActor(actor);
   return locked(async()=>{
    const current=state.records[recordId];
    if(!current)throw new Error('Editorial record not found');
    const change=planEditorialChange(current,actor,action);
    const next={...state,records:{...state.records,[recordId]:change.record},audit:[
     ...state.audit,{...change.audit,at:new Date().toISOString()}
    ]};
    await persist(filename,next);state=next;
    return copy(change.record);
   });
  },
  async getRecord(actor,recordId){
   requireActor(actor);
   return locked(async()=>state.records[recordId]?copy(state.records[recordId]):null);
  },
  async listRecords(actor){
   requireActor(actor);
   return locked(async()=>Object.values(state.records).map(copy));
  },
  async auditHistory(actor){
   requireActor(actor);
   if(actor.role!=='owner'&&actor.role!=='reviewer')throw new Error('Audit access denied');
   return locked(async()=>readOnlySnapshot(state.audit));
  }
 };
}
