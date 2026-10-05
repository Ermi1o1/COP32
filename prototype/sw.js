/* COP32 companion prototype — service worker.
   Network-first: online users always get the latest deploy; the cache is only the offline fallback.
   Bump VERSION on every release (index.html asset URLs carry the same ?v= so browsers and old workers never serve stale files). */
const VERSION = 'cop32-proto-v0.8.0';
const V = '?v=0.8.0';
const SHELL = ['./', 'index.html', 'tokens.css' + V, 'styles.css' + V, 'icons.js' + V, 'people.js' + V, 'credits.js' + V, 'data.js' + V, 'app.js' + V, 'manifest.webmanifest',
  'assets/AtkinsonHyperlegibleNext-latin.woff2', 'assets/NotoSansEthiopic-subset.woff2', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png', 'icons/favicon.svg', 'icons/favicon-32.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('message', e => { if (e.data === 'skipWaiting') self.skipWaiting(); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const isImg = req.destination === 'image' || /\.(webp|png|jpg)$/.test(new URL(req.url).pathname);
  if (isImg) { // images: cache-first (they never change name), fill cache on first view
    e.respondWith(caches.open(VERSION).then(c => c.match(req).then(hit => hit || fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }))));
    return; }
  // pages, code and styles: network-first (bypassing the HTTP cache), cache as offline fallback
  e.respondWith(fetch(req, { cache: 'no-cache' }).then(r => { if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req.mode === 'navigate' ? 'index.html' : req, copy)); } return r; })
    .catch(() => caches.match(req.mode === 'navigate' ? 'index.html' : req).then(hit => hit || caches.match(req, { ignoreSearch: true }))));
});
