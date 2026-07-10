# Guía para el Desarrollador (Developer & Agent Instructions)

Esta guía documenta los estándares técnicos, de diseño, metodológicos y de accesibilidad para que cualquier desarrollador o agente de IA pueda continuar con la redacción y desarrollo de los siguientes capítulos del **Curso Completo de ROS 2 Jazzy + Gazebo Harmonic**.

---

## ⚠️ Nota sobre el Layout Engine

El `book-loader.js` usa **templates inline** (definidos en el propio script) para ensamblar el layout. Esto garantiza que el sitio funcione en CUALQUIER entorno, incluyendo `file://` (doble clic desde el explorador).

Los archivos en `components/` (navbar.html, sidebar.html, footer.html) se mantienen como **referencia editable**. Si los modificas, debes sincronizar los cambios con el objeto `COMPONENTS` dentro de `book-loader.js`.

Opcionalmente puedes usar un servidor local para desarrollo:
```bash
python scripts/serve.py
```

---

## 🎨 Sistema de Diseño (Design System)

El sistema de estilos está modularizado en `assets/css/`:
* `variables.css` — Paleta HSL, tipografías, espaciados, sombras y radios.
* `main.css` — Layout, navbar, sidebar, footer, responsive y print.
* `components.css` — Callouts, bloques de código, tablas, ejercicios, cuestionarios.
* `themes.css` — Modo oscuro/claro (`prefers-color-scheme` y clase `.dark-theme`).
* `book.css` — Importa los 4 anteriores (punto de entrada único).

### Paleta de Colores (Variables CSS)
Al crear o modificar componentes, utiliza exclusivamente las siguientes variables del sistema:
* **Primario (ROS Blue):** `var(--ros-primary)` (`hsl(207, 90%, 54%)`) y `var(--ros-primary-dark)` (`hsl(207, 79%, 42%)`)
* **Secundario (ROS Cyan):** `var(--ros-accent)` (`hsl(187, 100%, 42%)`)
* **Alertas y Cajas Educativas:** 
  * Información: `var(--ros-info)` / Fondo: `var(--bg-callout-info)`
  * Consejos: `var(--ros-success)` / Fondo: `var(--bg-callout-tip)`
  * Advertencias: `var(--ros-warning)` / Fondo: `var(--bg-callout-warning)`
  * Peligros: `var(--ros-danger)` / Fondo: `var(--bg-callout-danger)`

### Tipografías
* **Cuerpo de texto:** `var(--font-body)` (`Inter`)
* **Títulos y Encabezados:** `var(--font-heading)` (`Outfit`)
* **Bloques de Código:** `var(--font-mono)` (`JetBrains Mono`)

---

## 🛠️ Estructura Técnica de un Capítulo (Layout Engine)

**No dupliques navbar, sidebar ni footer.** El `book-loader.js` inyecta automáticamente estos componentes al cargar la página. Cada capítulo debe contener **únicamente** su contenido semántico dentro de un `<div id="chapter-root">`.

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="[Descripción única del capítulo para SEO]">
  <meta name="author" content="Curso Completo de ROS 2">
  <meta name="robots" content="index, follow">
  <title>Capítulo [N] — [Título] | Curso ROS 2 Jazzy</title>

  <!-- Open Graph -->
  <meta property="og:title" content="Capítulo [N] — [Título] | Curso ROS 2 Jazzy">
  <meta property="og:description" content="[Descripción única]">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://patriciojavi1990-debug.github.io/Curso-de-ROS/chapters/capitulo-[NN].html">

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <link href="../assets/css/book.css" rel="stylesheet">
</head>
<body>

<div id="chapter-root">
  <header class="chapter-header">
    <div class="container">
      <span class="chapter-number">Capítulo [N]</span>
      <h1>[Título del Capítulo]</h1>
    </div>
  </header>

  <!-- Secciones con IDs coincidentes para el ScrollSpy automático -->
  <section id="introduccion">
    <h2>Introducción</h2>
    <!-- ... -->
  </section>

  <!-- Navegación entre capítulos (opcional, el loader la conserva) -->
  <nav class="chapter-nav" aria-label="Navegación entre capítulos">
    <a href="./capitulo-[N-1].html" class="nav-prev" rel="prev">...</a>
    <a href="./capitulo-[N+1].html" class="nav-next" rel="next">...</a>
  </nav>
