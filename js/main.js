document.addEventListener('DOMContentLoaded', () => {

  renderProfile();
  renderProjects();
  renderAchievements();
  renderPublished();
  renderBlog();
  initNav();
  initScrollAnimations();

  // ── Hamburger ───────────────────────────────────────────────
  function initNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks  = document.querySelector('.nav-links');
    if (hamburger) {
      hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
      document.querySelectorAll('.nav-links a').forEach(a =>
        a.addEventListener('click', () => navLinks.classList.remove('open'))
      );
    }
    const sections   = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
    function updateActiveNav() {
      let current = '';
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
      navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });
  }

  // ── Scroll fade-in ──────────────────────────────────────────
  function initScrollAnimations() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    return observer;
  }

  // ── PROFILE ─────────────────────────────────────────────────
  function renderProfile() {
    if (typeof PROFILE === 'undefined') return;
    const p = PROFILE;

    // Hero name
    const heroName = document.getElementById('heroName');
    if (heroName) heroName.innerHTML = `Hi, I'm <em>${p.name}</em>`;

    // Hero tagline
    const heroTagline = document.getElementById('heroTagline');
    if (heroTagline) {
      heroTagline.innerHTML = `<strong>${p.title}</strong><br>${p.tagline.join('<br>')}`;
    }

    // Hero bio
    const heroBio = document.getElementById('heroBio');
    if (heroBio) heroBio.textContent = p.bio;

    // Open to
    const heroOpenTo = document.getElementById('heroOpenTo');
    if (heroOpenTo) heroOpenTo.innerHTML = `<strong>Open to:</strong> ${p.openTo}`;

    // Hero photo
    const heroAvatar = document.getElementById('heroAvatar');
    if (heroAvatar) { heroAvatar.src = p.photo; heroAvatar.alt = p.fullName; }

    // Hero action buttons
    const heroActions = document.getElementById('heroActions');
    if (heroActions) {
      heroActions.innerHTML = `
        <a href="#projects" class="btn-primary">View Projects ↓</a>
        <a href="${p.links.cv}" class="btn-outline" download>Download CV ↓</a>
        <a href="${p.links.newsletter}" target="_blank" rel="noopener" class="btn-outline">Newsletter →</a>
        <a href="${p.links.linkedin}" target="_blank" rel="noopener" class="btn-outline">LinkedIn →</a>`;
    }

    // Hero chips
    const heroChips = document.getElementById('heroChips');
    if (heroChips) {
      heroChips.innerHTML = p.heroChips
        .map(c => `<span class="chip${c.accent ? ' accent' : ''}">${c.label}</span>`)
        .join('');
    }

    // About text
    const aboutText = document.getElementById('aboutText');
    if (aboutText) {
      aboutText.innerHTML = p.about.paragraphs.map(t => `<p>${t}</p>`).join('');
    }

    // Stats
    const statRow = document.getElementById('statRow');
    if (statRow) {
      statRow.innerHTML = p.about.stats
        .map(s => `<div class="stat"><div class="stat-num">${s.num}</div><div class="stat-label">${s.label}</div></div>`)
        .join('');
    }

    // Skills
    const skillsContainer = document.getElementById('skillsContainer');
    if (skillsContainer) {
      skillsContainer.innerHTML = p.skills.map(g => `
        <div class="skills-group">
          <div class="skills-group-label">${g.group}</div>
          <div class="skills-row">${g.chips.map(c => `<span class="chip">${c}</span>`).join('')}</div>
        </div>`).join('');
    }

    // Contact
    const contactHeading = document.getElementById('contactHeading');
    const contactBody    = document.getElementById('contactBody');
    const contactLinks   = document.getElementById('contactLinks');
    if (contactHeading) contactHeading.textContent = p.contact.heading;
    if (contactBody)    contactBody.textContent    = p.contact.body;
    if (contactLinks) {
      contactLinks.innerHTML = p.contact.links.map(l => `
        <a href="${l.href}" ${l.external ? 'target="_blank" rel="noopener"' : ''} class="contact-link">
          <span class="contact-link-icon">${l.icon}</span>
          <span>${l.label}</span>
        </a>`).join('');
    }
  }

  // ── PROJECTS ────────────────────────────────────────────────
  function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid || typeof PROJECTS === 'undefined') return;
    grid.innerHTML = PROJECTS.map(p => `
      <div class="project-card fade-in">
        <div class="project-num">${p.num} / ${p.category}</div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-impact">
          ${p.impact.map(i => `<span class="impact-stat">${i}</span>`).join('')}
        </div>
        <ul class="project-bullets">
          ${p.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="chip">${t}</span>`).join('')}
        </div>
      </div>`).join('');
    observeNewElements(grid);
  }

  // ── ACHIEVEMENTS ────────────────────────────────────────────
  function renderAchievements() {
    if (typeof ACHIEVEMENTS === 'undefined') return;

    const awardList = document.getElementById('awardList');
    if (awardList) {
      awardList.innerHTML = ACHIEVEMENTS.awards.map(a => `
        <div class="award-card ${a.highlight ? 'award-highlight' : ''}">
          <div class="award-icon">${a.icon}</div>
          <div class="award-body">
            <div class="award-name">${a.name}</div>
            <div class="award-desc">${a.desc}</div>
          </div>
        </div>`).join('');
    }

    const certList = document.getElementById('certList');
    if (certList) {
      certList.innerHTML = ACHIEVEMENTS.certifications.map(c => `
        <div class="cert-card">
          <div class="cert-issuer">${c.issuer}</div>
          <div class="cert-name">${c.name}</div>
        </div>`).join('');
    }
  }

  // ── PUBLISHED ───────────────────────────────────────────────
  function renderPublished() {
    const grid = document.getElementById('publishedGrid');
    if (!grid || typeof PUBLISHED === 'undefined') return;
    grid.innerHTML = PUBLISHED.map(p => `
      <a href="${p.url}" target="_blank" rel="noopener" class="published-card fade-in">
        <div class="published-platform">
          <span class="platform-badge ${p.platform}">${p.platformLabel}</span>
          ${p.date ? `<span class="published-date">${p.date}</span>` : ''}
        </div>
        <h3 class="published-title">${p.title}</h3>
        <p class="published-excerpt">${p.excerpt}</p>
        <span class="published-read-more">${p.readMoreLabel}</span>
      </a>`).join('');
    observeNewElements(grid);
  }

  // ── BLOG ────────────────────────────────────────────────────
  function renderBlog() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid || typeof BLOG_POSTS === 'undefined') return;
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
    observeNewElements(blogGrid);
  }

  // ── Helpers ─────────────────────────────────────────────────
  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function observeNewElements(container) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    container.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }

});
