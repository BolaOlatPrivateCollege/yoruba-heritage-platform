// Owner-supplied four signature tables, transcribed top-to-bottom.
// Single stroke = 1, double stroke = 0 is a modern educational convention.
// Order and naming are a supplied reference, not independently certified lineage authority.
export const principalOdu = [
 ['ogbe','Ogbè','Èjì Ogbè','1111'],
 ['oyeku','Ọ̀yẹ̀kú','Ọ̀yẹ̀kú Méjì','0000'],
 ['iwori','Ìwòrì','Ìwòrì Méjì','0110'],
 ['odi','Òdí','Òdí Méjì','1001'],
 ['irosun','Ìrosùn','Ìrosùn Méjì','1100'],
 ['owonrin','Ọ̀wọ́nrín','Ọ̀wọ́nrín Méjì','0011'],
 ['obara','Ọ̀bàrà','Ọ̀bàrà Méjì','1000'],
 ['okanran','Ọ̀kànràn','Ọ̀kànràn Méjì','0001'],
 ['ogunda','Ògúndá','Ògúndá Méjì','1110'],
 ['osa','Ọ̀sá','Ọ̀sá Méjì','0111'],
 ['ika','Ìká','Ìká Méjì','0100'],
 ['oturupon','Òtúrúpọ̀n','Òtúrúpọ̀n Méjì','0010'],
 ['otura','Òtúrá','Òtúrá Méjì','1011'],
 ['irete','Ìrẹtẹ̀','Ìrẹtẹ̀ Méjì','1101'],
 ['ose','Ọ̀ṣẹ́','Ọ̀ṣẹ́ Méjì','1010'],
 ['ofun','Òfún','Òfún Méjì','0101']
].map(([slug,name,principal,code])=>({slug:slug!,name:name!,principal:principal!,code:code!}));
export const oduLibrary=principalOdu.flatMap(right=>principalOdu.map(left=>{
 const principal=right.slug===left.slug;
 const bits=right.code+left.code;
 return {right,left,principal,bits,decimal:parseInt(bits,2),slug:principal?right.slug:right.slug+'-'+left.slug,name:principal?right.principal:right.name+' – '+left.name};
}));
export type OduEntry=typeof oduLibrary[number];
export const oduHref=(slug:string)=>'/learning/ifa/odu/'+slug+'/';
