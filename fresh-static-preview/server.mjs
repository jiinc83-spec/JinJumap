import http from 'node:http';
import { readFile } from 'node:fs/promises';

const port = Number(process.env.PORT || 5173);
http.createServer(async (request, response) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
  if (pathname === '/kakao-config.js') {
    let key = process.env.VITE_KAKAO_MAP_APP_KEY || '';
    try {
      const env = await readFile(new URL('../.env.local', import.meta.url), 'utf8');
      const match = env.match(/^\s*VITE_KAKAO_MAP_APP_KEY\s*=\s*(["']?)([^\r\n"']*)\1\s*$/m);
      if (!key && match) key = match[2].trim();
    } catch {}
    response.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(`window.KAKAO_MAP_APP_KEY = ${JSON.stringify(key)};`);
    return;
  }
  const pages = {
    '/pages/center.html': 'text/html; charset=utf-8',
    '/pages/location.html': 'text/html; charset=utf-8',
    '/pages/environment-day.html': 'text/html; charset=utf-8',
    '/mobile-preview.html': 'text/html; charset=utf-8',
    '/mobile.html': 'text/html; charset=utf-8',
    '/mobile.css': 'text/css; charset=utf-8',
    '/hero-carousel.css': 'text/css; charset=utf-8',
    '/hero-carousel.js': 'application/javascript; charset=utf-8',
  };
  if (pathname in pages) {
    try {
      const page = await readFile(new URL(`.${pathname}`, import.meta.url));
      response.writeHead(200, { 'Content-Type': pages[pathname], 'Cache-Control': 'no-store' }).end(page);
    } catch {
      response.writeHead(404).end('Page unavailable');
    }
    return;
  }
  if (request.url === '/favicon.ico') {
    response.writeHead(204).end();
    return;
  }
  const assets = {
    '/assets/starbucks.png': 'image/png',
    '/assets/dessert39.svg': 'image/svg+xml',
    '/assets/dessert39-logo.png': 'image/png',
    '/assets/mega-mgc.png': 'image/png',
    '/assets/hero-coast.png': 'image/png',
    '/assets/hero-bicycle.png': 'image/png',
    '/assets/hero-tumbler.png': 'image/png',
    '/assets/tumbler-woman.png': 'image/png',
    '/assets/dessert39-pyeonggeo.webp': 'image/webp',
    '/assets/compose-jinju.jpg': 'image/jpeg',
  };
  if (pathname in assets) {
    try {
      const asset = await readFile(new URL(`.${pathname}`, import.meta.url));
      response.writeHead(200, { 'Content-Type': assets[pathname], 'Cache-Control': 'public, max-age=3600' }).end(asset);
    } catch {
      response.writeHead(404).end('Asset unavailable');
    }
    return;
  }
  if (pathname !== '/' && pathname !== '/index.html') {
    response.writeHead(404).end('Not found');
    return;
  }
  try {
    const page = await readFile(new URL('./index.html', import.meta.url));
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(page);
  } catch {
    response.writeHead(500).end('Preview file unavailable');
  }
}).listen(port, '0.0.0.0', () => console.log(`Fresh preview ready at http://localhost:${port}/?preview=fresh`));
