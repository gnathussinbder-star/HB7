const root=document.getElementById('lesson-content');
const id=new URLSearchParams(location.search).get('id');
fetch('data/lessons.json').then(r=>{if(!r.ok)throw new Error('lessons');return r.json()}).then(data=>{
 const x=data.find(a=>a.id===id);
 if(!x){root.innerHTML='<div class="notice">لم يتم العثور على هذا الدرس. <a href="lessons.html">العودة إلى المكتبة</a></div>';return;}
 document.title=x.title+' | Hussien Badr English';
 const completed=(()=>{try{return JSON.parse(localStorage.getItem('hb-completed-lessons')||'[]')}catch(e){return []}})();
 const isDone=completed.includes(x.id);
 root.innerHTML=`<a class="text-link" href="lessons.html">← العودة إلى مكتبة الدروس</a><section class="page-hero compact"><span class="eyebrow">${x.level} · ${x.category}</span><h1>${x.title}</h1><p>${x.objective}</p></section><article class="lesson-body"><h2>الشرح</h2><p>${x.explanation}</p><h2>أمثلة</h2><ul>${x.examples.split(' / ').map(e=>`<li dir="ltr" class="example">${e}</li>`).join('')}</ul><h2>تحقق من فهمك</h2><p>${x.practice}</p><div class="option-list">${x.answerOptions.map((a,i)=>`<button class="option" type="button" data-answer="${String.fromCharCode(65+i)}"><span class="option-label">${String.fromCharCode(65+i)}</span>${a}</button>`).join('')}</div><p id="lesson-feedback" class="notice" hidden aria-live="polite"></p><button class="btn ${isDone?'outline':'primary'}" id="complete-lesson">${isDone?'تم إكمال هذا الدرس ✓':'ضع علامة: أكملت الدرس'}</button><p class="muted small">مدة مقترحة: ${x.estimatedMinutes} دقيقة. أكمل الأمثلة ثم اكتب جملة أو مثالاً من إنشائك لتثبيت المهارة.</p></article>`;
 const feedback=document.getElementById('lesson-feedback');
 root.querySelectorAll('[data-answer]').forEach(b=>b.addEventListener('click',()=>{
  const ok=b.dataset.answer===x.answer;
  feedback.hidden=false;feedback.textContent=ok?'إجابة صحيحة، أحسنت!':'ليست الإجابة الصحيحة. راجع الشرح وحاول مرة أخرى.';
  feedback.className=ok?'notice':'notice warning';
  root.querySelectorAll('[data-answer]').forEach(btn=>btn.classList.toggle('selected',btn===b));
 }));
 document.getElementById('complete-lesson').addEventListener('click',()=>{
  try{const a=JSON.parse(localStorage.getItem('hb-completed-lessons')||'[]');if(!a.includes(x.id))a.push(x.id);localStorage.setItem('hb-completed-lessons',JSON.stringify(a));const b=document.getElementById('complete-lesson');b.textContent='تم إكمال هذا الدرس ✓';b.className='btn outline';}catch(e){feedback.hidden=false;feedback.textContent='تعذر حفظ التقدم في هذا المتصفح.';}
 });
}).catch(()=>root.innerHTML='<div class="notice">تعذر تحميل بيانات الدرس.</div>');
