/* ============================================================
   search.js — Módulo de búsqueda global con indexación dinámica
   Carga search-index.json y permite búsqueda en tiempo real.
   ============================================================ */

window.SearchModule = (() => {
  let indexData = [];
  let searchInput = null;
  let searchResults = null;

  async function loadIndex() {
    indexData = window.SearchIndexData || [];
    if (indexData.length === 0) {
      console.warn('[SearchModule] Índice no disponible o vacío.');
    }
  }

  function init() {
    searchInput = document.getElementById('bookSearchInput');
    searchResults = document.getElementById('bookSearchResults');

    if (!searchInput || !searchResults) return;

    searchInput.addEventListener('input', handleInput);
    document.addEventListener('click', handleClickOutside);
  }

  function handleInput(e) {
    const query = e.target.value.toLowerCase().trim();
    searchResults.innerHTML = '';

    if (query.length < 2) {
      searchResults.classList.remove('show');
      return;
    }

    const matches = indexData.filter(item =>
      item.title.toLowerCase().includes(query) ||
      (item.category && item.category.toLowerCase().includes(query))
    );

    if (matches.length > 0) {
      matches.forEach(match => {
        const item = document.createElement('a');
        item.href = match.url;
        item.className = 'search-result-item';
        item.innerHTML = `
          <div class="search-result-category">${match.category || 'General'}</div>
          <div class="search-result-title">${match.title}</div>
        `;
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
  }

  function handleClickOutside(e) {
    if (!searchInput || !searchResults) return;
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.remove('show');
    }
  }

  return {
    loadIndex,
    init
  };
})();
