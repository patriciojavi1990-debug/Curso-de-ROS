# Guía para el Desarrollador (Developer & Agent Instructions)

Esta guía documenta los estándares técnicos, de diseño y metodológicos para que cualquier desarrollador o agente de IA pueda continuar con la redacción y desarrollo de los siguientes capítulos del **Curso Completo de ROS 2 Jazzy + Gazebo Harmonic**.

---

## 🎨 Sistema de Diseño (Design System)

Todos los capítulos deben utilizar la estructura de estilos centralizada en `assets/css/book.css`.

### Paleta de Colores (Variables CSS)
Al crear o modificar componentes, utiliza exclusivamente las siguientes variables del sistema:
* **Primario (ROS Blue):** `var(--ros-primary)` (`#2196F3`) y `var(--ros-primary-dark)` (`#1565C0`)
* **Secundario (ROS Cyan):** `var(--ros-accent)` (`#00BCD4`)
* **Alertas:** 
  * Información: `var(--ros-info)` (`#03A9F4`) / Fondo: `var(--bg-callout-info)`
  * Consejos: `var(--ros-success)` (`#4CAF50`) / Fondo: `var(--bg-callout-tip)`
  * Advertencias: `var(--ros-warning)` (`#FF9800`) / Fondo: `var(--bg-callout-warning)`
  * Peligros: `var(--ros-danger)` (`#F44336`) / Fondo: `var(--bg-callout-danger)`

### Tipografías
* **Cuerpo de texto:** `var(--font-body)` (`Inter`)
* **Títulos y Encabezados:** `var(--font-heading)` (`Outfit`)
* **Bloques de Código:** `var(--font-mono)` (`JetBrains Mono`)

---

## 🛠️ Estructura Técnica de un Capítulo

Cada capítulo debe seguir la estructura semántica de HTML5 utilizada en `capitulo-02.html`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="[Descripción única del capítulo para SEO]">
  <title>Capítulo [N] — [Título] | Curso ROS 2 Jazzy</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <link href="assets/css/book.css" rel="stylesheet">
</head>
<body>

  <!-- NAVBAR (Incluyendo el buscador en la versión de escritorio) -->
  <nav class="book-navbar navbar navbar-expand-lg">
    <!-- Ver estructura exacta en capitulo-02.html -->
  </nav>

  <div class="book-layout">
    <!-- SIDEBAR (Tabla de contenidos específica del capítulo actual) -->
    <aside id="bookSidebar" class="book-sidebar">
      <p class="toc-title">Contenido del capítulo</p>
      <ul class="toc-nav">
        <!-- Enlaces internos con scroll-spy -->
      </ul>
    </aside>

    <!-- CUERPO DEL CONTENIDO -->
    <main class="book-content">
      <header class="chapter-header">
        <div class="container">
          <span class="chapter-number">Capítulo [N]</span>
          <h1>[Título del Capítulo]</h1>
        </div>
      </header>

      <div class="content-body">
        <!-- Secciones con IDs coincidentes con el Sidebar -->
        <!-- Bloques de código encapsulados -->
        <!-- Navegación anterior / siguiente -->
      </div>
    </main>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="assets/js/book.js"></script>
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
<div class="callout callout-note"> <!-- Cambiar por note, tip, warning, danger o info -->
  <div class="callout-icon"><i class="bi bi-info-circle-fill"></i></div>
  <div class="callout-body">
    <strong>[Título en negrita]</strong>
    <p>[Explicación detallada]</p>
  </div>
</div>
```

---

## 🔍 Cómo Actualizar el Buscador para Nuevos Capítulos

Cuando agregues un nuevo capítulo (por ejemplo, `capitulo-03.html`), debes actualizar el archivo `assets/js/book.js`. Localiza la constante `bookIndex` y añade las nuevas entradas para que los usuarios puedan encontrar secciones del nuevo capítulo al instante:

```javascript
const bookIndex = [
  // ... capítulos anteriores
  { title: "Capítulo 3: Arquitectura de ROS 2", url: "capitulo-03.html", category: "Capítulo 3" },
  { title: "Nodos y el grafo de ROS", url: "capitulo-03.html#nodos", category: "Capítulo 3" },
  // ... secciones detalladas
];
```

---

## ✍️ Reglas de Redacción Técnica para IA/Desarrollador

1. **Precisión Técnica Real:** No inventar rutas ni comandos. Todos los comandos deben basarse en configuraciones probadas en entornos reales.
2. **Explicación de Salidas:** Mostrar la salida que la terminal genera al ejecutar comandos clave para que el estudiante pueda autoverificar su progreso.
3. **No usar placeholders:** Evitar colocar comentarios como `<!-- Añadir contenido aquí -->`. Todo el texto debe estar completamente redactado.
4. **Interactividad:** Mantener los cuestionarios con la clase `.quiz-question` y el botón `.btn-show-answer` con la lógica oculta por defecto para promover la autoevaluación activa.
