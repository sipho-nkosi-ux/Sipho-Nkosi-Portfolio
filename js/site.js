/* Sipho Nkosi – Portfolio · shared behaviour */
(function(){
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- old single-page links (#project-name) now open the project's own page ---- */
if(document.body.dataset.home&&location.hash){ const h=location.hash.slice(1); const map={'ans-offloading-platform':1,'cat-ladder':1,'silo-platform':1,'boiler-building':1,'bund-walkway':1,'erf-2433':1,'capital-park':1,'chantelle':1,'doornpoort':1,'secunda':1,'steel-gate':1,'embalenhle':1};
  if(map[h]){ location.replace(h+'.html'); return; } }

/* ---- scroll progress line ---- */
const pr=$('#prog'); let tk=false;
function prog(){ tk=false; const h=document.documentElement, m=h.scrollHeight-h.clientHeight; if(pr) pr.style.transform=`scaleX(${m>0?(h.scrollTop/m).toFixed(4):0})`; }
addEventListener('scroll',()=>{ if(!tk){ tk=true; requestAnimationFrame(prog);} },{passive:true}); prog();

/* ---- reveal on scroll ---- */
const els=$$('.rv,.imgrv');
if(RM||!('IntersectionObserver' in window)) els.forEach(e=>e.classList.add('in'));
else { const io=new IntersectionObserver(es=>es.forEach(x=>{ if(x.isIntersecting){ x.target.classList.add('in'); io.unobserve(x.target);} }),{rootMargin:'0px 0px -8% 0px'}); els.forEach(e=>io.observe(e)); }

/* ---- dock: highlight the section in view ---- */
const dock=$('.dock');
if(dock){ const links=$$('a[data-sec]',dock); const secs=links.map(a=>document.getElementById(a.dataset.sec)).filter(Boolean);
  const set=id=>links.forEach(a=>{ const on=a.dataset.sec===id; a.classList.toggle('on',on); if(on&&dock.scrollWidth>dock.clientWidth) dock.scrollTo({left:a.offsetLeft-dock.clientWidth/2+a.clientWidth/2,behavior:'smooth'}); });
  if(secs.length){ const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting) set(e.target.id); }),{rootMargin:'-45% 0px -50% 0px'}); secs.forEach(s=>io.observe(s)); }
  // hide dock near the very top of the home page hero and at the footer
  const hideAt=()=>{ const y=scrollY, h=document.documentElement; const atTop=dock.dataset.hideTop&&y<240; const atEnd=y+innerHeight>h.scrollHeight-40; dock.classList.toggle('hid',!!(atTop||atEnd)); };
  addEventListener('scroll',hideAt,{passive:true}); hideAt();
  const fade=()=>dock.classList.toggle('scroll',dock.scrollWidth>dock.clientWidth+2); addEventListener('resize',fade); fade(); }

/* ---- keep the facts column pinned only when it fits on screen ---- */
const side=$('.side'); if(side){ const fitSide=()=>{ side.style.position=(innerWidth>960&&side.offsetHeight<innerHeight-120)?'sticky':'static'; }; addEventListener('resize',fitSide); fitSide(); }

/* ---- project filter (home) ---- */
document.addEventListener('click',e=>{ const ch=e.target.closest('.chip'); if(!ch) return; $$('.chip').forEach(x=>x.classList.toggle('on',x===ch)); const f=ch.dataset.f;
  $$('.card').forEach(k=>k.classList.toggle('hide',f!=='all'&&k.dataset.sec!==f)); const g=$('#grid'); if(g) g.classList.toggle('filtered',f!=='all'); });

/* ---- project brief from briefs.js (editable on GitHub) ---- */
const pid=document.body.dataset.project;
if(pid && window.BRIEF && BRIEF[pid]){ const b=BRIEF[pid];
  const p=$('#b-problem'), s=$('#b-scope'), o=$('#b-solved');
  if(p) p.textContent=b.problem; if(s) s.textContent=b.scope;
  if(o) o.innerHTML=(b.solved||[]).map(x=>{ const li=document.createElement('li'); li.textContent=x; return li.outerHTML; }).join(''); }

