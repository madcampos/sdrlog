import type { PDFDocumentProxy } from '../../../lib/pdfjs/pdf.js';

interface PDFjsModule {
	getDocument({ url }: { url: string }): { promise: Promise<PDFDocumentProxy> },
	// eslint-disable-next-line @typescript-eslint/naming-convention
	GlobalWorkerOptions: {
		workerSrc: string
	}
}

const pdfjs = window['pdfjs-dist/build/pdf'] as PDFjsModule;

pdfjs.GlobalWorkerOptions.workerSrc = '/lib/pdfjs/pdf.worker.js';

const COVER_WIDTH = 2048;

const canvas = new OffscreenCanvas(COVER_WIDTH, COVER_WIDTH);
const canvasContext = canvas.getContext('2d') as OffscreenCanvasRenderingContext2D;

export async function extractCover(file: File) {
	const fileURL = URL.createObjectURL(file);

	const pdf = await pdfjs.getDocument({ url: fileURL }).promise;
	const page = await pdf.getPage(1);
	const originalViewport = page.getViewport({ scale: 1 });
	const scale = COVER_WIDTH / originalViewport.width;
	const viewport = page.getViewport({ scale });

	canvas.height = viewport.height;
	canvas.width = viewport.width;

	await page.render({
		canvasContext,
		viewport
	}).promise;

	return canvasContext.getImageData(0, 0, canvas.width, canvas.height);
}
