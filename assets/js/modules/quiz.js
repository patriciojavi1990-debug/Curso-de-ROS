/* ============================================================
   quiz.js — Módulo de autoevaluación interactiva
   Toggle de respuestas en cuestionarios del libro.
   ============================================================ */

window.QuizModule = (() => {
  function init() {
    document.querySelectorAll('.btn-show-answer').forEach(btn => {
      btn.addEventListener('click', () => {
        const answer = btn.nextElementSibling;
        if (!answer) return;
        answer.classList.toggle('d-none');
        const isHidden = answer.classList.contains('d-none');
        btn.textContent = isHidden ? 'Mostrar respuesta' : 'Ocultar respuesta';
        btn.setAttribute('aria-expanded', String(!isHidden));
      });
    });
  }

  return { init };
})();
