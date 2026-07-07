/* Service Worker — Marine & Arnaud · Japon
   Objectif : que l'appli et les zones de carte déjà consultées restent
   utilisables sans connexion (utile une fois sur place, au Japon). */

const VERSION = 'v5';
const APP_CACHE = 'oj-app-' + VERSION;
const TILE_CACHE = 'oj-tiles-' + VERSION;

/* Fichiers de l'app shell, mis en cache dès l'installation */
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/leaflet.markercluster.min.js',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(APP_CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .catch(() => { /* pas bloquant si une ressource échoue au premier chargement */ })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys
        .filter((k) => k !== APP_CACHE && k !== TILE_CACHE)
        .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

function isTileRequest(url) {
  return url.includes('basemaps.cartocdn.com') || url.includes('arcgisonline.com');
}

function isAppShellRequest(url) {
  return APP_SHELL.some((path) => url.endsWith(path.replace('./', '')));
}

/* Stratégie commune : sert le cache immédiatement si dispo, tout en
   rafraîchissant discrètement le cache en arrière-plan quand le réseau répond. */
function cacheFirst(request, cacheName) {
  return caches.open(cacheName).then((cache) =>
    cache.match(request).then((cached) => {
      const network = fetch(request)
        .then((res) => {
          if (res && res.ok) cache.put(request, res.clone());
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  if (isTileRequest(req.url)) {
    event.respondWith(cacheFirst(req, TILE_CACHE));
    return;
  }

  if (isAppShellRequest(req.url) || new URL(req.url).origin === self.location.origin) {
    event.respondWith(cacheFirst(req, APP_CACHE));
  }
});
