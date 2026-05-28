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

// ===== BLOG POSTS DATA =====
const blogPosts = [
  {
    title: 'How to Choose the Right Industrial Cleaner for Your Business',
    cat: 'Chemicals', date: 'May 12, 2026', read: '5 min read',
    img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80',
    content: `<p>Choosing the right industrial cleaner is critical for safety, efficiency, and compliance. Here's what to consider:</p>
    <h4>1. pH Level</h4><p>Acidic cleaners (pH below 7) are best for mineral deposits and rust. Alkaline cleaners (pH above 7) tackle grease and oils. Neutral cleaners work for general surfaces.</p>
    <h4>2. Surface Compatibility</h4><p>Always check that the cleaner is safe for your specific surfaces — metal, concrete, food-contact surfaces, or electronics each require different formulations.</p>
    <h4>3. Safety Certifications</h4><p>Look for EFDA certification and request the Safety Data Sheet (SDS) before purchasing. Meazas provides SDS for all chemical products.</p>
    <h4>4. Concentration vs. Ready-to-Use</h4><p>Concentrated formulas are more cost-effective for large operations. Ready-to-use products are better for smaller, less frequent cleaning tasks.</p>
    <p>Need help selecting the right product? Our chemical consultants offer free on-site assessments. <a href="#contact" style="color:var(--primary)">Contact us today.</a></p>`
  },
  {
    title: 'Why Eco-Friendly Packaging is the Future for Ethiopian Businesses',
    cat: 'Packaging', date: 'May 5, 2026', read: '4 min read',
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
    content: `<p>The shift toward sustainable packaging is no longer optional — it's a competitive advantage. Here's why Ethiopian businesses are making the switch.</p>
    <h4>Consumer Demand is Rising</h4><p>A 2025 survey found that 68% of Ethiopian urban consumers prefer businesses that use eco-friendly packaging. This number is growing every year.</p>
    <h4>Regulatory Pressure</h4><p>Ethiopia's single-use plastic regulations are tightening. Businesses that switch now avoid future compliance costs and penalties.</p>
    <h4>Cost Savings Over Time</h4><p>While eco-friendly packaging can cost 10–15% more upfront, bulk purchasing and reduced waste disposal costs often result in net savings within 12 months.</p>
    <h4>Meazas Eco Range</h4><p>Our biodegradable straws, compostable takeaway boxes, and kraft paper food boxes are all certified food-safe and available in bulk. <a href="#products" style="color:var(--primary)">Browse our eco range.</a></p>`
  },
  {
    title: '5 Tips for Managing a Commercial Vehicle Fleet in Ethiopia',
    cat: 'Vehicles', date: 'Apr 28, 2026', read: '6 min read',
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80',
    content: `<p>Managing a commercial fleet in Ethiopia comes with unique challenges — from road conditions to fuel availability. These five tips will help you run a tighter, more profitable operation.</p>
    <h4>1. Preventive Maintenance Schedules</h4><p>Service every vehicle every 5,000km or 3 months, whichever comes first. Keep a digital log for each vehicle.</p>
    <h4>2. Driver Training Programs</h4><p>Trained drivers reduce accidents by up to 40% and improve fuel efficiency by 15%. Invest in quarterly training sessions.</p>
    <h4>3. GPS Tracking</h4><p>Real-time tracking reduces unauthorized use, improves route efficiency, and helps with insurance claims.</p>
    <h4>4. Fuel Management</h4><p>Use fuel cards and set daily limits per vehicle. Monitor consumption weekly to spot inefficiencies early.</p>
    <h4>5. Fleet Insurance</h4><p>Comprehensive fleet insurance is non-negotiable. Meazas partners with leading insurers to offer competitive fleet insurance packages with our vehicle purchases.</p>`
  },
  {
    title: 'Food Safety Standards for Packaging: What Every Restaurant Must Know',
    cat: 'Food Packaging', date: 'Apr 18, 2026', read: '3 min read',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    content: `<p>Food safety regulations in Ethiopia are evolving rapidly. Here's what restaurant and food business owners need to know about packaging compliance.</p>
    <h4>EFDA Requirements</h4><p>All food-contact packaging must be certified by the Ethiopian Food and Drug Authority. Look for the EFDA mark on packaging products.</p>
    <h4>Migration Testing</h4><p>Packaging materials must not transfer harmful chemicals to food. Always request migration test certificates from your supplier.</p>
    <h4>Temperature Ratings</h4><p>Hot food containers must be rated for the temperature of the food they hold. Our foil containers are rated up to 220°C.</p>
    <h4>Labeling Requirements</h4><p>Custom-branded packaging must include material type, manufacturer info, and food-safe symbols. Meazas handles all compliance labeling for custom orders.</p>`
  },
  {
    title: 'Meazas P.L.C. Opens New Branch in Dire Dawa',
    cat: 'Company News', date: 'Apr 10, 2026', read: '2 min read',
    img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    content: `<p>We are thrilled to announce the grand opening of our sixth branch, located in the Sabian area of Dire Dawa.</p>
    <h4>What the New Branch Offers</h4><p>The Dire Dawa branch carries our full range of packaging, chemicals, and industrial products. Vehicle inquiries and financing consultations are also available on-site.</p>
    <h4>Grand Opening Offer</h4><p>To celebrate the opening, we're offering 15% off all products purchased at the Dire Dawa branch throughout May 2026. No minimum order required.</p>
    <h4>Visit Us</h4><p>Sabian Area, Dire Dawa. Open Mon–Sat, 8AM–6PM. Call +251 914 789 012 for directions or to pre-order stock.</p>
    <p>Thank you to all our customers in eastern Ethiopia for your continued support. We look forward to serving you better than ever.</p>`
  },
  {
    title: 'Top 10 Industrial Supplies Every Factory in Ethiopia Needs in 2026',
    cat: 'Industrial', date: 'Apr 2, 2026', read: '5 min read',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    content: `<p>Based on a survey of 200+ factory managers across Ethiopia, here are the top 10 industrial supplies that keep operations running smoothly.</p>
    <ol style="padding-left:20px;line-height:2">
      <li><strong>Heavy-duty degreasers</strong> — for machinery and equipment cleaning</li>
      <li><strong>Industrial hand wash liquid</strong> — bulk 20L containers for high-traffic washrooms</li>
      <li><strong>Floor disinfectant concentrate</strong> — dilutable for large floor areas</li>
      <li><strong>Safety gloves (nitrile)</strong> — chemical-resistant, disposable</li>
      <li><strong>Foil containers</strong> — for canteen and food service operations</li>
      <li><strong>Paper cups</strong> — for water stations and break rooms</li>
      <li><strong>Surface disinfectant spray</strong> — for workstations and shared equipment</li>
      <li><strong>Waste bin liners (heavy duty)</strong> — industrial grade, 120L</li>
      <li><strong>Chlorine bleach solution</strong> — for sanitation and surface sterilization</li>
      <li><strong>Antibacterial soap dispensers</strong> — wall-mounted, 1L refillable</li>
    </ol>
    <p>All 10 are available at Meazas P.L.C. with bulk pricing. <a href="#contact" style="color:var(--primary)">Request a quote today.</a></p>`
  }
];

