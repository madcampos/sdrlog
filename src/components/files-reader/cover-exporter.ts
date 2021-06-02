import { ProgressOverlay } from '../progress/progress';
import { getAllCovers } from '../data-operations/idb-persistence';

export async function saveCoversToFolder() {
	const progressOverlay = ProgressOverlay.createOverlay({ title: 'Export covers' });

	try {
		const coversFolder = await window.showDirectoryPicker();
		const covers = await getAllCovers();

		progressOverlay.setTotal(covers.length);

		for await (const cover of covers) {
			progressOverlay.increment();

			const file = await coversFolder.getFileHandle(cover.name, { create: true });
			const stream = await file.createWritable({ keepExistingData: false });

			await stream.truncate(0);
			await stream.write(cover);
			await stream.close();
		}
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
	}

	progressOverlay.remove();
}
