import type { PDFDocumentProxy } from '../../../../lib/pdfjs/pdf.js';

import { ProgressOverlay } from '../progress/progress';
import { getAllFiles, getCover, saveCover, saveThumb } from '../data-operations/idb-persistence';
import { optimize } from './optimizer';
import { isNameExcluded } from './names-filter-list';
import { extractMetadataFromFileName } from './files-reader';

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
const THUMB_WIDTH = 256;

const canvas = new OffscreenCanvas(COVER_WIDTH, COVER_WIDTH);
const canvasContext = canvas.getContext('2d') as OffscreenCanvasRenderingContext2D;

async function extractCover(file: File) {
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

export async function extractCoversFromFiles() {
	const progressOverlay = ProgressOverlay.createOverlay({ title: 'Extract covers' });

	try {
		const files = await getAllFiles();

		progressOverlay.setTotal(files.length);

		for await (const file of files) {
			progressOverlay.increment();

			const { id } = extractMetadataFromFileName(file.name);

			if (id && file.name.endsWith('.pdf') && !isNameExcluded(file.name)) {
				const savedCover = await getCover(id);

				if (!savedCover) {
					const isPermissionGranted = await file.requestPermission({ mode: 'read' }) === 'granted';

					// eslint-disable-next-line max-depth
					if (!isPermissionGranted) {
						await file.requestPermission({ mode: 'read' });
					}

					const itemFile = await file.getFile();

					const { cover, thumb } = await extractCover(itemFile);
					const fileName = `${id}.jpg`;

					const { width: coverWidth, height: coverHeight, data: coverData } = cover;
					const optimizedCover = await optimize(coverData.buffer, { width: coverWidth, height: coverHeight });

					const coverFile = new File([optimizedCover], fileName, {
						type: 'image/jpeg'
					});

					await saveCover(id, coverFile);

					const { width: thumbWidth, height: thumbHeight, data: thumbData } = thumb;
					const optimizedThumb = await optimize(thumbData.buffer, { width: thumbWidth, height: thumbHeight });

					const thumbFile = new File([optimizedThumb], fileName, {
						type: 'image/jpeg'
					});

					await saveThumb(id, thumbFile);
				}
			}
		}
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
	}

	progressOverlay.remove();
}

export async function importCoversFromFolder() {
	const progressOverlay = ProgressOverlay.createOverlay({ title: 'Import covers' });

	try {
		const dir = await window.showDirectoryPicker({
			id: 'coversFolder',
			startIn: 'downloads'
		});

		for await (const entry of dir.values()) {
			if (entry.kind === 'file') {
				const file = await entry.getFile();

				if (file.type === 'image/jpeg') {
					await saveCover(file.name.replace('.jpg', ''), file);
				}
			}
		}
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
	}

	progressOverlay.remove();
}
