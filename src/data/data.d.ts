/**
 * An absolute URL pointing to a resource related to this item.
 */
export type AbsoluteLink = `data:${string};base64,${string}` | `file:///${string}` | `http://${string}` | `https://${string}`;

/**
 * An absolute URL pointing to a resource related to this item.
 */
export type RelativeLink = `../${string}` | `./${string}`;

/**
 * The BCP 47 code for a locale.
 */
export type LocaleCode = `${string}-${string}`;

/**
 * Represents a date in ISO format.
 */
export type ISODate = `${number}-${number}-${number}`;

/**
 * A list of known locales
 */
export type KnownLocaleCodes = 'cs-CZ' | 'de-DE' | 'en-US' | 'es-ES' | 'fi-FI' | 'fr-FR' | 'he-IL' | 'hu-HU' | 'it-IT' | 'jp-JP' | 'pl-PL' | 'pt-BR';

/**
 * One of the main publishers for Shadowrun materials.
 */
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

/**
 * The "stockkeeper unit" number, an identifier for the material by the publisher. It is used as the main identifier for a material, as those numbers tend to be unique, or have low repetitions.
 *
 * Some repetitions may occur however, in which case, those will have slightly modified SKUs to disambiguate between the two.
 */
export type MaterialSku = string;

/**
 * A list of links for this material, where the URL is used as key and the title to present the link as the value.
 */
export type Links = Record<AbsoluteLink, string>;

/**
 * The cover for this material.
 *
 * If the material comes from the source data file, it will only have a URL as it's cover.
 * Materials that have had their covers altered, may have a `File` or a `FileSystemFileHandle` instead.
 */
export type MaterialCover = AbsoluteLink | File | FileSystemFileHandle | RelativeLink;

/**
 * The saved file representation for a material.
 */
export interface FileSystemEntryForMaterial {
	/**
	 * An id for the item this file represents, it is the first SKU from the SKU list.
	 */
	itemId?: MaterialSku;
	/**
	 * The file name, including extension, retrieved from the file system.
	 */
	fileName?: string;
	/**
	 * The synthetic file path. In unix format (i.e. using `/` as path separators).
	 *
	 * It takes into account the user provided folder as root, and build the path from it, including all sub folders in between.
	 */
	filePath: string;
	/**
	 * The identified mime type for the file.
	 */
	mimeType?: string;
	/**
	 * The file extension, including the beginning dot.
	 */
	fileExtension?: string;
	/**
	 * The handler for this material, provided by the file system.
	 */
	handler: FileSystemDirectoryHandle | FileSystemFileHandle;
	/**
	 * A SHA-1 hash of the file contents, used for comparing two similar files.
	 */
	hash: string;
}

/**
 * A sub-items that is part of the material. May be used for collections like a boardgame or running magazine series.
 */
export interface MaterialSubItem {
	/**
	 * The SKU for the sub-material, if it is different from the parent one.
	 */
	sku?: MaterialSku;
	/**
	 * A name for the sub material item.
	 */
	name: string;
	/**
	 * The status for this sub-material.
	 */
	status: MaterialStatus;
	/**
	 * A description for the sub item. Including details about it.
	 */
	description: string;
	/**
	 * Some notes about this material, including details about why it is separate from the main entry.
	 */
	notes?: string;
	/**
	 * Links for this materia.
	 */
	links?: Links;

	/**
	 * The cover for this sub-material.
	 */
	cover: MaterialCover;

	/**
	 * A list of file entries for this sub-material.
	 */
	files?: FileSystemEntryForMaterial[];
}

/**
 * The metadata related to a material to be represented.
 */
