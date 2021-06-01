import mozjpegModule, { J_COLOR_SPACE } from '../../../lib/mozjpeg/mozjpeg.js';
import type { MozJPEGModule } from '../../../lib/mozjpeg/mozjpeg.js';
import defaultMozjpegOptions from '../../../lib/mozjpeg/options.js';

const IMAGE_CHANNELS = 4;

export class Encoder {
	loadedModule: MozJPEGModule | undefined;

	async encode(imageArray: BufferSource, { width, height }: { width: number, height: number }) {
		if (!this.loadedModule) {
			this.loadedModule = await mozjpegModule();
		}

		// eslint-disable-next-line @typescript-eslint/naming-convention, camelcase
		const result = this.loadedModule.encode(imageArray, width, height, IMAGE_CHANNELS, { ...defaultMozjpegOptions, in_color_space: J_COLOR_SPACE.JCS_EXT_BGRA });

		this.loadedModule.free();

		return result;
	}
}