/* ---- lightbox: view only (no zoom, for confidentiality); swipe or drag sideways to change drawing ---- */
const lb=$('#lb');
if(lb){ const st=$('.stage',lb), im=$('img',st), T=$('.t',lb), S=$('.s',lb), C=$('.cnt',lb); const L=$$('[data-lb]'); let cur=0, s=1, tx=0, ty=0;
  const ap=(dx=0)=>{ im.style.transform=`translate(${tx+dx}px,${ty}px) scale(${s})`; };
  function fitIt(){ const W=st.clientWidth,H=st.clientHeight,w=im.naturalWidth,h=im.naturalHeight; if(!w) return; s=Math.min(W/w,H/h)*.94; tx=(W-w*s)/2; ty=(H-h*s)/2; im.style.transition='none'; ap(); im.style.opacity=1; }
  let back=null;
  function open(i,dir=0){ if(!lb.classList.contains('open')) back=document.activeElement; cur=(i+L.length)%L.length; const el=L[cur];
    T.textContent=el.dataset.cap||''; S.textContent=el.dataset.sc||''; if(C) C.textContent=L.length>1?(cur+1)+' / '+L.length:'';
    im.style.opacity=dir?0:1; im.onload=fitIt; im.src=el.dataset.lb; if(im.complete&&im.naturalWidth) fitIt();
    lb.classList.add('open'); document.body.style.overflow='hidden'; $('[data-x=close]',lb).focus(); }
  function close(){ lb.classList.remove('open'); document.body.style.overflow=''; if(back&&back.focus) back.focus(); }
  function step(d){ if(L.length<2) return; im.style.transition='transform .22s var(--ease), opacity .22s'; im.style.opacity=0; ap(-d*st.clientWidth*.35); setTimeout(()=>open(cur+d,d),200); }
  L.forEach((el,i)=>{ el.tabIndex=0; el.addEventListener('click',()=>open(i)); el.addEventListener('keydown',e=>{ if(e.key==='Enter') open(i); }); });
  $('[data-x=close]',lb).onclick=close; $('[data-x=prev]',lb).onclick=()=>step(-1); $('[data-x=next]',lb).onclick=()=>step(1);
  // block every zoom route: wheel / trackpad pinch, Safari gesture events, multi-touch, double-tap
  st.addEventListener('wheel',e=>e.preventDefault(),{passive:false});
  ['gesturestart','gesturechange'].forEach(k=>lb.addEventListener(k,e=>e.preventDefault()));
  lb.addEventListener('touchmove',e=>{ if(e.touches.length>1) e.preventDefault(); },{passive:false});
  im.addEventListener('contextmenu',e=>e.preventDefault()); im.addEventListener('dragstart',e=>e.preventDefault());
  // swipe: the drawing follows your finger sideways, then changes on release
  let x0=null, y0=0, id=null;
  st.addEventListener('pointerdown',e=>{ if(id!==null) return; id=e.pointerId; x0=e.clientX; y0=e.clientY; st.setPointerCapture(id); im.style.transition='none'; st.classList.add('drag'); });
  st.addEventListener('pointermove',e=>{ if(e.pointerId!==id) return; const dx=e.clientX-x0; ap(dx*.9); im.style.opacity=1-Math.min(.5,Math.abs(dx)/(st.clientWidth*1.2)); });
  const end=e=>{ if(e.pointerId!==id) return; const dx=e.clientX-x0, dy=e.clientY-y0; id=null; st.classList.remove('drag');
    if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)) step(dx<0?1:-1);
    else { im.style.transition='transform .25s var(--ease), opacity .25s'; im.style.opacity=1; ap(); if(e.type==='pointerup'&&Math.abs(dx)<6&&Math.abs(dy)<6){ const r=im.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) close(); } } };
  st.addEventListener('pointerup',end); st.addEventListener('pointercancel',end);
  addEventListener('resize',()=>{ if(lb.classList.contains('open')) fitIt(); });
  addEventListener('keydown',e=>{ if(!lb.classList.contains('open')) return;
    if(e.key==='Tab'){ const f=$$('button',lb); const i=f.indexOf(document.activeElement); e.preventDefault(); f[(i+(e.shiftKey?-1:1)+f.length)%f.length].focus(); return; }
    if(e.key==='Escape') close(); if(e.key==='ArrowRight') step(1); if(e.key==='ArrowLeft') step(-1);
    if((e.ctrlKey||e.metaKey)&&['+','=','-','0'].includes(e.key)) e.preventDefault(); }); }

