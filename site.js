const navItems=[['index.html','الرئيسية'],['about.html','عن الأكاديمية'],['courses.html','المستويات'],['lessons.html','مكتبة الدروس'],['placement.html','اختبار المستوى'],['progress.html','تقدمي'],['faq.html','الأسئلة الشائعة'],['resources.html','الموارد']];
const path=location.pathname.split('/').pop()||'index.html';
const header=document.querySelector('[data-site-header]');
if(header){
  header.innerHTML=`<header class="site-header"><div class="wrap nav-wrap"><a class="brand" href="index.html"><span class="brand-logo"><img src="assets/brand-logo.png" alt=""></span><span><strong>Hussien Badr</strong><small>ENGLISH ACADEMY</small></span></a><button class="menu-toggle" aria-label="فتح القائمة" aria-expanded="false">☰</button><nav class="main-nav">${navItems.map(([href,label])=>`<a href="${href}" ${path===href?'aria-current="page"':''}>${label}</a>`).join('')}<a class="nav-cta" href="contact.html">تواصل معنا</a></nav></div></header>`;
  const toggle=header.querySelector('.menu-toggle');
  toggle.addEventListener('click',()=>{const open=header.querySelector('.main-nav').classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
}
const footer=document.querySelector('[data-site-footer]');
if(footer){
  footer.innerHTML=`<footer class="site-footer"><div class="wrap footer-grid"><div><a class="brand footer-brand" href="index.html"><span class="brand-logo"><img src="assets/brand-logo.png" alt=""></span><span><strong>Hussien Badr</strong><small>ENGLISH ACADEMY</small></span></a><p>تعلّم الإنجليزية بثقة، خطوةً بعد خطوة.</p></div><div><h3>روابط سريعة</h3><a href="courses.html">المستويات</a><a href="lessons.html">مكتبة الدروس</a><a href="placement.html">اختبار المستوى</a><a href="faq.html">الأسئلة الشائعة</a><a href="progress.html">تقدمي</a></div><div><h3>تواصل</h3><a href="mailto:gnathussinbder@gmail.com">gnathussinbder@gmail.com</a><a href="https://youtube.com/@husseinbadr1" target="_blank" rel="noopener">YouTube</a><a href="https://t.me/HBM20091" target="_blank" rel="noopener">Telegram</a><a href="contact.html">كل قنوات التواصل</a></div></div><div class="wrap footer-bottom"><span>© <span id="year"></span> Hussien Badr English Academy</span><span><a href="privacy.html">الخصوصية</a> · <a href="terms.html">الشروط</a></span></div></footer>`;
  footer.querySelector('#year').textContent=new Date().getFullYear();
}
const levels=[
 {id:'A1',name:'مبتدئ',en:'Beginner',desc:'العبارات الأساسية والتعريف بالنفس والتواصل اليومي.',color:'a1'},
 {id:'A2',name:'أساسي',en:'Elementary',desc:'مواقف الحياة اليومية والجمل والتراكيب الشائعة.',color:'a2'},
 {id:'B1',name:'متوسط',en:'Intermediate',desc:'التواصل باستقلالية وفهم الموضوعات المألوفة.',color:'b1'},
 {id:'B2',name:'فوق المتوسط',en:'Upper-Intermediate',desc:'التعبير بوضوح ومناقشة موضوعات أكثر تعقيداً.',color:'b2'},
 {id:'C1',name:'متقدم',en:'Advanced',desc:'استخدام مرن ودقيق للغة في الدراسة والعمل.',color:'c1'}
];
fetch('data/lessons.json').then(r=>{if(!r.ok)throw new Error('lessons');return r.json()}).then(data=>{
 document.querySelectorAll('[data-level-cards]').forEach(box=>{
  box.innerHTML=levels.map(l=>{const n=data.filter(x=>x.level===l.id).length;return `<a class="level-card ${l.color}" href="lessons.html?level=${l.id}"><span class="level-id">${l.id}</span><div><h3>${l.name}</h3><p class="level-en">${l.en}</p><p>${l.desc}</p><span class="small muted">${n} دروس منشورة في هذا الإصدار</span></div><span class="arrow">←</span></a>`}).join('');
 });
}).catch(()=>{});
