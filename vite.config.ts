/* eslint-disable camelcase */
// eslint-env node
import { readFileSync } from 'fs';

import { defineConfig, type UserConfig } from 'vitest/config';
import { loadEnv } from 'vite';
import { type ManifestOptions, VitePWA as vitePWA } from 'vite-plugin-pwa';
import vitePluginHtmlEnv from 'vite-plugin-html-env';

const sslOptions = {
	cert: readFileSync('./certs/server.crt'),
	key: readFileSync('./certs/server.key')
};

const packageJson: PackageJsonVariables = JSON.parse(readFileSync('./package.json', { encoding: 'utf8' }));

export default defineConfig(({ mode }) => {
	const env = {
		APP_PUBLIC_URL: packageJson.homepage,

		APP_NAME: packageJson.displayName,
		APP_SHORT_NAME: packageJson.shortName,
		APP_DESCRIPTION: packageJson.description,
		APP_KEYWORDS: packageJson.keywords.join(', '),
		APP_AUTHOR: packageJson.author.name,
		APP_VERSION: packageJson.version,

		APP_THEME_COLOR: '#9400d3',
		APP_BACKGROUND_COLOR: '#252525',

		APP_APPLE_ICON: 'icons/maskable/apple-icon-180.png',
		APP_SMALL_ICON: 'icons/transparent/manifest-icon-192.png',
		APP_SMALL_ICON_BG: 'icons/maskable/manifest-icon-192.png',
		APP_LARGE_ICON: 'icons/transparent/manifest-icon-512.png',
		APP_LARGE_ICON_BG: 'icons/maskable/manifest-icon-512.png',
		...loadEnv(mode, process.cwd(), 'APP_')
	};

	const manifest: Partial<ManifestOptions> = {
		id: env.APP_PUBLIC_URL,
		scope: env.APP_PUBLIC_URL,
		name: env.APP_NAME,
		short_name: env.APP_SHORT_NAME,
		lang: 'en-US',
		description: env.APP_DESCRIPTION,
		categories: ['entertainment', 'utilities', 'games'],
		display: 'standalone',
		orientation: 'portrait',
		display_override: ['window-controls-overlay'],
		background_color: env.APP_BACKGROUND_COLOR,
		theme_color: env.APP_THEME_COLOR,
		icons: [
			{
				src: env.APP_SMALL_ICON,
				sizes: '192x192',
				type: 'image/png',
				purpose: 'any'
			},
			{
				src: env.APP_SMALL_ICON_BG,
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable'
			},
			{
				src: env.APP_LARGE_ICON,
				sizes: '512x512',
				type: 'image/png',
				purpose: 'any'
			},
			{
				src: env.APP_LARGE_ICON_BG,
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable'
			}
		],
		protocol_handlers: [
			{
				protocol: 'web+sdrlog',
				url: './?search=%s'
			}
		]
	};

	const config: UserConfig = {
		plugins: [
			vitePluginHtmlEnv({
				compiler: false,
				compress: true,
				envPrefixes: 'APP_',
				prefix: '{{',
				suffix: '}}',
				...env
			}),
			vitePWA({
				registerType: 'prompt',
				minify: true,
				includeAssets: ['/icons/favicon.svg'],
				manifest,
				scope: env.APP_PUBLIC_URL,
				workbox: {
					cleanupOutdatedCaches: true,
					clientsClaim: true,
					navigationPreload: false,
					runtimeCaching: [
						{
							urlPattern: new RegExp(`^${env.APP_PUBLIC_URL}.*`, 'iu'),
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
							urlPattern: new RegExp(`^(?!${env.APP_PUBLIC_URL}).*`, 'iu'),
							handler: 'NetworkOnly'
						}
					]
				},
				devOptions: {
					enabled: false
				}
			})
		],
		base: env.APP_PUBLIC_URL,
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
