(function(){
  const cfg = window.PORTFOLIO_CONFIG || {};
  const placeholder = !cfg.supabaseUrl || cfg.supabaseUrl.includes('YOUR_') || !cfg.supabaseAnonKey || cfg.supabaseAnonKey.includes('YOUR_');
  let sb = null;
  if (!placeholder && window.supabase?.createClient) {
    sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });
  }
  window.PortfolioCore = {
    cfg,
    supabase: sb,
    configured: !placeholder,
    clone(obj){ return JSON.parse(JSON.stringify(obj)); },
    async loadContent(){
      const local = localStorage.getItem('portfolio_content_preview');
      if (!sb) return local ? JSON.parse(local) : this.clone(window.DEFAULT_CONTENT);
      try {
        const { data, error } = await sb.from('portfolio_content').select('content').eq('id', cfg.contentRowId || 1).maybeSingle();
        if (error) throw error;
        if (data && data.content && Object.keys(data.content).length) return data.content;
      } catch (e) { console.warn('Remote portfolio load failed, using fallback.', e); }
      return local ? JSON.parse(local) : this.clone(window.DEFAULT_CONTENT);
    },
    async saveContent(content){
      localStorage.setItem('portfolio_content_preview', JSON.stringify(content));
      if (!sb) return { localOnly:true };
      const payload = { id: cfg.contentRowId || 1, content, updated_at: new Date().toISOString() };
      const { error } = await sb.from('portfolio_content').upsert(payload, { onConflict:'id' });
      if (error) throw error;
      return { localOnly:false };
    },
    clearLocal(){ localStorage.removeItem('portfolio_content_preview'); },
    slug(s){ return (s||'file').toLowerCase().replace(/[^a-z0-9._-]+/g,'-').replace(/^-+|-+$/g,''); },
    async uploadFile(file){
      if (!sb) throw new Error('Supabase is not configured.');
      const ext = (file.name.split('.').pop() || 'bin').toLowerCase();
      const base = this.slug(file.name.replace(/\.[^.]+$/,'')) || 'upload';
      const path = `uploads/${Date.now()}-${base}.${ext}`;
      const { error } = await sb.storage.from(cfg.mediaBucket || 'portfolio-media').upload(path, file, { cacheControl:'3600', upsert:false });
      if (error) throw error;
      const { data } = sb.storage.from(cfg.mediaBucket || 'portfolio-media').getPublicUrl(path);
      return data.publicUrl;
    }
  };
})();
