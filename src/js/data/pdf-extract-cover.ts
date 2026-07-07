import { getFileHandle } from '@mad-c/file-system-helpers';
import { getHandle, saveHandle } from '@mad-c/file-system-helpers/access';
import { resolve } from '@mad-c/file-system-helpers/path';
import { requestHandlePermissions } from '@mad-c/file-system-helpers/permissions';
import * as pdfjs from 'pdfjs-dist';
import { FileOperationOverlay } from '../../components/FileOperationOverlay/FileOperationOverlay.ts';
import { COVER_WIDTH, optimizeCover } from './cover.ts';
import { getAllIDBValues, getIDBItem, setIDBItem } from './idb-helpers.ts';
import { extractMetadataFromFileName, getFileHash } from './import.ts';

if (!document.querySelector('canvas#cover-canvas')) {
	document.body.insertAdjacentHTML('afterbegin', '<div hidden><canvas id="cover-canvas" hidden></canvas></div>');
}

// oxlint-disable-next-line typescript/no-non-null-assertion
const canvas = document.querySelector('canvas#cover-canvas')!;
// oxlint-disable-next-line typescript/no-non-null-assertion
const canvasContext = canvas.getContext('2d', { willReadFrequently: true, desynchronized: true, alpha: false })!;

// oxlint-disable-next-line no-magic-numbers
const COVER_EXTRACT_RELOAD_TIMEOUT = 3 * 1000;

const ID_FILTER_LIST = [
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

	if (!fileName.endsWith('.pdf') || ID_FILTER_LIST.some((filter) => fileName.includes(filter))) {
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

	const optimizedCover = await optimizeCover(cover);

	const { id } = extractMetadataFromFileName(file.name);
	const fileName = `${id}.jpg`;

	const coverFile = new File([optimizedCover], fileName, { type: 'image/jpeg' });
	const optimizedPath = resolve('/optimized/covers', file.name);
	const optimizedHandle = await getFileHandle(optimizedPath, { recursive: true, touch: true });
	const writableStream = await optimizedHandle.createWritable();

	await writableStream.truncate(0);
	await writableStream.write(coverFile);
	await writableStream.close();

	const optimizedHash = await getFileHash(await coverFile.arrayBuffer());
	await saveHandle(optimizedHash, optimizedHandle);
	await setIDBItem('covers', id, optimizedHash);
}

export async function extractCoversFromFiles() {
	const overlay = document.querySelector<FileOperationOverlay>('file-operation-overlay') ?? new FileOperationOverlay();

	document.body.insertAdjacentElement('beforeend', overlay);

	try {
		const files = await getAllIDBValues('files');

		overlay.max = files.length;
		overlay.name = 'File Import';
		overlay.show();

		for (const { hash, fileName: pdfFileName } of files) {
			// oxlint-disable no-await-in-loop
			overlay.increment(pdfFileName);

			const { handle } = await getHandle(hash) ?? {};

			if (!(handle instanceof FileSystemFileHandle)) {
				continue;
			}

			const canSaveCover = await canExtractCover(handle.name);

			if (canSaveCover) {
				await requestHandlePermissions(handle);

				const pdfFile = await handle.getFile();

				await extractCover(pdfFile, COVER_WIDTH);
			}
			// oxlint-enable no-await-in-loop
		}

		setTimeout(() => {
			window.navigation.reload();
		}, COVER_EXTRACT_RELOAD_TIMEOUT);
	} catch (err) {
		console.error('Error extracting covers from files.', err);
	} finally {
		overlay.hideAndRemove();
	}
}
