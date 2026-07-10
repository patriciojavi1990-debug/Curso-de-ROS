#!/usr/bin/env python3
"""
build.py
Script de build para producción. Concatena los 4 archivos CSS modulares
en un único assets/css/book.min.css optimizado.

Uso:
  python scripts/build.py

Nota: En desarrollo se mantienen los 4 archivos separados
(variables.css, themes.css, main.css, components.css) para
facilitar la edición. Antes de desplegar a producción, ejecuta
este script para optimizar las peticiones HTTP.
"""

import re
import sys
from pathlib import Path

CSS_DIR = Path('assets/css')
OUTPUT_FILE = CSS_DIR / 'book.min.css'
INPUT_FILES = ['variables.css', 'themes.css', 'main.css', 'components.css']

# Comentarios de cabecera de archivo para stripping
HEADER_COMMENT = re.compile(r'/\*[\s\S]*?\*/')

def minify_css(css: str) -> str:
    """Minifica CSS eliminando comentarios, espacios innecesarios y saltos de línea."""
    # Eliminar comentarios
    css = HEADER_COMMENT.sub('', css)
    # Eliminar espacios múltiples
    css = re.sub(r'\s+', ' ', css)
    # Eliminar espacios antes y después de { ; , :
    css = re.sub(r'\s*([{};,:])\s*', r'\1', css)
    # Restaurar salto de línea final
    return css.strip()

def main():
    if not CSS_DIR.exists():
        print(f'Error: no se encontró la carpeta {CSS_DIR}')
        sys.exit(1)

    concatenated = []
    for filename in INPUT_FILES:
        file_path = CSS_DIR / filename
        if not file_path.exists():
            print(f'Advertencia: no se encontró {file_path}, se omite.')
            continue
        concatenated.append(f'/* === {filename} === */\n{file_path.read_text(encoding="utf-8")}')

    if not concatenated:
        print('Error: no hay archivos CSS para concatenar.')
        sys.exit(1)

    final_css = '\n\n'.join(concatenated)
    original_size = len(final_css)
    minified = minify_css(final_css)
    final_size = len(minified)

    OUTPUT_FILE.write_text(minified, encoding='utf-8')

    reduction = (1 - final_size / original_size) * 100
    print(f'[OK] Build de producción completado: {OUTPUT_FILE}')
    print(f'     Tamaño original: {original_size:>8,} bytes')
    print(f'     Tamaño minificado: {final_size:>8,} bytes')
    print(f'     Reducción: {reduction:>5.1f}%')
    print()
    print('Para activar el CSS minificado, reemplaza en cada HTML:')
    print("  <link href='../assets/css/book.css' rel='stylesheet'>")
    print("por:")
    print("  <link href='../assets/css/book.min.css' rel='stylesheet'>")

if __name__ == '__main__':
    main()
