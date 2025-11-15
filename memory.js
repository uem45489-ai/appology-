// memory.js
// Image list - update filenames here if needed
const images = [
  { src: 'khushi_photo_rotated.jpg', text: "This moment still makes me smile — just being next to you felt so easy and right." },
  { src: 'IMG_0421.jpeg', text: "I love the quiet of this one — when the world slows and it's just us. I remember feeling so calm with you." },
  { src: 'IMG_5997.jpeg', text: "You laughed and I forgot everything else. Little things like that are everything to me." },
  { src: 'IMG_9775.jpeg', text: "You looked at me like that and my whole day was solved. I keep replaying this moment." }
];

let idx = 0;
let slider, captionEl, slides = [];

function createSlides() {
  slider = document.getElementById('slider');
  captionEl = document.getElementById('caption');

  images.forEach((img, i) => {
    const s = document.createElement('div');
    s.className = 'slide';
    s.setAttribute('data-index', i);

    const imageEl = document.createElement('img');
    imageEl.src = img.src;
    imageEl.alt = images[i].text || `Memory ${i+1}`;

    s.appendChild(imageEl);
    slider.appendChild(s);
    slides.push(s);
  });
}

function show(index) {
  idx = (index + slides.length) % slides.length;
  slides.forEach((s, i) => {
    if (i === idx) {
      s.classList.add('visible');
    } else {
      s.classList.remove('visible');
    }
  });
  captionEl.textContent = images[idx].text;
  // update aria-live for screen readers (small accessible cue)
  slider.setAttribute('aria-label', `Image ${idx+1} of ${slides.length}`);
}

// simple fade preloader
function preloadAll() {
  images.forEach(i => {
    const im = new Image();
    im.src = i.src;
  });
}

function next() { show(idx + 1); }
function prev() { show(idx - 1); }

function addControls() {
  document.getElementById('nextBtn').addEventListener('click', next);
  document.getElementById('prevBtn').addEventListener('click', prev);

  // keyboard
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // touch / swipe support
  let startX = 0;
  let dist = 0;
  slider.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  }, {passive:true});

  slider.addEventListener('touchmove', e => {
    dist = e.touches[0].clientX - startX;
  }, {passive:true});

  slider.addEventListener('touchend', () => {
    if (dist < -40) next();
    else if (dist > 40) prev();
    dist = 0;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  createSlides();
  preloadAll();
  addControls();
  show(0);

  // small auto-play after idle (optional) - will pause when user interacts
  let autoplay = setInterval(next, 8000);
  ['click','touchstart','mousemove','keydown'].forEach(ev => {
    document.addEventListener(ev, () => {
      clearInterval(autoplay);
      autoplay = null;
    }, {once:true});
  });
});
