import type { VitePWAOptions } from 'vite-plugin-pwa';

type Unpacked<T> = NonNullable<T extends (infer U)[] ? U : T>;

type RuntimeCaching = Unpacked<VitePWAOptions['workbox']['runtimeCaching']>;

const baseUrl = 'https://sdrlog.madcampos.dev/';

export const internalResources: RuntimeCaching = {
	urlPattern: new RegExp(`^${baseUrl}.*`, 'iu'),
	handler: 'CacheFirst',
	options: {
		cacheName: 'app-cache',
		expiration: {
			// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			maxAgeSeconds: 60 * 60 * 24 * 30,
			maxEntries: 100
		}
	}
};

export const externalResources: RuntimeCaching = {
	urlPattern: new RegExp(`^(?!${baseUrl}).*`, 'iu'),
	handler: 'NetworkOnly'
};

export const shareTarget: RuntimeCaching = {
	urlPattern: new RegExp(`^${baseUrl}item$`, 'iu'),
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
	urlPattern: new RegExp(`^${baseUrl}?.*search=.+`, 'iu'),
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
