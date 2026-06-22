/* ═══════════════════════════════════════
   GODSON MORAIS — PORTFOLIO JS
═══════════════════════════════════════ */

// ── TYPEWRITER EFFECT ──
const phrases = [
  'python manage.py runserver',
  'building REST APIs with Django',
  'Django ORM query optimization',
  'Excel → MySQL data pipelines',
  'deploying to PythonAnywhere',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter');

function typewrite() {
  if (!typeEl) return;
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typeEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
  let speed = isDeleting ? 40 : 80;
  if (!isDeleting && charIndex === current.length) {
    speed = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }
  setTimeout(typewrite, speed);
}
typewrite();

// ── NAVBAR SCROLL ──
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// ── SMOOTH ACTIVE NAV ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

// ── REVEAL ON SCROLL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal-card').forEach(el => revealObserver.observe(el));

// ── CONTACT FORM ──
async function sendMessage() {
  const name    = document.getElementById('f-name').value.trim();
  const email   = document.getElementById('f-email').value.trim();
  const message = document.getElementById('f-message').value.trim();
  const btn     = document.getElementById('send-btn');

  if (!name || !email || !message) {
    shakeForm();
    return;
  }
  if (!isValidEmail(email)) {
    shakeForm();
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending…';

  try {
    const res = await fetch('/contact/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': getCookie('csrftoken') },
      body: JSON.stringify({ name, email, message }),
    });
    const data = await res.json();
    if (data.status === 'success') {
      document.getElementById('contact-form').classList.add('d-none');
      document.getElementById('form-success').classList.remove('d-none');
    } else {
      resetBtn(btn);
    }
  } catch (e) {
    // fallback — show mailto link
    window.location.href = `mailto:godsonmorais1606@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
    resetBtn(btn);
  }
}

function resetBtn(btn) {
  btn.disabled = false;
  btn.innerHTML = 'Send Message <i class="bi bi-send ms-1"></i>';
}

function shakeForm() {
  const card = document.querySelector('.contact-form-card');
  card.style.animation = 'shake 0.4s ease';
  setTimeout(() => card.style.animation = '', 400);
}

function isValidEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function getCookie(name) {
  let cv = null;
  if (document.cookie && document.cookie !== '') {
    document.cookie.split(';').forEach(c => {
      const t = c.trim();
      if (t.startsWith(name + '=')) cv = decodeURIComponent(t.slice(name.length + 1));
    });
  }
  return cv;
}

// Add shake keyframe dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
@keyframes shake {
  0%,100%{transform:translateX(0)}
  25%{transform:translateX(-8px)}
  75%{transform:translateX(8px)}
}`;
document.head.appendChild(styleSheet);

// ── COLLAPSE NAVBAR ON MOBILE LINK CLICK ──
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const toggler = document.querySelector('.navbar-toggler');
    const menu = document.getElementById('navMenu');
    if (menu.classList.contains('show')) toggler.click();
  });
});
