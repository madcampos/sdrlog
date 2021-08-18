/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/naming-convention, @typescript-eslint/no-unsafe-assignment */
import { default as baseConfig } from './snowpack.config.mjs';

const env = {
	...baseConfig.env,
	PUBLIC_URL: 'https://madcampos.github.io/sdrlog/'
};

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
	...baseConfig,
	env
};
