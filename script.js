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
  if (cfg.discordUrl) { $('#discordTop') && ($('#discordTop').href = cfg.discordUrl); $('#discordSupportLink') && ($('#discordSupportLink').href = cfg.discordUrl); }
  if (cfg.itchUrl) { $('#itchTop') && ($('#itchTop').href = cfg.itchUrl); $('#itchHero') && ($('#itchHero').href = cfg.itchUrl); $('#itchLink') && ($('#itchLink').href = cfg.itchUrl); }
  if (cfg.supportEmail) { const mail = 'mailto:' + cfg.supportEmail; $('#emailLink') && ($('#emailLink').href = mail); }

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

  // WildWorks island gallery
  const galleryItems = [
    {
      image: 'assets/wildwood-hub.webp',
      title: 'Wildwood Hub',
      kicker: 'ISLAND 01 · HUB',
      text: 'A sheltered green hub with shops, paths, trees and multiple routes leading out to the rest of the world.'
    },
    {
      image: 'assets/forgeworks.webp',
      title: 'Forgeworks',
      kicker: 'ISLAND 02 · INDUSTRIAL',
      text: 'Dense buildings, cranes, rooftop routes and industrial pipes create a more vertical urban playground.'
    },
    {
      image: 'assets/frozen-peaks.webp',
      title: 'Frozen Peaks',
      kicker: 'ISLAND 03 · SNOW',
      text: 'A layered frozen mountain with cabins, pine trees, narrow bridges and long climbs above the clouds.'
    },
    {
      image: 'assets/ancient-heights.webp',
      title: 'Ancient Heights',
      kicker: 'ISLAND 04 · TEMPLE',
      text: 'A forest-covered temple island built around a huge central staircase, towers and elevated wooden routes.'
    }
  ];
  let galleryIndex = 0;
  let galleryTimer;
  const galleryWrap = $('#mapGallery');
  const galleryImage = $('#galleryImage');
  const galleryTitle = $('#galleryTitle');
  const galleryKicker = $('#galleryKicker');
  const galleryText = $('#galleryText');
  const galleryCurrent = $('#galleryCurrent');
  const galleryProgress = $('#galleryProgress');

  const restartGalleryProgress = () => {
    if (!galleryProgress || reduceMotion) return;
    galleryProgress.classList.remove('running');
    void galleryProgress.offsetWidth;
    galleryProgress.classList.add('running');
  };

  const showGallery = (index, userAction=false) => {
    galleryIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[galleryIndex];
    const imageWrap = galleryImage?.closest('.gallery-image-wrap');
    imageWrap?.classList.add('changing');
    setTimeout(() => {
      if (galleryImage) {
        galleryImage.src = item.image;
        galleryImage.alt = item.title + ' island';
      }
      if (galleryTitle) galleryTitle.textContent = item.title;
      if (galleryKicker) galleryKicker.textContent = item.kicker;
      if (galleryText) galleryText.textContent = item.text;
      if (galleryCurrent) galleryCurrent.textContent = String(galleryIndex + 1).padStart(2,'0');
      $$('.gallery-tab').forEach((tab,i) => tab.classList.toggle('active', i === galleryIndex));
      imageWrap?.classList.remove('changing');
    }, 150);
    restartGalleryProgress();

    clearInterval(galleryTimer);
    if (!reduceMotion) galleryTimer = setInterval(() => showGallery(galleryIndex + 1), 6000);
  };

  $('#galleryPrev')?.addEventListener('click', () => showGallery(galleryIndex - 1, true));
  $('#galleryNext')?.addEventListener('click', () => showGallery(galleryIndex + 1, true));
  $$('.gallery-tab').forEach(tab => tab.addEventListener('click', () => showGallery(Number(tab.dataset.galleryIndex), true)));
  showGallery(0);

  // Fullscreen map viewer
  const lightbox = $('#galleryLightbox');
  const lightboxImage = $('#lightboxImage');
  const lightboxTitle = $('#lightboxTitle');
  const openLightbox = () => {
    const item = galleryItems[galleryIndex];
    lightboxImage.src = item.image;
    lightboxImage.alt = item.title + ' fullscreen map preview';
    lightboxTitle.textContent = item.title;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
    document.body.classList.add('lightbox-open');
  };
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
    document.body.classList.remove('lightbox-open');
  };
  $('#galleryExpand')?.addEventListener('click', openLightbox);
  $('#lightboxClose')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
    if (lightbox?.classList.contains('open') && e.key === 'ArrowRight') showGallery(galleryIndex + 1, true);
    if (lightbox?.classList.contains('open') && e.key === 'ArrowLeft') showGallery(galleryIndex - 1, true);
  });

  // Animated stats
  const counters = $$('[data-counter]');
  if ('IntersectionObserver' in window) {
    const counterIO = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.counter || 0);
        if (reduceMotion) el.textContent = target;
        else {
          const start = performance.now();
          const dur = 900;
          const tick = now => {
            const p = Math.min(1,(now-start)/dur);
            el.textContent = Math.round(target * (1-Math.pow(1-p,3)));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
        counterIO.unobserve(el);
      });
    }, {threshold:.6});
    counters.forEach(c => counterIO.observe(c));
  } else counters.forEach(c => c.textContent = c.dataset.counter);


})();
