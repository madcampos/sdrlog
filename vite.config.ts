/* eslint-disable camelcase */
// eslint-env node
import { readFileSync } from 'node:fs';

import { ModuleKind, ModuleResolutionKind, NewLineKind, ScriptTarget } from 'typescript';
import { defineConfig, type UserConfig } from 'vite';
import { type ManifestOptions, VitePWA as vitePWA } from 'vite-plugin-pwa';
import { vitePluginTypescriptTranspile } from 'vite-plugin-typescript-transpile';
import { externalResources, internalResources, shareTarget } from './src/service-worker';

const manifest: Partial<ManifestOptions> = JSON.parse(readFileSync('./src/manifest.json', { encoding: 'utf8' }));

const IS_DEBUG = false;

export default defineConfig(({ mode }) => {
	const baseUrl = mode === 'production' || IS_DEBUG ? 'https://sdrlog.madcampos.dev/' : 'https://localhost:3000/';

	const sslOptions = mode === 'production' || IS_DEBUG
		? undefined
		: {
			cert: readFileSync('./certs/server.crt', 'utf-8'),
			key: readFileSync('./certs/server.key', 'utf-8')
		};

	const config: UserConfig = {
		plugins: [
			vitePluginTypescriptTranspile({
				compilerOverrides: {
					allowImportingTsExtensions: true,
					allowJs: true,
					allowSyntheticDefaultImports: true,
					allowUnreachableCode: false,
					baseUrl: '.',
					checkJs: true,
					composite: true,
					esModuleInterop: true,
					experimentalDecorators: false,
					forceConsistentCasingInFileNames: true,
					incremental: true,
					lib: ['DOM', 'DOM.Iterable', 'ESNext'],
					module: ModuleKind.ESNext,
					moduleResolution: ModuleResolutionKind.Node16,
					newLine: NewLineKind.LineFeed,
					noEmit: true,
					noFallthroughCasesInSwitch: true,
					noImplicitOverride: true,
					noImplicitReturns: true,
					noImplicitThis: true,
					noPropertyAccessFromIndexSignature: true,
					noUncheckedIndexedAccess: true,
					noUnusedLocals: true,
					noUnusedParameters: true,
					removeComments: false,
					resolveJsonModule: true,
					skipDefaultLibCheck: true,
					skipLibCheck: true,
					sourceMap: false,
					strict: true,
					target: ScriptTarget.ES2023,
					tsBuildInfoFile: 'dist/.tsbuildinfo',
					useDefineForClassFields: true,
					useUnknownInCatchVariables: false,
					verbatimModuleSyntax: true
				}
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
				showMaximumFileSizeToCacheInBytesWarning: true,
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
			open: true,
			cors: true
		}
	};

	return config;
});
