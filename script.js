/* ===== EDIT HERE: contact links ===== */
const CONFIG={
  email:"moosaagwia01@gmail.com",
  fiverr:"",     // paste your Fiverr profile URL between the quotes
  github:"",     // paste your GitHub URL
  instagram:"",  // paste your Instagram URL
  linkedin:""    // paste your LinkedIn URL
};
/* ===== EDIT HERE: your websites =====
Add one object per project. Delete an object to remove it. Leave the list empty to show the empty state.
{ name:"Site name", category:"Web Development", description:"One or two sentences.",
  details:"Longer story shown in View Details.", tech:["HTML","CSS","JavaScript"],
  image:"https://…/screenshot.jpg", url:"https://live-site.com", github:"https://github.com/…" }
Categories: Web Development, Programming, Cybersecurity, Creative Experiments */
const PROJECTS=[];
/* ================================== */
const CATS=["Web Development","Programming","Cybersecurity","Creative Experiments"];
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const safe=u=>/^https?:\/\//i.test(u||"")?u:"";
const host=u=>{try{return new URL(u).hostname}catch(e){return ""}};
let filter="All Projects";

function renderFilters(){
  const f=$("#filters");
  if(!PROJECTS.length){f.hidden=true;return}
  f.innerHTML=["All Projects",...CATS].map(c=>`<button type="button" data-c="${c}" aria-pressed="${c===filter}">${c}</button>`).join("");
  f.querySelectorAll("button").forEach(b=>b.onclick=()=>{filter=b.dataset.c;renderFilters();renderGrid()});
  applyLang();
}
function card(p,i){
  const u=safe(p.url),g=safe(p.github),img=safe(p.image)||(/^(\.|\/|data:image)/.test(p.image||"")?p.image:"");
  return `<article class="card" style="--d:${i*70}ms"><div class="shot"><div class="chrome"><i></i><i></i><i></i><span>${esc(host(u)||"preview")}</span></div>
  <div class="frame">${img?`<img src="${esc(img)}" alt="Screenshot of ${esc(p.name)}" loading="lazy">`:"Screenshot coming soon"}</div></div>
  <div class="body"><p class="cat">${esc(p.category)}</p><h3>${esc(p.name)}</h3><p class="d">${esc(p.description)}</p>
  <ul class="tech">${(p.tech||[]).map(t=>`<li>${esc(t)}</li>`).join("")}</ul>
  <div class="acts">${u?`<a class="btn sm" href="${esc(u)}" target="_blank" rel="noopener noreferrer">Visit Website</a>`:""}
  <button class="btn ghost sm" type="button" data-i="${PROJECTS.indexOf(p)}">View Details</button>${g?`<a class="lnk" href="${esc(g)}" target="_blank" rel="noopener noreferrer">GitHub</a>`:""}</div></div></article>`;
}
const slot=n=>`<article class="card slot" style="--d:${(n-1)*70}ms"><div class="shot"><div class="chrome"><i></i><i></i><i></i><span>your-website.com</span></div><div class="frame">Website ${n}</div></div><div class="body"><h3>Your website goes here</h3><p class="d">Add a project to the <code>PROJECTS</code> list in the page script and this space becomes your showcase.</p></div></article>`;
function renderGrid(){
  const g=$("#grid");
  const list=PROJECTS.filter(p=>filter==="All Projects"||p.category===filter);
  const slots=filter==="All Projects"?Math.max(0,3-PROJECTS.length):0;
  g.innerHTML=list.map(card).join("")+Array.from({length:slots},(_,k)=>slot(PROJECTS.length+k+1)).join("")||`<div class="empty"><h3>Nothing here yet.</h3><p>No projects in this category so far.</p></div>`;
  g.querySelectorAll("[data-i]").forEach(b=>b.onclick=()=>openDetails(PROJECTS[b.dataset.i]));
  applyLang();
}
function openDetails(p){
  const d=$("#dlg"),u=safe(p.url),g=safe(p.github);
  d.innerHTML=`<div class="dlg"><button class="icon close" type="button" aria-label="Close">✕</button><p class="cat">${esc(p.category)}</p><h3 id="dt">${esc(p.name)}</h3>
  <p class="lead">${esc(p.details||p.description)}</p><ul class="tech">${(p.tech||[]).map(t=>`<li>${esc(t)}</li>`).join("")}</ul>
  <div class="acts">${u?`<a class="btn sm" href="${esc(u)}" target="_blank" rel="noopener noreferrer">Visit Website</a>`:""}${g?`<a class="btn ghost sm" href="${esc(g)}" target="_blank" rel="noopener noreferrer">GitHub</a>`:""}</div></div>`;
  d.querySelector(".close").onclick=()=>d.close();
  applyLang();d.showModal();
}
$("#dlg").addEventListener("click",e=>{if(e.target.id==="dlg")e.target.close()});

