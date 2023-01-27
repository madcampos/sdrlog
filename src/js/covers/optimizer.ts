import type { default as MozJPEGModule } from '@saschazar/wasm-mozjpeg';
import defaultEncodeOptions from '@saschazar/wasm-mozjpeg/options';

const IMAGE_CHANNELS = 4;

let mozjpegModule: typeof MozJPEGModule | undefined;

export async function optimize(imageArray: BufferSource, { width, height }: { width: number, height: number }) {
	if (!mozjpegModule) {
		// @ts-expect-error - This is so the compiler doesn't complain about the import() call
		// eslint-disable-next-line require-atomic-updates
		mozjpegModule = await import('@saschazar/wasm-mozjpeg');
	}

	const mozjpeg = await (mozjpegModule as typeof MozJPEGModule)();

	const result = mozjpeg.encode(imageArray, width, height, IMAGE_CHANNELS, defaultEncodeOptions);

	mozjpeg.free();

	return result;
}
