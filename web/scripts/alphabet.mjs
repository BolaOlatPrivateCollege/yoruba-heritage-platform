// Extract only the known inert literals from the hash-verified legacy lesson.
// No eval, UI execution, arbitrary file input or normalization.
export function extractAlphabet(source) {
  const one = pattern => {
    const matches = [...source.matchAll(pattern)];
    if (matches.length !== 1) throw new Error('Ambiguous alphabet declaration');
    return matches[0][1];
  };
  const letters = one(/^const letters='([^'\r\n]+)'\.split\(' '\);$/gm).split(' ');
  const vowels = one(/^const vowels=\[([^\r\n]+)\];$/gm).split(',').map(s => {
    if (!/^'[^']+'$/.test(s)) throw new Error('Unexpected vowel literal');
    return s.slice(1,-1);
  });
  const literal = one(/^const alphabetGloss=\{([^\r\n]+)\};$/gm);
  const entries = [...literal.matchAll(/([A-ZẸỌṢ]+):\['(vowel|consonant)','([^'\\]*)'\]/gu)];
  if (entries.map(m=>m[0]).join(',') !== literal) throw new Error('Unexpected alphabet guidance syntax');
  const rows = entries.map(([,letter,kind,guidance])=>({letter,kind,guidance}));
  if (rows.length!==25 || new Set(letters).size!==25 || letters.join('|')!==rows.map(r=>r.letter).join('|') || vowels.length!==7 || rows.filter(r=>r.kind==='consonant').length!==18 || rows.some(r=>(r.kind==='vowel')!==vowels.includes(r.letter))) throw new Error('Alphabet inventory mismatch');
  return rows;
}
