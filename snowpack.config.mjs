/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access */

import { readFileSync } from 'fs';

const mode = process.env.NODE_ENV;
let sslOptions = false;
let publicUrl = 'https://localhost:8080/';

if (mode === 'development') {
	sslOptions = {
		cert: readFileSync('./snowpack.crt'),
		key: readFileSync('./snowpack.key')
	};
} else {
	publicUrl = 'https://madcampos.github.io/sdrlog/';
}

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
	mode,
	root: './src',
	env: {
		PUBLIC_URL: publicUrl
	},
	mount: {
		src: '/',
		data: '/data',
		covers: '/covers',
		thumbs: '/thumbs',
		lib: '/lib'
	},
	exclude: ['**/*.schema.json'],
	optimize: {
		minify: true,
		target: 'es2020'
	},
	plugins: [
		[
			'snowpack-plugin-minify-html',
			{
				htmlMinifierOptions: {
					caseSensitive: true,
					collapseBooleanAttributes: true,
					collapseInlineTagWhitespace: true,
					collapseWhitespace: true,
					conservativeCollapse: true,
					decodeEntities: true,
					minifyCSS: true,
					minifyURLs: true,
					quoteCharacter: '"',
					removeComments: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
					sortAttributes: true,
					sortClassName: true,
					useShortDoctype: true
				}
			}
		]
	],
	devOptions: { secure: sslOptions },
	buildOptions: {
		out: 'dist',
		metaUrlPath: 'meta'
	}
};
