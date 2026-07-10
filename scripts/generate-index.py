#!/usr/bin/env python3
"""
generate-index.py
Script para generar automáticamente assets/js/data/search-index.json
escaneando todos los archivos HTML en chapters/ y la raíz.

Uso:
  python scripts/generate-index.py

Requiere Python 3.6+
"""

import json
import re
import sys
from pathlib import Path

# Configuración
CHAPTERS_DIR = Path('chapters')
OUTPUT_FILE = Path('assets/js/data/search-index.js')

def extract_title(soup_text: str) -> str:
    """Extrae el título del <title> o del primer <h1>."""
    title_match = re.search(r'<title>(.*?)</title>', soup_text, re.IGNORECASE)
    if title_match:
        return title_match.group(1).split('|')[0].strip()
    h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', soup_text, re.IGNORECASE | re.DOTALL)
    if h1_match:
        return re.sub(r'<[^>]+>', '', h1_match.group(1)).strip()
    return 'Sin título'

def extract_headings(soup_text: str, file_url: str) -> list:
    """Extrae secciones con id que contengan h2 o h3."""
    items = []
    # Buscar <section id="..."> ... <h2|h3>...</h2|h3> ... </section>
    section_pattern = re.compile(
        r'<section[^>]*id="([^"]+)"[^>]*>.*?<(h[23])[^>]*>(.*?)</\2>.*?</section>',
        re.IGNORECASE | re.DOTALL
    )
    for match in section_pattern.finditer(soup_text):
        section_id = match.group(1)
        raw_text = match.group(3)
        text = re.sub(r'<[^>]+>', '', raw_text).strip()
        if not text:
            continue
        items.append({
            'title': text,
            'url': f'{file_url}#{section_id}',
            'category': 'Sección'
        })
    return items

def guess_category(file_name: str, title: str) -> str:
    """Infiere una categoría básica basada en el nombre del archivo o título."""
    lower = (file_name + ' ' + title).lower()
    if 'instal' in lower:
        return 'Instalación'
    if 'visual' in lower or 'rviz' in lower:
        return 'Visualización'
    if 'simul' in lower or 'gazebo' in lower:
        return 'Simulación'
    if 'desarrollo' in lower or 'code' in lower or 'workspace' in lower:
        return 'Desarrollo'
    if 'problema' in lower or 'soport' in lower or 'error' in lower:
        return 'Soporte'
    if 'practic' in lower or 'laboratorio' in lower or 'ejercicio' in lower:
        return 'Práctica'
    return 'Capítulo'

def main():
    if not CHAPTERS_DIR.exists():
        print(f'Error: No se encontró la carpeta {CHAPTERS_DIR}')
        sys.exit(1)

    index = []

    # Escanear chapters/
    for html_file in sorted(CHAPTERS_DIR.glob('*.html')):
        text = html_file.read_text(encoding='utf-8')
        url = f'chapters/{html_file.name}'
        title = extract_title(text)
        category = guess_category(html_file.name, title)

        # Entrada principal del capítulo
        index.append({
            'title': title,
            'url': url,
            'category': category
        })

        # Entradas de secciones
        sections = extract_headings(text, url)
        for sec in sections:
            sec['category'] = category  # Heredar categoría del capítulo
        index.extend(sections)

    # Escanear index.html si existe
    index_file = Path('index.html')
    if index_file.exists():
        text = index_file.read_text(encoding='utf-8')
        title = extract_title(text)
        index.insert(0, {
            'title': title or 'Inicio',
            'url': 'index.html',
            'category': 'Portada'
        })

    # Guardar
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    json_str = json.dumps(index, ensure_ascii=False, indent=2)
    OUTPUT_FILE.write_text(
        f'window.SearchIndexData = {json_str};',
        encoding='utf-8'
    )

    print(f'[OK] Índice generado: {OUTPUT_FILE}')
    print(f'     Total de entradas: {len(index)}')

if __name__ == '__main__':
    main()
