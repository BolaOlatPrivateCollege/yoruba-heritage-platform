import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {load} from 'cheerio';
import {QuizRecord,QuizSet,quizDisplayId} from '../src/lib/quiz.ts';
import {archive,Archive,validateReferences} from '../src/lib/archive.ts';
import {startQuiz,answerQuestion,nextQuestion,quizScore} from '../src/lib/quiz-state.ts';
import {importDocument} from '../../scripts/import-archive.mjs';
import {canonical,digest,readManifest} from '../../scripts/preservation.mjs';
const original=importDocument().archive.quiz;
const markup=()=>load(readFileSync(new URL('../dist/learning/quiz/index.html',import.meta.url),'utf8'));

test('all 15 typed quiz records retain complete exact payload, ordered options and frozen record hashes',()=>{
 assert.equal(original.length,15);assert.equal(canonical(archive.quiz),canonical(original));
 assert.equal(canonical(QuizSet.parse(original)),canonical(original));
 assert.equal(digest(archive.quiz),'66101365bf1d6d7d662b13b5f7a435ef843fcbd2fdde5e591ea750bbac75e2be');
 const manifest=readManifest().collections.quiz;assert.equal(digest(archive.quiz),manifest.sha256);
 archive.quiz.forEach((q,i)=>{assert.equal(digest(q),manifest.records[i].sha256);assert.equal(manifest.records[i].originalId,null);assert.equal(quizDisplayId(i),`quiz-${String(i+1).padStart(2,'0')}`);});
 assert.throws(()=>quizDisplayId(-1));assert.throws(()=>quizDisplayId(15));assert.throws(()=>quizDisplayId(.5));
});
test('quiz schema rejects missing, empty, duplicate, unsafe and out-of-range records without rewriting strings',()=>{
 const cases=[q=>{delete q.q;},q=>q.q=' ',q=>q.why='',q=>q.a=[],q=>q.a=['only'],q=>q.a[0]='',q=>q.a[1]=q.a[0],q=>q.correct=-1,q=>q.correct=4,q=>q.correct=.5,q=>q.correct='1',q=>q.link='../private',q=>q.link='javascript:alert(1)',q=>q.extra='unexpected'];
 for(const change of cases){const q=structuredClone(archive.quiz[0]);change(q);assert.equal(QuizRecord.safeParse(q).success,false);}
 assert.equal(QuizSet.safeParse(original.slice(0,14)).success,false);
 const duplicates=structuredClone(archive.quiz);duplicates[1]=duplicates[0];assert.equal(QuizSet.safeParse(duplicates).success,false);
 const a=structuredClone(archive);delete a.quiz;assert.equal(Archive.safeParse(a).success,false);
 const spaced={...archive.quiz[0],q:' '+archive.quiz[0].q+' '};assert.equal(QuizRecord.parse(spaced).q,spaced.q);
});
test('quiz references must resolve to existing source-linked articles',()=>{
 const changed=structuredClone(archive);changed.quiz[0].link='missing-article';assert.throws(()=>validateReferences(changed),/Unresolved quiz article/);
 const $=markup();archive.quiz.forEach((q,i)=>{assert.ok(archive.articles.some(a=>a.id===q.link&&a.sourceIds.length>0));assert.equal($('#'+quizDisplayId(i)+' a[data-related]').attr('href'),`/articles/${q.link}/`);});
});
test('escaped static quiz payload retains every original field and no-JS controls stay hidden',()=>{
 const $=markup();assert.equal($('.quiz-question').length,15);
 archive.quiz.forEach((q,i)=>{const card=$('#'+quizDisplayId(i));assert.equal(card.attr('data-original-index'),String(i));assert.equal(card.attr('data-correct'),String(q.correct));assert.equal(card.find('h2').text(),q.q);assert.deepEqual(card.find('.option-text').map((_,el)=>$(el).text()).get(),q.a);assert.equal(card.find('[data-original-explanation]').text(),q.why);assert.ok(card.is('[hidden]'));});
 assert.ok($('#quiz-stage').is('[hidden]'));assert.ok($('#quiz-start').is('[hidden]'));
 assert.match($('#quiz-fallback').text(),/requires JavaScript/);assert.equal($('#quiz-fallback').is('[hidden]'),false);assert.match($('#quiz-caveat').text(),/does not establish independently verified historical facts/);
 assert.equal($('#quiz-readings a').length,new Set(archive.quiz.map(q=>q.link)).size);
});
test('answer transitions prevent zero-answer advance, invalid choices, changes and double scoring',()=>{
 const state=startQuiz(15);assert.equal(quizScore(state,archive.quiz),0);assert.equal(nextQuestion(state),state);
 for(const invalid of [-1,4,Infinity,NaN,.5])assert.equal(answerQuestion(state,archive.quiz,invalid),state);
 const first=answerQuestion(state,archive.quiz,archive.quiz[0].correct);assert.equal(quizScore(first,archive.quiz),1);assert.equal(state.answers[0],null);
 assert.equal(answerQuestion(first,archive.quiz,0),first);assert.equal(answerQuestion(first,archive.quiz,1),first);
 const next=nextQuestion(first);assert.equal(next.index,1);assert.equal(nextQuestion(next),next);assert.equal(quizScore(next,archive.quiz),1);
 assert.throws(()=>startQuiz(0));assert.throws(()=>startQuiz(1.5));
});
test('full 15-question completion scores all-correct, all-wrong and mixed answers once then restarts cleanly',()=>{
 const before=digest(archive.quiz);
 for(const mode of ['correct','wrong','mixed']){let state=startQuiz(15);let expected=0;
  archive.quiz.forEach((q,i)=>{const choice=mode==='correct'||mode==='mixed'&&i%2===0?q.correct:(q.correct+1)%q.a.length;expected+=Number(choice===q.correct);state=answerQuestion(state,archive.quiz,choice);state=nextQuestion(state);});
  assert.equal(state.finished,true);assert.equal(state.index,14);assert.equal(state.answers.filter(a=>a!==null).length,15);assert.equal(quizScore(state,archive.quiz),expected);assert.equal(nextQuestion(state),state);assert.equal(answerQuestion(state,archive.quiz,0),state);
  const restarted=startQuiz(15);assert.equal(restarted.index,0);assert.equal(restarted.finished,false);assert.equal(quizScore(restarted,archive.quiz),0);assert.ok(restarted.answers.every(a=>a===null));
 }assert.equal(digest(archive.quiz),before);
});
test('quiz output and client exclude raw archive/developer source, storage and untrusted HTML sinks',()=>{
 const $=markup();assert.equal($('audio,video,iframe,form,input').length,0);
 assert.equal($('[data-quiz] script').length,0);
 const source=readFileSync(new URL('../src/lib/quiz-client.ts',import.meta.url),'utf8');
 assert.doesNotMatch(source,/innerHTML|outerHTML|insertAdjacentHTML|eval\(|localStorage|sessionStorage|document\.cookie|fetch\(|XMLHttpRequest|sendBeacon|speechSynthesis|getUserMedia/);
 assert.doesNotMatch($.html(),/supplementarySourceText|window\.HISTORY_DATA|ADMIN_PASSWORD|YORUBA_DB_PATH/);
});
