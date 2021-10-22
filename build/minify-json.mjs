import { readFile, writeFile } from 'fs/promises';

/**
 * @param {string} fileName
 * @param {string} extension
 * @param {object} env
 */
export default async function minifyJson(fileName, extension, env) {
	if (extension === '.json' || extension === '.webmanifest') {
		const content = await readFile(fileName, { encoding: 'utf8' });
		const replacedVars = content.replaceAll(/%(.+?)%/giu, (_, match) => env[match] ?? '');
		const minifiedContent = JSON.stringify(JSON.parse(replacedVars));

		await writeFile(fileName, minifiedContent, { encoding: 'utf8' });
	}
}
