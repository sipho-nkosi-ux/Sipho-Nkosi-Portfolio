/* ------------------------------------------------------------------
   SITE SETTINGS — edit these values on GitHub (pencil icon) and commit.
   email:      written backwards so spam bots can't read it; to change it,
               type your address backwards (moc.liamg@...).
   linkedin:   full link to your profile.
   cv:         path to a PDF in this repository, e.g. 'files/Sipho-Nkosi-CV.pdf'
               (leave '' to hide the button).
   goatcounter: your GoatCounter code (the part before .goatcounter.com).
               Leave '' to switch visitor counting off.
   ------------------------------------------------------------------ */
window.SITE = {
  emailReversed: 'moc.liamg@iksnynsmohpis',
  linkedin: 'https://www.linkedin.com/in/sipho-nkosi',
  cv: '',
  goatcounter: 'sipho'
};

(function(){ const S=window.SITE, mail=()=>S.emailReversed.split('').reverse().join('');
  /* contact buttons — the address is assembled only when clicked */
  const el=document.getElementById('contact-links');
  if(el){ const b=[];
    if(S.emailReversed) b.push('<a class="btn pri" href="#contact" data-mail>Email me <span class="ar">→</span></a>');
    if(S.linkedin) b.push('<a class="btn" href="'+encodeURI(S.linkedin)+'" target="_blank" rel="noopener noreferrer">LinkedIn</a>');
    if(S.cv) b.push('<a class="btn" href="'+encodeURI(S.cv)+'" download>Download CV</a>');
    el.innerHTML=b.join('');
    const m=el.querySelector('[data-mail]'); if(m) m.addEventListener('click',e=>{ e.preventDefault(); location.href='mailto:'+mail(); }); }

  /* contact form — sent through FormSubmit to the address above */
  const f=document.getElementById('cform');
  if(f){ const st=f.querySelector('.fstat'), btn=f.querySelector('button[type=submit]');
    f.addEventListener('submit',async e=>{ e.preventDefault(); const d=new FormData(f);
      if(d.get('_honey')) return;                      // a bot filled the hidden field
      const name=(d.get('name')||'').trim(), email=(d.get('email')||'').trim(), msg=(d.get('message')||'').trim();
      if(!name||!msg||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ st.textContent='Please fill in your name, a valid email and a message.'; return; }
      btn.disabled=true; st.textContent='Sending…';
      try{ const r=await fetch('https://formsubmit.co/ajax/'+mail(),{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},
          body:JSON.stringify({name,email,message:msg,_subject:'Portfolio enquiry from '+name,_template:'table',_captcha:'false'})});
        const j=await r.json().catch(()=>({})); if(r.ok&&String(j.success)!=='false'){ f.reset(); st.textContent='Thank you — your message has been sent.'; }
        else throw new Error(j.message||'failed'); }
      catch(err){ st.innerHTML='Sorry, that didn’t go through. Please <a href="#contact" data-mail2 style="text-decoration:underline">email me directly</a>.'; const a=st.querySelector('[data-mail2]'); if(a) a.onclick=ev=>{ev.preventDefault(); location.href='mailto:'+mail();}; }
      btn.disabled=false; }); }

  /* visitor counting (GoatCounter: privacy-friendly, no cookies) */
  const gc=S.goatcounter; if(!gc) return; const host='https://'+gc+'.goatcounter.com';
  if(!/^(localhost|127\.)/.test(location.hostname)&&navigator.doNotTrack!=='1'){
    const p=location.pathname.replace(/\/index\.html$/,'/'); const q='p='+encodeURIComponent(p)+'&t='+encodeURIComponent(document.title)+'&r='+encodeURIComponent(document.referrer)+'&s='+screen.width+'&rnd='+Math.random().toString(36).slice(2);
    new Image().src=host+'/count?'+q; }
  const v=document.getElementById('visits');
  if(v) fetch(host+'/counter/TOTAL.json').then(r=>r.ok?r.json():null).then(j=>{ if(j&&j.count){ v.textContent=j.count+' visits'; v.hidden=false; } }).catch(()=>{});
})();
