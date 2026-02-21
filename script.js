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

// Banner photo slideshow (random order, auto-advance)
(function() {
  var banner = document.getElementById('banner-slideshow');
  if (!banner) return;

  var photos = [
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
  for (var i = photos.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = photos[i]; photos[i] = photos[j]; photos[j] = tmp;
  }

  var basePath = 'images/committee-photos/';
  var current = 0;

  // Insert images before the overlay
  var overlay = banner.querySelector('.banner-overlay');
  photos.forEach(function(name, idx) {
    var img = document.createElement('img');
    img.className = idx === 0 ? 'active' : '';
    img.src = basePath + encodeURIComponent(name);
    img.alt = 'BridgeMUN conference photo';
    img.loading = idx < 2 ? 'eager' : 'lazy';
    banner.insertBefore(img, overlay);
  });

  var imgs = banner.querySelectorAll('img');

  setInterval(function() {
    imgs[current].classList.remove('active');
    current = (current + 1) % photos.length;
    imgs[current].classList.add('active');
  }, 4000);
})();

// Mini slideshows on sub-pages (all 6 sub-pages, 5 unique photos each)
(function() {
  var photoSets = {
    committees: [
      '630109026_18077159162361694_8054569595624198074_n.jpeg',
      'AAD_3600.jpg',
      'BridgeMUN (112 of 147).jpg',
      'BridgeMUN (114 of 147).jpg',
      'BridgeMUN (115 of 147).jpg'
    ],
    schedule: [
      'BridgeMUN (139 of 147).jpg',
      'BridgeMUN (145 of 147).jpg',
      'BridgeMUN (29 of 147).jpg',
      'BridgeMUN (38 of 147).jpg',
      'BridgeMUN (4 of 147).jpg'
    ],
    policies: [
      'BridgeMUN (7 of 147).jpg',
      'IMG2518468206686349287.jpg',
      'IMG3745767816093940670.jpg',
      'IMG640698629215015412.jpg',
      'IMG8675139148400310192.jpg'
    ],
    register: [
      'IMG_2671.JPG',
      'IMG_2723.JPG',
      'IMG_2765.JPG',
      'IMG_2805.JPG',
      'IMG_2836.JPG'
    ],
    secretariat: [
      'IMG_3444.JPG',
      'IMG_3552.JPG',
      'IMG_3573.JPG',
      'IMG_3586.JPG',
      'IMG_3636.jpg'
    ],
    faq: [
      'IMG_3674.jpg',
      'IMG_3695.jpg',
      'IMG_3854.jpg',
      'calderplacard.JPG',
      'sonandkorreysmile.JPG'
    ]
  };

  var basePath = 'images/committee-photos/';

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

  document.querySelectorAll('.mini-slideshow').forEach(function(el) {
    var key = el.getAttribute('data-slideshow');
    var photos = photoSets[key];
    if (!photos) return;

    photos = shuffle(photos.slice());
    var current = 0;

    photos.forEach(function(name, idx) {
      var img = document.createElement('img');
      img.className = idx === 0 ? 'active' : '';
      img.src = basePath + encodeURIComponent(name);
      img.alt = 'BridgeMUN conference photo';
      img.loading = idx < 2 ? 'eager' : 'lazy';
      el.appendChild(img);
    });

    var imgs = el.querySelectorAll('img');
    setInterval(function() {
      imgs[current].classList.remove('active');
      current = (current + 1) % photos.length;
      imgs[current].classList.add('active');
    }, 3500);
  });
})();

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
