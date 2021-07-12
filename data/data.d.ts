export type IsoCode = 'de-DE' | 'fr-FR' | 'jp-JP' | 'es-ES' | 'hu-HU' | 'it-IT' | 'pt-BR' | 'cs-CZ' | 'he-IL' | 'pl-PL' | 'fi-FI' | 'en-US';

export interface MaterialLink {
	title: string,
	url: string
}

export type MaterialCategory = 'rulebook' | 'sourcebook' | 'mission' | 'magazine' | 'novel' | 'videogame' | 'tcg' | 'boardgame' | 'misc';

export type MaterialType = 'digital' | 'print' | 'scan' | 'ocr' | 'physical';

export type MaterialStatus = 'missing' | 'outofscope' | 'canceled';

export interface Material {
	category: MaterialCategory,
	type: MaterialType,
	sku: string[],
	name: string,
	names?: Partial<Record<IsoCode, string>>,
	description: string,
	edition: number,
	publisher: string[],
	gameDate?: string,
	releaseDate?: string[],
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
