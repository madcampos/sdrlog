import { ProgressOverlay } from '../progress/progress';
import { getAllFiles, getCover, getThumb, saveCover, saveThumb } from '../data-operations/idb-persistence';
import { extractMetadataFromFileName, getFilePermission } from '../files-reader/files-reader';
import { extractCover, getFileForImg, optimizeCover, processCoverFile, THUMB_WIDTH } from './cover-extractor';
import { canExtractCover, canImportCover } from '../data-operations/storage-conditions';
import directoryOpen from '../../../../lib/file-system/directory-open';

const TIMEOUT_BEFORE_RELOAD = 500;
const BASE_URL = `${window.location.origin}${window.location.pathname.replace(/\/.+?\.html$/igu, '/')}`;

export const FALLBACK_COVER = `${BASE_URL}img/covers/fallback.svg`;
export const LOADING_COVER = `${BASE_URL}img/covers/loading-anim.svg`;
export const LOADING_SIMPLE_COVER = `${BASE_URL}img/covers/loading-simple.svg`;

export async function fetchCover(id: string) {
	let currentCover = await getCover(id);

	if (!currentCover) {
		const response = await fetch(`${BASE_URL}covers/${id}.jpg`);

		if (response.ok) {
			const responseData = await response.blob();

			currentCover = new File([responseData], `${id}.jpg`, { type: 'image/jpeg' });

			await saveCover(id, currentCover);
		}
	}

	return currentCover;
}

export async function getThumbUrl(id: string) {
	const currentThumb = await getThumb(id);

	if (currentThumb) {
		return URL.createObjectURL(currentThumb);
	}

	return `${BASE_URL}thumbs/${id}.jpg`;
}

export async function saveLoadedThumb(id: string, image: HTMLImageElement) {
	const loadedThumb = await getFileForImg(image, `${id}.jpg`);

	await saveThumb(id, loadedThumb);
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

	setTimeout(() => {
		location.reload();
	}, TIMEOUT_BEFORE_RELOAD);
}

export async function importCoversFromFolder() {
	const progressOverlay = ProgressOverlay.createOverlay({ title: 'Import covers' });

	try {
		let files = [];

		if ('showDirectoryPicker' in window) {
			const dir = await window.showDirectoryPicker({
				id: 'originalCoversFolder',
				startIn: 'downloads'
			});

			for await (const entry of dir.values()) {
				if (entry.kind === 'file') {
					await getFilePermission(entry);

					files.push(await entry.getFile());
				}
			}
		} else {
			files = await directoryOpen();
		}

		progressOverlay.setTotal(files.length);

		for await (const file of files) {
			progressOverlay.increment();

			const canSaveCover = await canImportCover(file, true);

			if (canSaveCover) {
				const id = file.name.replace(/\..+$/igu, '');

				try {
					const coverFile = await processCoverFile(file, { name: `${id}.jpg` });

					await saveCover(id, coverFile);

					const thumbFile = await processCoverFile(file, { referenceWidth: THUMB_WIDTH, name: `${id}.jpg` });

					await saveThumb(id, thumbFile);
				} catch (err) {
					// eslint-disable-next-line no-console
					console.error(id, err);
				}
			}
		}
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
	}

	progressOverlay.remove();

	setTimeout(() => {
		location.reload();
	}, TIMEOUT_BEFORE_RELOAD);
}
