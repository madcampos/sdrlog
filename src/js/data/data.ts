// oxlint-disable typescript/consistent-type-assertions typescript/no-unsafe-type-assertion no-use-before-define
import * as v from 'valibot';
import logo1st from '../../assets/logos/1st-ed.png?url';
import logo2nd from '../../assets/logos/2nd-ed.png?url';
import logo3rd from '../../assets/logos/3rd-ed.png?url';
import logo4th from '../../assets/logos/4th-ed.png?url';
import logo5th from '../../assets/logos/5th-ed.png?url';
import logo6th from '../../assets/logos/6th-ed.png?url';
import { SavedFileMetadataSchema } from './idb-persistence.ts';

export const MATERIAL_EDITION = {
	1: '1st',
	2: '2nd',
	3: '3rd',
	4: '4th',
	5: '5th',
	6: '6th'
} as const;

// oxlint-disable-next-line no-magic-numbers
export const MaterialEditionSchema = v.pipe(v.number(), v.minValue(1), v.maxValue(6));
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

export const MaterialLanguageSchema = v.picklist(Object.keys(MATERIAL_LANGUAGES) as KnownLocaleCodes[]);
export const MaterialNamesSchema = v.record(
	MaterialLanguageSchema,
	v.string()
);
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

export const MaterialPublisherSchema = v.picklist(MATERIAL_PUBLISHERS);
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

export const MaterialCategorySchema = v.picklist(Object.keys(MATERIAL_CATEGORY) as MaterialCategory[]);
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

export const MaterialTypeSchema = v.picklist(Object.keys(MATERIAL_TYPE) as MaterialType[]);
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

export const MaterialStatusSchema = v.picklist(Object.keys(MATERIAL_STATUS) as MaterialStatus[]);
export type MaterialStatus = keyof typeof MATERIAL_STATUS;

export const MATERIAL_STATUS_ICONS = {
	'ok': 'mdi:check-bold',
	'missing': 'mdi:alert-decagram',
	'outofscope': 'mdi:do-not-disturb-outline',
	'canceled': 'mdi:cancel-circle-outline',
	'partially-missing': 'mdi:warning-octagon-outline'
} as const;

export const IsoDateSchema = v.pipe(v.string(), v.isoDate(), v.brand('iso-date'));
export type ISODate = v.InferInput<typeof IsoDateSchema>;

export const IsoTimestampSchema = v.pipe(v.string(), v.isoTimestamp(), v.brand('iso-timestamp'));
export type ISOTimestamp = v.InferInput<typeof IsoTimestampSchema>;

export const AbsoluteLinkSchema = v.pipe(
	v.union([
		v.pipe(v.string(), v.regex(/^data:.+;base64,.+$/iu)),
		v.pipe(v.string(), v.regex(/^file:\/\/\/.+$/iu)),
		v.pipe(v.string(), v.regex(/^http:\/\/.+$/iu)),
		v.pipe(v.string(), v.regex(/^https:\/\/.+$/iu))
	]),
	v.brand('absolute-link')
);
export type AbsoluteLink = `data:${string};base64,${string}` | `file:///${string}` | `http://${string}` | `https://${string}`;

export const RelativeLinkSchema = v.pipe(v.string(), v.regex(/^\.{1,2}\/.+$/iu), v.brand('relative-link'));
export type RelativeLink = `../${string}` | `./${string}`;

export const MaterialLinksSchema = v.record(AbsoluteLinkSchema, v.string());
export type MaterialLinks = Record<AbsoluteLink, string>;

export const MaterialCoverSchema = v.union([AbsoluteLinkSchema, RelativeLinkSchema]);
export type MaterialCover = AbsoluteLink | RelativeLink;

export const MaterialSkuSchema = v.pipe(v.string(), v.regex(/^[A-Z0-9](?:-?[A-Z0-9])+(?:-[A-Z])?$/u), v.brand('sku'));
export type MaterialSku = v.InferInput<typeof MaterialSkuSchema>;

export const MaterialSubItemSchema = v.object({
	sku: MaterialSkuSchema,
	name: v.pipe(v.string(), v.nonEmpty()),
	status: MaterialStatusSchema,
	description: v.optional(v.string()),
	notes: v.optional(v.string()),
	links: v.optional(MaterialLinksSchema),
	cover: v.optional(MaterialCoverSchema),
	thumbnail: v.optional(MaterialCoverSchema),
	files: v.optional(v.array(SavedFileMetadataSchema))
});
export type MaterialSubItem = v.InferInput<typeof MaterialSubItemSchema>;

export const MaterialSchema = v.object({
	sku: v.pipe(v.array(MaterialSkuSchema), v.nonEmpty()),
	categories: MaterialCategorySchema,
	type: MaterialTypeSchema,
	name: v.pipe(v.string(), v.nonEmpty()),
	names: v.optional(MaterialNamesSchema),
	description: v.string(),
	edition: MaterialEditionSchema,
	publisher: v.pipe(v.array(MaterialPublisherSchema), v.nonEmpty()),
	gameDate: IsoDateSchema,
	releaseDate: v.optional(v.pipe(v.array(IsoTimestampSchema), v.nonEmpty())),
	status: MaterialStatusSchema,
	originalLanguage: MaterialLanguageSchema,
	notes: v.optional(v.string()),
	links: v.optional(MaterialLinksSchema),
	subItems: v.optional(MaterialSubItemSchema),
	cover: MaterialCoverSchema,
	thumbnail: MaterialCoverSchema,
	files: v.optional(v.array(SavedFileMetadataSchema))
});
export type Material = v.InferInput<typeof MaterialSchema>;
