import { ProgressOverlay } from '../progress/progress';
import { getAllFiles, getCover, getThumb, saveCover, saveThumb } from '../data-operations/idb-persistence';
import { extractMetadataFromFileName, getFilePermission } from '../files-reader/files-reader';
import { extractCover, optimizeCover, processCoverFile, THUMB_WIDTH } from './cover-extractor';
import { canExtractCover, canImportCover } from '../data-operations/storage-conditions';
import directoryOpen from '../../../../lib/file-system/directory-open';
import { I18n } from '../intl/translations';
import { Logger } from '../logger/logger';

const TIMEOUT_BEFORE_RELOAD = 500;

export const FALLBACK_COVER = `${import.meta.env.PUBLIC_URL}img/covers/fallback.svg`;
export const LOADING_COVER = `${import.meta.env.PUBLIC_URL}img/covers/loading-anim.svg`;
export const LOADING_SIMPLE_COVER = `${import.meta.env.PUBLIC_URL}img/covers/loading-simple.svg`;

export async function fetchCover(id: string) {
	let currentCover = await getCover(id);

	if (!currentCover) {
		const response = await fetch(`${import.meta.env.PUBLIC_URL}covers/${id}.jpg`);

		if (response.ok) {
			const responseData = await response.blob();

			currentCover = new File([responseData], `${id}.jpg`, { type: 'image/jpeg' });
		}
	}

	return currentCover;
}

export async function getThumbUrl(id: string) {
	const currentThumb = await getThumb(id);

	if (currentThumb) {
		return URL.createObjectURL(currentThumb);
	}

	return '';
}

export async function extractCoversFromFiles() {
	const progressOverlay = ProgressOverlay.createOverlay({ title: I18n.t`Extract Covers` });

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
		Logger.error('Error extracting covers from files.', err);
	}

	progressOverlay.remove();

	setTimeout(() => {
		location.reload();
	}, TIMEOUT_BEFORE_RELOAD);
}

export async function importCoversFromFolder() {
	const progressOverlay = ProgressOverlay.createOverlay({ title: I18n.t`Import Covers` });

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
					Logger.error(`Failed to import cover "${id}" from file.`, err);
				}
			}
		}
	} catch (err) {
		Logger.error('Failed to import covers from folder.', err);
	}

	progressOverlay.remove();

	setTimeout(() => {
		location.reload();
	}, TIMEOUT_BEFORE_RELOAD);
}
