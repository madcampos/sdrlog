import type { IsoCode, MaterialCategory, MaterialPublisher, MaterialStatus, MaterialType } from './data';

export const MATERIAL_LANGUAGES_INFO: Readonly<Record<IsoCode, { name: string, icon: string }>> = {
	'de-DE': { icon: '🇩🇪', name: 'German' },
	'fr-FR': { icon: '🇫🇷', name: 'French' },
	'jp-JP': { icon: '🇯🇵', name: 'Japanese' },
	'es-ES': { icon: '🇪🇸', name: 'Spanish' },
	'hu-HU': { icon: '🇭🇺', name: 'Hungarian' },
	'it-IT': { icon: '🇮🇹', name: 'Italian' },
	'pt-BR': { icon: '🇧🇷', name: 'Brazilian Portuguese' },
	'cs-CZ': { icon: '🇨🇿', name: 'Czech' },
	'he-IL': { icon: '🇮🇱', name: 'Hebrew' },
	'pl-PL': { icon: '🇵🇱', name: 'Polish' },
	'fi-FI': { icon: '🇫🇮', name: 'Finnish' },
	'en-US': { icon: '🇺🇸', name: 'English' }
} as const;

export const MATERIAL_PUBLISHERS: Readonly<MaterialPublisher[]> = [
	'Catalyst Game Labs',
	'Cliffhanger Productions',
	'FASA Corporation',
	'Fantasy Productions',
	'Harebrained Schemes',
	'Pegasus Spiele',
	'WizKids Games',
	'Heyne Verlag',
	'Other',
	'Unofficial'
] as const;

export const MATERIAL_CATEGORY_INFO: Readonly<Record<MaterialCategory, { name: string, icon: string }>> = {
	novel: { icon: '📚', name: 'Novel' },
	sourcebook: { icon: '📜', name: 'Sourcebook' },
	mission: { icon: '🗺️', name: 'Mission' },
	rulebook: { icon: '📝', name: 'Rulebook' },
	misc: { icon: '🔣', name: 'Misc.' },
	magazine: { icon: '📰', name: 'Magazine' },
	boardgame: { icon: '♟️', name: 'Boardgame' },
	videogame: { icon: '🎮', name: 'Videogame' },
	tcg: { icon: '🃏', name: 'T.C.G.' },
	unofficial: { icon: '📓', name: 'Unofficial' }
} as const;

export const MATERIAL_TYPE_INFO: Readonly<Record<MaterialType, { name: string, icon: string }>> = {
	digital: { icon: '💽', name: 'Digital' },
	scan: { icon: '📠', name: 'Scan' },
	ocr: { icon: '💾', name: 'OCR' },
	print: { icon: '🖨️', name: 'Print' },
	physical: { icon: '🎲', name: 'Physical' }
} as const;


export const MATERIAL_STATUS_INFO: Readonly<Record<MaterialStatus, { name: string, icon: string }>> = {
	ok: { icon: '✅', name: 'OK' },
	missing: { icon: '❌', name: 'Missing' },
	outofscope: { icon: '⛔', name: 'Out of scope' },
	canceled: { icon: '🚫', name: 'Canceled' }
} as const;
