const CACHE = 'proptools-v2';
const ASSETS = [
  './',
  './index.html',
  './dv-budget.html',
  './propellant.html',
  './thruster.html',
  './ep-power.html',
  './tank.html',
  './mass-budget.html',
  './reference.html',
  './styles.css',
  './i18n.js',
  './share.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
