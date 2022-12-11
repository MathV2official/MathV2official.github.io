const CACHE_VERSION = "1669623864|3837259192";
const CACHE_PREFIX = "Bad Egg-sw-cache-";
const CACHE_NAME = CACHE_PREFIX + CACHE_VERSION;
const OFFLINE_URL = "OneBadEgg.offline.html";
const CACHED_FILES = ["OneBadEgg.html", "OneBadEgg.js", "OneBadEgg.offline.html", "OneBadEgg.icon.png", "OneBadEgg.apple-touch-icon.png"];
const CACHABLE_FILES = ["OneBadEgg.wasm", "OneBadEgg.pck"];
const FULL_CACHE = CACHED_FILES.concat(CACHABLE_FILES);
self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CACHED_FILES)));
});
self.addEventListener("activate", (event) => {
    event.waitUntil(caches.keys().then(function(keys) {
        return Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key != CACHE_NAME).map(key => caches.delete(key)));
    }).then(function() {
        return ("navigationPreload" in self.registration) ? self.registration.navigationPreload.enable() : Promise.resolve();
    }));
});
async function fetchAndCache(event, cache, isCachable) {
    let response = await event.preloadResponse;
    if (!response) {
        response = await self.fetch(event.request);
    }
    if (isCachable) {
        cache.put(event.request, response.clone());
    }
    return response;
}
self.addEventListener("fetch", (event) => {
    const isNavigate = event.request.mode === "navigate";
    const url = event.request.url || "";
    const referrer = event.request.referrer || "";
    const base = referrer.slice(0, referrer.lastIndexOf("/") + 1);
    const local = url.startsWith(base) ? url.replace(base, "") : "";
    const isCachable = FULL_CACHE.some(v => v === local) || (base === referrer && base.endsWith(CACHED_FILES[0]));
    if (isNavigate || isCachable) {
        event.respondWith(async function() {
            const cache = await caches.open(CACHE_NAME);
            if (event.request.mode === "navigate") {
                const fullCache = await Promise.all(FULL_CACHE.map(name => cache.match(name)));
                const missing = fullCache.some(v => v === undefined);
                if (missing) {
                    try {
                        return await fetchAndCache(event, cache, isCachable);
                    } catch (e) {
                        console.error("Network error: ", e);
                        return await caches.match(OFFLINE_URL);
                    }
                }
            }
            const cached = await cache.match(event.request);
            if (cached) {
                return cached;
            } else {
                return await fetchAndCache(event, cache, isCachable);
            }
        }());
    }
});
self.addEventListener("message", (event) => {
    if (event.origin != self.origin) {
        return;
    }
    const id = event.source.id || "";
    const msg = event.data || "";
    self.clients.get(id).then(function(client) {
        if (!client) {
            return;
        }
        if (msg === "claim") {
            self.skipWaiting().then(() => self.clients.claim());
        } else if (msg === "clear") {
            caches.delete(CACHE_NAME);
        } else if (msg === "update") {
            self.skipWaiting().then(() => self.clients.claim()).then(() => self.clients.matchAll()).then(all => all.forEach(c => c.navigate(c.url)));
        } else {
            onClientMessage(event);
        }
    });
});