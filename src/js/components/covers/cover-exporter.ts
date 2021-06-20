import { ProgressOverlay } from '../progress/progress';
import { getAllCovers } from '../data-operations/idb-persistence';
import * as JSZip from '../../../../lib/zip/jszip';
import fileSave from '../../../../lib/file-system/file-save';

export async function saveCoversToFolder() {
	const progressOverlay = ProgressOverlay.createOverlay({ title: 'Export covers' });

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
		// eslint-disable-next-line no-console
		console.error(err);
	}

	progressOverlay.remove();
}
