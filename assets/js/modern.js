(function(){
 window.PortfolioModern={init(content){
  const slides=document.getElementById('spotlightSlides'),tabs=document.getElementById('spotlightTabs'),status=document.getElementById('spotlightStatus');
  if(!slides||!tabs)return;
  const events=content.events||[];
  const marsa=events.find(e=>e.name.toLowerCase().includes('marsa'));
  const bawwabah=events.find(e=>e.name.toLowerCase().includes('bawwabah'));
  const fallback=window.DEFAULT_CONTENT;
  const stories=[];
  if(marsa)stories.push({label:'Multi-kiosk delivery',title:marsa.name,summary:marsa.summary,scale:marsa.scale,image:marsa.image,fallback:'assets/images/marsa_wide.webp',focus:'Coordinate staffing, purchasing, stock continuity and service execution across the event area.'});
  if(bawwabah)stories.push({label:'Extended event operations',title:bawwabah.name,summary:bawwabah.summary,scale:bawwabah.scale,image:bawwabah.image,fallback:'assets/images/bawwabah_wide.webp',focus:'Maintain team coordination, ordering and operational continuity over an extended activation.'});
  const openings=content.stats.find(s=>s.label.toLowerCase().includes('outlet'))?.value;
  stories.push({label:'Opening readiness',title:'From setup to service.',summary:content.management.outletOpening,scale:openings?openings+' outlet openings supported':'Outlet opening experience',image:content.profile.heroImages?.[0]||fallback.profile.photo,fallback:'assets/images/goya_profile.webp',focus:'Connect opening stock, suppliers, systems and team setup before the first service.'});
  let current=0;
  const text=(tag,value,cls)=>{const el=document.createElement(tag);el.textContent=value||'';if(cls)el.className=cls;return el};
  const cards=stories.map((story,i)=>{
   const card=document.createElement('article');card.className='spotlight-slide';card.setAttribute('role','group');card.setAttribute('aria-roledescription','slide');card.setAttribute('aria-label',`${i+1} / ${stories.length}`);card.hidden=i!==0;
   const media=document.createElement('div');media.className='spotlight-media';const img=document.createElement('img');img.loading='lazy';img.src=story.image;img.alt=story.title;img.addEventListener('error',()=>{if(!img.dataset.fallback){img.dataset.fallback='true';img.src=story.fallback}});media.append(img,text('span',String(i+1).padStart(2,'0'),'spotlight-number'));
   const body=document.createElement('div');body.className='spotlight-body';body.append(text('div',story.label,'eyebrow'),text('h3',story.title),text('div',story.scale,'spotlight-scale'),text('p',story.summary),text('h4','Management in practice'),text('p',story.focus));
   const link=text('a','Explore responsibilities ↗','spotlight-link');link.href=i===2?'#operations':'#events';body.append(link);card.append(media,body);slides.append(card);
   const button=text('button',String(i+1).padStart(2,'0')+' / '+story.label);button.type='button';button.setAttribute('aria-label','Show story '+(i+1));button.setAttribute('aria-pressed',String(i===0));button.addEventListener('click',()=>show(i));tabs.append(button);return card;
  });
  function show(index){current=(index+cards.length)%cards.length;cards.forEach((card,i)=>card.hidden=i!==current);[...tabs.children].forEach((button,i)=>button.setAttribute('aria-pressed',String(i===current)));status.textContent=String(current+1).padStart(2,'0')+' / '+String(cards.length).padStart(2,'0');}
  document.getElementById('spotlightPrev').addEventListener('click',()=>show(current-1));document.getElementById('spotlightNext').addEventListener('click',()=>show(current+1));
  document.getElementById('workSpotlight').addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();const direction=document.documentElement.dir==='rtl'?-1:1;show(current+(event.key==='ArrowRight'?direction:-direction))}});
  show(0);
 }};
})();
