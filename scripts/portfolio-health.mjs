import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
const site='https://portfolio.mehedi-src.workers.dev/';
async function request(url,options={}){
 let last;
 for(let attempt=0;attempt<3;attempt++){
  try{const response=await fetch(url,{...options,signal:AbortSignal.timeout(20000)});if(!response.ok)throw Error(`HTTP ${response.status}`);return response;}
  catch(error){last=error;if(attempt<2)await new Promise(resolve=>setTimeout(resolve,2000*(attempt+1)));}
 }
 throw last;
}
const sandbox={window:{}};
vm.runInNewContext(await readFile(new URL('../assets/js/config.js',import.meta.url),'utf8'),sandbox,{timeout:1000});
const config=sandbox.window.PORTFOLIO_CONFIG;
const backend=new URL(config.supabaseUrl);
if(backend.protocol!=='https:'||!backend.hostname.endsWith('.supabase.co'))throw Error('Unexpected database endpoint');
const page=await (await request(site)).text();
if(!page.includes('id="siteLanguage"'))throw Error('The live portfolio is not serving the expected page');
console.log('Live portfolio: OK');
const url=new URL('/rest/v1/portfolio_content',backend);
url.search=new URLSearchParams({select:'id',id:`eq.${config.contentRowId||1}`,limit:'1'});
// Three small read-only checks exercise the same database the portfolio uses.
for(let n=1;n<=3;n++){
 const response=await request(url,{headers:{apikey:config.supabaseAnonKey,Authorization:`Bearer ${config.supabaseAnonKey}`}});
 const rows=await response.json();
 if(!Array.isArray(rows)||rows.length!==1)throw Error('Portfolio content row is unavailable');
 console.log(`Database read ${n}/3: OK`);
}
console.log('Daily portfolio health check passed. No data was changed.');
