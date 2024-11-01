/* eslint-disable camelcase */
// eslint-env node
import { readFileSync } from 'node:fs';

import { ModuleKind, ModuleResolutionKind, NewLineKind, ScriptTarget } from 'typescript';
import { defineConfig, type UserConfig } from 'vite';
import { type ManifestOptions, VitePWA as vitePWA } from 'vite-plugin-pwa';
import { vitePluginTypescriptTranspile } from 'vite-plugin-typescript-transpile';
import { assetsCache, coversCache, externalResourcesCache, pagesCache, scriptsCache, searchHandler, shareTarget, thumbsCache } from './src/sw-cache';

import manifest from './src/manifest.json';
import tsconfig from './tsconfig.json';

const IS_DEBUG = false;

export default defineConfig(({ mode }) => {
	let baseUrl = 'https://sdrlog.madcampos.dev/';
	let sslOptions = undefined;

	if (mode !== 'production' || IS_DEBUG) {
		baseUrl = 'https://localhost:3000/';

		sslOptions = {
			cert: readFileSync('./certs/server.crt', 'utf-8'),
			key: readFileSync('./certs/server.key', 'utf-8')
		};
	}

	const config: UserConfig = {
		plugins: [
			vitePluginTypescriptTranspile({
				compilerOverrides: {
					...tsconfig.compilerOptions,
					module: ModuleKind.ESNext,
					moduleResolution: ModuleResolutionKind.Node16,
					newLine: NewLineKind.LineFeed,
					target: ScriptTarget.ES2023
				}
			}),
			vitePWA({
				registerType: 'prompt',
				minify: true,
				includeAssets: ['/icons/favicon.svg', '/index.html'],
				manifest: {
					...(manifest as Partial<ManifestOptions>),
					scope: baseUrl
				},
				scope: baseUrl,
				showMaximumFileSizeToCacheInBytesWarning: true,
				workbox: {
					cacheId: crypto.randomUUID(),
					globPatterns: [],
					navigateFallback: '/index.html',
					cleanupOutdatedCaches: true,
					clientsClaim: true,
					navigationPreload: true,
					directoryIndex: 'index.html',
					maximumFileSizeToCacheInBytes: 1024 * 128,
					skipWaiting: true,
					runtimeCaching: [
						thumbsCache,
						coversCache,
						assetsCache,
						scriptsCache,
						pagesCache,
						externalResourcesCache,
						shareTarget,
						searchHandler
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
			open: true,
			cors: true
		}
	};

	return config;
});
