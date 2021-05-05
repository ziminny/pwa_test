const CACHE_NAME = "version-1"
const urlsToCache = ['index.html','offline.html']

const self = this;
// Install Server worker

self.addEventListener("install" , (event) => {
  event.waitUntil(
     caches.open(CACHE_NAME).then((cache) => {
    console.log("Cache install");
    return cache.addAll(urlsToCache)
  }).catch( (error) => {
    console.log("ERROR Install cache",error);
  }))
})

// Listen for request
// se estiver sem internet , busca no cache 'offline.html'
self.addEventListener("fetch" , (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => {
        return caches.match('offline.html')
      })
    })
  )
})
// Activete the Server worker
self.addEventListener("activate" , (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((chacheNames) => {
       return Promise.all(
        chacheNames.map( (cacheName) => {
            if(!cacheWhiteList.includes(cacheName)) {
                return caches.delete(cacheName)
            }
        } )
       )
    })
  )
})