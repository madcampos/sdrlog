// eslint-env node

import { playwright } from '@vitest/browser-playwright';
import { readFileSync } from 'node:fs';
import type { UserConfig } from 'vite';
import { defineConfig } from 'vitest/config';

// oxlint-disable-next-line import/no-default-export
export default defineConfig(({ mode }) => {
	const sslOptions = mode === 'production'
		? undefined
		: {
			cert: readFileSync('./certs/server.crt', 'utf-8'),
			key: readFileSync('./certs/server.key', 'utf-8')
		};

	const config: UserConfig = {
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
			port: 3030
		},
		build: {
			target: 'esnext',
			emptyOutDir: true,
			outDir: '../dist'
		},
		preview: {
			https: sslOptions,
			open: true,
			cors: true
		},
		test: {
			browser: {
				enabled: true,
				provider: playwright(),
				// https://vitest.dev/config/browser/playwright
				instances: [
					{ browser: 'chromium' }
				]
			}
		}
	};

	return config;
});
