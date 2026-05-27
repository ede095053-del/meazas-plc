// ===== HERO SLIDER =====
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}
function changeSlide(dir) { goToSlide(currentSlide + dir); }
setInterval(() => changeSlide(1), 5000);

// ===== MOBILE NAV =====
const mobileNav = document.getElementById('mobileNav');
document.getElementById('mobileMenuBtn').addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});
function closeMobileNav() { mobileNav.classList.remove('open'); }

// ===== SEARCH BAR =====
document.getElementById('searchToggle').addEventListener('click', () => {
  document.getElementById('searchBar').classList.toggle('open');
  if (document.getElementById('searchBar').classList.contains('open')) {
    document.getElementById('searchInput').focus();
  }
});

// ===== STICKY HEADER SHADOW =====
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  header.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(0,0,0,0.12)' : '';
});

// ===== CART =====
let cartCount = 0;
const badge = document.querySelector('.badge');
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    cartCount++;
    badge.textContent = cartCount;
    const orig = btn.textContent;
    btn.textContent = '✓ Added!';
    btn.style.background = '#16a34a';
    btn.style.borderColor = '#16a34a';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      btn.style.borderColor = '';
    }, 1600);
  });
});

// ===== CATEGORY CARDS — click to filter =====
document.querySelectorAll('.category-card[data-filter]').forEach(card => {
  card.addEventListener('click', () => {
    const filter = card.dataset.filter;
    // scroll to products section
    const section = document.getElementById('products');
    const top = section.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
    // activate the matching filter button
    setTimeout(() => {
      const btn = document.querySelector(`.product-filter-bar .filter-btn[onclick*="'${filter}'"]`);
      if (btn) filterProducts(filter, btn);
    }, 400);
  });
});

// ===== PRODUCT FILTER =====
function filterProducts(cat, btn) {
  // update active button
  document.querySelectorAll('.product-filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const allCards = document.querySelectorAll('.product-card[data-category]');
  let visible = 0;
  allCards.forEach(card => {
    if (cat === 'all' || card.dataset.category === cat) {
      card.style.display = '';
      card.classList.add('revealed'); // ensure visible after filter
      visible++;
    } else {
      card.style.display = 'none';
    }
  });

  // update section heading
  const labels = {
    all: ['All Products', 'Showing all products'],
    cups: ['Paper Cups', 'All paper cup products'],
    foil: ['Foil Containers', 'All foil container products'],
    chemicals: ['Chemicals', 'Industrial & household chemical products'],
    vehicles: ['Vehicles', 'Commercial vehicles & fleet solutions'],
    food: ['Food Packaging', 'Food-safe packaging products'],
    industrial: ['Industrial', 'Industrial supplies & equipment'],
  };
  const [title, sub] = labels[cat] || ['Products', ''];
  const titleEl = document.getElementById('productsTitle');
  const subEl = document.getElementById('productsSubtitle');
  if (titleEl) titleEl.textContent = title;
  if (subEl) subEl.textContent = sub;

  // show/hide no-results
  document.getElementById('noResults').style.display = visible === 0 ? 'flex' : 'none';
}
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      closeMobileNav();
    }
  });
});

// ===== VACANCY FILTER =====
function filterJobs(dept, btn) {
  document.querySelectorAll('.vacancies-filter .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.vacancy-card').forEach(card => {
    if (dept === 'all' || card.dataset.dept === dept) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// ===== APPLY MODAL =====
function openApplyModal(jobTitle) {
  document.getElementById('modalJobTitle').textContent = jobTitle;
  document.getElementById('applyModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeApplyModal() {
  document.getElementById('applyModal').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('applyModal').addEventListener('click', e => {
  if (e.target === document.getElementById('applyModal')) closeApplyModal();
});
function submitApplication(e) {
  e.preventDefault();
  closeApplyModal();
  showToast('Application submitted! We\'ll be in touch within 2 business days.');
}

// ===== CONTACT FORM =====
function submitContact(e) {
  e.preventDefault();
  e.target.reset();
  showToast('Message sent! We\'ll get back to you shortly.');
}

// ===== NEWSLETTER =====
function subscribeNewsletter(e) {
  e.preventDefault();
  e.target.reset();
  showToast('Subscribed! Welcome to the Meazas P.L.C. community.');
}

// ===== TOAST NOTIFICATION =====
function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-check-circle"></i> ${msg}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ===== TOAST CSS (injected) =====
const toastStyle = document.createElement('style');
toastStyle.textContent = `
  .toast {
    position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%) translateY(20px);
    background: #1a1a2e; color: white; padding: 14px 24px; border-radius: 10px;
    font-size: 14px; font-weight: 500; display: flex; align-items: center; gap: 10px;
    box-shadow: 0 8px 28px rgba(0,0,0,0.2); opacity: 0; transition: all 0.35s; z-index: 9999;
    max-width: 90vw; text-align: center;
  }
  .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
  .toast i { color: #4ade80; font-size: 16px; }
`;
document.head.appendChild(toastStyle);

// ===== SCROLL REVEAL =====
// Only apply to non-product cards (product cards are always visible on load)
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.service-card, .shop-card, .vacancy-card, .testimonial-card, .feature-card, .category-card').forEach(el => {
  el.classList.add('reveal-on-scroll');
  revealObserver.observe(el);
});

// Product cards reveal immediately (they're above fold or near it)
document.querySelectorAll('.product-card').forEach(el => {
  el.classList.add('reveal-on-scroll', 'revealed');
});
