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

// ===== ANIMATED STAT COUNTERS =====
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const isPlus = target.toString().includes('+');
  const num = parseInt(target.toString().replace(/[^0-9]/g, ''));
  const suffix = target.toString().replace(/[0-9]/g, '');
  const step = num / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= num) { start = num; clearInterval(timer); }
    el.textContent = Math.floor(start).toLocaleString() + suffix;
  }, 16);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const strong = e.target.querySelector('strong');
      if (strong && !strong.dataset.counted) {
        strong.dataset.counted = '1';
        animateCounter(strong, strong.textContent.trim());
      }
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-item').forEach(el => counterObserver.observe(el));

// ===== LIVE SEARCH =====
document.getElementById('searchInput').addEventListener('input', function () {
  const q = this.value.trim().toLowerCase();
  if (!q) {
    // restore all
    document.querySelectorAll('.product-card[data-category]').forEach(c => {
      c.style.display = '';
      c.classList.add('revealed');
    });
    document.getElementById('noResults').style.display = 'none';
    return;
  }
  // scroll to products
  const section = document.getElementById('products');
  const top = section.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: 'smooth' });

  let visible = 0;
  document.querySelectorAll('.product-card[data-category]').forEach(card => {
    const text = card.querySelector('h4').textContent.toLowerCase();
    if (text.includes(q)) {
      card.style.display = '';
      card.classList.add('revealed');
      visible++;
    } else {
      card.style.display = 'none';
    }
  });
  document.getElementById('noResults').style.display = visible === 0 ? 'flex' : 'none';
  // reset filter bar
  document.querySelectorAll('.product-filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
});

// ===== WISHLIST =====
let wishlist = JSON.parse(localStorage.getItem('meazas_wishlist') || '[]');
function updateWishlistBadge() {
  const heartBtn = document.querySelector('.icon-btn[aria-label="Wishlist"]');
  if (!heartBtn) return;
  let wb = heartBtn.querySelector('.wishlist-badge');
  if (wishlist.length > 0) {
    if (!wb) {
      wb = document.createElement('span');
      wb.className = 'badge wishlist-badge';
      heartBtn.appendChild(wb);
    }
    wb.textContent = wishlist.length;
  } else if (wb) {
    wb.remove();
  }
}
document.querySelectorAll('.product-card').forEach(card => {
  const title = card.querySelector('h4')?.textContent || '';
  const wrap = card.querySelector('.product-img-wrap');
  if (!wrap) return;
  const btn = document.createElement('button');
  btn.className = 'wishlist-btn';
  btn.setAttribute('aria-label', 'Add to wishlist');
  btn.innerHTML = '<i class="fas fa-heart"></i>';
  if (wishlist.includes(title)) btn.classList.add('active');
  btn.addEventListener('click', e => {
    e.stopPropagation();
    if (wishlist.includes(title)) {
      wishlist = wishlist.filter(i => i !== title);
      btn.classList.remove('active');
      showToast('Removed from wishlist');
    } else {
      wishlist.push(title);
      btn.classList.add('active');
      showToast('Added to wishlist ❤️');
    }
    localStorage.setItem('meazas_wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
  });
  wrap.appendChild(btn);
});
updateWishlistBadge();

// ===== DARK MODE =====
const darkToggle = document.createElement('button');
darkToggle.className = 'icon-btn dark-toggle';
darkToggle.setAttribute('aria-label', 'Toggle dark mode');
darkToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.querySelector('.header-actions').prepend(darkToggle);
const savedTheme = localStorage.getItem('meazas_theme');
if (savedTheme === 'dark') document.body.classList.add('dark-mode');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  darkToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  localStorage.setItem('meazas_theme', isDark ? 'dark' : 'light');
});
if (savedTheme === 'dark') darkToggle.innerHTML = '<i class="fas fa-sun"></i>';

// ===== BACK TO TOP BUTTON =====
const backTop = document.createElement('button');
backTop.className = 'back-to-top';
backTop.setAttribute('aria-label', 'Back to top');
backTop.innerHTML = `
  <svg class="progress-ring" viewBox="0 0 44 44">
    <circle class="progress-ring-bg" cx="22" cy="22" r="18"/>
    <circle class="progress-ring-fill" cx="22" cy="22" r="18"/>
  </svg>
  <i class="fas fa-arrow-up"></i>`;
