(async function(){
  const core = window.PortfolioCore;
  const content = await core.loadContent();
  window.__portfolioContent = content;
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const splitFeature = s => { const [a,...b]=String(s).split('—'); return [a.trim(),b.join('—').trim()]; };

  document.title = content.seo?.title || content.profile.name;
  const desc = document.querySelector('meta[name="description"]'); if(desc) desc.setAttribute('content', content.seo?.description || content.profile.summary);

  $('#brandName').textContent = content.profile.name;
  $('#heroEyebrow').textContent = content.profile.eyebrow;
  $('#heroName').innerHTML = esc(content.profile.name).replace(/\s+(?=[^\s]+$)/,'<br>');
  $('#heroHeadline').textContent = content.profile.headline;
  $('#heroLead').textContent = content.profile.subheadline;
  $('#heroPhoto').src = content.profile.photo;
  $('#heroPills').innerHTML = ['Cafe Management','F&B Operations','Team Leadership','Procurement','Events','Digital Operations'].map(x=>`<span class="pill">${esc(x)}</span>`).join('');
  $('#heroStrip').innerHTML = (content.profile.heroImages||[]).slice(0,3).map(x=>`<img src="${esc(x)}" alt="Career visual">`).join('');
  $('#heroLocation').textContent = content.profile.location;
  $('#heroMobility').textContent = content.profile.mobility.join(' • ');

  $('#stats').innerHTML = content.stats.map(s=>`<div class="stat reveal"><div class="num" data-count="${esc(s.value)}">${esc(s.value)}</div><div class="label">${esc(s.label)}</div></div>`).join('');

  $('#profileSummary').textContent = content.profile.summary;
  $('#languages').innerHTML = content.profile.languages.map(x=>`<div class="feature"><h3>${esc(x.name)}</h3><p>${esc(x.level)}</p></div>`).join('');
  $('#mobility').innerHTML = content.profile.mobility.map(x=>`<span class="chip">${esc(x)}</span>`).join('');

  $('#careerTimeline').innerHTML = content.career.map(x=>`<article class="timeline-item reveal"><div class="timeline-period">${esc(x.period)}</div><div class="timeline-card card"><img src="${esc(x.image)}" alt="${esc(x.company)}"><div><h3>${esc(x.title)}</h3><div class="eyebrow" style="letter-spacing:.08em;margin-top:4px">${esc(x.company)} • ${esc(x.location)}</div><p>${esc(x.summary)}</p><div class="tag-row">${(x.tags||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div></div></div></article>`).join('');

  $('#responsibilities').innerHTML = content.management.responsibilities.map(x=>`<div class="responsibility reveal">${esc(x)}</div>`).join('');
  $('#outletOpeningText').textContent = content.management.outletOpening;

  const featured = content.events.filter(x=>x.featured);
  $('#eventGrid').innerHTML = featured.map(x=>`<article class="event-card card reveal"><img src="${esc(x.image)}" alt="${esc(x.name)}"><div class="body"><div class="meta">${esc(x.location)} • ${esc(x.dateLabel)} • ${esc(x.duration)}</div><h3>${esc(x.name)}</h3><p>${esc(x.summary)}</p><div class="event-scale">${esc(x.scale)}</div></div></article>`).join('');
  $('#eventCount').textContent = content.stats.find(x=>x.label.toLowerCase().includes('events'))?.value || '10+';

  $('#campaignImage').src = content.campaign.image;
  $('#campaignName').textContent = content.campaign.name;
  $('#campaignConcept').textContent = content.campaign.concept;
  $('#campaignMeta').textContent = `${content.campaign.start} • ${content.campaign.duration}`;
  $('#campaignSummary').textContent = content.campaign.summary;
  $('#campaignStatus').textContent = content.campaign.status;

  $('#suppliers').innerHTML = content.suppliers.map(x=>`<span class="chip">${esc(x)}</span>`).join('');
  $('#posSystems').innerHTML = content.systems.pos.map(x=>`<div class="sys"><b>${esc(x.name)}</b><span>${esc(x.level)}</span></div>`).join('');
  $('#delivery').innerHTML = content.systems.delivery.map(x=>`<span class="chip">${esc(x)}</span>`).join('');
  $('#cashiering').innerHTML = content.systems.cashiering.map(x=>`<span class="chip">${esc(x)}</span>`).join('');

  $('#coffeeCapabilities').innerHTML = content.coffee.capabilities.map(x=>`<div class="bullet">${esc(x)}</div>`).join('');
  $('#machines').innerHTML = content.coffee.machines.map(x=>`<span class="chip">${esc(x)}</span>`).join('');
  $('#brewing').innerHTML = content.coffee.brewing.map(x=>`<span class="chip">${esc(x)}</span>`).join('');

  $('#portalName').textContent = content.portal.name;
  $('#portalTitle').textContent = content.portal.title;
  $('#portalSummary').textContent = content.portal.summary;
  $('#portalFeatures').innerHTML = content.portal.features.map(f=>{ const [a,b]=splitFeature(f); return `<div class="portal-feature reveal"><b>${esc(a)}</b><span>${esc(b)}</span></div>`; }).join('');
  const slides = content.portal.slides || [];
  $('#portalSlides').innerHTML = slides.map((s,i)=>{
    if(s.src) return `<div class="slide ${i===0?'active':''}"><img src="${esc(s.src)}" alt="${esc(s.title)}"></div>`;
    return `<div class="slide ${i===0?'active':''}"><div class="portal-mock"><div class="mock-top"><i class="mock-dot"></i><i class="mock-dot"></i><i class="mock-dot"></i></div><div class="mock-body"><div class="mock-side"><div>Dashboard</div><div>Orders</div><div>Inventory</div><div>Production</div><div>Wastage</div><div>History</div></div><div class="mock-main"><div class="eyebrow">Workflow View</div><h4>${esc(s.title)}</h4><div class="mock-sub">${esc(s.subtitle||'')}</div><div class="mock-cards"><div class="mock-card"><strong>Operations</strong><span>Fast, structured workflow</span></div><div class="mock-card"><strong>Records</strong><span>Clear history & follow-up</span></div><div class="mock-card"><strong>Mobile Ready</strong><span>Designed for staff use</span></div></div></div></div></div></div>`;
  }).join('');
  $('#portalDots').innerHTML = slides.map((_,i)=>`<button aria-label="Slide ${i+1}" data-slide="${i}" class="${i===0?'active':''}"></button>`).join('');

  $('#digitalSkills').innerHTML = content.digitalSkills.map(x=>`<div class="skill-row"><b>${esc(x.name)}</b><span>${esc(x.level)}</span></div>`).join('');
  $('#education').innerHTML = content.education.map(x=>`<article class="cert-card card reveal"><img src="${esc(x.image)}" alt="${esc(x.title)}"><div class="body"><h3>${esc(x.title)}</h3><p><b>${esc(x.institution)}</b><br>${esc(x.detail)}</p></div></article>`).join('');
  $('#gallery').innerHTML = content.gallery.map((x,i)=>`<figure class="gallery-item reveal" data-img="${esc(x.src)}"><img src="${esc(x.src)}" alt="${esc(x.caption)}"><figcaption class="cap">${esc(x.caption)}</figcaption></figure>`).join('');

  $('#contactName').textContent = content.profile.name;
  $('#contactHeadline').textContent = content.profile.headline;
  $('#emailLink').href = `mailto:${content.profile.email}`; $('#emailLink').textContent = content.profile.email;
  $('#phoneLink').href = `tel:${content.profile.phone.replace(/\s+/g,'')}`; $('#phoneLink').textContent = content.profile.phone;
  $('#linkedinLink').href = content.profile.linkedin;
  $('#footerName').textContent = content.profile.name;
  $('#footerYear').textContent = new Date().getFullYear();

  // Header + mobile menu
  const header = $('.site-header');
  window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>25));
  $('#menuBtn').addEventListener('click',()=>$('#navLinks').classList.toggle('open'));
  document.querySelectorAll('#navLinks a').forEach(a=>a.addEventListener('click',()=>$('#navLinks').classList.remove('open')));

  // Reveal animations
  const io = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Count-up for numeric-leading stats
  const countObserver = new IntersectionObserver(entries=>entries.forEach(e=>{
    if(!e.isIntersecting) return;
    const el=e.target, raw=el.dataset.count||el.textContent, m=raw.match(/^(\d+)(.*)$/); if(!m){countObserver.unobserve(el);return}
    const target=Number(m[1]), suffix=m[2], start=performance.now(), dur=900;
    const step=t=>{const p=Math.min(1,(t-start)/dur); el.textContent=Math.round(target*(1-Math.pow(1-p,3)))+suffix; if(p<1)requestAnimationFrame(step)}; requestAnimationFrame(step); countObserver.unobserve(el);
  }),{threshold:.7}); document.querySelectorAll('[data-count]').forEach(el=>countObserver.observe(el));

  // Portal slider
  let current=0; const slideEls=[...document.querySelectorAll('#portalSlides .slide')], dotEls=[...document.querySelectorAll('#portalDots button')];
  function show(n){ if(!slideEls.length)return; current=(n+slideEls.length)%slideEls.length; slideEls.forEach((el,i)=>el.classList.toggle('active',i===current)); dotEls.forEach((el,i)=>el.classList.toggle('active',i===current)); }
  $('#prevSlide').addEventListener('click',()=>show(current-1)); $('#nextSlide').addEventListener('click',()=>show(current+1)); dotEls.forEach((d,i)=>d.addEventListener('click',()=>show(i)));
  let auto=setInterval(()=>show(current+1),5200); $('.slider').addEventListener('mouseenter',()=>clearInterval(auto)); $('.slider').addEventListener('mouseleave',()=>auto=setInterval(()=>show(current+1),5200));

  // Gallery lightbox
  const lb=$('#lightbox'), lbImg=$('#lightboxImg');
  document.querySelectorAll('.gallery-item').forEach(x=>x.addEventListener('click',()=>{lbImg.src=x.dataset.img;lb.classList.add('open')}));
  $('#lightboxClose').addEventListener('click',()=>lb.classList.remove('open')); lb.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('open')});
})();
