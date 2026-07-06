import * as pdfjs from 'pdfjs-dist';
import { getIDBItem } from './idb-helpers.ts';
import { extractMetadataFromFileName } from './import.ts';

if (!document.querySelector('canvas#cover-canvas')) {
	document.body.insertAdjacentHTML('afterbegin', '<div hidden><canvas id="cover-canvas" hidden></canvas></div>');
}

// oxlint-disable-next-line typescript/no-non-null-assertion
const canvas = document.querySelector('canvas#cover-canvas')!;
// oxlint-disable-next-line typescript/no-non-null-assertion
const canvasContext = canvas.getContext('2d', { willReadFrequently: true, desynchronized: true, alpha: false })!;

const filterList: string[] = [
	// Magazines
	'NVP',
	'STLD',

	// Misc
	'7701',

	// Tabletop
	'7111',
	'TCG01',
	'TCG02',
	'27700',
	'WZK640X',

	// Rulebook
	'26100',
	'27100X',
	'28010',

	// Sourcebooks
	'27110',
	'45068'
];

const ONE_MB_IN_BYTES = 1048576;
const STORAGE_TRESHOLD = 0.7;
const MB_TRESHOLD = 512;

async function canExtractCover(fileName: string, forceReplace = false) {
	const { id, modifier } = extractMetadataFromFileName(fileName);

	if (!id) {
		return false;
	}

	if (modifier) {
		return false;
	}

	if (!fileName.endsWith('.pdf') || filterList.some((filter) => fileName.includes(filter))) {
		return false;
	}

	const hasSavedCover = await getIDBItem('covers', id) !== undefined;
	const { quota, usage } = await navigator.storage.estimate();
	const isReachingQuota = (usage ?? 0) / (quota ?? 1) >= STORAGE_TRESHOLD;
	const isUsingTooMuchData = (usage ?? 0) / ONE_MB_IN_BYTES >= MB_TRESHOLD;
	const isToReplaceCover = !(hasSavedCover && !forceReplace);

	return isToReplaceCover && !isReachingQuota && !isUsingTooMuchData;
}

async function extractCover(file: File, width: number) {
	const fileURL = URL.createObjectURL(file);

	const pdf = await pdfjs.getDocument({ url: fileURL }).promise;
	const page = await pdf.getPage(1);
	const originalViewport = page.getViewport({ scale: 1 });

	const coverScale = width / originalViewport.width;
	const coverViewport = page.getViewport({ scale: coverScale });

	canvas.height = coverViewport.height;
	canvas.width = coverViewport.width;

	await page.render({
		canvas,
		canvasContext,
		viewport: coverViewport
	}).promise;

	const cover = canvasContext.getImageData(0, 0, canvas.width, canvas.height);

	await pdf.cleanup();

	return cover;
}

// TODO: move to import?
export async function extractCoversFromFiles() {
	const progressOverlay = SdrProgressOverlay.createOverlay({ title: 'Extract Covers' });

	try {
		const files = await getAllIDBValues('files');

		progressOverlay.total = files.length;

		for (const file of files) {
			progressOverlay.increment(file.fileName);

			if (file.handler.kind !== 'file') {
				continue;
			}

			const canSaveCover = await canExtractCover(file.fileName ?? file.handler.name);

			if (canSaveCover) {
				await getFilePermission(file.handler);

				const itemFile = await file.handler.getFile();
				const { cover, thumb } = await extractCover(itemFile);
				const optimizedCover = await optimizeCover(cover);
				const optimizedThumb = await optimizeCover(thumb);

				const { id } = extractMetadataFromFileName(file.fileName ?? file.handler.name);
				const fileName = `${id}.jpg`;

				const coverFile = new File([optimizedCover], fileName, { type: 'image/jpeg' });
				const thumbFile = new File([optimizedThumb], fileName, { type: 'image/jpeg' });

				await setIDBItem('covers', id, coverFile);
				await setIDBItem('thumbs', id, thumbFile);
			}
		}
	} catch (err) {
		console.error('Error extracting covers from files.', err);
	}

	progressOverlay.remove();

	setTimeout(() => {
		location.reload();
	}, TIMEOUT_BEFORE_RELOAD);
}
