import type { PDFDocumentProxy } from '../../../../lib/pdfjs/pdf.js';

import { ProgressOverlay } from '../progress/progress';
import { getAllFiles, getCover, getMaterial, saveCover, saveThumb } from '../data-operations/idb-persistence';
import { optimize } from './optimizer';
import { isNameExcluded } from '../files-reader/names-filter-list';
import { extractMetadataFromFileName, getFilePermission } from '../files-reader/files-reader';

interface PDFjsModule {
	getDocument({ url }: { url: string }): { promise: Promise<PDFDocumentProxy> },
	// eslint-disable-next-line @typescript-eslint/naming-convention
	GlobalWorkerOptions: {
		workerSrc: string
	}
}

const pdfjs = window['pdfjs-dist/build/pdf'] as PDFjsModule;

pdfjs.GlobalWorkerOptions.workerSrc = '/lib/pdfjs/pdf.worker.js';

const ONE_MB = 1048576;
const STORAGE_TRESHOLD = 0.7;
const MB_TRESHOLD = 512;
const COVER_WIDTH = 1024;
const THUMB_WIDTH = 256;
const MAX_UPSCALE_FACTOR = 1.5;

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

async function optimizeCover(cover: ImageData) {
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

async function processCoverFile(coverFile: File, { referenceWidth = COVER_WIDTH, name, skipOptimize = false, forceProcess = true }: ProcessCoverOptions = {}) {
	let processedCover = coverFile;

	const cover = await createImageBitmap(coverFile);
	const coverScale = referenceWidth / cover.width;

	if (coverScale > MAX_UPSCALE_FACTOR && !forceProcess) {
		throw new Error('Cover would be upscaled!');
	}

	if (coverScale < 1 || forceProcess) {
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

async function canExtractCover(fileName: string, forceReplace = false) {
	const { id } = extractMetadataFromFileName(fileName);

	if (!id) {
		return false;
	}

	if (!fileName.endsWith('.pdf') || isNameExcluded(fileName)) {
		return false;
	}

	// eslint-disable-next-line no-undefined
	const hasSavedCover = await getCover(id) !== undefined;
	const { quota, usage } = await navigator.storage.estimate();
	const isReachingQuota = (usage ?? 0) / (quota ?? 1) >= STORAGE_TRESHOLD;
	const isUsingTooMuchData = (usage ?? 0) / ONE_MB >= MB_TRESHOLD;
	const isToReplaceCover = !(hasSavedCover && !forceReplace);

	return isToReplaceCover && !isReachingQuota && !isUsingTooMuchData;
}

async function canImportCover(file: File, forceReplace = false) {
	if (file.type !== 'image/jpeg') {
		return false;
	}

	const id = file.name.replace(/\..+$/igu, '');
	const material = await getMaterial(id);

	if (!material) {
		return false;
	}

	// eslint-disable-next-line no-undefined
	const hasSavedCover = await getCover(id) !== undefined;
	const { quota, usage } = await navigator.storage.estimate();
	const isReachingQuota = (usage ?? 0) / (quota ?? 1) >= STORAGE_TRESHOLD;
	const isUsingTooMuchData = (usage ?? 0) / ONE_MB >= MB_TRESHOLD;
	const isToReplaceCover = !(hasSavedCover && !forceReplace);

	return isToReplaceCover && !isReachingQuota && !isUsingTooMuchData;
}

export async function extractCoversFromFiles() {
	const progressOverlay = ProgressOverlay.createOverlay({ title: 'Extract covers' });

	try {
		const files = await getAllFiles();

		progressOverlay.setTotal(files.length);

		for await (const file of files) {
			progressOverlay.increment();

			const canSaveCover = await canExtractCover(file.name);

			if (canSaveCover) {
				await getFilePermission(file);

				const itemFile = await file.getFile();
				const { cover, thumb } = await extractCover(itemFile);
				const optimizedCover = await optimizeCover(cover);
				const optimizedThumb = await optimizeCover(thumb);

				const { id } = extractMetadataFromFileName(file.name);
				const fileName = `${id}.jpg`;

				const coverFile = new File([optimizedCover], fileName, { type: 'image/jpeg' });
				const thumbFile = new File([optimizedThumb], fileName, { type: 'image/jpeg' });

				await saveCover(id, coverFile);
				await saveThumb(id, thumbFile);
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
				await getFilePermission(entry);

				const file = await entry.getFile();
				const canSaveCover = await canImportCover(file, true);

				if (canSaveCover) {
					const id = file.name.replace(/\..+$/igu, '');

					// eslint-disable-next-line max-depth
					try {
						const coverFile = await processCoverFile(file);

						await saveCover(id, coverFile);

						const thumbFile = await processCoverFile(file, { referenceWidth: THUMB_WIDTH });

						await saveThumb(id, thumbFile);
					} catch (err) {
						// eslint-disable-next-line no-console
						console.error(id, err);
					}
				}
			}
		}
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
	}

	progressOverlay.remove();
}
