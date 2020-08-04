// !memuat library js dgn importScripts()
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) console.log(`Workbox berhasil dimuat`);
else console.log(`Workbox gagal dimuat`);

// ! precaching app shell
workbox.precaching.precacheAndRoute(
  [
    { url: "/", revision: "1" },
    { url: "/nav.html", revision: "1" },
    { url: "/index.html", revision: "1" },
    { url: "/pages/match.html", revision: "1" },
    { url: "/pages/saved.html", revision: "1" },
    { url: "/pages/standings.html", revision: "1" },
    { url: "/pages/teams.html", revision: "1" },
    { url: "/css/materialize.min.css", revision: "1" },
    { url: "/js/materialize.min.js", revision: "1" },
    { url: "/js/nav.js", revision: "1" },
    { url: "/js/activatesw.js", revision: "1" },
    { url: "/js/activateswTeam.js", revision: "1" },
    { url: "/css/style.css", revision: "1" },
    { url: "/css/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2", revision: "1" },
    { url: "/manifest.json", revision: "1" },
    { url: "/img/icon-128x128.png", revision: "1" },
    { url: "/img/icon-144x144.png", revision: "1" },
    { url: "/img/icon-152x152.png", revision: "1" },
    { url: "/img/icon-192x192.png", revision: "1" },
    { url: "/img/icon-384x384.png", revision: "1" },
    { url: "/img/icon-512x512.png", revision: "1" },
    { url: "/img/icon-72x72.png", revision: "1" },
    { url: "/img/icon-96x96.png", revision: "1" },
    { url: "/css/Acme-Regular.ttf", revision: "1" },
    { url: "/js/api.js", revision: "1" },
    { url: "/team.html", revision: "1" },
    { url: "/js/idb.js", revision: "1" },
    { url: "/js/db.js", revision: "1" },
  ],
  {
    ignoreUrlParametersMatching: [/.*/],
  }
);

// ! caching halaman dgn strategi stale while revalidate
workbox.routing.registerRoute(
  new RegExp("/pages/"),
  workbox.strategies.staleWhileRevalidate({
    //   berkas html dalam pages akan disimpan dalam objek cache dgn nama pages
    cacheName: "pages",
  })
);

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2/"),
  workbox.strategies.staleWhileRevalidate({
    //   berkas html dalam pages akan disimpan dalam objek cache dgn nama pages
    cacheName: "football-api",
  })
);

//! event/blok push
self.addEventListener("push", function (event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "push message no payload";
  }
  const options = {
    body: body,
    icon: "/img/icon-512x512.webp",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("push notification", options)
  );
});
