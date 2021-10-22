import { readFile, writeFile } from 'fs/promises';

/**
 * @param {string} fileName
 * @param {string} extension
 * @param {object} env
 */
export default async function processXml(fileName, extension, env) {
	if (extension === '.xml') {
		const content = await readFile(fileName, { encoding: 'utf8' });
		// eslint-disable-next-line prefer-named-capture-group
		const replacedVars = content.replaceAll(/%(.+?)%/giu, (_, match) => env[match] ?? '');
		const minifiedXml = replacedVars.replaceAll(/[\t\n]/giu, '');

		await writeFile(fileName, minifiedXml, { encoding: 'utf8' });
	}
}
