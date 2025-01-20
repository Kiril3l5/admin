// sw.js
const CACHE_NAME = 'autonomy-heroes-cache-v1';
const STATIC_ASSETS = [
    '/', // Ensure this matches your hosting path
    '/index.html',
	'/offline.html',
    '/css/styles.css',
    '/src/auth/AuthManager.js',
    '/src/calendar/TimeTrackingCalendar.js',
    '/src/utils/DOMUtils.js',
    '/src/modal/TimeEntryModal.js',
];

// Cache static assets during the install event
self.addEventListener("install", (event) => {
    console.log("[Service Worker] Install");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("[Service Worker] Caching static assets");
            return cache.addAll(STATIC_ASSETS);
        })
    );
});

// Cleanup old caches during the activate event
self.addEventListener("activate", (event) => {
    console.log("[Service Worker] Activate");
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("[Service Worker] Deleting old cache:", cache);
                        return caches.delete(cache);
                    }
                })
            )
        )
    );
});

// Intercept and handle fetch requests
self.addEventListener("fetch", (event) => {
    const request = event.request;

    // Handle API requests for dynamic data
    if (request.url.includes("/timeEntries") || request.url.includes("/api/")) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const clonedResponse = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        console.log("[Service Worker] Caching dynamic content:", request.url);
                        cache.put(request, clonedResponse);
                    });
                    return response;
                })
                .catch(() => {
                    console.warn("[Service Worker] Network request failed. Serving cached response:", request.url);
                    return caches.match(request);
                })
        );
    } else {
        // Handle static assets and fallback to the cache
        event.respondWith(
            caches.match(request).then((cachedResponse) => {
                return cachedResponse || fetch(request);
            })
        );
    }
});
