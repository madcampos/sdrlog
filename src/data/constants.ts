import type { MaterialPublisher } from './data';

export const MATERIAL_EDITION_INFO = {
	1: '1st',
	2: '2nd',
	3: '3rd',
	4: '4th',
	5: '5th',
	6: '6th',
	0: '-'
} as const;

export const MATERIAL_LANGUAGES_INFO = {
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
	'en-US': { icon: '🇺🇸', name: 'English' },
	'': { icon: '', name: '-' }
} as const;

export const MATERIAL_PUBLISHERS: readonly MaterialPublisher[] = [
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

export const MATERIAL_CATEGORY_INFO = {
	'novel': { icon: '📚', name: 'Novel' },
	'sourcebook': { icon: '📜', name: 'Sourcebook' },
	'mission': { icon: '🗺️', name: 'Mission' },
	'rulebook': { icon: '📝', name: 'Rulebook' },
	'misc': { icon: '🔣', name: 'Misc.' },
	'magazine': { icon: '📰', name: 'Magazine' },
	'boardgame': { icon: '♟️', name: 'Boardgame' },
	'videogame': { icon: '🎮', name: 'Videogame' },
	'tcg': { icon: '🃏', name: 'T.C.G.' },
	'unofficial': { icon: '📓', name: 'Unofficial' },
	'': { icon: '', name: '-' }
} as const;

export const MATERIAL_TYPE_INFO = {
	'digital': { icon: '💽', name: 'Digital' },
	'scan': { icon: '📠', name: 'Scan' },
	'ocr': { icon: '💾', name: 'OCR' },
	'print': { icon: '🖨️', name: 'Print' },
	'physical': { icon: '🎲', name: 'Physical' },
	'': { icon: '', name: '-' }
} as const;

export const MATERIAL_STATUS_INFO = {
	'ok': { icon: '✅', name: 'OK' },
	'missing': { icon: '❌', name: 'Missing' },
	'outofscope': { icon: '⛔', name: 'Out of scope' },
	'canceled': { icon: '🚫', name: 'Canceled' },
	'partially-missing': { icon: '♻️', name: 'Partially Missing' },
	'': { icon: '', name: '-' }
} as const;