function openBlogPost(index) {
  const post = blogPosts[index];
  document.getElementById('blogModalContent').innerHTML = `
    <img src="${post.img}" alt="${post.title}" style="width:100%;height:260px;object-fit:cover;border-radius:10px;margin-bottom:20px" />
    <span class="blog-cat" style="margin-bottom:12px;display:inline-block">${post.cat}</span>
    <h2 style="font-size:22px;font-weight:800;margin-bottom:10px;line-height:1.35">${post.title}</h2>
    <div style="font-size:12px;color:#6b7280;display:flex;gap:16px;margin-bottom:20px;flex-wrap:wrap">
      <span><i class="fas fa-calendar"></i> ${post.date}</span>
      <span><i class="fas fa-clock"></i> ${post.read}</span>
      <span><i class="fas fa-user"></i> Meazas Team</span>
    </div>
    <div style="font-size:14.5px;line-height:1.85;color:#374151">${post.content}</div>`;
  document.getElementById('blogModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeBlogModal() {
  document.getElementById('blogModal').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('blogModal').addEventListener('click', e => {
  if (e.target === document.getElementById('blogModal')) closeBlogModal();
});

// ===== FAQ ACCORDION =====
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ===== LIVE CHAT =====
const chatReplies = {
  'i want to place a bulk order': "Great! For bulk orders, please share the product name, quantity, and your location. Our sales team will send you a custom quote within 2 hours.",
  'track my order': "To track your order, please share your order number or the phone number used when placing the order. We'll check the status right away.",
  'product inquiry': "Sure! Which product are you interested in? You can also browse our full catalog above. We're happy to answer any questions.",
  'vehicle financing': "We offer 12–60 month financing through our banking partners. A 20–30% down payment is required. Would you like to schedule a consultation at your nearest branch?",
  'default': "Thanks for your message! Our support team will respond shortly. For urgent matters, call us at +251 911 234 567 or WhatsApp us."
};

function openLiveChat() {
  document.getElementById('liveChatWidget').classList.add('open');
  document.getElementById('chatInput').focus();
}
function closeLiveChat() {
  document.getElementById('liveChatWidget').classList.remove('open');
}
function sendQuickReply(text) {
  addChatMsg(text, 'user');
  document.querySelector('.chat-quick-replies')?.remove();
  setTimeout(() => {
    const key = text.toLowerCase();
    const reply = chatReplies[key] || chatReplies['default'];
    addChatMsg(reply, 'agent');
  }, 800);
}
function sendChatMsg() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  addChatMsg(text, 'user');
  document.querySelector('.chat-quick-replies')?.remove();
  setTimeout(() => {
    const key = text.toLowerCase();
    let reply = chatReplies['default'];
    for (const k of Object.keys(chatReplies)) {
      if (text.toLowerCase().includes(k)) { reply = chatReplies[k]; break; }
    }
    addChatMsg(reply, 'agent');
  }, 900);
}
function addChatMsg(text, type) {
  const msgs = document.getElementById('chatMessages');
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const div = document.createElement('div');
  div.className = `chat-msg ${type}`;
  div.innerHTML = `<p>${text}</p><span>${time}</span>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}
