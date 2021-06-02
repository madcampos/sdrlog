/* eslint-disable @typescript-eslint/naming-convention, camelcase */

import mozjpegModule, { J_COLOR_SPACE } from '../../../lib/mozjpeg/mozjpeg.js';
import defaultMozjpegOptions from '../../../lib/mozjpeg/options.js';

const IMAGE_CHANNELS = 4;

export async function optimize(imageArray: BufferSource, { width, height }: { width: number, height: number }) {
	const mozjpeg = await mozjpegModule();

	const result = mozjpeg.encode(imageArray, width, height, IMAGE_CHANNELS, {
		...defaultMozjpegOptions,
		in_color_space: J_COLOR_SPACE.JCS_EXT_RGBA
	});

	mozjpeg.free();

	return result;
}
