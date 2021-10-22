/* eslint-disable @typescript-eslint/naming-convention */

import { default as baseConfig } from './snowpack.config.mjs';


/** @type {Record<Uppercase<string>, string>} */
const env = {
	...baseConfig.env,
	PUBLIC_URL: 'https://madcampos.github.io/sdrlog/'
};

/** @type {import("snowpack").SnowpackUserConfig} */
export default {
	...baseConfig,
	env
};
