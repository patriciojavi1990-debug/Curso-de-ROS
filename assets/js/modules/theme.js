/* ============================================================
   theme.js — Módulo de tema claro / oscuro
   Persistencia en localStorage + detección de preferencia del sistema.
   ============================================================ */

window.ThemeModule = (() => {
  const STORAGE_KEY = 'ros-book-theme';

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark-theme');
    } else {
      html.classList.remove('dark-theme');
    }
  }

  function toggleTheme() {
    const current = document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    updateIcon(next);
  }

  function updateIcon(theme) {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars';
    }
    btn.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
  }

  function init() {
    const theme = getPreferredTheme();
    applyTheme(theme);

    const btn = document.getElementById('themeToggle');
    if (btn) {
      updateIcon(theme);
      btn.addEventListener('click', toggleTheme);
    }

    // Escuchar cambios del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
        updateIcon(e.matches ? 'dark' : 'light');
      }
    });
  }

  return { init };
})();
