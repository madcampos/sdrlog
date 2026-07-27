// oxlint-env node

import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';
import { default as viteConfig } from './vite.config.ts';

// oxlint-disable-next-line import/no-default-export
export default defineConfig((config) => ({
	...viteConfig(config),
	plugins: [],
	test: {
		coverage: {
			provider: 'v8',
			enabled: true
		},
		browser: {
			enabled: true,
			provider: playwright(),
			instances: [
				{ browser: 'chromium' }
			],
			ui: false,
			headless: true
		},
		open: false
	}
}));
