/* ===== CUSTOM CURSOR ===== */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
let mouseX = 0, mouseY = 0, outlineX = 0, outlineY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateOutline() {
  outlineX += (mouseX - outlineX) * 0.15;
  outlineY += (mouseY - outlineY) * 0.15;
  cursorOutline.style.left = outlineX + 'px';
  cursorOutline.style.top = outlineY + 'px';
  requestAnimationFrame(animateOutline);
}
animateOutline();

document.querySelectorAll('.interactable, a, button').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ===== PRELOADER ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hidden');
    setTimeout(() => {
      document.querySelector('.hero').classList.add('loaded');
    }, 500);
  }, 1600);
});

/* ===== NAVBAR ===== */
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ===== PARALLAX ===== */
const heroBg = document.getElementById('heroBg');
const bannerBg = document.getElementById('bannerBg');

window.addEventListener('scroll', () => {
  const s = window.scrollY;
  if (heroBg) heroBg.style.transform = `translateY(${s * 0.35}px)`;
  if (bannerBg) {
    const rect = bannerBg.closest('.banner').getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      bannerBg.style.transform = `translateY(${rect.top * 0.25}px)`;
    }
  }
}, { passive: true });

/* ===== MOBILE MENU ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

/* ===== ACCORDION ===== */
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', function () {
    const item = this.parentElement;
    const content = this.nextElementSibling;
    const group = item.parentElement;

    // Close others in the same group
    group.querySelectorAll('.accordion-item.active').forEach(active => {
      if (active !== item) {
        active.classList.remove('active');
        active.querySelector('.accordion-content').style.maxHeight = null;
      }
    });

    item.classList.toggle('active');
    content.style.maxHeight = item.classList.contains('active')
      ? content.scrollHeight + 'px'
      : null;
  });
});

/* ===== SCROLL REVEAL ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('in-view');
      }, (entry.target.dataset.delay || 0) * 1000);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.fade-up').forEach((el, i) => {
  observer.observe(el);
});

/* ===== LIGHTBOX ===== */
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  img.src = src;
  lb.style.display = 'flex';
  requestAnimationFrame(() => lb.classList.add('active'));
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.remove('active');
  setTimeout(() => {
    lb.style.display = 'none';
    document.getElementById('lightboxImg').src = '';
    document.body.style.overflow = '';
  }, 400);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});
