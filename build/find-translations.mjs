import { readdir, readFile, stat, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';

const sourceDir = `${resolve('')}/src`;
const languagesDir = `${sourceDir}/_locales/`;
const aditionalLanguages = ['es-ES', 'pt-BR', 'fr-FR'];

/**
 * @param {string} first
 * @param {string} last
 */
function sorter(first, last) {
	return first.localeCompare(last);
}

/**
 * @param {string} string
 */
function replacer(string) {
	return string.replaceAll('&quot;', '"').replaceAll('&apos;', "'");
}


/**
 * @param {string} dirPath
 * @returns {Promise<string[]>}
 */
async function readDirRecursive(dirPath) {
	/** @type {string[]} */
	const entries = [];
	const dirEntries = await readdir(dirPath);

	for await (const entry of dirEntries) {
		const entryPath = `${dirPath}/${entry}`;
		const entryStats = await stat(entryPath);

		if (entryStats.isDirectory()) {
			entries.push(...await readDirRecursive(entryPath));
		} else {
			entries.push(entryPath);
		}
	}

	return entries;
}

(async () => {
	const files = await readDirRecursive(sourceDir);
	const matches = [];

	for await (const file of files) {
		const extension = extname(file);

		if (extension === '.ts' || extension === '.html') {
			const fileContent = await readFile(file, 'utf8');
			const fileMatches = [
				...fileContent.matchAll(/\bt\((['`"])(?<key>.+?)\1\)/gu),
				...fileContent.matchAll(/I18n\.t`(?<key>.+?)`/gu)
			].map((match) => match.groups?.key ?? '');

			matches.push(...fileMatches);
		}
	}

	const uniqueMatches = [...new Set([...matches].sort(sorter))];

	const entries = uniqueMatches.map((match) => [match, replacer(match)]);
	const translations = JSON.stringify(Object.fromEntries(entries), null, '\t');

	const emptyEntries = uniqueMatches.map((match) => [match, '']);
	const emptyTranslations = JSON.stringify(Object.fromEntries(emptyEntries), null, '\t');

	await writeFile(`${languagesDir}/en-US/messages.json`, translations, 'utf8');

	for await (const language of aditionalLanguages) {
		await writeFile(`${languagesDir}/${language}/messages.json`, emptyTranslations, 'utf8');
	}
})();
