/* ============================================================
   ui.js — Módulo de interfaz de usuario
   ScrollSpy, sidebar móvil, back-to-top, copiar código,
   cierre de dropdowns y navegación de capítulos.
   ============================================================ */

window.UiModule = (() => {

  /* ---- Copy to Clipboard ---- */
  function initCopyButtons() {
    document.querySelectorAll('.btn-copy').forEach(btn => {
      btn.addEventListener('click', () => {
        const wrapper = btn.closest('.code-block-wrapper');
        const code = wrapper?.querySelector('code');
        if (!code) return;
        const text = code.textContent;

        const success = () => {
          const original = btn.innerHTML;
          btn.classList.add('copied');
          btn.innerHTML = '<i class="bi bi-check2"></i> Copiado';
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = original;
          }, 2000);
        };

        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(success).catch(() => fallbackCopy(text, success));
        } else {
          fallbackCopy(text, success);
        }
      });
    });
  }

  function fallbackCopy(text, callback) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try { document.execCommand('copy'); } catch (_) { /* noop */ }
    document.body.removeChild(textarea);
    callback();
  }

  /* ---- Back to Top ---- */
  function initBackToTop() {
    const btnTop = document.getElementById('btnTop');
    if (!btnTop) return;
    window.addEventListener('scroll', () => {
      btnTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btnTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Sidebar Mobile Toggle ---- */
  function initSidebarToggle() {
    const sidebar = document.getElementById('bookSidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const overlay = document.getElementById('sidebarOverlay');

    function closeSidebar() {
      sidebar?.classList.remove('show');
      overlay?.classList.remove('show');
    }

    sidebarToggle?.addEventListener('click', () => {
      sidebar?.classList.toggle('show');
      overlay?.classList.toggle('show');
    });

    overlay?.addEventListener('click', closeSidebar);

    // Cerrar sidebar al hacer click en un enlace (mobile)
    document.querySelectorAll('.toc-nav a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992) closeSidebar();
      });
    });
  }

  /* ---- Scroll Spy para TOC (generado dinámicamente) ---- */
  function initScrollSpy() {
    const tocLinks = document.querySelectorAll('.toc-nav a[href^="#"]');
    const sections = [];
    tocLinks.forEach(link => {
      const id = link.getAttribute('href').substring(1);
      const el = document.getElementById(id);
      if (el) sections.push({ el, link });
    });

    if (!sections.length) return;

    function updateToc() {
      let current = sections[0];
      const scrollY = window.scrollY + 120;
      for (const section of sections) {
        if (section.el.offsetTop <= scrollY) {
          current = section;
        }
      }
      tocLinks.forEach(l => l.classList.remove('active'));
      if (current) current.link.classList.add('active');
    }

    window.addEventListener('scroll', updateToc, { passive: true });
    updateToc();
  }

  /* ---- Generar TOC automáticamente desde secciones ---- */
  function generateToc(containerSelector = '.content-body') {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const tocNav = document.getElementById('tocNav');
    if (!tocNav) return;

    tocNav.innerHTML = '';

    // Buscar sections con id que contengan h2 o h3
    const sections = container.querySelectorAll('section[id]');
    sections.forEach(section => {
      const heading = section.querySelector('h2, h3');
      if (!heading) return;

      const li = document.createElement('li');
      if (heading.tagName === 'H3') {
        li.classList.add('toc-sub');
      }
      const a = document.createElement('a');
      a.href = '#' + section.id;
      // Limpiar texto de iconos Bootstrap si existen
      a.textContent = heading.textContent.replace(/\s*\bi\s+class="bi[^"]*"\>\s*/gi, '').trim();
      li.appendChild(a);
      tocNav.appendChild(li);
    });
  }

  /* ---- Progress Bar de lectura opcional ---- */
  function initReadingProgress() {
    const progressBar = document.getElementById('readingProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }, { passive: true });
  }

  function init() {
    initCopyButtons();
    initBackToTop();
    initSidebarToggle();
    generateToc();
    initScrollSpy();
    initReadingProgress();
  }

  return { init, generateToc };
})();
