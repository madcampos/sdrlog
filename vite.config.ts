/* eslint-disable camelcase */
// eslint-env node
import { readFileSync } from 'fs';

import { defineConfig, type UserConfig } from 'vitest/config';
import { type ManifestOptions, VitePWA as vitePWA } from 'vite-plugin-pwa';

const sslOptions = {
	cert: readFileSync('./certs/server.crt'),
	key: readFileSync('./certs/server.key')
};

const packageJson: PackageJsonVariables = JSON.parse(readFileSync('./package.json', { encoding: 'utf8' }));

export default defineConfig(({ mode }) => {
	const manifest: Partial<ManifestOptions> = {
		id: packageJson.homepage,
		scope: packageJson.homepage,
		name: packageJson.displayName,
		short_name: packageJson.shortName,
		lang: 'en-US',
		dir: 'ltr',
		description: packageJson.description,
		categories: ['entertainment', 'utilities', 'games'],
		display: 'standalone',
		orientation: 'portrait',
		display_override: ['window-controls-overlay'],
		background_color: '#252525',
		theme_color: '#9400d3',
		prefer_related_applications: false,
		icons: [
			{
				src: 'icons/transparent/manifest-icon-192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'any'
			},
			{
				src: 'icons/maskable/manifest-icon-192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable'
			},
			{
				src: 'icons/transparent/manifest-icon-512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'any'
			},
			{
				src: 'icons/maskable/manifest-icon-512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable'
			}
		],
		protocol_handlers: [
			{
				protocol: 'web+sdrlog',
				url: `${packageJson.homepage}/?search=%s`
			}
		],
		shortcuts: [
			{
				name: 'Search',
				short_name: 'Search',
				description: 'Search for an item',
				url: `${packageJson.homepage}/?search=`,
				icons: [
					{
						src: 'icons/actions/search.png',
						sizes: '192x192'
					}
				]
			},
			{
				name: 'App Information',
				short_name: 'Info',
				description: 'Information about how the app is strutctured',
				url: `${packageJson.homepage}/info`,
				icons: [
					{
						src: 'icons/actions/info.png',
						sizes: '192x192'
					}
				]
			},
			{
				name: 'New Item',
				short_name: 'New Item',
				description: 'adds a new item to the collection',
				url: `${packageJson.homepage}/item`,
				icons: [
					{
						src: 'icons/actions/new-item.png',
						sizes: '192x192'
					}
				]
			}
		],
		screenshots: [
			{
				src: 'screenshots/wide-1.png',
				sizes: '1280x720',
				type: 'image/png',
				platform: 'wide'
			},
			{
				src: 'screenshots/wide-2.png',
				sizes: '1280x720',
				type: 'image/png',
				platform: 'wide'
			},
			{
				src: 'screenshots/wide-3.png',
				sizes: '1280x720',
				type: 'image/png',
				platform: 'wide'
			},
			{
				src: 'screenshots/wide-4.png',
				sizes: '1280x720',
				type: 'image/png',
				platform: 'wide'
			},
			{
				src: 'screenshots/narrow-1.png',
				sizes: '720x1280',
				type: 'image/png',
				platform: 'narrow'
			},
			{
				src: 'screenshots/narrow-2.png',
				sizes: '720x1280',
				type: 'image/png',
				platform: 'narrow'
			},
			{
				src: 'screenshots/narrow-3.png',
				sizes: '720x1280',
				type: 'image/png',
				platform: 'narrow'
			},
			{
				src: 'screenshots/narrow-4.png',
				sizes: '720x1280',
				type: 'image/png',
				platform: 'narrow'
			}
		]
		// TODO: include share target
	};

	const config: UserConfig = {
		plugins: [
			vitePWA({
				registerType: 'prompt',
				minify: true,
				includeAssets: ['/icons/favicon.svg'],
				manifest,
				scope: packageJson.homepage,
				workbox: {
					cleanupOutdatedCaches: true,
					clientsClaim: true,
					navigationPreload: false,
					runtimeCaching: [
						{
							urlPattern: new RegExp(`^${packageJson.homepage}.*`, 'iu'),
							handler: 'CacheFirst',
							options: {
								cacheName: 'app-cache',
								expiration: {
									// eslint-disable-next-line @typescript-eslint/no-magic-numbers
									maxAgeSeconds: 60 * 60 * 24 * 30,
									maxEntries: 100
								}
							}
						},
						{
							urlPattern: new RegExp(`^(?!${packageJson.homepage}).*`, 'iu'),
							handler: 'NetworkOnly'
						}
					]
				},
				devOptions: {
					enabled: false
				}
			})
		],
		base: mode === 'production' ? packageJson.homepage : 'https://localhost:3000/',
		envPrefix: 'APP_',
		envDir: '../',
		root: 'src',
		publicDir: '../public',
		clearScreen: false,
		server: {
			host: 'localhost',
			https: sslOptions,
			open: false,
			cors: true,
			port: 3000
		},
		build: {
			target: 'esnext',
			emptyOutDir: true,
			outDir: '../dist',
			rollupOptions: {
				output: {
					generatedCode: 'es2015',
					inlineDynamicImports: false
				}
			}
		},
		preview: {
			https: sslOptions,
			open: true
		},
		test: {
			include: ['**/*.test.ts'],
			minThreads: 1,
			maxThreads: 4,
			passWithNoTests: true,
			maxConcurrency: 4,
			coverage: {
				functions: 75,
				branches: 75,
				lines: 75,
				statements: 75
			}
		}
	};

	return config;
});
