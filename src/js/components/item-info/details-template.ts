/* eslint-disable no-ternary */
import type { FileForMaterial, MaterialLink } from '../../../../data/data';

// FIXME: remove comment after this is available/merged: https://github.com/microsoft/TypeScript/pull/44022
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
export const getLangName = new Intl.DisplayNames(['en'], { type: 'language' }) as { of(lang: string): string };
export const dateFormater = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC', year: 'numeric' });

const FILE_ICONS_FOLDER = '/img/file-types/';
const DEFAULT_ICON = `${FILE_ICONS_FOLDER}default.svg`;

const mimeIcons = new Map([
	['application/pdf', `${FILE_ICONS_FOLDER}pdf.svg`],
	['image', `${FILE_ICONS_FOLDER}image.svg`],
	['audio', `${FILE_ICONS_FOLDER}audio.svg`],
	['text', `${FILE_ICONS_FOLDER}text.svg`],
	['video', `${FILE_ICONS_FOLDER}video.svg`],
	['application/zip', `${FILE_ICONS_FOLDER}zip.svg`],
	['application/epub+zip', `${FILE_ICONS_FOLDER}epub.svg`]
]);

const extensionIcons = new Map([
	['.pdf', `${FILE_ICONS_FOLDER}pdf.svg`],
	['.epub', `${FILE_ICONS_FOLDER}epub.svg`],
	['.bin', `${FILE_ICONS_FOLDER}binary.svg`],
	['.img', `${FILE_ICONS_FOLDER}smd.svg`],
	['.iso', `${FILE_ICONS_FOLDER}iso.svg`],
	['.smc', `${FILE_ICONS_FOLDER}smc.svg`],
	['.smd', `${FILE_ICONS_FOLDER}smd.svg`],
	['.cbz', `${FILE_ICONS_FOLDER}cbz.svg`],
	['.apk', `${FILE_ICONS_FOLDER}apk.svg`],
	['.xapk', `${FILE_ICONS_FOLDER}apk.svg`],
	['.doc', `${FILE_ICONS_FOLDER}word.svg`],
	['.docx', `${FILE_ICONS_FOLDER}word.svg`],
	['.xls', `${FILE_ICONS_FOLDER}excel.svg`],
	['.xlsx', `${FILE_ICONS_FOLDER}excel.svg`],
	['.ppt', `${FILE_ICONS_FOLDER}powerpoint.svg`],
	['.pptx', `${FILE_ICONS_FOLDER}powerpoint.svg`]
]);

export const publishers = new Map([
	['Heyne Verlag', 'heyne'],
	['Fantasy Productions', 'fanpro'],
	['other', 'other'],
	['Catalyst Game Labs', 'catalyst'],
	['FASA Corporation', 'fasa'],
	['unofficial', 'unofficial'],
	['WizKids Games', 'wizkids'],
	['Pegasus Spiele', 'pegasus'],
	['Cliffhanger Productions', 'clifhanger'],
	['Harebrained Schemes', 'harebrained']
]);

export const languages = new Map([
	['de-DE', `🇩🇪 ${getLangName.of('de')}`],
	['fr-FR', `🇫🇷 ${getLangName.of('fr')}`],
	['jp-JP', `🇯🇵 ${getLangName.of('JPN')}`],
	['es-ES', `🇪🇸 ${getLangName.of('es')}`],
	['hu-HU', `🇭🇺 ${getLangName.of('hu')}`],
	['it-IT', `🇮🇹 ${getLangName.of('it')}`],
	['pt-BR', `🇧🇷 ${getLangName.of('pt')}`],
	['cs-CZ', `🇨🇿 ${getLangName.of('cs')}`],
	['he-IL', `🇮🇱 ${getLangName.of('he')}`],
	['pl-PL', `🇵🇱 ${getLangName.of('pl')}`],
	['fi-FI', `🇫🇮 ${getLangName.of('fi')}`],
	['en-US', `🇺🇸 ${getLangName.of('en')}`]
]);