document.body.appendChild(backTop);

const ringFill = backTop.querySelector('.progress-ring-fill');
const circumference = 2 * Math.PI * 18;
ringFill.style.strokeDasharray = circumference;

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  const progress = scrolled / total;
  ringFill.style.strokeDashoffset = circumference - progress * circumference;
  backTop.classList.toggle('visible', scrolled > 400);
});
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== CURSOR SPOTLIGHT =====
const spotlight = document.createElement('div');
spotlight.className = 'cursor-spotlight';
document.body.appendChild(spotlight);
document.addEventListener('mousemove', e => {
  spotlight.style.left = e.clientX + 'px';
  spotlight.style.top = e.clientY + 'px';
});

// ===== HERO TYPING ANIMATION =====
const heroDescs = [
  'Premium packaging, industrial chemicals, and commercial vehicles.',
  'Trusted by 850+ businesses across Ethiopia.',
  'Same-day delivery in Addis Ababa. Nationwide in 3–5 days.',
  'Quality certified. Competitively priced. Always in stock.'
];
let descIndex = 0, charIndex = 0, typing = true;
const heroDescEl = document.querySelector('.hero-slide.active .hero-desc');
if (heroDescEl) {
  heroDescEl.dataset.original = heroDescEl.textContent;
  heroDescEl.textContent = '';
  heroDescEl.style.borderRight = '2px solid rgba(255,255,255,0.7)';
  function typeLoop() {
    const current = heroDescs[descIndex];
    if (typing) {
      heroDescEl.textContent = current.slice(0, charIndex++);
      if (charIndex > current.length) { typing = false; setTimeout(typeLoop, 2000); return; }
    } else {
      heroDescEl.textContent = current.slice(0, charIndex--);
      if (charIndex < 0) {
        typing = true; charIndex = 0;
        descIndex = (descIndex + 1) % heroDescs.length;
      }
    }
    setTimeout(typeLoop, typing ? 38 : 18);
  }
  typeLoop();
}

// ===== PRODUCT CARD QUICK VIEW =====
document.querySelectorAll('.product-card').forEach(card => {
  const wrap = card.querySelector('.product-img-wrap');
  if (!wrap) return;
  const qv = document.createElement('div');
  qv.className = 'quick-view-overlay';
  qv.innerHTML = '<span><i class="fas fa-eye"></i> Quick View</span>';
  qv.addEventListener('click', () => {
    const title = card.querySelector('h4')?.textContent || '';
    const price = card.querySelector('.product-price')?.textContent || '';
    const img = card.querySelector('img')?.src || '';
    const rating = card.querySelector('.product-rating')?.innerHTML || '';
    const stock = card.querySelector('.product-stock')?.textContent || '';
    showQuickView(title, price, img, rating, stock);
  });
  wrap.appendChild(qv);
});

function showQuickView(title, price, img, rating, stock) {
  const existing = document.getElementById('quickViewModal');
  if (existing) existing.remove();
  const modal = document.createElement('div');
  modal.id = 'quickViewModal';
  modal.className = 'modal-overlay open';
  modal.innerHTML = `
    <div class="modal quick-view-modal">
      <button class="modal-close" onclick="document.getElementById('quickViewModal').remove(); document.body.style.overflow=''"><i class="fas fa-times"></i></button>
      <div class="qv-grid">
        <div class="qv-img"><img src="${img}" alt="${title}" /></div>
        <div class="qv-info">
          <h2>${title}</h2>
          <div class="product-rating" style="font-size:14px;margin:8px 0">${rating}</div>
          <p class="product-price" style="font-size:24px;margin:12px 0">${price} <span style="font-size:14px;color:#6b7280">Birr</span></p>
          <p style="font-size:13px;color:#6b7280;margin-bottom:16px">${stock}</p>
          <button class="btn btn-primary" style="width:100%" onclick="document.getElementById('quickViewModal').remove(); document.body.style.overflow=''">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>`;
  modal.addEventListener('click', e => { if (e.target === modal) { modal.remove(); document.body.style.overflow = ''; } });
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
}
