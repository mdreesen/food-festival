// we do not include the images in "assets". This is intentional, every browser has a cache limit - 
// which can range anywhere from 50MB to 250MB. We've prioritized caching the JavaScript and HTML files so that the site is at least functional
const APP_PREFIX = 'FoodFest-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

// cannot hardcode an absolute path if we want this to work in development and production, because this page will be hosted at the "github.io/projectname subroute"
// We'll use relative paths
const FILES_TO_CACHE = [
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    "./dist/app.bundle.js",
    "./dist/events.bundle.js",
    "./dist/tickets.bundle.js",
    "./dist/schedule.bundle.js"
  ];

  // Installing the service worker
  /*
// we are not using window.addEventListener because service workers run before the window object has even been created. 
// Instead we use the "self" keyword to instantiate listeners on the service worker
// self here refers to the service worker object
self.addEventListener('install', function (e) {
    // We are telling the browser to wait until the work is complete before terminating the service worker
    // This ensures that the service worker doesn't move on from the installing phase until its finished executing all of its code
    e.waitUntil(
        // we use caches.open to find the specific cache by name, then add every file in the "FILES_TO_CACHE" array to the cache
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)
        })
    )
})
*/

// activating the service worker
// .keys() returns an arry of all cahce names, which we are calling "keyList"
// keyList is a perameter that contains all cache names under <username>.github.io - 
// because we may host many sites from the same URL, we should filter out caches that have the app prefix
// well capture the ones that have that prefix, stored in "APP_PREFIX", and save them to an array called cacheKeeplist using the .filter() method
self.addEventListener('activate', function(e) {
    e.waitUntil(
      caches.keys().then(function(keyList) {
        let cacheKeeplist = keyList.filter(function(key) {
          return key.indexOf(APP_PREFIX);
        });
        cacheKeeplist.push(CACHE_NAME);
  
        return Promise.all(
          keyList.map(function(key, i) {
            if (cacheKeeplist.indexOf(key) === -1) {
              console.log('deleting cache : ' + keyList[i]);
              return caches.delete(keyList[i]);
            }
          })
        );
      })
    );
  });