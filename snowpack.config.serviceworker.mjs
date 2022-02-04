import baseConfig from './snowpack.config.dev.mjs';

/** @type {import("snowpack").SnowpackUserConfig} */
const config = {
	...baseConfig,
	devOptions: {
		...baseConfig.devOptions,
		hmr: false
	},
	routes: baseConfig.routes?.filter((route) => route.src !== '/sw.js')
};

export default config;
