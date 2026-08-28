(async function(){
  const core=window.PortfolioCore;
  const root=document.getElementById('pdfRoot');
  const status=document.getElementById('pdfStatus');
  const btn=document.getElementById('downloadBtn');
  const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
  const img=(src,alt='')=>`<img crossorigin="anonymous" src="${esc(src)}" alt="${esc(alt)}">`;
  const chips=arr=>`<div class="chips">${(arr||[]).map(x=>`<span class="chip">${esc(typeof x==='string'?x:(x.name||''))}</span>`).join('')}</div>`;
  const page=(n,label,body,cls='')=>`<section class="pdf-page ${cls}"><div class="page-no">${String(n).padStart(2,'0')} / ${esc(label)}</div>${body}</section>`;
  const splitFeature=s=>{const [a,...b]=String(s||'').split('—');return[a.trim(),b.join('—').trim()]};

  function render(c){
    const stats=(c.stats||[]).map(s=>`<div class="stat"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join('');
    const languages=(c.profile.languages||[]).map(x=>`${x.name}: ${x.level}`).join(' • ');
    const mobility=(c.profile.mobility||[]).join(' • ');
    const featured=(c.events||[]).filter(x=>x.featured).slice(0,4);
    const eventCards=featured.map(x=>`<article class="event">${img(x.image,x.name)}<div class="event-body"><div class="meta">${esc(x.location)} • ${esc(x.dateLabel)} • ${esc(x.duration)}</div><h3>${esc(x.name)}</h3><p>${esc(x.summary)}</p><div class="scale">${esc(x.scale)}</div></div></article>`).join('');
    const career=(c.career||[]).map(x=>`<div class="timeline-item"><div class="timeline-period">${esc(x.period)}</div><div class="timeline-body"><h3>${esc(x.title)}</h3><div class="company">${esc(x.company)} • ${esc(x.location)}</div><p>${esc(x.summary)}</p></div></div>`).join('');
    const resp=(c.management?.responsibilities||[]).map(x=>`<div class="bullet">${esc(x)}</div>`).join('');
    const pos=(c.systems?.pos||[]).map(x=>`<div class="sys"><b>${esc(x.name)}</b><span>${esc(x.level)}</span></div>`).join('');
    const digital=(c.digitalSkills||[]).map(x=>`<div class="skill"><b>${esc(x.name)}</b><span>${esc(x.level)}</span></div>`).join('');
    const features=(c.portal?.features||[]).map(f=>{const[a,b]=splitFeature(f);return`<div class="feature"><b>${esc(a)}</b><span>${esc(b)}</span></div>`}).join('');
    const certs=(c.education||[]).map(x=>`<article class="cert">${img(x.image,x.title)}<div class="cert-body"><h3>${esc(x.title)}</h3><p><b>${esc(x.institution)}</b><br>${esc(x.detail)}</p></div></article>`).join('');
    const gallery=(c.gallery||[]).slice(0,6).map(x=>`<figure>${img(x.src,x.caption)}<figcaption>${esc(x.caption)}</figcaption></figure>`).join('');
    const eventCount=(c.stats||[]).find(x=>String(x.label).toLowerCase().includes('events'))?.value||'10+';
    const outletCount=(c.stats||[]).find(x=>String(x.label).toLowerCase().includes('outlet'))?.value||'4';

    const pages=[];
    pages.push(page(1,'Profile',`
      <div class="cover-grid"><div><div class="eyebrow">${esc(c.profile.eyebrow)}</div><h1>${esc(c.profile.name)}</h1><h2>${esc(c.profile.headline)}</h2><p>${esc(c.profile.subheadline)}</p>
      <div class="pill-row"><span class="pill">Cafe Management</span><span class="pill">F&B Operations</span><span class="pill">Team Leadership</span><span class="pill">Procurement</span><span class="pill">Events</span><span class="pill">Digital Operations</span></div>
      <div class="contact-mini"><b>${esc(c.profile.location)}</b><br>${esc(c.profile.email)} • ${esc(c.profile.phone)}<br>${esc(mobility)}<br>${esc(languages)}</div></div><div class="portrait">${img(c.profile.photo,c.profile.name)}</div></div>
      <div class="stats">${stats}</div>`, 'cover'));

    pages.push(page(2,'Management',`<div class="eyebrow">Executive Profile</div><h2 class="title">Management mindset.<br>Hands-on execution.</h2><p class="subtitle">${esc(c.profile.summary)}</p><div class="rule"></div><div class="grid2"><div><div class="eyebrow">Current Management Scope</div><div class="bullets" style="margin-top:10px">${resp}</div></div><div><div class="card dark"><div class="eyebrow" style="color:#d8ba8d">Pre-opening & Launch</div><div class="big-number">${esc(outletCount)}</div><h3>New outlet openings</h3><p>${esc(c.management?.outletOpening)}</p></div><div class="card soft" style="margin-top:9px"><div class="eyebrow">Languages & Mobility</div><p style="margin-top:8px"><b>${esc(languages)}</b><br>${esc(mobility)}</p></div></div></div>`));

    pages.push(page(3,'Career',`<div class="eyebrow">Career Journey</div><h2 class="title">From leadership foundation<br>to UAE cafe management.</h2><div class="rule"></div><div class="timeline">${career}</div>`));

    pages.push(page(4,'Events',`<div class="eyebrow">Event Management</div><h2 class="title">Selected major activations.</h2><p class="subtitle">Featured projects from a wider record of ${esc(eventCount)} successfully managed events, covering staffing, purchasing, stock, setup, service continuity and on-site execution.</p><div class="rule"></div><div class="event-grid">${eventCards}</div>`));

    pages.push(page(5,'Commercial',`<div class="eyebrow">Commercial Operations</div><h2 class="title">Procurement, suppliers & POS.</h2><div class="grid2"><div class="card soft"><div class="eyebrow">Supplier Network</div><h3>20+ vendor relationships</h3>${chips(c.suppliers)}<p style="margin-top:10px">Daily and recurring ordering, stock continuity, emergency sourcing, vendor follow-up and purchase planning across food, beverage, dairy, produce, packaging and specialty ingredients.</p></div><div><div class="eyebrow">POS & Business Systems</div><div class="systems" style="margin-top:9px">${pos}</div><div class="eyebrow" style="margin-top:13px">Delivery Platforms</div>${chips(c.systems?.delivery)}<div class="eyebrow" style="margin-top:13px">Cashiering</div>${chips(c.systems?.cashiering)}</div></div>`));

    pages.push(page(6,'Coffee',`<div class="eyebrow">Beverage Expertise</div><h2 class="title">Technical coffee knowledge<br>supporting management.</h2><p class="subtitle">${esc(c.coffee?.summary)}</p><div class="rule"></div><div class="grid2"><div><div class="bullets">${(c.coffee?.capabilities||[]).map(x=>`<div class="bullet">${esc(x)}</div>`).join('')}</div></div><div><div class="card soft"><div class="eyebrow">Commercial Espresso Machines</div>${chips(c.coffee?.machines)}</div><div class="card soft" style="margin-top:9px"><div class="eyebrow">Manual Brewing</div>${chips(c.coffee?.brewing)}</div></div></div>`));

    pages.push(page(7,'Digital',`<div class="eyebrow">Digital Operations</div><h2 class="title">Smart workflows & custom<br>process improvement.</h2><div class="portal-box"><div class="eyebrow" style="color:#d8ba8d">${esc(c.portal?.name)}</div><h3>${esc(c.portal?.title)}</h3><p>${esc(c.portal?.summary)}</p></div><div class="features">${features}</div><div class="grid2" style="margin-top:12px"><div class="card soft"><div class="eyebrow">Computer & Digital Skills</div><div class="skill-table" style="margin-top:9px">${digital}</div></div><div class="card soft"><div class="eyebrow">Working Style</div><h3 style="font-size:20px;margin-top:8px">Use systems, data and practical automation to make operations easier, faster and more consistent.</h3></div></div>`));

    pages.push(page(8,'Campaign',`<div class="eyebrow">Current Campaign & Outlet Growth</div><h2 class="title">Seasonal activation and<br>new outlet experience.</h2><div class="hero-photo-wide">${img(c.campaign?.image,c.campaign?.name)}</div><div class="grid2"><div class="card"><div class="eyebrow">${esc(c.campaign?.status)}</div><h3>${esc(c.campaign?.name)}</h3><p><b>${esc(c.campaign?.concept)}</b><br>${esc(c.campaign?.start)} • ${esc(c.campaign?.duration)}</p><p style="margin-top:7px">${esc(c.campaign?.summary)}</p></div><div class="card dark"><div class="big-number">${esc(outletCount)}</div><h3>New outlet openings</h3><p>${esc(c.management?.outletOpening)}</p></div></div>`));

    pages.push(page(9,'Credentials',`<div class="eyebrow">Education & Credentials</div><h2 class="title">Formal learning & proof.</h2><p class="subtitle">Selected public-facing credential images and career evidence. Full original documentation can be shared directly with employers when required.</p><div class="rule"></div><div class="cert-grid">${certs}</div><p class="note">Public portfolio credentials should remain privacy-redacted where document numbers or personal identifiers are visible.</p>`));

    pages.push(page(10,'Gallery',`<div class="eyebrow">Selected Career Gallery</div><h2 class="title">Real work. Real environments.</h2><p class="subtitle">A curated visual record of management, events, hospitality and professional development.</p><div class="rule"></div><div class="gallery">${gallery}</div>`));

    pages.push(page(11,'Contact',`<div style="min-height:235mm;display:flex;flex-direction:column;justify-content:center"><div class="eyebrow" style="color:#d8ba8d">Professional Positioning</div><h2>${esc(c.profile.name)}</h2><h2 style="font-size:22px;color:#e6c28f;margin:0 0 18px">${esc(c.profile.headline)}</h2><p>${esc(c.profile.summary)}</p><div class="contact-box"><b>${esc(c.profile.location)}</b><br>${esc(c.profile.email)}<br>${esc(c.profile.phone)}<br>${esc(c.profile.linkedin)}<br><br>${esc(mobility)}<br>${esc(languages)}</div><p style="margin-top:22px"><b>Target direction:</b> Assistant Manager • Cafe Manager • F&B Supervisor • Outlet Supervisor • Operations Supervisor</p></div>`, 'closing'));

    root.innerHTML=pages.join('');
  }

  async function waitImages(){
    const all=[...root.querySelectorAll('img')];
    await Promise.all(all.map(im=>new Promise(res=>{if(im.complete){res();return}const done=()=>res();im.addEventListener('load',done,{once:true});im.addEventListener('error',done,{once:true});setTimeout(done,7000)})));
  }

  async function generate(){
    btn.disabled=true; status.textContent='Preparing latest PDF from live portfolio data…';
    let overlay=document.querySelector('.download-loading');
    if(!overlay){overlay=document.createElement('div');overlay.className='download-loading';overlay.innerHTML='<div><div class="spinner"></div><b>Generating latest portfolio PDF…</b><div style="margin-top:5px;color:#c8d7e2;font-size:.85rem">Using the current Supabase content</div></div>';document.body.appendChild(overlay)}
    overlay.classList.add('show');
    await waitImages();
    const filename=(window.__liveContent?.profile?.name||'MD Mehedi Hasan').replace(/[^a-z0-9]+/gi,'_')+'_Latest_Portfolio.pdf';
    const opt={margin:0,filename,image:{type:'jpeg',quality:.96},html2canvas:{scale:2,useCORS:true,allowTaint:false,backgroundColor:'#ffffff',logging:false},jsPDF:{unit:'mm',format:'a4',orientation:'portrait'},pagebreak:{mode:['css','legacy']}};
    try{await html2pdf().set(opt).from(root).save();status.textContent='Latest PDF generated from current published data.'}catch(e){console.error(e);status.textContent='Automatic PDF download failed. Use your browser Print → Save as PDF.';window.print()}finally{overlay.classList.remove('show');btn.disabled=false}
  }

  try{
    const content=await core.loadContent();window.__liveContent=content;render(content);await waitImages();btn.disabled=false;status.textContent=core.configured?'Loaded current Supabase portfolio content.':'Loaded current local portfolio content.';
    btn.addEventListener('click',generate);
    const auto=new URLSearchParams(location.search).get('download');if(auto==='1')setTimeout(generate,400);
  }catch(e){console.error(e);status.textContent='Could not load portfolio content: '+e.message;root.innerHTML='<section class="pdf-page"><h2>Could not load portfolio data</h2><p>Please return to Admin and confirm Supabase configuration.</p></section>'}
})();
