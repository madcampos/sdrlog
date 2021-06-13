export type IsoCode = 'de-DE' | 'fr-FR' | 'jp-JP' | 'es-ES' | 'hu-HU' | 'it-IT' | 'pt-BR' | 'cs-CZ' | 'he-IL' | 'pl-PL' | 'fi-FI' | 'en-US';

export interface MaterialLink {
	title: string,
	url: string
}

export interface Material {
	category: 'rulebook'|'sourcebook'|'mission'|'magazine'|'novel'|'videogame'|'tcg'|'boardgame'|'misc',
	type: 'digital'|'print'|'scan'|'ocr'|'physical',
	sku: string[],
	name: string,
	names?: Partial<Record<IsoCode, string>>,
	description: string,
	edition: number,
	publisher: string[],
	gameDate?: string,
	releaseDate?: string[],
	status?: 'missing'|'outofscope'|'canceled',
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
	fileExtension: string
}
