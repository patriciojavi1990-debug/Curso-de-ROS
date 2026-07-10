/* ============================================================
   CURSO COMPLETO DE ROS 2 JAZZY + GAZEBO HARMONIC
   book.js — Copy-to-clipboard, sidebar, scroll spy, back-to-top
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* ---- Buscador de Capítulos y Secciones ---- */
  const searchInput = document.getElementById('bookSearchInput');
  const searchResults = document.getElementById('bookSearchResults');

  // Índice simulado del libro para búsqueda global y cruzada
  const bookIndex = [
    { title: "Capítulo 1: Fundamentos de la Robótica", url: "capitulo-01.html", category: "Capítulo 1" },
    { title: "¿Qué es un robot?", url: "capitulo-01.html#que-es-robot", category: "Capítulo 1" },
    { title: "Capítulo 2: Instalación del Entorno de Desarrollo", url: "capitulo-02.html", category: "Capítulo 2" },
    { title: "Paso 1: Instalar WSL2", url: "capitulo-02.html#paso1", category: "Instalación" },
    { title: "Paso 2: Instalar Ubuntu 24.04", url: "capitulo-02.html#paso2", category: "Instalación" },
    { title: "Paso 3: Verificar Ubuntu", url: "capitulo-02.html#paso3", category: "Instalación" },
    { title: "Paso 4: Instalar herramientas necesarias", url: "capitulo-02.html#paso4", category: "Instalación" },
    { title: "Paso 5: Configurar Locale", url: "capitulo-02.html#paso5", category: "Instalación" },
    { title: "Paso 6: Agregar repositorio oficial de ROS 2", url: "capitulo-02.html#paso6", category: "Instalación" },
    { title: "Paso 7: Instalar ROS 2 Jazzy", url: "capitulo-02.html#paso7", category: "Instalación" },
    { title: "Paso 8: Configurar ROS", url: "capitulo-02.html#paso8", category: "Instalación" },
    { title: "Paso 9: Inicializar rosdep", url: "capitulo-02.html#paso9", category: "Instalación" },
    { title: "Paso 10: Probar ROS (demo nodes)", url: "capitulo-02.html#paso10", category: "Instalación" },
    { title: "Paso 11: Instalar Visual Studio Code", url: "capitulo-02.html#paso11", category: "Desarrollo" },
    { title: "Paso 12: Crear Workspace", url: "capitulo-02.html#paso12", category: "Desarrollo" },
    { title: "Paso 13: Crear paquete Python", url: "capitulo-02.html#paso13", category: "Desarrollo" },
    { title: "Paso 14: Ejecutar RViz2", url: "capitulo-02.html#paso14", category: "Visualización" },
    { title: "Paso 15: Instalar Gazebo Harmonic", url: "capitulo-02.html#paso15", category: "Simulación" },
    { title: "Problemas comunes y soluciones", url: "capitulo-02.html#problemas", category: "Soporte" },
    { title: "Buenas prácticas del desarrollador", url: "capitulo-02.html#buenas-practicas", category: "Soporte" },
    { title: "Laboratorio práctico", url: "capitulo-02.html#laboratorio", category: "Práctica" },
    { title: "Capítulo 3: Arquitectura de ROS 2", url: "capitulo-03.html", category: "Capítulo 3" }
  ];

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      searchResults.innerHTML = '';

      if (query.length < 2) {
        searchResults.classList.remove('show');
        return;
      }

      const matches = bookIndex.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
      );

      if (matches.length > 0) {
        matches.forEach(match => {
          const item = document.createElement('a');
          item.href = match.url;
          item.className = 'search-result-item';
          item.innerHTML = `
            <div class="search-result-category">${match.category}</div>
            <div class="search-result-title">${match.title}</div>
          `;
          // Cerrar dropdown al hacer click
          item.addEventListener('click', () => {
            searchResults.classList.remove('show');
            searchInput.value = '';
          });
          searchResults.appendChild(item);
        });
        searchResults.classList.add('show');
      } else {
        searchResults.innerHTML = `
          <div class="p-3 text-center text-muted" style="font-size: 0.85rem;">
            No se encontraron resultados para "${e.target.value}"
          </div>
        `;
        searchResults.classList.add('show');
      }
    });

    // Cerrar buscador si se hace click fuera
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('show');
      }
    });
  }

  /* ---- Copy Button ---- */
  document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const wrapper = btn.closest('.code-block-wrapper');
      const code = wrapper.querySelector('code');
      const text = code.textContent;

      navigator.clipboard.writeText(text).then(() => {
        const original = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = '<i class="bi bi-check2"></i> Copiado';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = original;
        }, 2000);
      }).catch(() => {
        /* Fallback for older browsers / insecure contexts */
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try { document.execCommand('copy'); } catch (_) { /* noop */ }
        document.body.removeChild(textarea);

        const original = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = '<i class="bi bi-check2"></i> Copiado';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = original;
        }, 2000);
      });
    });
  });

  /* ---- Back-to-top ---- */
  const btnTop = document.getElementById('btnTop');
  if (btnTop) {
    window.addEventListener('scroll', () => {
      btnTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btnTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Sidebar toggle (mobile) ---- */
  const sidebar = document.getElementById('bookSidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const overlay = document.getElementById('sidebarOverlay');

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('show');
    if (overlay) overlay.classList.remove('show');
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('show');
      overlay.classList.toggle('show');
    });
  }
  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }
  // Close sidebar on TOC link click (mobile)
  document.querySelectorAll('.toc-nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992) closeSidebar();
    });
  });

  /* ---- Scroll Spy for TOC ---- */
  const tocLinks = document.querySelectorAll('.toc-nav a[href^="#"]');
  const sections = [];
  tocLinks.forEach(link => {
    const id = link.getAttribute('href').substring(1);
    const el = document.getElementById(id);
    if (el) sections.push({ el, link });
  });

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

  if (sections.length) {
    window.addEventListener('scroll', updateToc, { passive: true });
    updateToc();
  }

  /* ---- Quiz Toggle Answers ---- */
  document.querySelectorAll('.btn-show-answer').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      if (answer) {
        answer.classList.toggle('d-none');
        btn.textContent = answer.classList.contains('d-none')
          ? 'Mostrar respuesta'
          : 'Ocultar respuesta';
      }
    });
  });
});
