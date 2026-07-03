import { MATERIAL_CATEGORY, MATERIAL_EDITION, MATERIAL_STATUS, MATERIAL_TYPE } from './data/data.ts';

// #region Glogal Events
export class SearchEvent extends Event {
	searchString: string;

	constructor(searchString: string, init?: EventInit) {
		super('--search', init);

		this.searchString = searchString;
	}
}

export class SearchResetEvent extends Event {
	constructor(init?: EventInit) {
		super('--search-reset', init);
	}
}

export class SearchUpdateEvent extends Event {
	// oxlint-disable-next-line no-use-before-define
	searchString = SearchEngine.toString();

	constructor(init?: EventInit) {
		super('--search-update', init);
	}
}

declare global {
	interface DocumentEventMap {
		'--search': SearchEvent;
		'--search-reset': SearchResetEvent;
		'--search-update': SearchUpdateEvent;
	}
}
// #endregion

// #region Constants and types
const MIN_LENGTH_FOR_SUGGESTION = 3;

const searchTags = [
	'category',
	'edition',
	'name',
	'sku',
	'status',
	'type'
] as const;

export type SearchTag = typeof searchTags[number];

export interface SearchSuggestion {
	value: string;
	text: string;
}
// #endregion

// #region Search Engine
export class SearchEngine {
	static #cardElement = 'material-card';
	static #stylesheet = new CSSStyleSheet();

	static #resetState() {
		const url = new URL(window.location.href);

		if (!url.search) {
			return;
		}

		searchTags.forEach((tag) => {
			url.searchParams.delete(tag);
		});

