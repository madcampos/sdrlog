import { default as baseConfig, handleManifest } from './snowpack.config.mjs';

/** @type {import("snowpack").SnowpackUserConfig["devOptions"]} */
const devOptions = {
	...baseConfig.devOptions,
	hmr: false
};

/** @type {import("snowpack").SnowpackUserConfig} */
export default {
	...baseConfig,
	devOptions,
	routes: [
		{
			match: 'all',
			src: '/sdrlog.webmanifest',
			dest: handleManifest
		}
	]
};
