(function(){
  const themeButton=document.getElementById('themeToggle');
  let theme;try{theme=localStorage.getItem('portfolio_theme')}catch{}
  if(!theme)theme='light';
  document.documentElement.dataset.theme=theme;
  themeButton.addEventListener('click',()=>{theme=theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;try{localStorage.setItem('portfolio_theme',theme)}catch{}});
})();
