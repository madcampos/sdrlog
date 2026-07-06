// oxlint-disable typescript/consistent-type-assertions typescript/no-unsafe-type-assertion
import * as zod from 'zod/mini';
import logo1st from '../../assets/logos/1st-ed.png?url';
import logo2nd from '../../assets/logos/2nd-ed.png?url';
import logo3rd from '../../assets/logos/3rd-ed.png?url';
import logo4th from '../../assets/logos/4th-ed.png?url';
import logo5th from '../../assets/logos/5th-ed.png?url';
import logo6th from '../../assets/logos/6th-ed.png?url';

export const MATERIAL_EDITION = {
	1: '1st',
	2: '2nd',
	3: '3rd',
	4: '4th',
	5: '5th',
	6: '6th'
} as const;

// oxlint-disable-next-line no-magic-numbers
export const MaterialEditionSchema = zod.number().check(zod.gte(1), zod.lte(6));
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

export const MaterialLanguageSchema = zod.union(Object.keys(MATERIAL_LANGUAGES).map((key) => zod.literal(key as keyof typeof MATERIAL_LANGUAGES)));
export const MaterialNamesSchema = zod.record(
	MaterialLanguageSchema,
	zod.string()
);
export type KnownLocaleCodes = zod.infer<typeof MaterialLanguageSchema>;

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

export const MaterialPublisherSchema = zod.union(MATERIAL_PUBLISHERS.map((item) => zod.literal(item)));
export type MaterialPublisher = zod.infer<typeof MaterialPublisherSchema>;

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

export const MaterialCategorySchema = zod.union(Object.keys(MATERIAL_CATEGORY).map((key) => zod.literal(key as keyof typeof MATERIAL_CATEGORY)));
export type MaterialCategory = zod.infer<typeof MaterialCategorySchema>;

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

export const MaterialTypeSchema = zod.union(Object.keys(MATERIAL_TYPE).map((key) => zod.literal(key as keyof typeof MATERIAL_TYPE)));
export type MaterialType = zod.infer<typeof MaterialTypeSchema>;

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

export const MaterialStatusSchema = zod.union(Object.keys(MATERIAL_STATUS).map((key) => zod.literal(key as keyof typeof MATERIAL_STATUS)));
export type MaterialStatus = zod.infer<typeof MaterialStatusSchema>;

export const MATERIAL_STATUS_ICONS = {
	'ok': 'mdi:check-bold',
	'missing': 'mdi:alert-decagram',
	'outofscope': 'mdi:do-not-disturb-outline',
	'canceled': 'mdi:cancel-circle-outline',
	'partially-missing': 'mdi:warning-octagon-outline'
} as const;

export const IsoDateSchema = zod.string().check(zod.iso.date()).brand<'iso-date'>();
export type ISODate = zod.infer<typeof IsoDateSchema>;

export const IsoTimestampSchema = zod.string().check(zod.iso.datetime()).brand<'iso-timestamp'>();
export type ISOTimestamp = zod.infer<typeof IsoTimestampSchema>;

export const AbsoluteLinkSchema = zod.union([
	zod.string().check(zod.regex(/^data:.+;base64,.+$/iu)),
	zod.string().check(zod.regex(/^file:\/\/\/.+$/iu)),
	zod.string().check(zod.regex(/^http:\/\/.+$/iu)),
	zod.string().check(zod.regex(/^https:\/\/.+$/iu))
]).brand<'absolute-link'>();
export type AbsoluteLink = zod.infer<typeof AbsoluteLinkSchema>;

export const RelativeLinkSchema = zod.string().check(zod.regex(/^\.{1,2}\/.+$/iu)).brand<'relative-link'>();
export type RelativeLink = zod.infer<typeof RelativeLinkSchema>;

export const MaterialLinksSchema = zod.record(AbsoluteLinkSchema, zod.string());
export type MaterialLinks = zod.infer<typeof MaterialLinksSchema>;

export const MaterialCoverSchema = zod.union([AbsoluteLinkSchema, RelativeLinkSchema]);
export type MaterialCover = zod.infer<typeof MaterialCoverSchema>;

export const MaterialSkuSchema = zod.string().check(zod.regex(/^[A-Z0-9](?:-?[A-Z0-9])+(?:-[A-Z])?$/u)).brand<'sku'>();
export type MaterialSku = zod.infer<typeof MaterialSkuSchema>;

export const FileHashSchema = zod.string().check(zod.base64()).brand<'file-hash'>();
export type FileHash = zod.infer<typeof FileHashSchema>;

export const SavedFileMetadataSchema = zod.object({
	itemId: zod.optional(MaterialSkuSchema),
	path: zod.string(),
	mimeType: zod.string(),
	fileName: zod.string(),
	extension: zod.string(),
	hash: FileHashSchema
});

export type SavedFileMetadata = zod.infer<typeof SavedFileMetadataSchema>;

export const MaterialSubItemSchema = zod.object({
	sku: MaterialSkuSchema,
	name: zod.string().check(zod.trim(), zod.normalize('NFC'), zod.minLength(1)),
	status: MaterialStatusSchema,
	description: zod.optional(zod.string()),
	notes: zod.optional(zod.string()),
	links: zod.optional(MaterialLinksSchema),
	cover: zod.optional(MaterialCoverSchema),
	thumbnail: zod.optional(MaterialCoverSchema),
	files: zod.optional(zod.array(SavedFileMetadataSchema))
});
export type MaterialSubItem = zod.infer<typeof MaterialSubItemSchema>;

const BaseMaterialSchema = zod.object({
	sku: zod.array(MaterialSkuSchema).check(zod.minLength(1)),
	category: MaterialCategorySchema,
	type: MaterialTypeSchema,
	name: zod.string().check(zod.trim(), zod.normalize('NFC'), zod.minLength(1)),
	names: zod.optional(MaterialNamesSchema),
	description: zod.string(),
	edition: MaterialEditionSchema,
	publisher: zod.array(MaterialPublisherSchema).check(zod.minLength(1)),
	gameDate: IsoDateSchema,
	releaseDate: zod.optional(zod.array(IsoTimestampSchema).check(zod.minLength(1))),
	status: MaterialStatusSchema,
	originalLanguage: MaterialLanguageSchema,
	notes: zod.optional(zod.string()),
	links: zod.optional(MaterialLinksSchema),
	subItems: zod.optional(MaterialSubItemSchema),
	files: zod.optional(zod.array(SavedFileMetadataSchema))
});

export const MaterialSchema = zod.extend(BaseMaterialSchema, {
	cover: zod.optional(MaterialCoverSchema),
	thumbnail: zod.optional(MaterialCoverSchema)
});
export type Material = zod.infer<typeof MaterialSchema>;

export const NewMaterialSchema = zod.extend(BaseMaterialSchema, {
	cover: zod.instanceof(FileSystemFileHandle),
	thumbnail: zod.instanceof(FileSystemFileHandle)
});

export type NewMaterial = zod.infer<typeof NewMaterialSchema>;

export interface SDRLogData {
	$schema: string;
	lastUpdated: ISODate;
	items: Material[];
}
