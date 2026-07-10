/* ============================================================
   book-loader.js — Layout Engine
   Ensambla la página inyectando Navbar, Sidebar, Footer y
   activando módulos JS dinámicamente.

   Esta versión usa SOLO templates inline (sin fetch) para
   garantizar que funcione en CUALQUIER entorno:
   - file:// (doble clic desde el explorador)
   - http://localhost (desarrollo local)
   - https:// (GitHub Pages en producción)

   Los archivos en components/ se mantienen como referencia
   editable. Si los modificas, copia los cambios al objeto
   COMPONENTS de este script.
   ============================================================ */

(function() {
  'use strict';

  // Detectar profundidad de ruta
  const isChapter = window.location.pathname.includes('/chapters/');
  const basePath = isChapter ? '../' : './';

  // Guardar el contenido del chapter-root ANTES de cualquier modificación
  const chapterRoot = document.getElementById('chapter-root');
  const originalContent = chapterRoot
    ? chapterRoot.innerHTML
    : '<div class="container py-5"><h1>Bienvenido</h1><p>Esta es la portada del libro.</p></div>';

  /* ============================================================
     COMPONENTES — Templates inline
     Edita aquí para modificar navbar, sidebar o footer.
     Mantén estos en sincronía con components/*.html
     ============================================================ */

  const COMPONENTS = {
    navbar: `
<nav class="book-navbar navbar navbar-expand-lg" role="navigation" aria-label="Navegación principal">
  <div class="container-fluid px-3">
    <a class="navbar-brand d-flex align-items-center" href="${basePath}index.html">
      <i class="bi bi-robot me-2" style="font-size:1.4rem;color:var(--ros-primary)"></i>
      Curso ROS 2 Jazzy
    </a>
    <div class="search-wrapper mx-auto d-none d-md-block" role="search">
      <i class="bi bi-search search-icon" aria-hidden="true"></i>
      <input type="text" id="bookSearchInput" class="form-control search-input" placeholder="Buscar capítulos o secciones..." autocomplete="off" aria-label="Buscador de contenido">
      <div id="bookSearchResults" class="search-results-dropdown" aria-live="polite"></div>
    </div>
    <div class="d-flex align-items-center gap-2">
      <button class="btn btn-sm btn-outline-secondary d-flex align-items-center" id="themeToggle" aria-label="Cambiar tema">
        <i class="bi bi-moon-stars"></i>
      </button>
      <a href="https://docs.ros.org/en/jazzy/" target="_blank" rel="noopener" class="btn btn-sm btn-outline-primary d-none d-md-inline-flex align-items-center gap-1">
        <i class="bi bi-box-arrow-up-right"></i> Docs ROS 2
      </a>
      <a href="https://github.com/patriciojavi1990-debug/Curso-de-ROS" target="_blank" rel="noopener" class="btn btn-sm btn-dark d-inline-flex align-items-center gap-1">
        <i class="bi bi-github"></i><span class="d-none d-sm-inline"> GitHub</span>
      </a>
    </div>
  </div>
</nav>
<div id="sidebarOverlay" class="sidebar-overlay" aria-hidden="true"></div>`,

    sidebar: `
<aside id="bookSidebar" class="book-sidebar" role="complementary" aria-label="Tabla de contenidos del capítulo">
  <p class="toc-title">Contenido del capítulo</p>
  <ul class="toc-nav" id="tocNav" role="list">
    <!-- Generado automáticamente por ui.js -->
  </ul>
</aside>`,

    footer: `
<footer class="book-footer mt-5 py-4 border-top" role="contentinfo">
  <div class="container text-center text-muted">
    <p class="mb-1">&copy; 2024 Curso Completo de ROS 2 Jazzy + Gazebo Harmonic. Todos los derechos reservados.</p>
    <p class="small mb-0">Desarrollado con <i class="bi bi-heart-fill text-danger" aria-hidden="true"></i> para la comunidad robótica.</p>
  </div>
</footer>`
  };

  function buildLayout() {
    // Reconstruir el body con los componentes
    document.body.innerHTML = `
      ${COMPONENTS.navbar}
      <div class="book-layout">
        ${COMPONENTS.sidebar}
        <main class="book-content">
          <div class="content-body">
            ${originalContent}
          </div>
        </main>
      </div>
      ${COMPONENTS.footer}
      <button id="btnTop" class="btn-top" aria-label="Volver arriba"><i class="bi bi-chevron-up"></i></button>
      <button id="sidebarToggle" class="sidebar-toggle" aria-label="Abrir tabla de contenidos"><i class="bi bi-list"></i></button>
    `;

    // Cargar Bootstrap JS
    const bsScript = document.createElement('script');
    bsScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
    document.body.appendChild(bsScript);

    // Cargar módulos estándar dinámicamente
    const scriptsToLoad = [
      `${basePath}assets/js/modules/ui.js`,
      `${basePath}assets/js/modules/theme.js`,
      `${basePath}assets/js/modules/quiz.js`,
      `${basePath}assets/js/data/search-index.js`,
      `${basePath}assets/js/modules/search.js`
    ];

    function loadScripts(scripts, callback) {
      if (scripts.length === 0) {
        callback();
        return;
      }
      const script = document.createElement('script');
      script.src = scripts.shift();
      script.onload = () => loadScripts(scripts, callback);
      script.onerror = () => loadScripts(scripts, callback);
      document.body.appendChild(script);
    }

    loadScripts(scriptsToLoad, async () => {
      if (window.SearchModule) {
        await window.SearchModule.loadIndex();
        window.SearchModule.init();
      }
      if (window.ThemeModule) window.ThemeModule.init();
      if (window.UiModule) window.UiModule.init();
      if (window.QuizModule) window.QuizModule.init();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildLayout);
  } else {
    buildLayout();
  }
})();
