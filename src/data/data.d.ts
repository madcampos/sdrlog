export type IsoCode = 'cs-CZ' | 'de-DE' | 'en-US' | 'es-ES' | 'fi-FI' | 'fr-FR' | 'he-IL' | 'hu-HU' | 'it-IT' | 'jp-JP' | 'pl-PL' | 'pt-BR';

export type MaterialEdition = 1 | 2 | 3 | 4 | 5 | 6;

export type MaterialPublisher =
	| 'Catalyst Game Labs'
	| 'Cliffhanger Productions'
	| 'Fantasy Productions'
	| 'FASA Corporation'
	| 'Harebrained Schemes'
	| 'Heyne Verlag'
	| 'Other'
	| 'Pegasus Spiele'
	| 'Unofficial'
	| 'WizKids Games';

export type MaterialCategory = 'boardgame' | 'magazine' | 'misc' | 'mission' | 'novel' | 'rulebook' | 'sourcebook' | 'tcg' | 'unofficial' | 'videogame';

export type MaterialType = 'digital' | 'ocr' | 'physical' | 'print' | 'scan';

export type MaterialStatus = 'canceled' | 'missing' | 'ok' | 'outofscope';

export type MaterialReleaseDate = `${number}-${number}-${number}`;

export type MaterialGameDate = `${number}-${number}`;

export type MaterialNames = Partial<Record<IsoCode, string>>;

export interface MaterialItem {
	name: string;
	status: MaterialStatus;
	description: string;
	notes: string;
	links?: Record<string, string>;
}

export interface Material {
	category: MaterialCategory;
	type: MaterialType;
	sku: string[];
	name: string;
	names?: MaterialNames;
	description: string;
	edition: MaterialEdition;
	publisher: MaterialPublisher[];
	gameDate: MaterialGameDate;
	releaseDate?: MaterialReleaseDate[];
	status: MaterialStatus;
	originalLanguage: IsoCode;
	notes?: string;
	links?: Record<string, string>;
	items?: MaterialItem[];
}

export interface SDRLogData {
	$schema: string;
	items: Material[];
}

export interface FileForMaterial {
	itemId?: string;
	fileName?: string;
	filePath: string;
	mimeType?: string;
	fileExtension?: string;
	handler: FileSystemDirectoryHandle | FileSystemFileHandle;
	hash: string;
}

export interface NewMaterial extends Material {
	files?: FileForMaterial[];
	cover?: File;
	items?: (MaterialItem & {
		files?: FileForMaterial[],
		cover?: File
	})[];
}