export interface Material {
	/**
	 * The category the material fits in, it (almost) follows the folder organization proposed in the wikipedia article of Shadowrun books. It may be one of the following:
	 *
	 * - **Boardgame**: A boardgame or other physical game that is setted in the Shadowrun universe.
	 * - **Magazine**: A magazine publication with assosrted content.
	 * - **Miscellaneous**: Assorted matterials that don't fit in any of the above categories.
	 * - **Mission**: A book containing information to be used on an adventure or campaign.
	 * - **Novel**: A fiction book writen based on the Shadowrun universe.
	 * - **Rulebook**: A book containing mostly rules that are compatible with only one edition of the game.
	 * - **Sourcebook**: A book containing settings, plot hooks and other stuff that is mostly background information, not rules.
	 * - **TCG**: Trade Card Game based on the Shadowrun universe.
	 * - **Unofficial**: An item that is not officialy released but is still of importance to be kept.
	 * - **Videogame**: Digital game setted in the Shadowrun world.
	 */
	category: 'boardgame' | 'magazine' | 'misc' | 'mission' | 'novel' | 'rulebook' | 'sourcebook' | 'tcg' | 'unofficial' | 'videogame';

	/**
	 * The type of the material. It may be one of the following:
	 *
	 * - **Digital**: The material is available primarily in digital format.
	 * - **OCR**: The material is a OCR scan of the printed format, usually smaller in size and with better quality.
	 * - **Physical**: The material is only available in a physical format other than a book (Eg.: TCG, boardgame, etc.).
	 * - **Print**: The material is available in printed format only.
	 * - **Scan**: The material is available as a low quality (non OCR) scan of the printed format.
	 */
	type: 'digital' | 'ocr' | 'physical' | 'print' | 'scan';

	/**
	 * The numbers that identifies the material within the publishers, some may be infered or unofficial.
	 */
	sku: [MaterialSku, ...MaterialSku[]];

	/**
	 * The original name of the material.
	 */
	name: string;

	/**
	 * A list with translated names for the material.
	 */
	names?: Partial<Record<KnownLocaleCodes, string>>;

	/**
	 * A description or synopsis of the material.
	 */
	description: string;

	/**
	 * The edition of the publication, ranging from 1 to 6.
	 */
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	edition: 1 | 2 | 3 | 4 | 5 | 6;

	/**
	 * A list of enterprises who published the material.
	 */
	publisher: [MaterialPublisher, ...(MaterialPublisher)[]];

	/**
	 * The in game date of the material.
	 */
	gameDate: `${number}-${number}`;

	/**
	 * The date the material was released and it's rereleases. If not present the material is considered unreleased.
	 */
	releaseDate?: [ISODate, ...ISODate[]];

	/**
	 * The status of the item, one of the following:
	 *
	 * - **Canceled**: The item was canceled.
	 * - **Missing**: The item is not present on the archives.
	 * - **Partially Missing**: The item has some of it's sub-items or has missing parts.
	 * - **OK**: The item is present in the collection.
	 * - **Out of Scope**: The item is not available or is really hard to obtain and don't add anything new.
	 */
	status: 'canceled' | 'missing' | 'ok' | 'outofscope' | 'partially-missing';

	/**
	 * "The original language the material was released. Following the BCP 47 locale format.
	 */
	originalLanguage: KnownLocaleCodes;

	/**
	 * Some notes about the material, used to explain the status or reasonig for the material be listed as it is.
	 */
	notes?: string;

	/**
	 * A list of links for this material.
	 */
	links?: Links;

	/**
	 * A list of items that are part of the material. May be used for collections like a boardgame or running magazine series.
	 */
	subItems?: MaterialSubItem[];

	/**
	 * The cover for this material.
	 */
	cover: MaterialCover;

	/**
	 * A list of file entries for this material.
	 */
	files?: FileSystemEntryForMaterial[];
}

/**
 * The main json file.
 */
export interface SDRLogData {
	$schema: string;
	items: Material[];
}

/**
 * A "directory list" style schema for listing all data, instead of keeping track of a giant file.
 */
export interface ShadowrunCatalogDataList {
	/**
	 * The date the list was last updated, in ISO timestamp format.
	 */
	lastUpdated: string;
	/**
	 * A list of items with basic information about them.
	 */
	items: {
		/**
		 * The identifier for this item.
		 */
		sku: MaterialSku,
		/**
		 * The original name of the material.
		 */
		name: string,
		/**
		 * An URL pointing to a resource related to this item.
		 */
		link: AbsoluteLink | RelativeLink,

		/**
		 * An URL pointing to a cover for this item.
		 */
		cover: MaterialCover,

		category: Material['category'],
		type: Material['type'],
		edition: Material['edition'],
		status: Material['status']
	}[];
}
