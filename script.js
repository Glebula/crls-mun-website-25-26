// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Scroll reveal interaction
const revealEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('show');
  });
}, { threshold: 0.12 });

revealEls.forEach(el => obs.observe(el));

// Committee photo slideshow (random order)
(function() {
  const container = document.getElementById('committee-slideshow');
  if (!container) return;

  const photos = [
    '630109026_18077159162361694_8054569595624198074_n.jpeg',
    'AAD_3600.jpg',
    'BridgeMUN (112 of 147).jpg',
    'BridgeMUN (114 of 147).jpg',
    'BridgeMUN (115 of 147).jpg',
    'BridgeMUN (139 of 147).jpg',
    'BridgeMUN (145 of 147).jpg',
    'BridgeMUN (29 of 147).jpg',
    'BridgeMUN (38 of 147).jpg',
    'BridgeMUN (4 of 147).jpg',
    'BridgeMUN (7 of 147).jpg',
    'IMG2518468206686349287.jpg',
    'IMG3745767816093940670.jpg',
    'IMG640698629215015412.jpg',
    'IMG8675139148400310192.jpg',
    'IMG_2671.JPG',
    'IMG_2723.JPG',
    'IMG_2765.JPG',
    'IMG_2805.JPG',
    'IMG_2836.JPG',
    'IMG_3444.JPG',
    'IMG_3552.JPG',
    'IMG_3573.JPG',
    'IMG_3586.JPG',
    'IMG_3636.jpg',
    'IMG_3674.jpg',
    'IMG_3695.jpg',
    'IMG_3854.jpg',
    'calderplacard.JPG',
    'sonandkorreysmile.JPG'
  ];

  // Fisher-Yates shuffle
  for (let i = photos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [photos[i], photos[j]] = [photos[j], photos[i]];
  }

  const basePath = 'images/committee-photos/';
  let current = 0;

  // Create all img elements
  container.innerHTML = '';
  photos.forEach(function(name, idx) {
    const img = document.createElement('img');
    img.className = 'slideshow-img' + (idx === 0 ? ' active' : '');
    img.src = basePath + encodeURIComponent(name);
    img.alt = 'Committee photo';
    img.loading = idx < 2 ? 'eager' : 'lazy';
    container.appendChild(img);
  });

  const imgs = container.querySelectorAll('.slideshow-img');
  const counter = document.getElementById('slide-counter');

  function updateCounter() {
    if (counter) counter.textContent = (current + 1) + ' / ' + photos.length;
  }
  updateCounter();

  function goTo(idx) {
    imgs[current].classList.remove('active');
    current = (idx + photos.length) % photos.length;
    imgs[current].classList.add('active');
    updateCounter();
  }

  var prevBtn = document.getElementById('slide-prev');
  var nextBtn = document.getElementById('slide-next');
  if (prevBtn) prevBtn.addEventListener('click', function() { goTo(current - 1); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', function() { goTo(current + 1); resetAuto(); });

  // Auto-advance every 4 seconds
  var autoTimer = setInterval(function() { goTo(current + 1); }, 4000);
  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(function() { goTo(current + 1); }, 4000);
  }
})();

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
