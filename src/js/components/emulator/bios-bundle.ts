/* eslint-disable @typescript-eslint/no-unsafe-call */
import '../../../../lib/zip/jszip';
import { getBiosFiles, saveBiosFile } from '../data-operations/idb-persistence';

async function fetchBiosFile() {
	const response = await fetch(`${import.meta.env.SNOWPACK_PUBLIC_URL}lib/webretro/bios.zip`);
	const bundleFile = await response.blob();
	const file = new File([bundleFile], 'bios.zip', { type: 'application/zip' });

	return file;
}

async function saveBiosFiles(bundle: File) {
	const zip = await JSZip.loadAsync(bundle);

	for await (const zipObject of Object.values(zip.files)) {
		if (!zipObject.dir) {
			const blob = await zipObject.async('blob');
			const name = zipObject.name.split('/').pop() ?? '';
			const file = new File([blob], name, { type: 'application/octet-stream' });

			await saveBiosFile(zipObject.name, file);
		} else {
			const file = new File([zipObject.name], zipObject.name, { type: 'application/x+directory' });

			await saveBiosFile(zipObject.name, file);
		}
	}
}

async function getBios() {
	let files = await getBiosFiles();

	if (Object.keys(files).length === 0) {
		const bundle = await fetchBiosFile();

		await saveBiosFiles(bundle);
		files = await getBiosFiles();
	}

	return files;
}

export async function loadBios() {
	try {
		const folderPath = '/home/web_user/retroarch/userdata/system/';
		const files = await getBios();

		for await (const [path, file] of Object.entries(files)) {
			const buffer = await file.arrayBuffer();

			if (file.type === 'application/x+directory') {
				// @ts-expect-error
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				FS.createPath('/', `${folderPath}${file.name}`, true, true);
			} else {
				FS.writeFile(`${folderPath}${path}`, new Uint8Array(buffer));
			}
		}
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
	}
}
