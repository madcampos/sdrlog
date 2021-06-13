import type { PDFDocumentProxy } from '../../../../lib/pdfjs/pdf.js';
import { optimize } from './optimizer';

interface PDFjsModule {
	getDocument({ url }: { url: string }): { promise: Promise<PDFDocumentProxy> },
	// eslint-disable-next-line @typescript-eslint/naming-convention
	GlobalWorkerOptions: {
		workerSrc: string
	}
}

const pdfjs = window['pdfjs-dist/build/pdf'] as PDFjsModule;

pdfjs.GlobalWorkerOptions.workerSrc = '/lib/pdfjs/pdf.worker.js';

export const COVER_WIDTH = 1024;
export const THUMB_WIDTH = 256;
export const MAX_UPSCALE_FACTOR = 1.5;

const canvas = new OffscreenCanvas(COVER_WIDTH, COVER_WIDTH);
const canvasContext = canvas.getContext('2d') as OffscreenCanvasRenderingContext2D;

export async function extractCover(file: File) {
	const fileURL = URL.createObjectURL(file);

	const pdf = await pdfjs.getDocument({ url: fileURL }).promise;
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

	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	pdf.destroy();

	return {
		cover,
		thumb
	};
}

export async function optimizeCover(cover: ImageData) {
	const { width: coverWidth, height: coverHeight, data: coverData } = cover;
	const optimizedCover = await optimize(coverData.buffer, { width: coverWidth, height: coverHeight });

	return optimizedCover;
}

interface ProcessCoverOptions {
	referenceWidth?: number,
	name?: string,
	skipOptimize?: boolean,
	forceProcess?: boolean
}

export async function processCoverFile(coverFile: File, { referenceWidth = COVER_WIDTH, name, skipOptimize = false, forceProcess = true }: ProcessCoverOptions = {}) {
	let processedCover = coverFile;

	const cover = await createImageBitmap(coverFile);
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

		let optimizedCover: Blob | Buffer;

		if (skipOptimize) {
			optimizedCover = await canvas.convertToBlob({ type: 'image/jpeg', quality: 1 });
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