</div><!-- /#chapter-root -->

<script src="../assets/js/book-loader.js"></script>
</body>
</html>
```

---

## 📋 Estructuras Especiales

### 1. Bloques de Código con botón "Copiar"
Todo bloque de comando o código fuente debe ir dentro de un contenedor `.code-block-wrapper` con su respectiva cabecera e identificador de lenguaje:
```html
<div class="code-block-wrapper">
  <div class="code-block-header">
    <span class="code-block-lang">
      <span class="terminal-dots"><span class="dot-red"></span><span class="dot-yellow"></span><span class="dot-green"></span></span>
      bash (o el lenguaje correspondiente)
    </span>
    <button class="btn-copy" type="button"><i class="bi bi-clipboard"></i> Copiar</button>
  </div>
  <pre><code>[COMANDO O CÓDIGO]</code></pre>
</div>
```

### 2. Cuadros de Mensaje (Callouts)
Usa los contenedores `.callout` para resaltar ideas secundarias:
```html
<div class="callout callout-note"> <!-- note, tip, warning, danger, info -->
  <div class="callout-icon"><i class="bi bi-info-circle-fill"></i></div>
  <div class="callout-body">
    <strong>[Título en negrita]</strong>
    <p>[Explicación detallada]</p>
  </div>
</div>
```

---

## 🔍 Cómo Actualizar el Buscador para Nuevos Capítulos

El buscador consume el archivo `assets/js/data/search-index.json`. Hay dos formas de mantenerlo actualizado:

### Opción A: Script automático (Recomendado)
Desde la raíz del proyecto ejecuta:
```bash
python scripts/generate-index.py
```
Este script escanea `chapters/*.html` e `index.html`, extrae títulos y encabezados `<h2>` / `<h3>` con `id`, y regenera el JSON.

### Opción B: Edición manual
Edita directamente `assets/js/data/search-index.json` y añade entradas con este formato:
```json
{
  "title": "Capítulo 3: Arquitectura de ROS 2",
  "url": "chapters/capitulo-03.html",
  "category": "Capítulo 3"
}
```

---

## ♿ Estándares de Accesibilidad (WCAG 2.2)

1. **Atributos ARIA:** Asegura que los componentes dinámicos tengan `role="navigation"`, `role="search"`, `role="complementary"`, y estados interactivos claros (`aria-expanded`, `aria-live`).
2. **Navegación por Teclado:** Todos los botones interactivos (como el selector de tema y el botón de copiar) deben ser accesibles con la tecla `Tab` y activables con `Enter`/`Espacio`.
3. **Contraste de Color:** La paleta de colores HSL en `variables.css` y `themes.css` ha sido seleccionada para cumplir con la relación de contraste mínima de 4.5:1 para texto normal según la pauta WCAG.

---

## ✍️ Reglas de Redacción Técnica para IA/Desarrollador

1. **Precisión Técnica Real:** No inventar rutas ni comandos. Todos los comandos deben basarse en configuraciones probadas en entornos reales.
2. **Explicación de Salidas:** Mostrar la salida que la terminal genera al ejecutar comandos clave para que el estudiante pueda autoverificar su progreso.
3. **No usar placeholders:** Evitar colocar comentarios como `<!-- Añadir contenido aquí -->`. Todo el texto debe estar completamente redactado.
4. **Interactividad:** Mantener los cuestionarios con la clase `.quiz-question` y el botón `.btn-show-answer` con la lógica oculta por defecto para promover la autoevaluación activa.

---

## 🏗️ Build de Producción (Opcional)

Antes de desplegar a producción, ejecuta el minificador para optimizar las hojas de estilo:
```bash
python scripts/build.py
```
Este script genera `assets/css/book.min.css`. Para activarlo, reemplaza en todos los HTML el enlace a `book.css` por `book.min.css`.

---

## 🧱 Arquitectura de Módulos JavaScript

```
assets/js/
├── book-loader.js          # Layout Engine (se carga en cada HTML, no-módulo para soportar file://)
└── modules/
    ├── search.js           # Módulo ES6: buscador dinámico
    ├── theme.js            # Módulo ES6: modo claro/oscuro
    ├── ui.js               # Módulo ES6: UI helpers (scrollspy, copiar, back-to-top)
    └── quiz.js             # Módulo ES6: cuestionarios interactivos
```
