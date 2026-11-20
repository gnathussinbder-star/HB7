import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const required=['index.html','about.html','courses.html','lessons.html','lesson.html','placement.html','progress.html','faq.html','resources.html','contact.html','privacy.html','terms.html','assets/brand-logo.png','assets/founder-portrait.png','data/lessons.json','data/faq.ar.json','data/placement-questions.json','css/site.css','js/site.js','js/lessons.js','js/lesson.js','js/faq.js','js/placement.js','js/progress.js'];
const missing=required.filter(f=>!fs.existsSync(path.join(root,f)));
if(missing.length){console.error('Missing files:',missing);process.exit(1)}
for(const f of ['data/lessons.json','data/faq.ar.json','data/placement-questions.json','data/site-config.json'])JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const lessons=JSON.parse(fs.readFileSync(path.join(root,'data/lessons.json'),'utf8'));
const faqs=JSON.parse(fs.readFileSync(path.join(root,'data/faq.ar.json'),'utf8'));
const questions=JSON.parse(fs.readFileSync(path.join(root,'data/placement-questions.json'),'utf8'));
if(lessons.length!==25)throw new Error(`Expected 25 lessons, got ${lessons.length}`);
if(faqs.length!==30)throw new Error(`Expected 30 FAQs, got ${faqs.length}`);
if(questions.length!==30)throw new Error(`Expected 30 placement questions, got ${questions.length}`);
for(const level of ['A1','A2','B1','B2','C1']){
 if(lessons.filter(x=>x.level===level).length!==5)throw new Error(`Lesson distribution error: ${level}`);
 if(questions.filter(x=>x.level===level).length!==6)throw new Error(`Quiz distribution error: ${level}`);
}
for(const l of lessons){if(!l.answerOptions?.length)throw new Error(`Missing lesson choices: ${l.id}`);if(!['A','B','C'].includes(l.answer))throw new Error(`Invalid lesson answer: ${l.id}`)}
for(const q of questions){if(!q.options.some(o=>o.label===q.answer))throw new Error(`Invalid quiz answer: ${q.id}`)}
// Verify href/src local paths in top-level HTML. Ignore fragments, query strings, mail and remote URLs.
const htmlFiles=fs.readdirSync(root).filter(f=>f.endsWith('.html'));
const broken=[];
for(const file of htmlFiles){
 const source=fs.readFileSync(path.join(root,file),'utf8');
 for(const match of source.matchAll(/(?:href|src)=["']([^"']+)["']/gi)){
  const raw=match[1];
  if(/^(https?:|mailto:|tel:|#|data:|javascript:)/i.test(raw))continue;
  const clean=decodeURIComponent(raw.split(/[?#]/)[0]);
  if(!clean)continue;
  const target=path.resolve(root,clean);
  if(!target.startsWith(root+path.sep)&&target!==root)continue;
  if(!fs.existsSync(target))broken.push(`${file} -> ${raw}`);
 }
}
if(broken.length){console.error('Broken local HTML references:',broken);process.exit(1)}
console.log(`PASS: ${htmlFiles.length} HTML pages, all required files, JSON, 25 lessons, 30 FAQs, 30 quiz questions, per-level distribution, and local href/src references.`);
