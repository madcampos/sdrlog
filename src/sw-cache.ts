/* eslint-disable @typescript-eslint/no-magic-numbers */

import type { VitePWAOptions } from 'vite-plugin-pwa';

type Unpacked<T> = NonNullable<T extends (infer U)[] ? U : T>;

type RuntimeCaching = Unpacked<VitePWAOptions['workbox']['runtimeCaching']>;

export const thumbsCache: RuntimeCaching = {
	urlPattern: ({ sameOrigin, request }) => {
		const isCacheHit = sameOrigin && request.destination === 'image' && request.url.includes('/thumbs/');

		return isCacheHit;
	},
	handler: 'CacheFirst',
	options: {
		cacheName: 'thumbs-cache',
		expiration: {
			maxAgeSeconds: 60 * 60 * 24 * 365,
			maxEntries: 1000
		}
	}
};

export const coversCache: RuntimeCaching = {
	urlPattern: ({ sameOrigin, request }) => {
		const isCacheHit = sameOrigin && request.destination === 'image' && request.url.includes('/covers/');

		return isCacheHit;
	},
	handler: 'CacheFirst',
	options: {
		cacheName: 'covers-cache',
		expiration: {
			maxAgeSeconds: 60 * 60 * 24 * 365,
			maxEntries: 1000
		}
	}
};

export const pagesCache: RuntimeCaching = {
	urlPattern: ({ sameOrigin, request }) => {
		const isCacheHit = sameOrigin && request.destination === 'document';

		return isCacheHit;
	},
	handler: 'NetworkFirst',
	options: {
		matchOptions: { ignoreSearch: true },
		precacheFallback: { fallbackURL: '/offline/index.html' },
		cacheName: 'pages-cache',
		expiration: {
			maxAgeSeconds: 60 * 60 * 24,
			maxEntries: 100
		},
		cacheableResponse: {
			statuses: [0, 200]
		}
	}
};

export const assetsCache: RuntimeCaching = {
	urlPattern: ({ request, sameOrigin }) => {
		const isCacheHit = sameOrigin && !['script', 'style', 'document'].includes(request.destination) && request.url.includes('/covers/') && request.url.includes('/thumbs/');

		return isCacheHit;
	},
	handler: 'CacheFirst',
	options: {
		cacheName: 'assets-cache',
		expiration: {
			maxAgeSeconds: 60 * 60 * 24 * 30 * 12,
			maxEntries: 500
		},
		rangeRequests: true,
		cacheableResponse: {
			statuses: [0, 200]
		}
	}
};

export const scriptsCache: RuntimeCaching = {
	urlPattern: ({ request, sameOrigin }) => {
		const isCacheHit = sameOrigin && ['script', 'style'].includes(request.destination);

		return isCacheHit;
	},
	handler: 'StaleWhileRevalidate',
	options: {
		cacheName: 'scripts-cache',
		expiration: {
			maxAgeSeconds: 60 * 60 * 24,
			maxEntries: 100
		},
		cacheableResponse: {
			statuses: [0, 200]
		},
		backgroundSync: {
			name: 'scripts-sync',
			options: {
				maxRetentionTime: 60 * 60 * 24
			}
		}
	}
};

export const externalResourcesCache: RuntimeCaching = {
	urlPattern: ({ sameOrigin }) => {
		const isCacheHit = !sameOrigin;

		return isCacheHit;
	},
	handler: 'NetworkOnly'
};

export const shareTarget: RuntimeCaching = {
	urlPattern: ({ sameOrigin, url }) => sameOrigin && url.pathname.endsWith('item'),
	method: 'POST',
	handler: async ({ event, request }) => {
		// @ts-expect-error
		const formData = await event.request.formData();

		// TODO: handle form data
		// Ref: https://docs.pwabuilder.com/#/home/native-features?id=how-to-share-to-your-pwa

		return fetch({
			...request,
			method: 'GET'
		});
	}
};

export const searchHandler: RuntimeCaching = {
	urlPattern: ({ sameOrigin, url }) => sameOrigin && url.searchParams.has('search'),
	handler: async ({ event: _event, request: _request }) => {
		// TODO: handle search!
		const body = JSON.stringify([
			/**
			 * Ref: https://github.com/dewitt/opensearch/blob/master/mediawiki/Specifications/OpenSearch/Extensions/Suggestions/1.1/Draft%201.wiki#example-2
			 * Follows the format:
			 * [
			 *    "query",
			 *    ["suggestion 1", "suggestion 2", "suggestion 3"],
			 *    ["description 1", "description 2", "description 3"],
			 *    ["url 1", "url 2", "url 3"]
			 * ]
			 */
		]);

		const response = new Response(body, {
			status: 200,
			statusText: 'OK',
			headers: {
				'Content-Type': 'text/html'
			}
		});

		return Promise.resolve(response);
	}
};

// TODO: add support for push notifications
// Ref: https://docs.pwabuilder.com/#/home/native-features?id=adding-a-push-listener-to-our-service-worker

// TODO: add support for background sync
// Ref: https://docs.pwabuilder.com/#/home/native-features?id=background-sync
