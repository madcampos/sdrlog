import { ProgressOverlay } from '../progress/progress';
import { getAllCovers, getAllThumbs } from '../data-operations/idb-persistence';
import '../../../lib/zip/jszip';
import fileSave from '../../../lib/file-system/file-save';
import { I18n } from '../intl/translations';
import { Logger } from '../logger/logger';

export async function saveCoversToFolder() {
	const progressOverlay = ProgressOverlay.createOverlay({ title: I18n.t`Export Covers` });

	try {
		if ('showDirectoryPicker' in window) {
			const coversFolder = await window.showDirectoryPicker({
				id: 'coversFolder',
				startIn: 'downloads'
			});
			const covers = await getAllCovers();

			progressOverlay.setTotal(covers.length);

			for await (const cover of covers) {
				progressOverlay.increment();

				try {
					// Will error out if the file doesn't exist
					// This is done to "skip" existing cover files.
					await coversFolder.getFileHandle(cover.name, { create: false });
				} catch {
					const file = await coversFolder.getFileHandle(cover.name, { create: true });
					const stream = await file.createWritable({ keepExistingData: false });

					await stream.truncate(0);
					await stream.write(cover);
					await stream.close();
				}
			}
		} else {
			const zip = new JSZip();

			const covers = await getAllCovers();

			progressOverlay.setTotal(covers.length);

			for (const cover of covers) {
				progressOverlay.increment();

				zip.file(cover.name, cover, { binary: true });
			}

			const zipFile = await zip.generateAsync({ type: 'blob' });

			await fileSave(zipFile, { fileName: 'covers.zip' });
		}
	} catch (err) {
		Logger.error('Failed to save covers.', err);
	}

	progressOverlay.remove();
}

export async function saveThumbsToFolder() {
	const progressOverlay = ProgressOverlay.createOverlay({ title: I18n.t`Export Thumbnails` });

	try {
		if ('showDirectoryPicker' in window) {
			const thumbsFolder = await window.showDirectoryPicker({
				id: 'thumbsFolder',
				startIn: 'downloads'
			});
			const thumbs = await getAllThumbs();

			progressOverlay.setTotal(thumbs.length);

			for await (const thumb of thumbs) {
				progressOverlay.increment();

				try {
					// Will error out if the file doesn't exist
					// This is done to "skip" existing cover files.
					await thumbsFolder.getFileHandle(thumb.name, { create: false });
				} catch {
					const file = await thumbsFolder.getFileHandle(thumb.name, { create: true });
					const stream = await file.createWritable({ keepExistingData: false });

					await stream.truncate(0);
					await stream.write(thumb);
					await stream.close();
				}
			}
		} else {
			const zip = new JSZip();

			const covers = await getAllCovers();

			progressOverlay.setTotal(covers.length);

			for (const cover of covers) {
				progressOverlay.increment();

				zip.file(cover.name, cover, { binary: true });
			}

			const zipFile = await zip.generateAsync({ type: 'blob' });

			await fileSave(zipFile, { fileName: 'thumbs.zip' });
		}
	} catch (err) {
		Logger.error('Failed to save thmbs.', err);
	}

	progressOverlay.remove();
}