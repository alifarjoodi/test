/* Featured stories for the About hero. Edit this array to change the slide copy,
   photograph, alt text and destination; the first entry also has an HTML fallback. */
(() => {
  const hero = document.querySelector('[data-hero-slideshow]');
  if (!hero) return;

  const slides = [
    {
      label: 'Our story',
      eyebrow: '01 / Our story',
      title: 'Welcome to HEROines Inc.\nA safe space and platform\nto help women master\nreal-life experiences.',
      description: 'A place for every woman to feel seen, heard and ready for what comes next.',
      image: 'images/hero.jpg',
      alt: 'Three women lying close together and looking at the camera',
      link: { label: 'Get to know us', href: '#about' }
    },
    {
      label: 'Community',
      eyebrow: '02 / Community',
      title: 'Come as you are.\nLeave more connected.',
      description: 'Honest conversations and shared experiences make room for all of us to grow.',
      image: 'images/community.jpg',
      alt: 'Three women laughing together over coffee at a cafe table',
      link: { label: 'Explore our events', href: 'events.html#upcoming' }
    },
    {
      label: 'Experiences',
      eyebrow: '03 / Experiences',
      title: 'Your next brave step\nstarts here.',
      description: 'Try something new, find your voice and celebrate every little win together.',
      image: 'images/workshop.jpg',
      alt: 'Women sharing ideas and smiling during a creative workshop',
      link: { label: "See what's on", href: 'events.html#upcoming' }
    }
  ];

  const photoPane = hero.querySelector('[data-slide-photos]');
  const content = hero.querySelector('[data-slide-content]');
  const eyebrow = hero.querySelector('[data-slide-eyebrow]');
  const title = hero.querySelector('[data-slide-title]');
  const description = hero.querySelector('[data-slide-description]');
  const link = hero.querySelector('[data-slide-link]');
  const linkLabel = hero.querySelector('[data-slide-link-label]');
  const controls = hero.querySelector('.hero-carousel');
  const pagination = hero.querySelector('[data-slide-pagination]');
  const toggle = hero.querySelector('[data-slide-toggle]');
  const status = hero.querySelector('[data-slide-status]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Each photo is loaded ahead of time, so changing slides never shows an empty frame.
  const images = [photoPane.querySelector('.hero__photo')];
  slides.slice(1).forEach((slide) => {
    const image = document.createElement('img');
    image.className = 'hero__photo';
    image.width = 1376;
    image.height = 768;
    image.alt = slide.alt;
    image.setAttribute('aria-hidden', 'true');
    image.decoding = 'async';
    image.src = slide.image;
    photoPane.append(image);
    images.push(image);
  });

  const ready = images.map((image) => {
    if (image.complete && image.naturalWidth) return Promise.resolve(true);
    if (image.decode) return image.decode().then(() => true, () => false);
    return new Promise((resolve) => {
      image.addEventListener('load', () => resolve(true), { once: true });
      image.addEventListener('error', () => resolve(false), { once: true });
    });
  });

  const dots = slides.map((slide, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'hero-carousel__dot';
    button.textContent = String(index + 1).padStart(2, '0');
    button.setAttribute('aria-label', `Show slide ${index + 1} of ${slides.length}: ${slide.label}`);
    button.setAttribute('aria-pressed', String(index === 0));
    button.addEventListener('click', () => choose(index));
    pagination.append(button);
    return button;
  });

  let activeIndex = 0;
  let requestedIndex = 0;
  let requestId = 0;
  let timer;
  let userPaused = false;
  let explicitPlay = false;
  const unavailable = new Set();

  function updateToggle() {
    const playing = !userPaused && !reducedMotion.matches;
    toggle.dataset.playing = String(playing);
    toggle.setAttribute('aria-label', playing ? 'Pause slideshow' : 'Play slideshow');
  }

  function schedule() {
    window.clearTimeout(timer);
    if (userPaused || reducedMotion.matches || document.hidden ||
        (!explicitPlay && (hero.matches(':hover') || hero.contains(document.activeElement)))) return;
    timer = window.setTimeout(() => advance(1, false), 7000);
  }

  function announce(index) {
    status.textContent = `Slide ${index + 1} of ${slides.length}: ${slides[index].label}. ${slides[index].title.replace(/\s+/g, ' ')}`;
  }

  async function show(index, requestedByUser) {
    window.clearTimeout(timer);
    const thisRequest = ++requestId;
    requestedIndex = index;

    if (index === activeIndex) {
      if (requestedByUser) announce(index);
      schedule();
      return;
    }

    const loaded = await ready[index];
    if (thisRequest !== requestId) return; // a newer click won while the photo loaded

    if (!loaded) {
      unavailable.add(index);
      dots[index].disabled = true;
      requestedIndex = activeIndex;
      if (requestedByUser) status.textContent = `${slides[index].label} photo could not be loaded.`;
      if (unavailable.size < slides.length - 1) advance(1, false);
      else { userPaused = true; explicitPlay = false; updateToggle(); }
      return;
    }

    const slide = slides[index];
    images[activeIndex].classList.remove('is-active');
    images[activeIndex].setAttribute('aria-hidden', 'true');
    images[index].classList.add('is-active');
    images[index].removeAttribute('aria-hidden');

    eyebrow.textContent = slide.eyebrow;
    title.textContent = slide.title;
    description.textContent = slide.description;
    link.href = slide.link.href;
    linkLabel.textContent = slide.link.label;

    content.classList.remove('is-revealing');
    void content.offsetWidth; // restart the short copy reveal on each new slide
    content.classList.add('is-revealing');

    activeIndex = index;
    dots.forEach((dot, dotIndex) => dot.setAttribute('aria-pressed', String(dotIndex === index)));
    if (requestedByUser) announce(index); // automatic changes do not interrupt screen readers
    schedule();
  }

  function advance(direction, requestedByUser) {
    for (let step = 1; step <= slides.length; step++) {
      const index = (requestedIndex + direction * step + slides.length * step) % slides.length;
      if (!unavailable.has(index)) {
        show(index, requestedByUser);
        return;
      }
    }
  }

  function choose(index) {
    userPaused = true; // manual navigation stays put until the visitor presses Play
    explicitPlay = false;
    updateToggle();
    show(index, true);
  }

  hero.querySelector('[data-slide-prev]').addEventListener('click', () => {
    userPaused = true;
    explicitPlay = false;
    updateToggle();
    advance(-1, true);
  });
  hero.querySelector('[data-slide-next]').addEventListener('click', () => {
    userPaused = true;
    explicitPlay = false;
    updateToggle();
    advance(1, true);
  });
  toggle.addEventListener('click', () => {
    userPaused = !userPaused;
    // Pressing Play is an intentional request to resume, even while the button
    // still has focus or the pointer is resting on it.
    explicitPlay = !userPaused;
    updateToggle();
    schedule();
  });

  hero.addEventListener('mouseenter', () => { explicitPlay = false; schedule(); });
  hero.addEventListener('mouseleave', schedule);
  hero.addEventListener('focusin', (event) => {
    if (event.target !== toggle) explicitPlay = false;
    schedule();
  });
  hero.addEventListener('focusout', () => window.setTimeout(schedule, 0));
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', () => { updateToggle(); schedule(); });

  updateToggle();
  controls.hidden = false;
  schedule();
})();
