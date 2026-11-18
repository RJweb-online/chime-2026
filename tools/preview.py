#!/usr/bin/env python3
"""Local CHIME server. Optional fixture feeds the real song parser; no release bypass."""
import argparse
import json
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent.parent
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--port', type=int, default=8000)
parser.add_argument('--bind', default='127.0.0.1')
parser.add_argument('--test-data', nargs='?', const=str(ROOT / 'preview' / 'songs.json'), help='Use local test rows; optionally provide a different JSON file')
args = parser.parse_args()
fixture = Path(args.test_data).resolve() if args.test_data else None

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *values, **kwargs):
        super().__init__(*values, directory=str(ROOT), **kwargs)

    def do_GET(self):
        path = urlsplit(self.path).path
        if any(part.startswith('.') for part in Path(path).parts):
            self.send_error(404)
            return
        if fixture and path == '/__preview-song-feed.js':
            try:
                rows = json.loads(fixture.read_text())
                response = {'status': 'ok', 'table': {
                    'cols': [{'label': label} for label in rows.get('headers', ['Day', 'YouTube URL'])],
                    'rows': [{'c': [{'v': value} for value in row]} for row in rows['rows']],
                }}
                self.send_text('window.__chimeSheetSongs(' + json.dumps(response) + ');', 'text/javascript')
            except (OSError, ValueError, KeyError, IndexError) as error:
                self.send_error(500, str(error))
        elif fixture and path == '/sheet-songs.js':
            source = (ROOT / 'sheet-songs.js').read_text()
            source = source.replace('script.src = source.href;', "script.src = '/__preview-song-feed.js?' + source.searchParams.toString();")
            self.send_text(source, 'text/javascript')
        elif fixture and path in ('/', '/index.html'):
            source = (ROOT / 'index.html').read_text().replace('<body>', '<body><p class="local-preview">LOCAL TEST DATA · sample song links for days 9 and 13–25 · your Google Sheet is unchanged</p>', 1)
            self.send_text(source, 'text/html')
        else:
            super().do_GET()

    def send_text(self, content, mime):
        data = content.encode('utf-8')
        self.send_response(200)
        self.send_header('Content-Type', mime + '; charset=utf-8')
        self.send_header('Content-Length', str(len(data)))
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        self.wfile.write(data)

server = ThreadingHTTPServer((args.bind, args.port), Handler)
print(f'CHIME: http://127.0.0.1:{args.port}/', flush=True)
print(f'Song source: {fixture if fixture else "live Google Sheet"}', flush=True)
try:
    server.serve_forever()
except KeyboardInterrupt:
    pass
finally:
    server.server_close()
