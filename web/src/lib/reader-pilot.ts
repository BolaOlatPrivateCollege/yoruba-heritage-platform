/** Build-time only: parse checked-in private editorial story draft, never user input. */
export type Span={text:string;strong:boolean;italic:boolean};
export type Passage={plain:string;segments:Span[]};
export type Chapter={number:number;title:string;id:string;passages:Passage[]};
export type ReaderPilot={title:string;chapters:Chapter[];words:number};
function parsePassage(raw:string):Passage{
  const text=raw.trim().replace(/\s*\n\s*/g,' ');
  const segments=text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/u).filter(Boolean).map(part=>({
    text:part.startsWith('**')&&part.endsWith('**')?part.slice(2,-2):part.startsWith('*')&&part.endsWith('*')?part.slice(1,-1):part,
    strong:part.startsWith('**')&&part.endsWith('**'),
    italic:!part.startsWith('**')&&part.startsWith('*')&&part.endsWith('*'),
  }));
  return {plain:segments.map(x=>x.text).join(''),segments};
}
export function parsePilotStory(markdown:string):ReaderPilot{
  const source=markdown.replace(/\r\n/g,'\n');
  const title=source.match(/^# (.+)$/m)?.[1]?.trim();
  if(!title)throw new Error('Missing pilot story title');
  const headers=[...source.matchAll(/^## Chapter (\d+) — (.+)$/gm)];
  if(headers.length!==6)throw new Error('Pilot must have six complete chapters');
  const divider=source.indexOf('\n---\n',headers[0].index);
  const end=divider<0?source.length:divider;
  const chapters=headers.map((header,i)=>{
    const number=Number(header[1]);
    const from=header.index!+header[0].length;
    const to=i+1<headers.length?headers[i+1].index!:end;
    const parts=source.slice(from,to).trim().split(/\n\s*\n/u).filter(Boolean);
    if(number!==i+1||parts.length<4)throw new Error('Invalid chapter sequence or incomplete story');
    return {number,title:header[2].trim(),id:'chapter-'+number,passages:parts.map(parsePassage)};
  });
  const words=chapters.flatMap(c=>c.passages).map(p=>p.plain).join(' ').trim().split(/\s+/u).length;
  if(words<1200)throw new Error('The story must not be an excerpt');
  return {title,chapters,words};
}