(function links(){
  const l=[];
  const I={Email:["#D8C8B5","#30251F",'<rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3.5 7l8.5 6 8.5-6" fill="none" stroke="currentColor" stroke-width="2"/>'],
  Fiverr:["#1DBF73","#fff",'<text x="12" y="16.5" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="13" fill="currentColor">fi</text>'],
  GitHub:["#24292F","#fff",'<path fill="currentColor" d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>',"box-shadow:inset 0 0 0 1px rgba(245,240,231,.45)"],
  Instagram:["radial-gradient(circle at 30% 107%,#fdf497 0,#fd5949 45%,#d6249f 60%,#285AEB 90%)","#fff",'<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/>'],
  LinkedIn:["#0A66C2","#fff",'<path fill="currentColor" d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"/>']};
  const ic=n=>`<i class="ic" style="background:${I[n][0]};color:${I[n][1]};${I[n][3]||""}"><svg viewBox="0 0 24 24" aria-hidden="true">${I[n][2]}</svg></i>`;
  if(CONFIG.email)l.push(`<a href="mailto:${esc(CONFIG.email)}">${ic("Email")}${esc(CONFIG.email)}</a>`);
  [["Fiverr","fiverr"],["GitHub","github"],["Instagram","instagram"],["LinkedIn","linkedin"]].forEach(([n,k])=>l.push(safe(CONFIG[k])?`<a href="${esc(CONFIG[k])}" target="_blank" rel="noopener noreferrer">${ic(n)}${n}</a>`:`<span>${ic(n)}${n} link coming soon</span>`));
  $("#links").innerHTML=l.join("");
})();

