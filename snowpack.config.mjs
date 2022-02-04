import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', { encoding: 'utf8' }));

/** @type {ImportMeta['env']} */
const env = {
	MODE: 'production',
	PUBLIC_URL: packageJson.homepage,

	APP_NAME: packageJson.displayName,
	APP_SHORT_NAME: packageJson.shortName,
	APP_DESCRIPTION: packageJson.description,
	APP_KEYWORDS: packageJson.keywords.join(', '),
	APP_AUTHOR: packageJson.author.name,
	APP_VERSION: packageJson.version,

	THEME_COLOR: '#9400d3',
	BACKGROUND_COLOR: '#252525',

	APPLE_ICON: './img/icons/maskable/apple-icon-180.png',
	SMALL_ICON: './img/icons/transparent/manifest-icon-192.png',
	SMALL_ICON_BG: './img/icons/maskable/manifest-icon-192.png',
	LARGE_ICON: './img/icons/transparent/manifest-icon-512.png',
	LARGE_ICON_BG: './img/icons/maskable/manifest-icon-512.png'
};

/** @type {import("snowpack").SnowpackUserConfig } */
const config = {
	root: './src',
	env,
	mount: {
		src: '/',
		data: '/data',
		'images/covers': '/covers',
		'images/thumbs': '/thumbs',
		lib: '/lib'
	},
	exclude: ['**/*.schema.json'],
	optimize: {
		minify: true,
		// @ts-expect-error - For some reason linting doesn't allow this.
		target: 'esnext'
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
	buildOptions: {
		out: 'dist',
		metaUrlPath: 'meta'
	}
};

export default config;