/* ---- 3D viewer ---- */
const host=$('.v3d[data-id]');
if(host){ const id=host.dataset.id, emb=host.classList.contains('emb');
  const L=emb?2:(window.V3D&&V3D.levelsOf?V3D.levelsOf(id):1), fl=['Ground','First','Second'];
  $('.tools',host).innerHTML=`<button class="bseq" data-act="build">▶&nbsp; Build sequence</button><input class="seqr" type="range" min="0" max="1000" value="1000" data-act="seq" aria-label="Build sequence timeline">
    <span class="lab">Section</span><input type="range" min="0" max="100" value="100" data-act="cut" aria-label="Section cut position">
    ${L>1?`<span class="lab">Floors</span><button data-floor="all" class="on">All</button>${[...Array(L)].map((_,k)=>`<button data-floor="${k}">${fl[k]}</button>`).join('')}`:''}
    <span class="sp"></span><button data-act="roof">Lift roof</button><button data-act="spin">Auto-rotate</button><button data-act="fs">Full screen</button>`;
  // Embalenhle runs in its own frame; this adapter gives it the same controls
  const E=()=>{ try{ const f=$('iframe',host); return f&&f.contentWindow&&f.contentWindow.EMB3D; }catch(e){ return null; } };
  function syncEmb(st){ host.classList.toggle('seqon',st.playing||st.seqT<.9999); $$('.seqlab',host).forEach(l=>l.textContent=st.stage);
    const r=$('input[data-act="seq"]',host); if(r&&document.activeElement!==r) r.value=Math.round(st.seqT*1000);
    const b=$('[data-act="build"]',host); b.classList.toggle('on',st.playing); b.innerHTML=st.playing?'❚❚&nbsp; Pause':(st.seqT<.9999?'▶&nbsp; Resume build':'▶&nbsp; Build sequence');
    $$('[data-floor]',host).forEach(x=>x.classList.toggle('on',x.dataset.floor===String(st.floor)));
    const rf=$('[data-act="roof"]',host), sr=st.roof&&st.floor==='all'; rf.textContent=sr?'Lift roof':'Show roof'; rf.classList.toggle('on',!sr);
    $('[data-act="spin"]',host).classList.toggle('on',!!st.spin); }
  const start=()=>{ if(emb){ const f=$('iframe',host); if(!f.src) f.src=f.dataset.src; host.classList.add('live'); } else V3D.attach(id); };
  function withE(fn){ start(); let n=0; (function w(){ const e=E(); if(e){ if(!e.onUpdate){ e.onUpdate=syncEmb; } fn(e); } else if(n++<100) setTimeout(w,120); })(); }
  const ctl={ go:v=>emb?withE(e=>e.go(v)):(start(),V3D.go(id,v)),
    set:p=>emb?withE(e=>e.set(p)):(start(),V3D.setState(id,p)),
    build:()=>emb?withE(e=>e.seqPlay()):V3D.seqPlay(id),
    seq:t=>emb?withE(e=>e.seqSet(t)):V3D.seqSet(id,t),
    state:()=>emb?(E()?E().get():{}):((V3D.cache()[id]||{}).state||{}) };
  function fs(){ start(); if(!emb){ V3D.fullscreen(id); return; } try{ if(document.fullscreenElement){ document.exitFullscreen(); return; } const r=host.requestFullscreen?host.requestFullscreen():null; if(r&&r.catch) r.catch(()=>host.classList.toggle('pseudo-fs')); else if(!r) host.classList.toggle('pseudo-fs'); }catch(e){ host.classList.toggle('pseudo-fs'); } }
  host.addEventListener('click',e=>{
    if(e.target.closest('.go3d')){ emb?withE(()=>{}):start(); return; }
    const v=e.target.closest('button[data-v]'); if(v){ ctl.go(v.dataset.v); $$('button[data-v]',host).forEach(x=>x.classList.toggle('on',x===v)); return; }
    const f=e.target.closest('button[data-floor]'); if(f){ ctl.set({floor:f.dataset.floor}); return; }
    const b=e.target.closest('button[data-act]'); if(!b) return; const a=b.dataset.act;
    if(a==='fs'){ fs(); return; } if(a==='build'){ ctl.build(); return; }
    const st=ctl.state();
    if(a==='roof') ctl.set({roof:!(st.roof!==false&&(st.floor||'all')==='all'),floor:'all'});
    if(a==='spin') ctl.set({spin:!st.spin}); });
  host.addEventListener('input',e=>{ const c=e.target.closest('input[data-act="cut"]'); if(c){ ctl.set({cut:c.value/100}); return; } const q=e.target.closest('input[data-act="seq"]'); if(q) ctl.seq(q.value/1000); });
  addEventListener('keydown',e=>{ if(e.key==='Escape'&&host.classList.contains('pseudo-fs')){ host.classList.remove('pseudo-fs'); window.V3D&&V3D.resize&&V3D.resize(); } });
}
})();

/* ---- drawing protection: no right-click/save/drag/print, and drawings blur when a screenshot tool is likely ---- */
(function(){ const D=document, H=D.documentElement;
  const isArt=t=>t&&t.closest&&t.closest('img,canvas,figure,.lb,.v3d,.pic,.phero,.iw,picture,svg');
  D.addEventListener('contextmenu',e=>{ if(isArt(e.target)) e.preventDefault(); });
  D.addEventListener('dragstart',e=>{ if(isArt(e.target)) e.preventDefault(); });
  let tm=0; const shield=(ms)=>{ H.classList.add('shield'); clearTimeout(tm); if(ms) tm=setTimeout(()=>H.classList.remove('shield'),ms); };
  addEventListener('keydown',e=>{ const k=(e.key||'').toLowerCase();
    if((e.ctrlKey||e.metaKey)&&['s','p','u'].includes(k)){ e.preventDefault(); return; }
    if(k==='printscreen'||k==='meta'||k==='os'||(e.metaKey&&e.shiftKey)||(e.ctrlKey&&e.shiftKey&&k==='s')) shield(2500); },true);
  addEventListener('keyup',e=>{ if((e.key||'').toLowerCase()==='printscreen'){ shield(2500); try{ navigator.clipboard&&navigator.clipboard.writeText(''); }catch(_){} } },true);
  addEventListener('blur',()=>setTimeout(()=>{ if(!(D.activeElement&&D.activeElement.tagName==='IFRAME')) shield(0); },0)); addEventListener('focus',()=>setTimeout(()=>H.classList.remove('shield'),250));
  D.addEventListener('visibilitychange',()=>{ if(D.hidden) shield(0); });
  addEventListener('beforeprint',()=>shield(0)); addEventListener('afterprint',()=>H.classList.remove('shield'));
})();
