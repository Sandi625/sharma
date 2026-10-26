/**
 * SHARMA DIAN SAFITRI, S.E. — CREATIVE PORTOFOLIO JAVASCRIPT
 * Features:
 * - Light & Dark Mode Engine (Local Storage + System Preference + Meta Theme Color)
 * - iOS & Android Mobile Navigation (Story Bar, Tap Zones, Touch Swipe, Haptic Feedback)
 * - Unified Floating Bottom Dock Controls (Prev/Next, Counter, Theme & WhatsApp)
 * - Interactive Mouse-Tracking Gradient Glow on Cards
 * - HTML5 Canvas Particle System (Floating Petals & Click Sparkles)
 * - Dynamic Eased Number Counter Animation
 * - Custom Video Player Controls
 * - Lightbox Image Modal
 * - WhatsApp Quick Form (+62 812-5203-7392)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------------------
  // Target Contact Information
  // ---------------------------------------------------------
  const TARGET_WHATSAPP = '6281252037392'; // +62 812-5203-7392
  const TARGET_INSTAGRAM = 'https://www.instagram.com/sharmasafitri?psln=MWlxbXBrOWdpa3ppaw==';
  const TARGET_TIKTOK = 'https://www.tiktok.com/@four.febb?_r=1&_t=ZS-9AqvJ9cGLFV';

  // ---------------------------------------------------------
  // DOM Elements
  // ---------------------------------------------------------
  const slides = document.querySelectorAll('.slide-section');
  const slideTitles = [
    'Cover Portofolio',
    'About Me & Profil',
    'Keahlian & Tools',
    'Layanan & Services',
    'Pengalaman Brand',
    'Social Media',
    'Mega Viral 14.5M+',
    'Showcase Editing',
    'KOL & Galeri Foto',
    'Kontak & WhatsApp'
  ];
  const totalSlides = slides.length;
  function checkUrlSlide() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#slide-')) {
      const idx = parseInt(hash.replace('#slide-', ''), 10);
      if (!isNaN(idx) && idx >= 0 && idx < totalSlides) {
        goToSlide(idx);
      }
    }
  }
  window.addEventListener('hashchange', checkUrlSlide);
  const navLinks = document.querySelectorAll('.nav-link');
  const prevBtn = document.getElementById('prevSlideBtn');
  const nextBtn = document.getElementById('nextSlideBtn');
  const currentSlideNum = document.getElementById('currentSlideNum');
  const totalSlidesNum = document.getElementById('totalSlidesNum');
  const deckDotsContainer = document.getElementById('deckDots');
  const storyProgressContainer = document.getElementById('storyProgressBars');
  const viewToggleBtn = document.getElementById('viewToggleBtn');
  const viewToggleText = document.getElementById('viewToggleText');
  const autoplayBtn = document.getElementById('autoplayBtn');
  const autoplayIcon = document.getElementById('autoplayIcon');
  const fullscreenDeckBtn = document.getElementById('fullscreenDeckBtn');
  const tapLeft = document.getElementById('tapLeft');
  const tapRight = document.getElementById('tapRight');

  // Theme Toggle Elements
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  const dockThemeBtn = document.getElementById('dockThemeBtn');
  const dockThemeIcon = document.getElementById('dockThemeIcon');
  const themeColorMeta = document.getElementById('themeColorMeta');

  // Video Player Elements
  const video = document.getElementById('portfolioVideo');
  const playBtn = document.getElementById('playBtn');
  const miniPlayBtn = document.getElementById('miniPlayBtn');
  const videoOverlay = document.getElementById('videoOverlay');
  const progressBar = document.getElementById('progressBar');
  const progressFilled = document.getElementById('progressFilled');
  const muteBtn = document.getElementById('muteBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');

  // Lightbox Elements
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');

  let currentSlide = 0;
  let isAutoplay = false;
  let autoplayInterval = null;
  const AUTOPLAY_DELAY = 6500; // 6.5s per slide

  // Format 2 digits
  const formatNum = (num) => String(num).padStart(2, '0');
  totalSlidesNum.textContent = formatNum(totalSlides);

  // ---------------------------------------------------------
  // 1. Light & Dark Theme Engine (iOS & Android Tuned)
  // ---------------------------------------------------------
  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
      if (dockThemeIcon) dockThemeIcon.className = 'fa-solid fa-sun';
      if (themeText) themeText.textContent = 'Terang';
      if (themeColorMeta) themeColorMeta.setAttribute('content', '#120D10');
      localStorage.setItem('sharma_theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
      if (dockThemeIcon) dockThemeIcon.className = 'fa-solid fa-moon';
      if (themeText) themeText.textContent = 'Gelap';
      if (themeColorMeta) themeColorMeta.setAttribute('content', '#FDF7F7');
      localStorage.setItem('sharma_theme', 'light');
    }
  }

  function initTheme() {
    const urlDark = window.location.search.includes('theme=dark') || window.location.hash.includes('theme=dark');
    if (urlDark) {
      applyTheme(true);
      return;
    }
    const savedTheme = localStorage.getItem('sharma_theme');
    if (savedTheme) {
      applyTheme(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark);
    }
  }

  function toggleTheme() {
    const isCurrentlyDark = document.body.classList.contains('dark-theme');
    applyTheme(!isCurrentlyDark);
    if (navigator.vibrate) {
      navigator.vibrate(12);
    }
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (dockThemeBtn) dockThemeBtn.addEventListener('click', toggleTheme);
  initTheme();

  // Listen to system theme change if user hasn't overridden
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('sharma_theme')) {
        applyTheme(e.matches);
      }
    });
  }

  // ---------------------------------------------------------
  // 2. Segmented Story Progress Bar (Top)
  // ---------------------------------------------------------
  storyProgressContainer.innerHTML = '';
  slides.forEach((_, idx) => {
    const segment = document.createElement('div');
    segment.className = `story-segment ${idx === 0 ? 'active' : ''}`;
    segment.innerHTML = `<div class="story-segment-fill"></div>`;
    segment.addEventListener('click', () => goToSlide(idx));
    storyProgressContainer.appendChild(segment);
  });
  const storySegments = document.querySelectorAll('.story-segment');

  // ---------------------------------------------------------
  // 3. Deck Bottom Dots
  // ---------------------------------------------------------
  deckDotsContainer.innerHTML = '';
  slides.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.className = `deck-dot ${idx === 0 ? 'active' : ''}`;
    dot.setAttribute('title', `Ke Slide ${idx + 1}`);
    dot.addEventListener('click', () => goToSlide(idx));
    deckDotsContainer.appendChild(dot);
  });
  const dots = document.querySelectorAll('.deck-dot');

  // ---------------------------------------------------------
  // 4. Slide Navigation Logic
  // ---------------------------------------------------------
  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    if (index === currentSlide && slides[index].classList.contains('active') && !slides[index].classList.contains('leaving')) return;

    const prevIndex = currentSlide;
    currentSlide = index;
    const isDeckMode = document.body.classList.contains('deck-mode');

    if (isDeckMode) {
      slides.forEach((slide, idx) => {
        slide.classList.remove('entering', 'leaving');
        slide.classList.toggle('active', idx === currentSlide);
      });
      slides[currentSlide].scrollTop = 0;
    } else {
      const targetSection = document.getElementById(`slide-${currentSlide}`);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Update Counter & Active States
    currentSlideNum.textContent = formatNum(currentSlide + 1);

    navLinks.forEach((link, idx) => {
      link.classList.toggle('active', idx === currentSlide);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });

    // Update Edge and Dock Hover Tooltips for Page Changing
    const edgePrevBtn = document.getElementById('edgePrevBtn');
    const edgeNextBtn = document.getElementById('edgeNextBtn');
    const edgePrevTitle = document.getElementById('edgePrevTitle');
    const edgeNextTitle = document.getElementById('edgeNextTitle');
    const dockPrevTitle = document.getElementById('dockPrevTitle');
    const dockNextTitle = document.getElementById('dockNextTitle');

    if (edgePrevBtn) {
      edgePrevBtn.classList.toggle('nav-disabled', currentSlide === 0);
      if (currentSlide > 0 && edgePrevTitle) {
        edgePrevTitle.textContent = slideTitles[currentSlide - 1];
      }
    }
    if (edgeNextBtn) {
      edgeNextBtn.classList.toggle('nav-disabled', currentSlide === totalSlides - 1);
      if (currentSlide < totalSlides - 1 && edgeNextTitle) {
        edgeNextTitle.textContent = slideTitles[currentSlide + 1];
      }
    }
    if (dockPrevTitle) {
      dockPrevTitle.textContent = currentSlide > 0 ? slideTitles[currentSlide - 1] : 'Cover';
    }
    if (dockNextTitle) {
      dockNextTitle.textContent = currentSlide < totalSlides - 1 ? slideTitles[currentSlide + 1] : 'Kontak';
    }

    // Update Story Segment Bars
    storySegments.forEach((seg, idx) => {
      seg.classList.remove('active', 'completed');
      if (idx < currentSlide) {
        seg.classList.add('completed');
      } else if (idx === currentSlide) {
        seg.classList.add('active');
      }
    });

    // Mobile Haptic feedback on slide change
    if (navigator.vibrate) {
      navigator.vibrate(8);
    }

    // Animate stats when on slide 0 or slide 6
    if (currentSlide === 0 || currentSlide === 6) {
      triggerNumberCounters();
    }

    // Trigger celebratory gold sparkles when viewing Mega Viral (slide 6)
    if (currentSlide === 6 && typeof window.triggerSparkleBurst === 'function') {
      window.triggerSparkleBurst(window.innerWidth / 2, window.innerHeight * 0.35, 22);
    }

    // Pause video if moving away from slide 7 (Video slide)
    if (currentSlide !== 7 && video && !video.paused) {
      video.pause();
    }
  }
  window.goToSlide = goToSlide;

  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    } else if (isAutoplay) {
      goToSlide(0);
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  // Mobile Tap Zones (Left 18% = Prev, Right 18% = Next)
  if (tapLeft) tapLeft.addEventListener('click', prevSlide);
  if (tapRight) tapRight.addEventListener('click', nextSlide);

  // Nav menu buttons
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const slideIndex = parseInt(link.getAttribute('data-slide'), 10);
      goToSlide(slideIndex);
    });
  });

  // ---------------------------------------------------------
  // 5. Keyboard Navigation
  // ---------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
      return;
    }

    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  // ---------------------------------------------------------
  // 6. Touch Gestures & Movable Pagination Dock (Versi Mobile & Desktop)
  // - Swipe ganti halaman layar telah dimatikan agar card bisa bebas di-scroll.
  // - Tombol paginasi dock (< 01/10 > Chat) kini BISA DI-PINDAH-PINDAH / DRAGGABLE
  //   secara leluasa ke posisi mana pun di layar agar tidak menghalangi foto/konten.
  // - Double-tap / double-click pada grip atau counter akan me-reset dock ke tengah bawah.
  // ---------------------------------------------------------
  const deckControls = document.getElementById('deckControls');
  const dockDragHandle = document.getElementById('dockDragHandle');

  if (deckControls) {
    let isDragging = false;
    let isPointerDown = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;
    let hasMoved = false;
    let currentPointerId = null;
    const DRAG_THRESHOLD = 6;

    // Restore saved dock position if available
    try {
      const savedPos = sessionStorage.getItem('sharma_dock_pos');
      if (savedPos) {
        const { x, y } = JSON.parse(savedPos);
        const rect = deckControls.getBoundingClientRect();
        const minX = 8;
        const maxX = window.innerWidth - rect.width - 8;
        const minY = 56;
        const maxY = window.innerHeight - rect.height - 8;

        if (maxX > minX && maxY > minY) {
          const clampedX = Math.max(minX, Math.min(x, maxX));
          const clampedY = Math.max(minY, Math.min(y, maxY));
          deckControls.classList.add('is-dragged');
          deckControls.style.setProperty('left', `${clampedX}px`, 'important');
          deckControls.style.setProperty('top', `${clampedY}px`, 'important');
          deckControls.style.setProperty('bottom', 'auto', 'important');
          deckControls.style.setProperty('transform', 'none', 'important');
        }
      }
    } catch (e) {}

    // Pointer events for dragging
    deckControls.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      isPointerDown = true;
      hasMoved = false;
      isDragging = false;
      startX = e.clientX;
      startY = e.clientY;
      currentPointerId = e.pointerId;

      const rect = deckControls.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;

      try {
        deckControls.setPointerCapture(e.pointerId);
      } catch (err) {}
    });

    deckControls.addEventListener('pointermove', (e) => {
      if (!isPointerDown) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!isDragging && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
        isDragging = true;
        hasMoved = true;
        deckControls.classList.add('is-dragging', 'is-dragged');
        if (navigator.vibrate) {
          try { navigator.vibrate(8); } catch (v) {}
        }
      }

      if (isDragging) {
        e.preventDefault();
        const rect = deckControls.getBoundingClientRect();
        const dockW = rect.width;
        const dockH = rect.height;

        const targetX = initialLeft + dx;
        const targetY = initialTop + dy;

        const minX = 8;
        const maxX = window.innerWidth - dockW - 8;
        const minY = 56; // below header navbar
        const maxY = window.innerHeight - dockH - 8;

        const clampedX = Math.max(minX, Math.min(targetX, maxX));
        const clampedY = Math.max(minY, Math.min(targetY, maxY));

        deckControls.style.setProperty('left', `${clampedX}px`, 'important');
        deckControls.style.setProperty('top', `${clampedY}px`, 'important');
        deckControls.style.setProperty('bottom', 'auto', 'important');
        deckControls.style.setProperty('transform', 'none', 'important');
      }
    });

    const finishDrag = (e) => {
      if (!isPointerDown) return;
      isPointerDown = false;

      if (isDragging) {
        isDragging = false;
        deckControls.classList.remove('is-dragging');

        try {
          if (currentPointerId !== null) {
            deckControls.releasePointerCapture(currentPointerId);
          }
        } catch (err) {}

        const rect = deckControls.getBoundingClientRect();
        try {
          sessionStorage.setItem('sharma_dock_pos', JSON.stringify({
            x: Math.round(rect.left),
            y: Math.round(rect.top)
          }));
        } catch (err) {}

        setTimeout(() => {
          hasMoved = false;
        }, 120);
      }
    };

    deckControls.addEventListener('pointerup', finishDrag);
    deckControls.addEventListener('pointercancel', finishDrag);

    // Suppress click event on child buttons if drag just happened
    deckControls.addEventListener('click', (e) => {
      if (hasMoved) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);

    // Reset function
    const resetDockPosition = () => {
      deckControls.classList.remove('is-dragged', 'is-dragging');
      deckControls.style.removeProperty('left');
      deckControls.style.removeProperty('top');
      deckControls.style.removeProperty('bottom');
      deckControls.style.removeProperty('transform');
      try { sessionStorage.removeItem('sharma_dock_pos'); } catch (e) {}
      if (navigator.vibrate) {
        try { navigator.vibrate([10, 30, 10]); } catch (v) {}
      }
    };

    if (dockDragHandle) {
      dockDragHandle.addEventListener('dblclick', resetDockPosition);
    }
    const slideCounter = deckControls.querySelector('.slide-counter');
    if (slideCounter) {
      slideCounter.addEventListener('dblclick', resetDockPosition);
    }

    // Touch double-tap detector on mobile
    let lastTap = 0;
    deckControls.addEventListener('touchend', (e) => {
      if (hasMoved) return;
      const now = Date.now();
      if (now - lastTap < 320) {
        const isInteractiveBtn = e.target.closest('button, a');
        if (!isInteractiveBtn) {
          resetDockPosition();
        }
      }
      lastTap = now;
    });

    // Re-clamp position on window resize or orientation flip
    window.addEventListener('resize', () => {
      if (!deckControls.classList.contains('is-dragged')) return;
      const rect = deckControls.getBoundingClientRect();
      const minX = 8;
      const maxX = window.innerWidth - rect.width - 8;
      const minY = 56;
      const maxY = window.innerHeight - rect.height - 8;

      if (rect.left > maxX || rect.top > maxY || rect.left < minX || rect.top < minY) {
        const clampedX = Math.max(minX, Math.min(rect.left, maxX));
        const clampedY = Math.max(minY, Math.min(rect.top, maxY));
        deckControls.style.setProperty('left', `${clampedX}px`, 'important');
        deckControls.style.setProperty('top', `${clampedY}px`, 'important');
      }
    });
  }

  // ---------------------------------------------------------
  // 7. View Mode Toggle (Deck Mode vs Web Scroll Mode)
  // ---------------------------------------------------------
  viewToggleBtn.addEventListener('click', () => {
    const isDeck = document.body.classList.contains('deck-mode');
    if (isDeck) {
      document.body.classList.remove('deck-mode');
      document.body.classList.add('scroll-mode');
      viewToggleText.textContent = 'Mode Slide';
      viewToggleBtn.title = 'Ganti ke Mode Presentasi Slide';
      const target = document.getElementById(`slide-${currentSlide}`);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.body.classList.remove('scroll-mode');
      document.body.classList.add('deck-mode');
      viewToggleText.textContent = 'Mode Web';
      viewToggleBtn.title = 'Ganti ke Mode Web Scroll';
      goToSlide(currentSlide);
    }
  });

  // Scroll Mode Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    if (!document.body.classList.contains('scroll-mode')) return;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = parseInt(entry.target.getAttribute('data-index'), 10);
        currentSlide = idx;
        currentSlideNum.textContent = formatNum(currentSlide + 1);
        navLinks.forEach((link, i) => link.classList.toggle('active', i === currentSlide));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
        storySegments.forEach((seg, i) => {
          seg.classList.remove('active', 'completed');
          if (i < currentSlide) seg.classList.add('completed');
          else if (i === currentSlide) seg.classList.add('active');
        });
      }
    });
  }, { threshold: 0.35 });

  slides.forEach(slide => observer.observe(slide));

  // ---------------------------------------------------------
  // 8. Autoplay Slides Feature
  // ---------------------------------------------------------
  autoplayBtn.addEventListener('click', () => {
    isAutoplay = !isAutoplay;
    if (isAutoplay) {
      autoplayIcon.className = 'fa-solid fa-pause';
      autoplayBtn.classList.add('active');
      autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
    } else {
      stopAutoplay();
    }
  });

  function stopAutoplay() {
    isAutoplay = false;
    autoplayIcon.className = 'fa-solid fa-play';
    autoplayBtn.classList.remove('active');
    if (autoplayInterval) clearInterval(autoplayInterval);
  }

  // Fullscreen Deck Mode
  if (fullscreenDeckBtn) {
    fullscreenDeckBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.log(err));
      } else {
        document.exitFullscreen().catch(err => console.log(err));
      }
    });
  }

  // ---------------------------------------------------------
  // 9. Interactive Mouse-Tracking Gradient Glow on Cards
  // ---------------------------------------------------------
  const glowCards = document.querySelectorAll('.interactive-glow-card');
  glowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // ---------------------------------------------------------
  // 10. Particle Canvas (Floating Petals & Click Sparkles)
  // ---------------------------------------------------------
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const MAX_PETALS = 24;

    class Petal {
      constructor(x, y, isBurst = false) {
        this.x = x !== undefined ? x : Math.random() * width;
        this.y = y !== undefined ? y : Math.random() * -height;
        this.size = Math.random() * 8 + 6;
        this.speedX = isBurst ? (Math.random() - 0.5) * 6 : Math.random() * 1.5 - 0.5;
        this.speedY = isBurst ? (Math.random() - 0.5) * 6 : Math.random() * 1.2 + 0.6;
        this.angle = Math.random() * Math.PI * 2;
        this.angularSpeed = (Math.random() - 0.5) * 0.03;
        this.opacity = isBurst ? 1 : Math.random() * 0.4 + 0.3;
        this.isBurst = isBurst;
        this.life = isBurst ? 45 : Infinity;

        const isDark = document.body.classList.contains('dark-theme');
        const colors = isDark 
          ? ['#FF758C', '#FFAAA6', '#FF6584', '#F4B279', '#D97D8A'] 
          : ['#FFC0CB', '#F4C2C2', '#D97D8A', '#FFAAA6', '#FFD1DC'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.angularSpeed;

        if (this.isBurst) {
          this.speedX *= 0.94;
          this.speedY *= 0.94;
          this.life--;
          this.opacity = this.life / 45;
        } else {
          if (this.y > height + 20) {
            this.y = -20;
            this.x = Math.random() * width;
          }
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.globalAlpha = Math.max(0, this.opacity);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < MAX_PETALS; i++) {
      particles.push(new Petal());
    }

    // Expose global sparkle burst for celebratory moments
    window.triggerSparkleBurst = function(x, y, count = 16) {
      const originX = x !== undefined ? x : width / 2;
      const originY = y !== undefined ? y : height / 2;
      for (let i = 0; i < count; i++) {
        particles.push(new Petal(originX, originY, true));
      }
    };

    // Sparkle burst on mouse click or touch
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      for (let i = 0; i < 8; i++) {
        particles.push(new Petal(e.clientX, e.clientY, true));
      }
    });

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.isBurst && p.life <= 0) {
          particles.splice(i, 1);
        }
      }
      requestAnimationFrame(renderParticles);
    }
    renderParticles();
  }

  // ---------------------------------------------------------
  // 11. Dynamic Number Counter Animation
  // ---------------------------------------------------------
  function triggerNumberCounters() {
    const counters = document.querySelectorAll('.counter-anim');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const duration = 1600;
      const startTime = performance.now();

      function updateCounter(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(ease * target);

        if (target >= 1000000) {
          counter.textContent = (current / 1000000).toFixed(1) + 'M+';
        } else if (target >= 1000) {
          if (target % 1000 !== 0 && target < 100000) {
            counter.textContent = (current / 1000).toFixed(1) + 'K+';
          } else {
            counter.textContent = Math.floor(current / 1000) + 'K+';
          }
        } else {
          counter.textContent = current;
        }

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }
      requestAnimationFrame(updateCounter);
    });
  }

  // ---------------------------------------------------------
  // 12. Custom Video Player Controls
  // ---------------------------------------------------------
  if (video) {
    function togglePlay() {
      if (video.paused) {
        video.play();
        stopAutoplay();
      } else {
        video.pause();
      }
    }

    if (playBtn) playBtn.addEventListener('click', togglePlay);
    if (miniPlayBtn) miniPlayBtn.addEventListener('click', togglePlay);
    if (videoOverlay) videoOverlay.addEventListener('click', togglePlay);

    video.addEventListener('play', () => {
      videoOverlay.classList.add('hidden');
      if (miniPlayBtn) miniPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    });

    video.addEventListener('pause', () => {
      videoOverlay.classList.remove('hidden');
      if (miniPlayBtn) miniPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    });

    video.addEventListener('timeupdate', () => {
      if (video.duration) {
        const percent = (video.currentTime / video.duration) * 100;
        if (progressFilled) progressFilled.style.width = `${percent}%`;
      }
    });

    if (progressBar) {
      progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * video.duration;
      });
    }

    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted 
          ? '<i class="fa-solid fa-volume-xmark"></i>' 
          : '<i class="fa-solid fa-volume-high"></i>';
      });
    }

    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        }
      });
    }
  }

  // ---------------------------------------------------------
  // 13. Lightbox Modal Image Preview
  // ---------------------------------------------------------
  window.openLightbox = function(imageSrc, captionText) {
    lightboxImage.src = imageSrc;
    lightboxCaption.textContent = captionText || '';
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
  };

  window.closeLightbox = function() {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
  };

  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener('click', closeLightbox);
  }

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  // ---------------------------------------------------------
  // 14. WhatsApp Link & Quick Contact Form Handler
  // ---------------------------------------------------------
  window.openWhatsApp = function(prefilledText) {
    const encoded = encodeURIComponent(prefilledText);
    window.open(`https://wa.me/${TARGET_WHATSAPP}?text=${encoded}`, '_blank');
  };

  window.handleFormSubmit = function(event) {
    event.preventDefault();
    const name = document.getElementById('senderName').value.trim();
    const service = document.getElementById('serviceType').value;
    const brief = document.getElementById('messageBrief').value.trim();

    let message = `Halo Sharma Dian Safitri, perkenalkan saya *${name}*.\n\n`;
    message += `Saya tertarik untuk konsultasi / order layanan: *${service}*.\n`;
    if (brief) {
      message += `Detail kebutuhan:\n"${brief}"\n\n`;
    }
    message += `Mohon info ketersediaan jadwal dan pricelist-nya ya. Terima kasih!`;

    openWhatsApp(message);
  };

  // Check URL hash on initial load
  checkUrlSlide();
});
