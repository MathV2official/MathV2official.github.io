(() => {
  let e = "black-hole-square",
    t = ["index.html", "icon.png", "manifest.json"];
  self.addEventListener("install", (n) => {
    n.waitUntil(
      caches
        .open(e)
        .then((e) => e.addAll(t))
        .then(self.skipWaiting())
    );
  }),
    self.addEventListener("activate", (t) => {
      const n = [e];
      t.waitUntil(
        caches
          .keys()
          .then((e) => e.filter((e) => !n.includes(e)))
          .then((e) => Promise.all(e.map((e) => caches.delete(e))))
          .then(() => self.clients.claim())
      );
    }),
    self.addEventListener("fetch", (t) => {
      t.respondWith(
        fetch(
          ((e) => {
            let t = new Request(e, { cache: "reload" });
            if ("cache" in t) return t;
            let n = new URL(e, self.location.href);
            return (n.search += (n.search ? "&" : "") + "cachebust=" + Date.now()), new Request(n);
          })(t.request.url)
        )
          .then((n) => (caches.open(e).then((e) => e.put(t.request.url, n.clone())), n.clone()))
          .catch((e) => caches.match(t.request.url))
      );
    });
})();
