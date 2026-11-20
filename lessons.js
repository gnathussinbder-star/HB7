let allLessons=[];
const grid=document.getElementById('lesson-grid');
const search=document.getElementById('lesson-search');
const level=document.getElementById('level-filter');
const skill=document.getElementById('skill-filter');
const params=new URLSearchParams(location.search);
if(params.get('level'))level.value=params.get('level');
function render(){
 const s=search.value.trim().toLowerCase();
 const list=allLessons.filter(x=>(level.value==='all'||x.level===level.value)&&(skill.value==='all'||x.category===skill.value)&&(!s||(x.title+' '+x.objective+' '+x.category).toLowerCase().includes(s)));
 document.getElementById('lesson-count').textContent=`عرض ${list.length} من ${allLessons.length} درساً`;
 grid.innerHTML=list.map(x=>`<a class="lesson-card" href="lesson.html?id=${encodeURIComponent(x.id)}"><div class="card-top"><span class="pill">${x.level}</span><span class="muted small">${x.estimatedMinutes} دقيقة</span></div><h3>${x.title}</h3><p>${x.objective}</p><span class="text-link">افتح الدرس ←</span></a>`).join('')||'<div class="notice">لا توجد دروس تطابق خيارات البحث.</div>';
}
fetch('data/lessons.json').then(r=>{if(!r.ok)throw new Error('lessons');return r.json()}).then(data=>{allLessons=data;render()}).catch(()=>{grid.innerHTML='<p class="notice">تعذر تحميل الدروس. تحقق من وجود مجلد data.</p>'});
[search,level,skill].forEach(el=>el.addEventListener(el===search?'input':'change',render));
