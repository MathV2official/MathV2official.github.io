const CACHE_NAME = 'game-io-cache-v1';
const URLSTOCACHE = [
  'favicon.png'
];

self.addEventListener('install', function(event) {

  console.log('install', event);
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(URLSTOCACHE);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('activate', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });
