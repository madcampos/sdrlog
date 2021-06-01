import mozjpegModule from '../../../lib/mozjpeg/mozjpeg.js';
import type { MozJPEGModule } from '../../../lib/mozjpeg/mozjpeg.js';
import defaultMozjpegOptions from '../../../lib/mozjpeg/options.js';

const IMAGE_CHANNELS = 4;

export class Encoder {
	loadedModule: MozJPEGModule | undefined;

	async encode(imageArray: Uint8Array | Uint8ClampedArray, { width, height }: { width: number, height: number }) {
		if (!this.loadedModule) {
			this.loadedModule = await mozjpegModule();
		}

		const result = this.loadedModule.encode(imageArray, width, height, IMAGE_CHANNELS, defaultMozjpegOptions);

		this.loadedModule.free();

		return result;
	}
}