/* language: English / Arabic */
const AR={"Home":"الرئيسية","About":"نبذة عني","Projects":"المشاريع","Skills":"المهارات","Contact":"تواصل","Mousa Agwia":"موسى اقوية",
"Developer & creative problem solver":"مطوّر وحلّال مشكلات مبدع","Building Ideas Into Digital Experiences.":"أحوّل الأفكار إلى تجارب رقمية.",
"I’m a developer and creative problem solver passionate about technology, design, and building meaningful digital experiences.":"أنا مطوّر ومبدع في حلّ المشكلات، شغوف بالتقنية والتصميم وبناء تجارب رقمية ذات معنى.",
"Explore My Work":"استكشف أعمالي","About Me":"عني","Your photograph goes here":"ضع صورتك الشخصية هنا","(replace this frame with an image)":"(استبدل هذا الإطار بصورتك)",
"A quiet corner for making things work.":"ركن هادئ لجعل الأشياء تعمل.",
"I’m Mousa, a freelance web developer and cybersecurity specialist based in Al-Bayda, Libya. Most of my time goes into designing and building websites, with security always in view.":"أنا موسى، مطوّر ويب مستقل ومتخصص في الأمن السيبراني من مدينة البيضاء في ليبيا. أقضي معظم وقتي في تصميم المواقع وبنائها، مع إبقاء الأمان دائمًا في الحسبان.",
"I’m drawn to software development, algorithms, artificial intelligence, secure coding and vulnerability analysis. Each one teaches me something about how good systems are made.":"تشدّني البرمجيات والخوارزميات والذكاء الاصطناعي والبرمجة الآمنة وتحليل الثغرات. وكل مجال منها يعلّمني شيئًا عن كيفية بناء الأنظمة الجيدة.",
"When I solve a problem, I start by understanding it fully, simplify it, then build it carefully. I treat creativity and discipline as partners, because a good idea only matters when it works well for the people using it.":"حين أحلّ مشكلة، أبدأ بفهمها فهمًا كاملًا ثم أبسّطها وأبنيها بعناية. أعدّ الإبداع والانضباط شريكين، فالفكرة الجيدة لا قيمة لها ما لم تعمل جيدًا لمن يستخدمها.",
"Programming":"البرمجة","Web development":"تطوير الويب","Cybersecurity":"الأمن السيبراني","Artificial intelligence":"الذكاء الاصطناعي","Technology":"التقنية",
"My Websites":"مواقعي","A curated exhibition of selected works. Visit each site live, or open the details to read more.":"معرض منتقى من أعمالي. زر كل موقع مباشرة، أو افتح التفاصيل لمعرفة المزيد.",
"All Projects":"جميع المشاريع","Web Development":"تطوير الويب","Creative Experiments":"تجارب إبداعية",
"Visit Website":"زيارة الموقع","View Details":"عرض التفاصيل","Screenshot coming soon":"لقطة الشاشة قريبًا","Your website goes here":"موقعك سيكون هنا",
"Add a project to the":"أضف مشروعًا إلى قائمة","list in the page script and this space becomes your showcase.":"في سكربت الصفحة ليصبح هذا المكان معرضًا لعملك.",
"Nothing here yet.":"لا شيء هنا بعد.","No projects in this category so far.":"لا توجد مشاريع في هذا التصنيف حتى الآن.",
"Skills & Expertise":"المهارات والخبرات","Languages":"اللغات البرمجية","Disciplines":"المجالات",
"Structure, style and interaction":"البنية والتنسيق والتفاعل","Scripting and problem solving":"كتابة السكربتات وحل المشكلات","Algorithms and fundamentals":"الخوارزميات والأساسيات","Object-oriented programming":"البرمجة كائنية التوجه",
"Design to deployment":"من التصميم إلى النشر","Cybersecurity Fundamentals":"أساسيات الأمن السيبراني","Secure coding, vulnerability analysis":"البرمجة الآمنة وتحليل الثغرات","Problem Solving":"حل المشكلات","Clear thinking, careful building":"تفكير واضح وبناء متقن","Algorithms":"الخوارزميات","Efficient, readable solutions":"حلول فعّالة وواضحة",
"Have an idea? Let’s make it real.":"لديك فكرة؟ لنحوّلها إلى واقع.","Tell me what you’re imagining. I’ll help shape it into something that works.":"أخبرني بما تتخيله، وسأساعدك على تحويله إلى شيء يعمل.",
"© 2026 Mousa Osama Agwia":"© 2026 موسى أسامة اقوية"};
const ORIG=new WeakMap();let lang="en";
try{lang=localStorage.getItem("lang")==="ar"?"ar":"en"}catch(e){}
function tr(s){let m;if(AR[s])return AR[s];if(m=s.match(/^Website (\d+)$/))return "الموقع "+m[1];if(m=s.match(/^(.+) link coming soon$/))return "رابط "+m[1]+" قريبًا";return null}
function applyLang(){
  const ar=lang==="ar",de=document.documentElement;
  de.lang=ar?"ar":"en";de.dir=ar?"rtl":"ltr";
  document.title=ar?"موسى أسامة اقوية | مطوّر ويب":"Mousa Osama Agwia | Web Developer & Creative Problem Solver";
  const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
  while(n=w.nextNode()){
    if(n.parentNode.closest("script,style,#lang"))continue;
    if(!ORIG.has(n))ORIG.set(n,n.nodeValue);
    const o=ORIG.get(n),t=o.trim();if(!t)continue;
    const r=ar&&tr(t);n.nodeValue=r?o.replace(t,r):o;
  }
  $("#lang").textContent=ar?"English":"العربية";
  $("#lang").setAttribute("aria-label",ar?"Switch to English":"التبديل إلى العربية");
}
$("#lang").onclick=()=>{lang=lang==="ar"?"en":"ar";try{localStorage.setItem("lang",lang)}catch(e){}renderFilters();renderGrid()};

/* theme + menu */
const root=document.documentElement;
try{const t=localStorage.getItem("theme");if(t)root.dataset.theme=t}catch(e){}
$("#theme").onclick=()=>{
  const dark=root.dataset.theme?root.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;
  root.dataset.theme=dark?"light":"dark";
  try{localStorage.setItem("theme",root.dataset.theme)}catch(e){}
};
$("#menu").onclick=e=>{const o=$("#nav").classList.toggle("open");e.currentTarget.setAttribute("aria-expanded",o)};
$("#nav").addEventListener("click",e=>{if(e.target.tagName==="A"){$("#nav").classList.remove("open");$("#menu").setAttribute("aria-expanded","false")}});

/* gentle reveal + parallax */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("on");io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".rv").forEach(el=>io.observe(el));
const art=$("#art");
if(!matchMedia("(prefers-reduced-motion:reduce)").matches){
  let t=false;addEventListener("scroll",()=>{if(t)return;t=true;requestAnimationFrame(()=>{if(scrollY<900)art.style.transform=`translateY(${scrollY*.05}px)`;t=false})},{passive:true});
}
renderFilters();renderGrid();
