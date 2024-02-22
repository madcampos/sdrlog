import { getAllIDBEntries, setIDBItem } from '../data/idb-persistence';

const mimeTypes = new Map([
	['png', 'image/png'],
	['ttf', 'font/ttf'],
	['cfg', 'text/plain']
]);

export async function getEmulatorFiles() {
	let files = await getAllIDBEntries('emulator');

	if (files.length === 0) {
		const response = await fetch(import.meta.resolve('/lib/webretro/bundle.zip'));
		const fileBlob = await response.blob();
		const zipFile = new File([fileBlob], 'bundle.zip', { type: 'application/zip' });

		if (!('JSZip' in window)) {
			// eslint-disable-next-line @typescript-eslint/consistent-type-imports
			(window as Window & { JSZip?: typeof import('jszip') }).JSZip = (await import('jszip')).default;
		}

		const zip = await JSZip.loadAsync(zipFile);

		for await (const zipObject of Object.values(zip.files)) {
			if (!zipObject.dir) {
				const blob = await zipObject.async('blob');
				const name = zipObject.name.split('/').pop() ?? '';
				const [extension] = name.split('.').reverse();

				const file = new File([blob], name, { type: mimeTypes.get(extension) ?? 'application/octet-stream' });

				await setIDBItem('emulator', zipObject.name, file);
			} else {
				const file = new File([zipObject.name], zipObject.name, { type: 'application/x+directory' });

				await setIDBItem('emulator', zipObject.name, file);
			}
		}

		files = await getAllIDBEntries('emulator');
	}

	return files;
}
