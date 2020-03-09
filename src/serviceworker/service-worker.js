/*global workbox */

workbox.precaching.precacheAndRoute(self.__precacheManifest);


workbox.routing.registerNavigationRoute('/index.html')

workbox.routing.registerRoute(
  /^https:\/\/api\.github\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'github-projects',
    plugins: [
      new workbox.broadcastUpdate.Plugin({
        headersToCheck: ['content-length', 'etag', 'last-modified'],
        channelName: 'github-projects-updated'
      }),
    ]
  })
)

// Setup cache strategy for Google Fonts. They consist of two parts, a static one
// coming from fonts.gstatic.com (strategy CacheFirst) and a more ferquently updated on
// from fonts.googleapis.com. Hence, split in two registerroutes
/*registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
)

registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CachablePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
)*/

self.addEventListener('message', msg => {
  if (msg.data.action === 'skipWaiting') {
    self.skipWaiting()
  }
})
