# Curso Completo de ROS 2 Jazzy + Gazebo Harmonic

Este repositorio contiene los archivos fuente del libro web interactivo **"Curso Completo de ROS 2 Jazzy + Gazebo Harmonic"**, diseñado con calidad editorial universitaria para la enseñanza de ROS 2 desde cero hasta nivel avanzado. 

El libro está construido en HTML5 semántico, CSS3, JavaScript clásico (ES6) y Bootstrap 5, y está configurado para ser publicado de forma gratuita a través de **GitHub Pages**.

---

## 📁 Estructura del Proyecto

```text
Curso de ROS/
├── index.html                   # Página de inicio / Portada del libro
├── chapters/                    # Capítulos del libro (HTML limpio, solo contenido)
│   └── capitulo-02.html       # Capítulo 2: Instalación del Entorno de Desarrollo
├── components/                  # Plantillas reutilizables (navbar, sidebar, footer)
│   ├── navbar.html
│   ├── sidebar.html
│   └── footer.html
├── assets/
│   ├── css/
│   │   ├── variables.css        # Design System: colores, fuentes, espaciados
│   │   ├── main.css             # Estilos globales y layouts
│   │   ├── components.css       # Componentes (callouts, terminales, tablas)
│   │   ├── themes.css           # Modo oscuro / claro
│   │   └── book.css             # Importa todo el sistema de estilos
│   ├── js/
│   │   ├── modules/
│   │   │   ├── search.js        # Módulo de búsqueda dinámica
│   │   │   ├── theme.js         # Módulo de modo claro/oscuro
│   │   │   ├── ui.js            # Navegación, scrollspy, zoom, copiar
│   │   │   └── quiz.js          # Autoevaluación interactiva
│   │   ├── data/
│   │   │   └── search-index.js  # Índice de búsqueda global (JS compatible con file://)
│   │   └── book-loader.js       # Layout Engine: ensambla la página (inline templates)
│   ├── images/
│   └── diagrams/
├── scripts/
│   ├── generate-index.py        # Generador del índice de búsqueda
│   ├── build.py                 # Minificador de CSS para producción
│   └── serve.py                 # Servidor HTTP local para desarrollo
├── .gitignore
├── DEVELOPER_GUIDE.md
└── README.md                    # Instrucciones de despliegue y uso
```

---

## 🚀 Guía de Despliegue en GitHub (Paso a Paso)

Sigue estos comandos desde tu terminal (PowerShell, Git Bash o la terminal de VS Code) para subir este proyecto a GitHub por primera vez.

### Paso 1: Inicializar el repositorio Git local
Navega a la carpeta del proyecto en tu terminal y ejecuta:
```bash
git init
```

### Paso 2: Crear el archivo `.gitignore` (Opcional)
Si usas VS Code u otras herramientas, es recomendable omitir carpetas temporales de configuración creando un archivo llamado `.gitignore` con lo siguiente:
```text
.vscode/
.DS_Store
*.log
```

### Paso 3: Agregar todos los archivos al área de preparación
Prepara todos los archivos para el primer commit:
```bash
git add .
```

### Paso 4: Realizar el primer commit
Guarda el estado actual de los archivos localmente:
```bash
git commit -m "feat: re-arquitectura modular, design system, modo oscuro, buscador dinamico"
```

### Paso 5: Renombrar la rama principal a `main`
Asegúrate de que la rama por defecto se llame `main` (estándar actual en GitHub):
```bash
git branch -M main
```

### Paso 6: Vincular tu repositorio local con GitHub
Crea un repositorio vacío en tu cuenta de [GitHub](https://github.com/new). No agregues README, ni .gitignore ni Licencia durante la creación web de GitHub. Copia la URL de tu repositorio y ejecuta:
```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
```
*(Reemplaza `TU_USUARIO` y `TU_REPOSITORIO` con tus datos reales de GitHub)*

### Paso 7: Subir los cambios a GitHub
Envía el código de tu entorno local al servidor remoto:
```bash
git push -u origin main
```

---

## 🌐 Publicación en GitHub Pages

Una vez que hayas subido el código a tu repositorio en GitHub, sigue estos pasos para hacer público el libro en la web:

1. Ve a la página de tu repositorio en **GitHub**.
2. Haz clic en la pestaña **Settings** (Configuración) en el menú superior.
3. En la barra lateral izquierda, busca la sección **Code and automation** y haz clic en **Pages**.
4. En el apartado **Build and deployment**:
   * **Source**: Selecciona `Deploy from a branch`.
   * **Branch**: Selecciona la rama `main` y mantén la carpeta por defecto como `/ (root)`.
5. Haz clic en **Save** (Guardar).
6. Espera aproximadamente 1 a 2 minutos. GitHub generará un enlace público en la parte superior de esa misma sección de configuración, con un formato similar a:
   `https://TU_USUARIO.github.io/TU_REPOSITORIO/`

---

## 🛠️ Tecnologías utilizadas

* **Estructuración:** HTML5 Semántico
* **Estilos:** Bootstrap 5.3.3 & CSS3 personalizado
* **Iconografía:** Bootstrap Icons
* **Programación Interactiva:** JavaScript estándar (exposición global para compatibilidad offline/local)
* **Fuentes Web:** Google Fonts (*Inter*, *Outfit*, *JetBrains Mono*)

---

## 💻 Desarrollo Local

✅ **El sitio funciona directamente con doble clic** (`file://`). El `book-loader.js` usa templates inline, por lo que no requiere servidor local ni `fetch()`.

Si aún así prefieres usar un servidor local (recomendado para desarrollo):
```bash
python scripts/serve.py
```
Abre tu navegador en **http://localhost:8000**

---

## 🏗️ Scripts de Mantenimiento

### Generar índice de búsqueda
```bash
python scripts/generate-index.py
```
Escanea `chapters/*.html` y `index.html` y regenera automáticamente `assets/js/data/search-index.js`. **Ejecuta este script cada vez que añadas un nuevo capítulo.**

### Build de producción (minificar CSS)
```bash
python scripts/build.py
```
Concatena y minifica los 4 archivos CSS modulares (`variables.css`, `themes.css`, `main.css`, `components.css`) en un único `assets/css/book.min.css` (reducción típica del 25%).

Para activar el CSS minificado en todos los HTML, reemplaza:
```html
<link href="./assets/css/book.css" rel="stylesheet">
```
por:
```html
<link href="./assets/css/book.min.css" rel="stylesheet">
```

Inicia un servidor HTTP en `http://localhost:8000` (puerto configurable). Útil si prefieres usar un servidor local en lugar del protocolo `file://`.
