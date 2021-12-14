process.env.NODE_ENV = 'test';

import { readFileSync } from 'fs';

import snowpackConfig from './snowpack.config.mjs';
// @ts-expect-error - Don't type check plugin
import snowpackPlugin from '@snowpack/web-test-runner-plugin';
import { playwrightLauncher } from '@web/test-runner-playwright';

const htmlFile = readFileSync('./src/index.html', { encoding: 'utf-8' }).replaceAll(/%(.+?)%/giu, (_, match) => snowpackConfig?.env?.[match] ?? '');

/**
 * @param {string} testPath
 */
function testRunnerHtml(testPath) {
	const replaceLoader = htmlFile.replace('./js/loader.js', testPath);

	return replaceLoader;
}

/** @type {import('@web/test-runner').TestRunnerConfig} */
export default {
	files: './src/**/*.test.{ts,js}',
	rootDir: './src',
	browserLogs: true,
	testRunnerHtml,
	plugins: [snowpackPlugin()],
	browsers: [
		playwrightLauncher({ product: 'chromium' }),
		playwrightLauncher({ product: 'firefox' }),
		playwrightLauncher({ product: 'webkit' })
	]
};
