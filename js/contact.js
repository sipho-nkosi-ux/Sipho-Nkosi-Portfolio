/* ------------------------------------------------------------------
   SITE SETTINGS — edit these values on GitHub (pencil icon) and commit.
   email:      written backwards so spam bots can't read it; to change it,
               type your address backwards (moc.liamg@...).
   linkedin:   full link to your profile.
   cv:         path to a PDF in this repository, e.g. 'files/Sipho-Nkosi-CV.pdf'
               (leave '' to hide the button).
   goatcounter: your GoatCounter code (the part before .goatcounter.com).
   web3formsKey: access key from web3forms.com (the contact form sends through it;
               if it ever fails, the form falls back to FormSubmit).
               Leave '' to switch visitor counting off.
   ------------------------------------------------------------------ */
window.SITE = {
  emailReversed: 'moc.liamg@isoknysmohpis',
  linkedin: 'https://www.linkedin.com/in/sipho-nkosi',
  cv: '',
  goatcounter: 'sipho',
  web3formsKey: '716e1619-5bd9-490e-bb2a-a6138c406950'
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

  /* contact form — sent in the background through Web3Forms (about a second);
     if that fails, it falls back to a normal post through FormSubmit */
  const f=document.getElementById('cform');
  if(f){ const st=f.querySelector('.fstat'), btn=f.querySelector('button[type=submit]');
    if(/[?&]sent=1/.test(location.search)){ st.textContent='Thank you — your message has been sent.'; history.replaceState(null,'',location.pathname+'#contact'); }
    const hid=(n,v)=>{ let i=f.querySelector('input[name="'+n+'"]'); if(!i){ i=document.createElement('input'); i.type='hidden'; i.name=n; f.appendChild(i); } i.value=v; };
    const fallback=(name,email)=>{ hid('_subject','Portfolio enquiry from '+name); hid('_replyto',email); hid('_template','table'); hid('_captcha','false');
      hid('_next',location.origin+location.pathname.replace(/[^/]*$/,'')+'index.html?sent=1#contact');
      f.action='https://formsubmit.co/'+mail(); f.method='POST'; HTMLFormElement.prototype.submit.call(f); };
    f.addEventListener('submit',async e=>{ e.preventDefault(); const d=new FormData(f);
      if(d.get('_honey')) return;                      // a bot filled the hidden field
      const name=(d.get('name')||'').trim(), email=(d.get('email')||'').trim(), msg=(d.get('message')||'').trim();
      if(!name||!msg||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ st.textContent='Please fill in your name, a valid email and a message.'; return; }
      btn.disabled=true; st.textContent='Sending…';
      if(!S.web3formsKey){ fallback(name,email); return; }
      try{ const ctl=new AbortController(), to=setTimeout(()=>ctl.abort(),8000);
        const r=await fetch('https://api.web3forms.com/submit',{method:'POST',signal:ctl.signal,headers:{'Content-Type':'application/json','Accept':'application/json'},
          body:JSON.stringify({access_key:S.web3formsKey,subject:'Portfolio enquiry from '+name,from_name:'siphonkosi.co.za',name,email,replyto:email,message:msg,botcheck:false})});
        clearTimeout(to); const j=await r.json().catch(()=>({}));
        if(r.ok&&j.success){ f.reset(); btn.disabled=false; st.textContent='Thank you — your message has been sent.'; return; }
        throw new Error(j.message||'failed'); }
      catch(err){ fallback(name,email); } }); }

  /* visitor counting (GoatCounter: privacy-friendly, no cookies) */
  const gc=S.goatcounter; if(!gc) return; const host='https://'+gc+'.goatcounter.com';
  if(!/^(localhost|127\.)/.test(location.hostname)&&navigator.doNotTrack!=='1'){
    const p=location.pathname.replace(/\/index\.html$/,'/'); const q='p='+encodeURIComponent(p)+'&t='+encodeURIComponent(document.title)+'&r='+encodeURIComponent(document.referrer)+'&s='+screen.width+'&rnd='+Math.random().toString(36).slice(2);
    new Image().src=host+'/count?'+q; }
  const v=document.getElementById('visits');
  if(v) fetch(host+'/counter/TOTAL.json').then(r=>r.ok?r.json():null).then(j=>{ if(j&&j.count){ v.textContent=j.count+' visits'; v.hidden=false; } }).catch(()=>{});
})();
