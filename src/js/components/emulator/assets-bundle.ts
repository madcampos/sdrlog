import '../../../../lib/zip/jszip';
import { getBundleFiles, saveBundleFile } from '../data-operations/idb-persistence';

const mimeTypes = new Map([
	['.png', 'image/png'],
	['.ttf', 'font/ttf']
]);

async function fetchBundleFile() {
	const response = await fetch(`${import.meta.env.PUBLIC_URL}lib/webretro/assets.zip`);
	const bundleFile = await response.blob();
	const file = new File([bundleFile], 'assets.zip', { type: 'application/zip' });

	return file;
}

async function saveBundleAsFiles(bundle: File) {
	const zip = await JSZip.loadAsync(bundle);

	for await (const zipObject of Object.values(zip.files)) {
		if (!zipObject.dir) {
			const blob = await zipObject.async('blob');
			const name = zipObject.name.split('/').pop() ?? '';
			const testRegex = /(?<extension>\.[a-z0-9]{3,})$/u;
			const { extension } = testRegex.exec(name)?.groups ?? {};
			const file = new File([blob], name, { type: mimeTypes.get(extension) });

			await saveBundleFile(zipObject.name, file);
		} else {
			const file = new File([zipObject.name], zipObject.name, { type: 'application/x+directory' });

			await saveBundleFile(zipObject.name, file);
		}
	}
}

async function getBundle() {
	let files = await getBundleFiles();

	if (Object.keys(files).length === 0) {
		const bundle = await fetchBundleFile();

		await saveBundleAsFiles(bundle);
		files = await getBundleFiles();
	}

	return files;
}

export async function loadBundle(fileSystem: typeof FS | undefined) {
	try {
		const folderPath = '/home/web_user/retroarch/bundle/assets/';
		const files = await getBundle();

		for await (const [path, file] of Object.entries(files)) {
			const buffer = await file.arrayBuffer();

			if (file.type === 'application/x+directory') {
				// @ts-expect-error
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				fileSystem?.createPath('/', `${folderPath}${file.name}`, true, true);
			} else {
				fileSystem?.writeFile(`${folderPath}${path}`, new Uint8Array(buffer));
			}
		}
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
	}
}
