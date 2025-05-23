import type { default as PDFJS } from 'pdfjs-dist';
import type { optimize as OptimizerType } from './cover-optimizer';

import pdfJsWorkerSource from 'pdfjs-dist/build/pdf.worker?url';
import type { MaterialCover } from '../../data/data';

let optimize: typeof OptimizerType | undefined;
let pdfjs: typeof PDFJS | undefined;

export const COVER_WIDTH = 1024;
export const THUMB_WIDTH = 256;
export const MAX_UPSCALE_FACTOR = 1.5;

if (!document.querySelector('#cover-canvas')) {
	document.body.insertAdjacentHTML('afterbegin', '<div hidden><canvas id="cover-canvas" hidden></canvas></div>');
}

const canvas = document.querySelector('#cover-canvas') as HTMLCanvasElement;
const canvasContext = canvas.getContext('2d', { willReadFrequently: true, desynchronized: true, alpha: false }) as CanvasRenderingContext2D;

canvas.width = COVER_WIDTH;
canvas.height = COVER_WIDTH;

export async function extractCover(file: File) {
	const fileURL = URL.createObjectURL(file);

	if (!('pdfjs' in window)) {
		pdfjs = await import('pdfjs-dist');
		pdfjs.GlobalWorkerOptions.workerSrc = pdfJsWorkerSource;
	}

	const pdf = await (pdfjs as typeof PDFJS).getDocument({ url: fileURL }).promise;
	const page = await pdf.getPage(1);
	const originalViewport = page.getViewport({ scale: 1 });

	const coverScale = COVER_WIDTH / originalViewport.width;
	const coverViewport = page.getViewport({ scale: coverScale });

	canvas.height = coverViewport.height;
	canvas.width = coverViewport.width;

	await page.render({
		canvasContext,
		viewport: coverViewport
	}).promise;

	const cover = canvasContext.getImageData(0, 0, canvas.width, canvas.height);

	const thumbScale = THUMB_WIDTH / originalViewport.width;
	const thumbViewport = page.getViewport({ scale: thumbScale });

	canvas.height = thumbViewport.height;
	canvas.width = thumbViewport.width;

	await page.render({
		canvasContext,
		viewport: thumbViewport
	}).promise;

	const thumb = canvasContext.getImageData(0, 0, canvas.width, canvas.height);

	void pdf.destroy();

	return {
		cover,
		thumb
	};
}

export async function optimizeCover(cover: ImageData) {
	optimize ??= (await import('./cover-optimizer')).optimize;

	const { width: coverWidth, height: coverHeight, data: coverData } = cover;
	const optimizedCover = await optimize(coverData.buffer as ArrayBuffer, { width: coverWidth, height: coverHeight });

	return optimizedCover;
}

interface ProcessCoverOptions {
	referenceWidth?: number;
	name?: string;
	skipOptimize?: boolean;
	forceProcess?: boolean;
}

export async function processCoverFile(coverFile: MaterialCover, { referenceWidth = COVER_WIDTH, name, skipOptimize = false, forceProcess = true }: ProcessCoverOptions = {}) {
	if (typeof coverFile === 'string') {
		return;
	}

	let processedCover = coverFile;

	const cover = await createImageBitmap((await (coverFile as FileSystemFileHandle)?.getFile()) ?? coverFile);
	const coverScale = referenceWidth / cover.width;

	if (coverScale > MAX_UPSCALE_FACTOR && !forceProcess) {
		throw new Error('Cover would be upscaled!');
	}

	if (coverScale !== 1 || forceProcess) {
		const scaledCover = await createImageBitmap(cover, {
			resizeWidth: cover.width * coverScale,
			resizeHeight: cover.height * coverScale
		});

		canvas.height = scaledCover.height;
		canvas.width = scaledCover.width;
		canvasContext.drawImage(scaledCover, 0, 0);

		let optimizedCover: ArrayBuffer | Blob | BufferSource;

		if (skipOptimize) {
			optimizedCover = (await new Promise((resolve: BlobCallback) => {
				canvas.toBlob(resolve, 'image/jpeg', 1);
			})) as Blob;
		} else {
			const coverImage = canvasContext.getImageData(0, 0, canvas.width, canvas.height);

			optimizedCover = await optimizeCover(coverImage);
		}

		processedCover = new File([optimizedCover], name ?? coverFile.name, {
			type: 'image/jpeg'
		});
	}

	return processedCover;
}
