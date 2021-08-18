/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/naming-convention, @typescript-eslint/no-unsafe-assignment */
import { default as baseConfig, handleManifest } from './snowpack.config.mjs';

const devOptions = {
	...baseConfig.devOptions,
	hmr: false
};

/** @type {import("snowpack").SnowpackUserConfig } */
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
