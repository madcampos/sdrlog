import mozjpegModule from '@saschazar/wasm-mozjpeg';
import defaultEncodeOptions from '@saschazar/wasm-mozjpeg/options';

const IMAGE_CHANNELS = 4;

export async function optimize(imageArray: BufferSource, { width, height }: { width: number, height: number }) {
	const mozjpeg = await mozjpegModule();

	const result = mozjpeg.encode(imageArray, width, height, IMAGE_CHANNELS, defaultEncodeOptions);

	mozjpeg.free();

	return result;
}