export const categories = new Map([
	['novel', '📚 Novel'],
	['sourcebook', '📜 Sourcebook'],
	['mission', '🗺️ Mission'],
	['rulebook', '📝 Rulebook'],
	['misc', '🔣 Misc.'],
	['magazine', '📰 Magazine'],
	['boardgame', '♟️ Boardgame'],
	['videogame', '🎮 Videogame'],
	['tcg', '🃏 T.C.G.'],
	['unofficial', '📓 Unofficial']
]);

export const types = new Map([
	['digital', '💽 Digital'],
	['scan', '📠 Scan'],
	['print', '🖨️ Print'],
	['physical', '🎲 Physical']
]);

export const status = new Map([
	['ok', '✔️ OK'],
	['missing', '❌ Missing'],
	['outofscope', '⛔ Out of scope'],
	['canceled', '🚫 Canceled']
]);

export function formatReleaseDate(releaseDate: string, isEditing = false) {
	return `
		<edit-list-item ${isEditing ? 'edit' : ''} value="${releaseDate}">
			${dateFormater.format(new Date(releaseDate))}
		</edit-list-item>
	`;
}

export function formatPublisher(publisher: string, isEditing = false) {
	return `
		<edit-list-item ${isEditing ? 'edit' : ''} value="${publisher}">
			<abbr title="${publisher}">
				<img
					role="presentation"
					src="/img/publishers/${publishers.get(publisher) ?? 'fallback'}.png"
				/>
			</abbr>
		</edit-list-item>
	`;
}

export function formatSku(sku: string, isEditing = false) {
	return `<edit-list-item ${isEditing ? 'edit' : ''} value="${sku}">${sku}</edit-list-item>`;
}

export function formatTranslatedName(lang: string, name: string, isEditing = false) {
	return `<edit-list-item stretch ${isEditing ? 'edit' : ''} value="${encodeURI(JSON.stringify({ lang, name }))}">${languages.get(lang) ?? ''} → ${name}</edit-list-item>`;
}

export function formatLink({ url, title }: MaterialLink, isEditing = false) {
	return `
		<edit-list-item stretch ${isEditing ? 'edit' : ''} value="${encodeURI(JSON.stringify({ title, url }))}">
			<a
				href="${url}"
				target="_blank"
				rel="noopener"
			>${title}</a>
		</edit-list-item>
	`;
}

function getIconForFile(mime: string, extension: string) {
	const mimes = [...mimeIcons.keys()];
	const mimeKey = mimes.find((iconMime) => mime.includes(iconMime)) ?? '';

	return mimeIcons.get(mimeKey) ?? extensionIcons.get(extension) ?? DEFAULT_ICON;
}

export function formatFile(file: FileForMaterial) {
	return `
		<edit-list-item stretch value="${encodeURI(JSON.stringify(file))}">
			<a
				class="file-link"
				href=""
				target="_blank"
				rel="noopener"
			>
				<img
					width="16"
					height="16"
					role="presentation"
					src="${getIconForFile(file.mimeType, file.fileExtension)}"
				/>
				${file.fileName}${file.fileExtension}
			</a>
		</edit-list-item>
	`;
}

export function setCategories(container: HTMLElement) {
	[...categories.entries()].forEach(([value, name]) => {
		const option = document.createElement('option');

		option.value = value;
		option.innerText = name;

		container.appendChild(option);
	});
}

export function setTypes(container: HTMLElement) {
	[...types.entries()].forEach(([value, name]) => {
		const option = document.createElement('option');

		option.value = value;
		option.innerText = name;

		container.appendChild(option);
	});
}

export function setLanguages(container: HTMLElement) {
	[...languages.entries()].forEach(([value, name]) => {
		const option = document.createElement('option');

		option.value = value;
		option.innerText = name;

		container.appendChild(option);
	});
}

export function setStatus(container: HTMLElement) {
	[...status.entries()].forEach(([value, name]) => {
		const option = document.createElement('option');

		option.value = value;
		option.innerText = name;

		container.appendChild(option);
	});
}

export function setPublishers(container: HTMLElement) {
	[...publishers.entries()].forEach(([value, name]) => {
		const option = document.createElement('option');

		option.value = value;
		option.innerText = name;

		container.appendChild(option);
	});
}
