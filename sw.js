const CACHE_NAME = "vbbe-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./assets/scene_shrug.png",
  "./assets/scene_talk_open.png",
  "./assets/scene_talk_closed.png",
  "./assets/scene_wave_1.png",
  "./assets/scene_wave_2.png",
  "./assets/anim_talk.gif",
  "./assets/anim_wave.gif"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k===CACHE_NAME? null : caches.delete(k)))).then(()=>self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((r) => r || fetch(event.request))
  );
});
