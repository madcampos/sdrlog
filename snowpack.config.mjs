import { readFileSync } from 'fs';

const sslOptions = {
	cert: readFileSync('./snowpack.crt'),
	key: readFileSync('./snowpack.key')
};

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
	root: './src',
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
		'@snowpack/plugin-dotenv',
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
