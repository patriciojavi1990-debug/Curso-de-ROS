# Curso Completo de ROS 2 Jazzy + Gazebo Harmonic

Este repositorio contiene los archivos fuente del libro web interactivo **"Curso Completo de ROS 2 Jazzy + Gazebo Harmonic"**, diseñado con calidad editorial universitaria para la enseñanza de ROS 2 desde cero hasta nivel avanzado. 

El libro está construido en HTML5 semántico, CSS3, JavaScript clásico (ES6) y Bootstrap 5, y está configurado para ser publicado de forma gratuita a través de **GitHub Pages**.

---

## 📁 Estructura del Proyecto

```text
Curso de ROS/
├── assets/
│   ├── css/
│   │   └── book.css      # Sistema de diseño, fuentes, colores y layouts
│   └── js/
│       └── book.js       # Buscador, copiado al portapapeles y cuestionarios interactivos
├── capitulo-02.html      # Capítulo 2: Instalación del Entorno de Desarrollo
└── README.md             # Instrucciones de despliegue y uso (este archivo)
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
git commit -m "feat: estructura inicial, capitulo 2 e implementacion de buscador"
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
   `https://TU_USUARIO.github.io/TU_REPOSITORIO/capitulo-02.html`

---

## 🛠️ Tecnologías utilizadas

* **Estructuración:** HTML5 Semántico
* **Estilos:** Bootstrap 5.3.3 & CSS3 personalizado
* **Iconografía:** Bootstrap Icons
* **Programación Interactiva:** JavaScript (ES6)
* **Fuentes Web:** Google Fonts (*Inter*, *Outfit*, *JetBrains Mono*)
