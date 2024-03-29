export type IsoCode = 'de-DE' | 'fr-FR' | 'jp-JP' | 'es-ES' | 'hu-HU' | 'it-IT' | 'pt-BR' | 'cs-CZ' | 'he-IL' | 'pl-PL' | 'fi-FI' | 'en-US';

export type MaterialEdition = 1 | 2 | 3 | 4 | 5 | 6;

export type MaterialPublisher = 'Catalyst Game Labs' | 'Cliffhanger Productions' | 'FASA Corporation' | 'Fantasy Productions' | 'Harebrained Schemes' | 'Pegasus Spiele' | 'WizKids Games' | 'Heyne Verlag' | 'Other' | 'Unofficial';

export type MaterialCategory = 'rulebook' | 'sourcebook' | 'mission' | 'magazine' | 'novel' | 'videogame' | 'tcg' | 'boardgame' | 'misc' | 'unofficial';

export type MaterialType = 'digital' | 'print' | 'scan' | 'ocr' | 'physical';

export type MaterialStatus = 'missing' | 'outofscope' | 'canceled' | 'ok';

export type MaterialReleaseDate = `${number}-${number}-${number}`;

export type MaterialGameDate = `${number}-${number}`;

export type MaterialNames = Partial<Record<IsoCode, string>>;

export interface MaterialItem {
	name: string,
	status: MaterialStatus,
	description: string,
	notes: string,
	links?: Record<string, string>
}

export interface Material {
	category: MaterialCategory,
	type: MaterialType,
	sku: string[],
	name: string,
	names?: MaterialNames,
	description: string,
	edition: MaterialEdition,
	publisher: MaterialPublisher[],
	gameDate: MaterialGameDate,
	releaseDate?: MaterialReleaseDate[],
	status: MaterialStatus,
	originalLanguage: IsoCode,
	notes?: string,
	links?: Record<string, string>,
	items?: MaterialItem[]
}

export interface SDRLogData {
	'$schema': string,
	items: Material[]
}

export interface FileForMaterial {
	itemId?: string,
	fileName?: string,
	filePath: string,
	mimeType?: string,
	fileExtension?: string,
	handler: FileSystemFileHandle | FileSystemDirectoryHandle,
	hash: string
}

export interface NewMaterial extends Material {
	files?: FileForMaterial[],
	cover?: File,
	items?: (MaterialItem & {
		files?: FileForMaterial[],
		cover?: File
	})[]
}
