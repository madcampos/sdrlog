/* eslint-disable camelcase */
// eslint-env node
import { readFileSync } from 'fs';

import { defineConfig, type UserConfig } from 'vite';
import { type ManifestOptions, VitePWA as vitePWA } from 'vite-plugin-pwa';
import { externalResources, internalResources, shareTarget } from './src/service-worker';

const manifest: Partial<ManifestOptions> = JSON.parse(readFileSync('./src/manifest.json', { encoding: 'utf8' }));

export default defineConfig(({ mode }) => {
	const baseUrl = mode === 'production' ? 'https://sdrlog.madcampos.dev/' : 'https://localhost:3000/';

	const sslOptions = mode === 'production'
		? undefined
		: {
			cert: readFileSync('./certs/server.crt', 'utf-8'),
			key: readFileSync('./certs/server.key', 'utf-8')
		};

	const config: UserConfig = {
		plugins: [
			vitePWA({
				registerType: 'prompt',
				minify: true,
				includeAssets: ['/icons/favicon.svg'],
				manifest: {
					...manifest,
					scope: baseUrl
				},
				scope: baseUrl,
				workbox: {
					cleanupOutdatedCaches: true,
					clientsClaim: true,
					navigationPreload: false,
					runtimeCaching: [
						internalResources,
						externalResources,
						shareTarget
					]
				},
				devOptions: {
					enabled: false
				}
			})
		],
		esbuild: { target: 'esnext' },
		base: baseUrl,
		envPrefix: 'APP_',
		envDir: '../',
		root: 'src',
		publicDir: '../public',
		clearScreen: false,
		server: {
			https: sslOptions,
			host: 'localhost',
			open: false,
			cors: true,
			port: 3000
		},
		build: {
			target: 'esnext',
			emptyOutDir: true,
			outDir: '../dist'
		},
		optimizeDeps: { esbuildOptions: { target: 'esnext' } },
		preview: {
			https: sslOptions,
			open: true
		}
	};

	return config;
});
