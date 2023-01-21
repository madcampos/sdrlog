export type IsoCode = 'de-DE' | 'fr-FR' | 'jp-JP' | 'es-ES' | 'hu-HU' | 'it-IT' | 'pt-BR' | 'cs-CZ' | 'he-IL' | 'pl-PL' | 'fi-FI' | 'en-US';

export interface MaterialLink {
	title: string,
	url: string
}

export type MaterialEdition = 1 | 2 | 3 | 4 | 5 | 6;

export type MaterialPublisher = 'Catalyst Game Labs' | 'Cliffhanger Productions' | 'FASA Corporation' | 'Fantasy Productions' | 'Harebrained Schemes' | 'Pegasus Spiele' | 'WizKids Games' | 'Heyne Verlag' | 'Other' | 'Unofficial';

export type MaterialCategory = 'rulebook' | 'sourcebook' | 'mission' | 'magazine' | 'novel' | 'videogame' | 'tcg' | 'boardgame' | 'misc';

export type MaterialType = 'digital' | 'print' | 'scan' | 'ocr' | 'physical';

export type MaterialStatus = 'missing' | 'outofscope' | 'canceled';

export type MaterialReleaseDate = `${number}-${number}-${number}`;

export type MaterialGameDate = `${number}-${number}`;

export interface Material {
	category: MaterialCategory,
	type: MaterialType,
	sku: string[],
	name: string,
	names?: Partial<Record<IsoCode, string>>,
	description: string,
	edition: MaterialEdition,
	publisher: MaterialPublisher[],
	gameDate?: MaterialGameDate,
	releaseDate?: MaterialReleaseDate[],
	status?: MaterialStatus,
	originalLanguage: IsoCode,
	notes?: string,
	links?: MaterialLink[]
}

export interface SDRLogData {
	'$schema': string,
	items: Material[]
}

export interface FileForMaterial {
	itemId: string,
	fileName: string,
	filePath: string,
	mimeType: string,
	fileExtension: string
}
