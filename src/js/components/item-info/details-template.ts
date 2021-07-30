/* eslint-disable no-ternary */
import type { FileForMaterial, MaterialLink } from '../../../../data/data';
import { formatDate, translateLanguageName } from '../intl/formatting';

const DEFAULT_ICON = '📄';

const mimeIcons = new Map([
	['application/pdf', '📓'],
	['image', '🖼️'],
	['audio', '🔊'],
	['text', '📝'],
	['video', '🎞️'],
	['application/zip', '📦'],
	['application/epub+zip', '📚']
]);

const extensionIcons = new Map([
	['.pdf', '📓'],
	['.epub', '📚'],
	['.bin', '💾'],
	['.img', '💽'],
	['.iso', '💽'],
	['.smc', '🕹️'],
	['.smd', '🕹️'],
	['.cbz', '💭'],
	['.apk', '🤖'],
	['.xapk', '🤖'],
	['.doc', '🖋️'],
	['.docx', '🖋️'],
	['.xls', '📊'],
	['.xlsx', '📊'],
	['.ppt', '📽️'],
	['.pptx', '📽️']
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
	['Cliffhanger Productions', 'cliffhanger'],
	['Harebrained Schemes', 'harebrained']
]);

export const languages = new Map([
	['de-DE', `🇩🇪 ${translateLanguageName('de')}`],
	['fr-FR', `🇫🇷 ${translateLanguageName('fr')}`],
	['jp-JP', `🇯🇵 ${translateLanguageName('JPN')}`],
	['es-ES', `🇪🇸 ${translateLanguageName('es')}`],
	['hu-HU', `🇭🇺 ${translateLanguageName('hu')}`],
	['it-IT', `🇮🇹 ${translateLanguageName('it')}`],
	['pt-BR', `🇧🇷 ${translateLanguageName('pt')}`],
	['cs-CZ', `🇨🇿 ${translateLanguageName('cs')}`],
	['he-IL', `🇮🇱 ${translateLanguageName('he')}`],
	['pl-PL', `🇵🇱 ${translateLanguageName('pl')}`],
	['fi-FI', `🇫🇮 ${translateLanguageName('fi')}`],
	['en-US', `🇺🇸 ${translateLanguageName('en')}`]
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
			${formatDate(new Date(releaseDate))}
		</edit-list-item>
	`;
}

export function formatPublisher(publisher: string, isEditing = false) {
	return `
		<edit-list-item ${isEditing ? 'edit' : ''} value="${publisher}">
			<abbr title="${publisher}">
				<img
					role="presentation"
					src="${import.meta.env.PUBLIC_URL}img/publishers/${publishers.get(publisher) ?? 'fallback'}.png"
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
				<span>${getIconForFile(file.mimeType, file.fileExtension)}</span>
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
	[...publishers.keys()].forEach((name) => {
		const option = document.createElement('option');

		option.value = name;
		option.innerText = name;

		container.appendChild(option);
	});
}