		window.navigation.navigate(url, { history: 'replace' });
	}

	static #appendState(tag: SearchTag, value: string | undefined | null) {
		const newValue = SearchEngine.#normalizeTagValue(tag, value);
		const url = new URL(window.location.href);

		if (newValue && !url.searchParams.has(tag, newValue)) {
			url.searchParams.append(tag, newValue);
			window.navigation.navigate(url, { history: 'replace' });
		}
	}

	static #resolveSearchParams() {
		const searchParams = new URLSearchParams(window.location.search);

		searchTags.forEach((tag) => {
			searchParams.getAll(tag).forEach((value) => {
				SearchEngine.#appendState(tag, value);
			});
		});

		document.dispatchEvent(new SearchUpdateEvent());
	}

	static #updateStylesheet() {
		const searchParams = new URLSearchParams(window.location.search);
		const filterArray: string[] = [];

		searchTags.forEach((tag) => {
			searchParams.getAll(tag).forEach((value) => {
				filterArray.push(`[data-${tag}*="${value.toLowerCase()}" i]`);
			});
		});

		if (!filterArray.length) {
			SearchEngine.#stylesheet.replaceSync('');
		}

		SearchEngine.#stylesheet.replaceSync(`${SearchEngine.#cardElement}:not(${filterArray.join(', ')}) { display: none; }`);
	}

	static #isTag(tag: string | undefined): tag is SearchTag {
		if (!tag) {
			return false;
		}

		// oxlint-disable-next-line typescript/consistent-type-assertions typescript/no-unsafe-type-assertion
		return searchTags.includes(tag as SearchTag);
	}

	static #normalizeTagValue(tag: SearchTag, value: string | undefined | null) {
		if (!value?.trim()) {
			return;
		}

		let normalizedValue = undefined;
		const trimmedValue = value.trim();

		switch (tag) {
			case 'category':
				if (Object.keys(MATERIAL_CATEGORY).includes(trimmedValue)) {
					normalizedValue = trimmedValue;
				}
				break;
			case 'edition':
				if (Object.keys(MATERIAL_EDITION).includes(trimmedValue)) {
					normalizedValue = trimmedValue;
				}
				break;
			case 'name':
				normalizedValue = trimmedValue;
				break;
			case 'sku':
				if (/^[A-Z0-9](?:-?[A-Z0-9])+(?:-[A-Z])?$/iu.test(trimmedValue)) {
					normalizedValue = trimmedValue;
				}
				break;
			case 'status':
				if (Object.keys(MATERIAL_STATUS).includes(trimmedValue)) {
					normalizedValue = trimmedValue;
				}
				break;
			case 'type':
				if (Object.keys(MATERIAL_TYPE).includes(trimmedValue)) {
					normalizedValue = trimmedValue;
				}
				break;
			default:
		}

		return normalizedValue;
	}

	static parseTagsFromString(input: string) {
		SearchEngine.#resetState();

		const tagRegex = /(?<tag>category|edition|name|sku|status|type):\s?"(?<value>.+?)"/iug;
		const matches = [...input.matchAll(tagRegex)];
		let lastIndex = 0;

		for (const match of matches) {
			const substring = input.slice(lastIndex, match.index).trim();

			if (substring) {
				SearchEngine.#appendState('name', substring);
			}

			const { tag = '', value = '' } = match.groups ?? {};

			if (SearchEngine.#isTag(tag) && value) {
				SearchEngine.#appendState(tag, value);
			}

			lastIndex = match.index + match[0].length;
		}

		const remaining = input.slice(lastIndex).trim();

		if (remaining) {
			SearchEngine.#appendState('name', remaining);
		}

		SearchEngine.#updateStylesheet();
		document.dispatchEvent(new SearchUpdateEvent());
	}

	static resetSearch() {
		SearchEngine.#resetState();
		SearchEngine.#updateStylesheet();
	}

	static getSuggestions(input: string) {
		if (input.length < MIN_LENGTH_FOR_SUGGESTION) {
			return [];
		}

		const suggestionList: string[] = [];

		if (searchTags.some((tag) => input.startsWith(`${tag}:`))) {
			const [tag = '', value = ''] = input.split(':');

			// oxlint-disable-next-line typescript/consistent-type-assertions typescript/no-unsafe-type-assertion
			switch (tag as SearchTag) {
				case 'sku':
					document.querySelectorAll<HTMLElement>(`${SearchEngine.#cardElement}[data-sku*="${value}" i]`).forEach((card) => {
						const sku = card.dataset['sku'] ?? '';

						if (sku) {
							suggestionList.push(`sku: ${sku}`);
						}
					});
					break;
				case 'category':
					Object.keys(MATERIAL_CATEGORY)
						.filter((suggestion) => !suggestion || suggestion.startsWith(value))
						.forEach((suggestion) => {
							suggestionList.push(`category: ${suggestion}`);
						});
					break;
				case 'edition':
					Object.keys(MATERIAL_EDITION)
						.filter((suggestion) => !suggestion || suggestion.startsWith(value))
						.forEach((suggestion) => {
							suggestionList.push(`edition: ${suggestion}`);
						});
					break;
				case 'status':
					Object.keys(MATERIAL_STATUS)
						.filter((suggestion) => !suggestion || suggestion.startsWith(value))
						.forEach((suggestion) => {
							suggestionList.push(`status: ${suggestion}`);
						});
					break;
				case 'type':
					Object.keys(MATERIAL_TYPE)
						.filter((suggestion) => !suggestion || suggestion.startsWith(value))
						.forEach((suggestion) => {
							suggestionList.push(`type: ${suggestion}`);
						});
					break;
				case 'name':
				default:
					document.querySelectorAll<HTMLElement>(`${SearchEngine.#cardElement}[data-name*="${value}" i]`).forEach((card) => {
						const name = card.dataset['name'] ?? '';

						if (name) {
							suggestionList.push(`name: ${name}`);
						}
					});
					break;
			}
		} else {
			document.querySelectorAll<HTMLElement>(`${SearchEngine.#cardElement}[data-name*="${input}" i]`).forEach((card) => {
				const name = card.dataset['name'] ?? '';

				if (name) {
					suggestionList.push(`name: ${name}`);
				}
			});
		}

		return suggestionList;
	}

	static handleEvent(evt: Event) {
		if (evt instanceof SearchEvent) {
			SearchEngine.parseTagsFromString(evt.searchString);
		} else if (evt instanceof SearchResetEvent) {
			SearchEngine.resetSearch();
		}
	}

	static init() {
		document.adoptedStyleSheets.push(SearchEngine.#stylesheet);

		SearchEngine.#resolveSearchParams();
		SearchEngine.#updateStylesheet();

		document.addEventListener('--search', SearchEngine);
		document.addEventListener('--search-reset', SearchEngine);
	}

	static remove() {
		document.adoptedStyleSheets = document.adoptedStyleSheets.filter((stylesheet) => stylesheet !== this.#stylesheet);

		document.removeEventListener('--search', SearchEngine);
		document.removeEventListener('--search-reset', SearchEngine);
	}

	static toString() {
		const searchParams = new URLSearchParams(window.location.search);
		let string = '';

		searchTags.forEach((tag) => {
			searchParams.getAll(tag).forEach((value) => {
				string += `${tag}: "${value}"`;
			});
		});

		return string;
	}

	static toJSON() {
		const searchParams = new URLSearchParams(window.location.search);
		const tags: Partial<Record<SearchTag, string[]>> = {};

		searchTags.forEach((tag) => {
			tags[tag] = [];

			searchParams.getAll(tag).forEach((value) => {
				tags[tag]?.push(value);
			});
		});

		return tags;
	}
}
// #endregion
