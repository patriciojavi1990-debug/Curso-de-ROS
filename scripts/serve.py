#!/usr/bin/env python3
"""
serve.py
Servidor HTTP local simple para desarrollo. Sirve la carpeta actual
en http://localhost:8000 para que los fetch() del book-loader.js
funcionen correctamente.

Uso:
  python scripts/serve.py [puerto]

Por defecto usa el puerto 8000.
"""

import http.server
import socketserver
import sys
import os
from pathlib import Path

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000

# Cambiar al directorio raíz del proyecto
os.chdir(Path(__file__).resolve().parent.parent)

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Permitir CORS para desarrollo
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

    def log_message(self, format, *args):
        # Mensajes de log más legibles
        print(f'  {self.address_string()} - {format % args}')

try:
    with socketserver.TCPServer(('', PORT), Handler) as httpd:
        print(f'Servidor de desarrollo activo en http://localhost:{PORT}/')
        print(f'Sirviendo desde: {os.getcwd()}')
        print('Presiona Ctrl+C para detener.\n')
        httpd.serve_forever()
except KeyboardInterrupt:
    print('\nServidor detenido.')
except OSError as e:
    if 'Address already in use' in str(e):
        print(f'Error: el puerto {PORT} ya está en uso.')
        print(f'Intenta con otro puerto: python scripts/serve.py {PORT + 1}')
    else:
        raise
