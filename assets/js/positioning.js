/* Refresh legacy presentation copy without overwriting custom CMS edits. */
(function(){
 const load=window.PortfolioCore.loadContent.bind(window.PortfolioCore);
 const replacements={
  'F&B Operations & Cafe Management Professional':'Café Management | Team Leadership | F&B Operations',
  'Hands-on leadership across people, purchasing, inventory, events, sales, specialty coffee and smart digital operations.':'I coordinate people, suppliers and daily service so café operations run consistently. My UAE experience includes team supervision, purchasing, inventory control, event delivery and support for new outlet openings.',
  'UAE hospitality professional with a management mindset and floor-level operational strength. At Goya Cafe, I progressed from Head Barista into cafe management by taking ownership across team scheduling, purchasing, supplier coordination, monthly inventory, Foodics, delivery platforms, events, sales support and day-to-day outlet operations.':'I am a UAE-based hospitality professional who progressed from Head Barista into café management at Goya Cafe. I bring hands-on experience in shift planning, team coaching, supplier coordination, inventory control and daily outlet operations. My work also includes large event activations and support for four outlet openings. I combine service-floor knowledge with business studies and practical digital systems to keep operations organised and accountable.'
 };
 window.PortfolioCore.loadContent=async function(){const source=await load();const content=window.PortfolioCore.clone(source);for(const key of ['headline','subheadline','summary']){if(replacements[content.profile[key]])content.profile[key]=replacements[content.profile[key]];}if(content.seo?.title==='MD Mehedi Hasan | F&B Operations & Cafe Management UAE')content.seo.title='MD Mehedi Hasan | Café Management & Hospitality Operations | UAE';return content;};
})();
