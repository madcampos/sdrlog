import { basename } from '@mad-c/file-system-helpers/path';
import { type MozjpegEncoderFactory, createMozjpegEncoder } from '@squoosh-kit/mozjpeg';
import { MaterialSkuSchema } from './data.ts';
import { getIDBItem } from './idb-helpers.ts';

export const THUMB_WIDTH = 256;
export const COVER_WIDTH = 1024;
const MAX_UPSCALE_FACTOR = 1.5;

const ONE_MB_IN_BYTES = 1048576;
const STORAGE_TRESHOLD = 0.7;
const MB_TRESHOLD = 1024;

const ALLOWED_COVER_MIME_TYPES = [
	'image/jpeg',
	'image/png',
	'image/webp',
	'image/gif',
	'image/avif',
	'image/svg+xml'
];

let encoder: MozjpegEncoderFactory | undefined = undefined;

export const FALLBACK_COVER = import.meta.resolve('/images/base-covers/fallback.svg');
export const LOADING_COVER = import.meta.resolve('/images/base-covers/loading-anim.svg');
export const LOADING_SIMPLE_COVER = import.meta.resolve('/images/base-covers/loading-simple.svg');

export async function optimizeCover(cover: ImageData) {
	encoder ??= createMozjpegEncoder('worker');

	const optimizedCover = await encoder(cover, {
		quality: 100,
		trellis_multipass: true,
		trellis_loops: 20
	});

	return optimizedCover.slice();
}

export async function canImportCover(file: File, forceReplace = false) {
	if (!ALLOWED_COVER_MIME_TYPES.includes(file.type)) {
		return false;
	}

	const { error: parseError, data: id } = MaterialSkuSchema.safeParse(basename(file.name));
	if (parseError) {
		return false;
	}

	const material = await getIDBItem('items', id);
	if (!material) {
		return false;
	}

	const hasSavedCover = await getIDBItem('covers', id) !== undefined;
	const { quota, usage } = await navigator.storage.estimate();
	const isReachingQuota = (usage ?? 0) / (quota ?? 1) >= STORAGE_TRESHOLD;
	const isUsingTooMuchDisk = (usage ?? 0) / ONE_MB_IN_BYTES >= MB_TRESHOLD;
	const shouldReplaceCover = !(hasSavedCover && !forceReplace);

	return shouldReplaceCover && !isReachingQuota && !isUsingTooMuchDisk;
}

export async function processCoverFile(handle: FileSystemFileHandle, referenceWidth: 'cover' | 'thumb', forceProcess = true) {
	const file = await handle.getFile();

	if (!await canImportCover(file, forceProcess)) {
		return;
	}

	let processedCover = file;

	const width = referenceWidth === 'cover' ? COVER_WIDTH : THUMB_WIDTH;
	const cover = await createImageBitmap(file);
	const coverScale = width / cover.width;

	if (coverScale > MAX_UPSCALE_FACTOR && !forceProcess) {
		return;
	}

	if (coverScale !== 1 || forceProcess) {
		const scaledCover = await createImageBitmap(cover, {
			resizeWidth: cover.width * coverScale,
			resizeHeight: cover.height * coverScale
		});
		const canvas = new OffscreenCanvas(scaledCover.width, scaledCover.height);
		// oxlint-disable-next-line typescript/no-non-null-assertion
		const canvasContext = canvas.getContext('2d')!;

		canvasContext.drawImage(scaledCover, 0, 0);

		const coverImage = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
		const optimizedCover = await optimizeCover(coverImage);

		processedCover = new File([optimizedCover], handle.name, {
			type: 'image/jpeg'
		});
	}

	return processedCover;
}
