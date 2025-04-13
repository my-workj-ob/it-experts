self.addEventListener('push', function (event) {
	let options = {
		body: event.data ? event.data.text() : 'No message',
		icon: '/images/icon.png', // Push notification ikonasi
		badge: '/images/badge.png', // Push notification badge (qisqa rasm)
		data: {
			url: event.data ? event.data.url : '/', // Notification bosilganda ochiladigan URL
		},
	};

	event.waitUntil(
		self.registration.showNotification('New Notification', options)
	);
});

self.addEventListener('notificationclick', function (event) {
	event.notification.close(); // Notification yopish

	// Notification bosilganda ochiladigan URL
	const url = event.notification.data.url;

	event.waitUntil(
		clients.matchAll({ type: 'window' }).then(function (clientList) {
			let hasWindowToFocus = false;

			for (let i = 0; i < clientList.length; i++) {
				const client = clientList[i];
				// Agar allaqachon ochilgan window mavjud bo'lsa, unga fokus beramiz
				if (client.url === url && 'focus' in client) {
					client.focus();
					hasWindowToFocus = true;
					break;
				}
			}

			if (!hasWindowToFocus) {
				// Agar URLga mos window mavjud bo'lmasa, yangi window ochamiz
				clients.openWindow(url);
			}
		})
	);
});

// On activate event (Service Worker yangilanishi bilan)
self.addEventListener('activate', event => {
	const cacheWhitelist = ['my-cache-name'];

	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cacheName => {
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});
