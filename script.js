(() => {
  const $ = (s, ctx=document) => ctx.querySelector(s);
  const $$ = (s, ctx=document) => [...ctx.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.addEventListener('load', () => setTimeout(() => $('#loader')?.classList.add('done'), 260));

  // Configurable creator content.
  const cfg = window.WILDWORKS_CONFIG?.creator || {};
  if (cfg.handle) $('#creatorHandle').textContent = cfg.handle;
  if (cfg.channelUrl) {
    $('#creatorChannel').href = cfg.channelUrl;
    $('#youtubeTop').href = cfg.channelUrl;
  }
  if (cfg.videoUrl) $('#videoDirectLink').href = cfg.videoUrl;

  // Lazy-load the YouTube Short only when clicked.
  const poster = $('#videoPoster');
  const embed = $('#videoEmbed');
  poster?.addEventListener('click', () => {
    const id = cfg.youtubeVideoId || 'W32AjYdnJbE';
    embed.hidden = false;
    embed.innerHTML = `<iframe title="Featured WildWorks creator video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen src="https://www.youtube.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0"></iframe>`;
    poster.hidden = true;
  });

  // Mobile menu.
  const toggle = $('#menuToggle');
  const links = $('#navLinks');
  toggle?.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  $$('.nav-links a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open'); toggle?.setAttribute('aria-expanded','false');
  }));

  // Scroll progress + header state.
  const progress = $('#pageProgress');
  const header = $('#siteHeader');
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const pct = max > 0 ? (scrollY / max) * 100 : 0;
    progress.style.width = pct + '%';
    header.classList.toggle('scrolled', scrollY > 30);
  };
  addEventListener('scroll', onScroll, {passive:true}); onScroll();

  // Reveal on scroll.
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, {threshold:.12, rootMargin:'0px 0px -30px'});
    $$('.reveal').forEach(el => io.observe(el));
  } else $$('.reveal').forEach(el => el.classList.add('visible'));

  // FAQ accordion.
  $$('.faq-item button').forEach(btn => btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    $$('.faq-item').forEach(other => { if (other !== item) other.classList.remove('open'); });
    item.classList.toggle('open');
  }));

  if (!reduceMotion) {
    // Hero map parallax: subtle, not a giant moving selfie.
    const hero = $('.hero');
    const bg = $('#heroBg');
    hero?.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - .5;
      const ny = (e.clientY - r.top) / r.height - .5;
      bg.style.transform = `scale(1.09) translate(${nx * -16}px, ${ny * -10}px)`;
      $$('[data-parallax]', hero).forEach(el => {
        const p = Number(el.dataset.parallax || 0);
        el.style.transform = `translate(${nx * innerWidth * p}px, ${ny * innerHeight * p}px)`;
      });
    });
    hero?.addEventListener('pointerleave', () => { bg.style.transform = 'scale(1.08)'; });

    // Lightweight mouse tilt for map / cards.
    $$('[data-tilt]').forEach(card => {
      card.addEventListener('pointermove', e => {
        if (innerWidth < 800) return;
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 7}deg) translateY(-3px)`;
      });
      card.addEventListener('pointerleave', () => card.style.transform = '');
    });

    // Magnetic primary button.
    $$('.magnetic').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width/2);
        const y = e.clientY - (r.top + r.height/2);
        btn.style.transform = `translate(${x*.08}px, ${y*.08}px) translateY(-3px)`;
      });
      btn.addEventListener('pointerleave', () => btn.style.transform = '');
    });
  }
})();
