import mozjpegModule from '../../../lib/mozjpeg/mozjpeg.js';
import defaultEncodeOptions from '../../../lib/mozjpeg/options.js';

const IMAGE_CHANNELS = 4;

export async function optimize(imageArray: BufferSource, { width, height }: { width: number, height: number }) {
	const mozjpeg = await mozjpegModule();

	const imagePointer = mozjpeg.encode(imageArray, width, height, IMAGE_CHANNELS, defaultEncodeOptions);

	const result = mozjpeg.getImage(imagePointer);

	mozjpeg.freeImage(imagePointer);

	return result;
}