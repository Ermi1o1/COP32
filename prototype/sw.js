/* COP32 companion prototype — service worker. Precaches the app shell so the prototype opens and works offline.
   Bump VERSION on every release; old caches are deleted on activate. */
const VERSION = 'cop32-proto-v0.5.0';
const SHELL = ['./', 'index.html', 'tokens.css', 'styles.css', 'icons.js', 'people.js', 'credits.js', 'data.js', 'app.js', 'manifest.webmanifest',
  'assets/AtkinsonHyperlegibleNext-latin.woff2', 'assets/NotoSansEthiopic-subset.woff2', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('message', e => { if (e.data === 'skipWaiting') self.skipWaiting(); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') { // network first for the page, cached shell when offline
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put('index.html', copy)); return r; }).catch(() => caches.match('index.html')));
    return; }
  // stale-while-revalidate for static files
  e.respondWith(caches.open(VERSION).then(c => c.match(req).then(hit => { const net = fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => hit); return hit || net; })));
});
