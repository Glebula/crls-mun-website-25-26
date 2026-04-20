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
  var isSticky = false;
  var animating = false;

  var targetBottom = 28;
  var targetRight = 28;

  function clearStyles() {
    btn.style.top = '';
    btn.style.left = '';
    btn.style.right = '';
    btn.style.bottom = '';
    btn.style.fontSize = '';
    btn.style.padding = '';
  }

  function animateToCorner() {
    var rect = btn.getBoundingClientRect();
    placeholder.style.display = 'inline-block';
    placeholder.style.width = rect.width + 'px';
    placeholder.style.height = rect.height + 'px';
    parent.insertBefore(placeholder, btn);
    document.body.appendChild(btn);

    btn.classList.add('animating');
    btn.style.top = rect.top + 'px';
    btn.style.left = rect.left + 'px';
    btn.style.fontSize = '1.5rem';
    btn.style.padding = '22px 56px';

    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        var endTop = window.innerHeight - targetBottom - 52;
        var endLeft = window.innerWidth - targetRight - 180;
        btn.style.top = endTop + 'px';
        btn.style.left = endLeft + 'px';
        btn.style.fontSize = '1rem';
        btn.style.padding = '14px 32px';

        setTimeout(function() {
          btn.classList.remove('animating');
          btn.classList.add('sticky');
          clearStyles();
          isSticky = true;
          animating = false;
        }, 1050);
      });
    });
  }

  function animateToOriginal() {
    btn.classList.remove('sticky');
    clearStyles();
    parent.insertBefore(btn, placeholder);
    placeholder.style.display = 'none';
    isSticky = false;
    animating = false;
  }

  function check() {
    if (animating) return;
    var rect = parent.getBoundingClientRect();
    var gone = rect.bottom < -20;
    if (gone && !isSticky) {
      animating = true;
      animateToCorner();
    } else if (!gone && isSticky) {
      animating = true;
      animateToOriginal();
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

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
