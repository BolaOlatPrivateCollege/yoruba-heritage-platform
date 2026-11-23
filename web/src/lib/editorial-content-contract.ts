/**
 * Draft editorial content CONTRACT ONLY.
 *
 * Validation is not authentication, authorisation, consent or publication.
 * Do not import draft records into public Astro routes or static JSON.
 * A future private API must implement RBAC, state transitions and consent checks.
 */
import {z} from 'zod';

export const editorialContentKinds = [
  'story','belief','figure','place','research','learning','editorial-page'
] as const;
export const editorialGenres = [
  'original-fiction','imaginative-retelling','folktale','community-telling',
  'firsthand-memory','family-memory','sacred-belief','historical-account','research'
] as const;
export const editorialStates = [
  'draft','in_review','approved','published','withdrawn'
] as const;

const languageTag = z.string().regex(/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/u).max(40);
const safeSlug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u).min(2).max(100);

const textEdition = z.object({
  language: languageTag,
  title: z.string().trim().min(3).max(180),
  summary: z.string().trim().min(10).max(800),
  bodyMarkdown: z.string().trim().min(30).max(120000)
}).strict();

const publicProvenance = z.object({
  description: z.string().trim().min(12).max(2000),
  broadCommunity: z.string().trim().max(150).optional(),
  attributedTeller: z.string().trim().max(160).optional(),
  sourceCategory: z.enum([
    'original-author','community-oral-account','firsthand-account',
    'permissioned-family-account','public-research','unknown'
  ])
}).strict();

const mediaRef = z.object({
  assetId: z.string().uuid(),
  kind: z.enum(['image','audio']),
  rightsStatus: z.enum(['unreviewed','cleared','restricted']),
  altOrTranscript: z.string().trim().max(5000)
}).strict();

export const editorialRecordSchema = z.object({
  id: z.string().uuid(),
  slug: safeSlug,
  contentKind: z.enum(editorialContentKinds),
  genre: z.enum(editorialGenres),
  primaryLanguage: languageTag,
  editions: z.array(textEdition).min(1).max(12),
  provenance: publicProvenance,
  media: z.array(mediaRef).max(30).default([]),
  editorialState: z.enum(editorialStates),
  revision: z.number().int().positive(),
  /** Server-only identity reference, NOT a public display name. */
  lastEditorId: z.string().uuid(),
  /** For review only; consent must be proven with separate private evidence. */
  rightsReview: z.enum(['not-required','pending','cleared','restricted'])
}).strict().superRefine((record,ctx)=>{
  const languages=record.editions.map(x=>x.language.toLowerCase());
  if(!languages.includes(record.primaryLanguage.toLowerCase())){
    ctx.addIssue({code:'custom',path:['primaryLanguage'],message:'Primary language must have an edition'});
  }
  if(new Set(languages).size!==languages.length){
    ctx.addIssue({code:'custom',path:['editions'],message:'Each language edition must be unique'});
  }
  if(record.editorialState==='published'&&record.rightsReview!=='cleared'&&record.rightsReview!=='not-required'){
    ctx.addIssue({code:'custom',path:['rightsReview'],message:'Published content must pass rights review'});
  }
  if(record.editorialState==='published'&&record.media.some(x=>x.rightsStatus!=='cleared')){
    ctx.addIssue({code:'custom',path:['media'],message:'Published media must have cleared rights'});
  }
});

export type EditorialRecord=z.infer<typeof editorialRecordSchema>;
export function validateEditorialRecord(value:unknown){
  return editorialRecordSchema.safeParse(value);
}
