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
  if (pathname === '/data/environment-days.json') {
    try {
      const data = await readFile(new URL('./data/environment-days.json', import.meta.url));
      response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }).end(data);
    } catch {
      response.writeHead(404).end('Calendar data unavailable');
    }
    return;
  }
  const pages = {
    '/pages/center.html': 'text/html; charset=utf-8',
    '/pages/location.html': 'text/html; charset=utf-8',
    '/pages/environment-day.html': 'text/html; charset=utf-8',
    '/mobile-preview.html': 'text/html; charset=utf-8',
    '/mobile.html': 'text/html; charset=utf-8',
    '/mobile.css': 'text/css; charset=utf-8',
    '/mobile-map.js': 'application/javascript; charset=utf-8',
    '/hero-carousel.css': 'text/css; charset=utf-8',
    '/hero-carousel.js': 'application/javascript; charset=utf-8',
    '/map-place-details.js': 'application/javascript; charset=utf-8',
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
    '/assets/reuse-store.png': 'image/png',
    '/assets/jinju-zero-waste-on.png': 'image/png',
    '/assets/beautiful-store-logo.png': 'image/png',
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
  const eventMedia = pathname.match(/^\/assets\/environment-days\/([A-Za-z0-9_-][A-Za-z0-9._-]*)\.(png|jpe?g|webp|gif|mp4|webm)$/i);
  if (eventMedia) {
    const mediaTypes = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif', mp4: 'video/mp4', webm: 'video/webm' };
    const filename = `${eventMedia[1]}.${eventMedia[2].toLowerCase()}`;
    try {
      const media = await readFile(new URL(`./assets/environment-days/${filename}`, import.meta.url));
      response.writeHead(200, { 'Content-Type': mediaTypes[eventMedia[2].toLowerCase()], 'Cache-Control': 'public, max-age=3600' }).end(media);
    } catch {
      response.writeHead(404).end('Calendar media unavailable');
    }
    return;
  }
  const placeReference = pathname.match(/^\/assets\/place-reference\/([A-Za-z0-9_-]+)\.(png|jpe?g|webp)$/i);
  if (placeReference) {
    const mediaTypes = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp' };
    const filename = `${placeReference[1]}.${placeReference[2].toLowerCase()}`;
    try {
      const media = await readFile(new URL(`./assets/place-reference/${filename}`, import.meta.url));
      response.writeHead(200, { 'Content-Type': mediaTypes[placeReference[2].toLowerCase()], 'Cache-Control': 'public, max-age=3600' }).end(media);
    } catch {
      response.writeHead(404).end('Place reference image unavailable');
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
