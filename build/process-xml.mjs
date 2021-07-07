/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument */
import { readFile, writeFile } from 'fs/promises';

export default async function processXml(fileName, extension, env) {
	if (extension === '.xml') {
		const content = await readFile(fileName, { encoding: 'utf8' });
		// eslint-disable-next-line prefer-named-capture-group
		const replacedVars = content.replaceAll(/%(.+?)%/giu, (_, match) => env[match] ?? '');
		const minifiedXml = replacedVars.replaceAll(/[\t\n]/giu, '');

		await writeFile(fileName, minifiedXml, { encoding: 'utf8' });
	}
}
