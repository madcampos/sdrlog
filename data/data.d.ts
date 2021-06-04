declare enum IsoCode {
	'de-DE' = 'de-DE',
	'fr-FR' = 'fr-FR',
	'jp-JP' = 'jp-JP',
	'es-ES' = 'es-ES',
	'hu-HU' = 'hu-HU',
	'it-IT' = 'it-IT',
	'pt-BR' = 'pt-BR',
	'cs-CZ' = 'cs-CZ',
	'he-IL' = 'he-IL',
	'pl-PL' = 'pl-PL',
	'fi-FI' = 'fi-FI',
	'en-US' = 'en-US'
}

export interface Material {
	category: 'rulebook'|'sourcebook'|'mission'|'magazine'|'novel'|'videogame'|'tcg'|'boardgame'|'misc',
	type: 'digital'|'print'|'scan'|'ocr'|'physical',
	sku: string[],
	name: string,
	names?: Record<IsoCode, string>,
	description: string,
	edition: number,
	publisher: string[],
	gameDate?: string,
	releaseDate?: string[],
	status?: 'missing'|'outofscope'|'canceled',
	originalLanguage?: string,
	notes?: string,
	links?: {
		title: string,
		url: string
	}[]
}

export interface SDRLogData {
	'$schema': string,
	items: Material[]
}
