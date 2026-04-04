/* ============================================================
   Akki — Main JS (navigation, scroll effects, contact form,
   blog rendering, intersection observer animations)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Hamburger menu ──────────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    document.querySelectorAll('.nav-links a').forEach(a =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  }

  // ── Active nav link on scroll ───────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  function updateActiveNav() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ── Fade-in on scroll ───────────────────────────────────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ── Contact form ────────────────────────────────────────────
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const success = document.getElementById('formSuccess');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      // Simulate send (replace with actual fetch to your backend/formspree)
      setTimeout(() => {
        form.reset();
        btn.textContent = 'Send Message';
        btn.disabled = false;
        if (success) { success.style.display = 'block'; setTimeout(() => success.style.display = 'none', 4000); }
      }, 1200);
    });
  }

  // ── Blog rendering (index page — latest 3 posts) ────────────
  const blogGrid = document.getElementById('blogGrid');
  if (blogGrid) {
    if (typeof BLOG_POSTS !== 'undefined') {
      BLOG_POSTS.slice(0, 3).forEach(post => {
        blogGrid.innerHTML += `
          <article class="blog-card fade-in">
            <div class="blog-card-header">
              <span class="blog-tag">${post.tag}</span>
              <span class="blog-date">${formatDate(post.date)}</span>
            </div>
            <div class="blog-card-body">
              <h3 class="blog-title">${post.title}</h3>
              <p class="blog-excerpt">${post.excerpt}</p>
              <a href="blog.html?id=${post.id}" class="blog-read-more">Read post <span>→</span></a>
            </div>
          </article>`;
      });
      document.querySelectorAll('.blog-card.fade-in').forEach(el => observer.observe(el));
    } else {
      blogGrid.innerHTML = '<p style="color:var(--text-muted)">Blog posts coming soon…</p>';
    }
  }

  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
});
