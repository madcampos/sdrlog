/* eslint-disable camelcase */
// eslint-env node
import { readFileSync } from 'fs';

import { defineConfig, type UserConfig } from 'vitest/config';
import { type ManifestOptions, VitePWA as vitePWA } from 'vite-plugin-pwa';
import basicSsl from '@vitejs/plugin-basic-ssl';
import rollupTsPlugin from '@rollup/plugin-typescript';
import { externalResources, internalResources, shareTarget } from './src/service-worker';

const manifest: Partial<ManifestOptions> = JSON.parse(readFileSync('./src/manifest.json', { encoding: 'utf8' }));

export default defineConfig(({ mode }) => {
	const baseUrl = mode === 'production' ? 'https://madcampos.dev/sdrlog/' : 'https://localhost:3000/';

	const config: UserConfig = {
		plugins: [
			basicSsl({
				name: 'dev-cert',
				domains: ['localhost:3000'],
				certDir: './certs'
			}),
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
		base: baseUrl,
		envPrefix: 'APP_',
		envDir: '../',
		root: 'src',
		publicDir: '../public',
		clearScreen: false,
		server: {
			host: 'localhost',
			open: false,
			cors: true,
			port: 3000
		},
		build: {
			target: 'esnext',
			emptyOutDir: true,
			outDir: '../dist',
			rollupOptions: {
				plugins: [rollupTsPlugin()],
				output: {
					generatedCode: 'es2015'
				}
			}
		},
		optimizeDeps: {
			esbuildOptions: {
				target: 'esnext'
			}
		},
		preview: {
			open: true
		},
		test: {
			include: ['**/*.test.ts'],
			passWithNoTests: true,
			maxConcurrency: 4,
			coverage: {
				processingConcurrency: 4,
				provider: 'v8',
				thresholds: {
					functions: 75,
					branches: 75,
					lines: 75,
					statements: 75
				}
			}
		}
	};

	return config;
});
