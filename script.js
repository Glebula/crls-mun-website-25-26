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

// Portrait images that need object-fit:contain instead of cover
var portraitPhotos = ['IMG8675139148400310192.jpg'];

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
    if (portraitPhotos.indexOf(name) !== -1) img.classList.add('portrait');
    img.src = basePath + encodeURIComponent(name);
    img.alt = 'BridgeMUN conference photo';
    img.loading = idx < 2 ? 'eager' : 'lazy';
    banner.insertBefore(img, overlay);
  });

  var imgs = banner.querySelectorAll('img');
  var timer;

  function goTo(next) {
    imgs[current].classList.remove('active');
    current = ((next % photos.length) + photos.length) % photos.length;
    imgs[current].classList.add('active');
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(function() { goTo(current + 1); }, 4000);
  }

  var prevBtn = banner.querySelector('.banner-prev');
  var nextBtn = banner.querySelector('.banner-next');
  if (prevBtn) prevBtn.addEventListener('click', function() { goTo(current - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', function() { goTo(current + 1); startAuto(); });

  startAuto();
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
      if (portraitPhotos.indexOf(name) !== -1) img.classList.add('portrait');
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

// Committee filter toggle
(function() {
  var btns = document.querySelectorAll('.filter-btn');
  if (!btns.length) return;
  var cards = document.querySelectorAll('.cards .card[data-type]');

  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      btns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');

      cards.forEach(function(card) {
        if (filter === 'all' || card.getAttribute('data-type') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

// Collapsible section toggle
document.querySelectorAll('.collapsible-heading').forEach(function(heading) {
  var content = heading.nextElementSibling;
  if (!content || !content.classList.contains('collapsible-content')) return;
  heading.addEventListener('click', function() {
    var collapsed = heading.classList.toggle('collapsed');
    content.classList.toggle('collapsed');
    heading.setAttribute('aria-expanded', String(!collapsed));
  });
  heading.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); heading.click(); }
  });
});

// Sticky register button with smooth animation
(function() {
  var btn = document.getElementById('register-btn');
  if (!btn) return;
  var parent = btn.parentElement;
  var placeholder = document.createElement('div');
  placeholder.style.display = 'none';

  var progress = 0; // 0 = inline, 1 = corner
  var direction = 0; // 1 = going to corner, -1 = going back, 0 = idle
  var speed = 1 / (2 * 60); // 2 seconds at 60fps
  var isDetached = false;
  var rafId = null;

  var cornerBottom = 28;
  var cornerRight = 28;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function detach() {
    if (isDetached) return;
    var rect = btn.getBoundingClientRect();
    placeholder.style.display = 'inline-block';
    placeholder.style.width = rect.width + 'px';
    placeholder.style.height = rect.height + 'px';
    parent.insertBefore(placeholder, btn);
    document.body.appendChild(btn);
    isDetached = true;
  }

  function reattach() {
    if (!isDetached) return;
    btn.classList.remove('flying', 'sticky');
    btn.style.top = '';
    btn.style.left = '';
    btn.style.fontSize = '';
    btn.style.padding = '';
    parent.insertBefore(btn, placeholder);
    placeholder.style.display = 'none';
    isDetached = false;
  }

  function applyPosition(t) {
    var e = easeInOutCubic(t);
    var phRect = placeholder.getBoundingClientRect();
    var startX = phRect.left + phRect.width / 2;
    var startY = phRect.top + phRect.height / 2;
    var endX = window.innerWidth - cornerRight - 90;
    var endY = window.innerHeight - cornerBottom - 26;

    var x = lerp(startX, endX, e);
    var y = lerp(startY, endY, e);
    var fontSize = lerp(1.5, 1, e);
    var padV = lerp(22, 14, e);
    var padH = lerp(56, 32, e);

    btn.style.fontSize = fontSize + 'rem';
    btn.style.padding = padV + 'px ' + padH + 'px';

    var btnW = btn.offsetWidth;
    var btnH = btn.offsetHeight;
    btn.style.left = (x - btnW / 2) + 'px';
    btn.style.top = (y - btnH / 2) + 'px';
  }

  function animate() {
    progress += direction * speed;

    if (progress >= 1) {
      progress = 1;
      direction = 0;
      btn.classList.remove('flying');
      btn.classList.add('sticky');
      btn.style.top = '';
      btn.style.left = '';
      btn.style.fontSize = '';
      btn.style.padding = '';
      rafId = null;
      return;
    }

    if (progress <= 0) {
      progress = 0;
      direction = 0;
      reattach();
      rafId = null;
      return;
    }

    btn.classList.add('flying');
    btn.classList.remove('sticky');
    applyPosition(progress);
    rafId = requestAnimationFrame(animate);
  }

  function startAnimation(dir) {
    direction = dir;
    if (dir === 1) detach();
    if (!rafId) rafId = requestAnimationFrame(animate);
  }

  function check() {
    var rect = parent.getBoundingClientRect();
    var gone = rect.bottom < -20;
    if (gone && direction !== 1 && progress < 1) {
      startAnimation(1);
    } else if (!gone && direction !== -1 && progress > 0) {
      if (progress === 1) {
        btn.classList.remove('sticky');
        btn.classList.add('flying');
        btn.style.fontSize = '1rem';
        btn.style.padding = '14px 32px';
        applyPosition(progress);
      }
      startAnimation(-1);
    }
  }

  window.addEventListener('scroll', check, {passive: true});
  check();
})();

// Confetti burst on load
(function() {
  var container = document.getElementById('confetti');
  if (!container) return;
  var colors = ['#2563eb','#7c3aed','#f59e0b','#10b981','#ef4444','#ec4899','#06b6d4'];
  var shapes = ['circle','square','triangle'];
  function burst(count) {
    for (var i = 0; i < count; i++) {
      var el = document.createElement('div');
      el.className = 'confetti-piece';
      var color = colors[Math.floor(Math.random() * colors.length)];
      var shape = shapes[Math.floor(Math.random() * shapes.length)];
      var size = 6 + Math.random() * 10;
      el.style.left = Math.random() * 100 + '%';
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.background = color;
      el.style.animationDuration = (2.5 + Math.random() * 3) + 's';
      el.style.animationDelay = (Math.random() * 2) + 's';
      if (shape === 'circle') el.style.borderRadius = '50%';
      else if (shape === 'triangle') {
        el.style.background = 'transparent';
        el.style.width = '0'; el.style.height = '0';
        el.style.borderLeft = (size/2) + 'px solid transparent';
        el.style.borderRight = (size/2) + 'px solid transparent';
        el.style.borderBottom = size + 'px solid ' + color;
      }
      container.appendChild(el);
    }
    setTimeout(function() { container.innerHTML = ''; }, 6000);
  }
  burst(50);
})();

// FAQ flip cards
document.querySelectorAll('.faq-flip-card').forEach(function(card) {
  card.addEventListener('click', function() {
    card.classList.toggle('flipped');
  });
});

// Policy tabs
(function() {
  var tabBtns = document.querySelectorAll('.tab-btn[data-tab]');
  if (!tabBtns.length) return;
  var panels = document.querySelectorAll('.tab-panel');

  function activate(tabId) {
    tabBtns.forEach(function(b) { b.classList.toggle('active', b.getAttribute('data-tab') === tabId); });
    panels.forEach(function(p) { p.classList.toggle('active', p.id === tabId); });
  }

  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      activate(btn.getAttribute('data-tab'));
    });
  });

  var hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) {
    activate(hash);
  }
})();

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
