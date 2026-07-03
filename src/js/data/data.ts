import logo1st from '../../assets/logos/1st-ed.png?url';
import logo2nd from '../../assets/logos/2nd-ed.png?url';
import logo3rd from '../../assets/logos/3rd-ed.png?url';
import logo4th from '../../assets/logos/4th-ed.png?url';
import logo5th from '../../assets/logos/5th-ed.png?url';
import logo6th from '../../assets/logos/6th-ed.png?url';
import type { SavedMaterialFile } from './idb-persistence.ts';

export const MATERIAL_EDITION = {
	1: '1st',
	2: '2nd',
	3: '3rd',
	4: '4th',
	5: '5th',
	6: '6th'
} as const;

export type MaterialEdition = keyof typeof MATERIAL_EDITION;

export const MATERIAL_EDITION_ICONS = {
	1: logo1st,
	2: logo2nd,
	3: logo3rd,
	4: logo4th,
	5: logo5th,
	6: logo6th
} as const;

export const MATERIAL_LANGUAGES = {
	'de-DE': 'German',
	'fr-FR': 'French',
	'jp-JP': 'Japanese',
	'es-ES': 'Spanish',
	'hu-HU': 'Hungarian',
	'it-IT': 'Italian',
	'pt-BR': 'Brazilian Portuguese',
	'cs-CZ': 'Czech',
	'he-IL': 'Hebrew',
	'pl-PL': 'Polish',
	'fi-FI': 'Finnish',
	'en-US': 'English'
} as const;

export type LocaleCode = `${string}-${string}`;
export type KnownLocaleCodes = keyof typeof MATERIAL_LANGUAGES;

export const MATERIAL_PUBLISHERS = [
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

export type MaterialPublisher = typeof MATERIAL_PUBLISHERS[number];

export const MATERIAL_CATEGORY = {
	novel: 'Novel',
	sourcebook: 'Sourcebook',
	mission: 'Mission',
	rulebook: 'Rulebook',
	misc: 'Misc.',
	magazine: 'Magazine',
	boardgame: 'Boardgame',
	videogame: 'Videogame',
	tcg: 'Trading Card Game',
	unofficial: 'Unofficial'
} as const;

export type MaterialCategory = keyof typeof MATERIAL_CATEGORY;

export const MATERIAL_CATEGORY_ICONS = {
	novel: 'mdi:bookshelf',
	sourcebook: 'mdi:scroll-text',
	mission: 'mdi:map',
	rulebook: 'mdi:pencil-ruler',
	misc: 'mdi:puzzle',
	magazine: 'mdi:book-open-variant',
	boardgame: 'mdi:dice-multiple',
	videogame: 'mdi:gamepad-classic',
	tcg: 'mdi:cards-playing',
	unofficial: 'mdi:flask'
} as const;

export const MATERIAL_TYPE = {
	digital: 'Digital',
	scan: 'Scan',
	ocr: 'OCR',
	print: 'Print',
	physical: 'Physical'
} as const;

export type MaterialType = keyof typeof MATERIAL_TYPE;

export const MATERIAL_TYPE_ICONS = {
	digital: 'mdi:desktop-classic',
	scan: 'mdi:scanner',
	ocr: 'mdi:ocr',
	print: 'mdi:printer',
	physical: 'mdi:chess-pawn'
} as const;

export const MATERIAL_STATUS = {
	'ok': 'OK',
	'missing': 'Missing',
	'outofscope': 'Out of scope',
	'canceled': 'Canceled',
	'partially-missing': 'Partially Missing'
} as const;

export type MaterialStatus = keyof typeof MATERIAL_STATUS;

export const MATERIAL_STATUS_ICONS = {
	'ok': 'mdi:check-bold',
	'missing': 'mdi:alert-decagram',
	'outofscope': 'mdi:do-not-disturb-outline',
	'canceled': 'mdi:cancel-circle-outline',
	'partially-missing': 'mdi:warning-octagon-outline'
} as const;

declare const IsoDateBrand: unique symbol;
export type ISODate = string & { [IsoDateBrand]: 'iso-date' };

export type AbsoluteLink = `data:${string};base64,${string}` | `file:///${string}` | `http://${string}` | `https://${string}`;

export type RelativeLink = `../${string}` | `./${string}`;

export type Links = Record<AbsoluteLink, string>;

export type MaterialCover = AbsoluteLink | RelativeLink;

declare const SkuBrand: unique symbol;
export type MaterialSku = string & { [SkuBrand]: 'sku' };

export interface MaterialSubItem {
	sku?: MaterialSku;
	name: string;
	status: MaterialStatus;
	description: string;
	notes?: string;
	links?: Links;
	cover?: MaterialCover;
	thumbnail?: MaterialCover;
	files?: SavedMaterialFile[];
}

export interface Material {
	category: MaterialCategory;
	type: MaterialType;
	sku: [MaterialSku, ...MaterialSku[]];
	name: string;
	names?: Partial<Record<KnownLocaleCodes, string>>;
	description: string;
	edition: MaterialEdition;
	publisher: [MaterialPublisher, ...(MaterialPublisher)[]];
	gameDate: `${number}-${number}`;
	releaseDate?: [ISODate, ...ISODate[]];
	status: MaterialStatus;
	originalLanguage: KnownLocaleCodes;
	notes?: string;
	links?: Links;
	subItems?: MaterialSubItem[];
	cover: MaterialCover;
	thumbnail: MaterialCover;
	files?: SavedMaterialFile[];
}
