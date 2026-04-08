/* eslint-disable camelcase */
// eslint-env node
import { readFileSync } from 'node:fs';

import { type UserConfig, defineConfig } from 'vite';

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
			outDir: '../dist',
			rolldownOptions: {
				transform: { decorator: { legacy: true } }
			}
		},
		preview: {
			https: sslOptions,
			open: true,
			cors: true
		}
	};

	return config;
});
