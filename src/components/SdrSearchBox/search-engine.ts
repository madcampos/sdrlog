import type { SdrCard } from '../SdrCard';

import { I18n } from '../../js/intl/translations';

type FilterTypes = 'name' | 'category' | 'type' | 'status' | 'sku' | 'edition';

let filterElement: HTMLStyleElement | undefined;

export class SearchEngine {
	static #getFilterFromTagsString(tagString: string) {
		const tagsRegex = /^(?<tag>sku|type|category|edition|status|name):\s+(?<value>.+)$/igu;
		const { tag, value } = tagsRegex.exec(tagString)?.groups ?? { tag: 'name', value: tagString };

		return {
			tag: tag as FilterTypes,
			value
		};
	}

	static #updateUrlSearchParams(tag: FilterTypes, value: string) {
		const search = new URLSearchParams(window.location.search);
		const url = new URL(window.location.href);
		const searchString = `${tag}: ${value}`;

		if (searchString === 'name: ' || searchString === 'category: all') {
			search.delete('search');
			url.search = search.toString();

			window.history.pushState(null, document.title, url);
		} else if (search.get('search') !== searchString) {
			const data = {
				type: 'search',
				value: searchString
			};

			search.set('search', searchString);
			url.search = search.toString();

			window.history.pushState(data, document.title, url);
		}
	}

	static #updateCSSFilter(tag: FilterTypes, value: string) {
		if (!filterElement) {
			filterElement = document.createElement('style');
			document.head.appendChild(filterElement);
		}

		window.requestAnimationFrame(() => {
			if ((tag === 'category' && value === 'all') || (tag === 'name' && value === '')) {
				(filterElement as HTMLElement).innerText = '';
			} else if (tag === 'name') {
				(filterElement as HTMLElement).innerText = `sdr-card:not([title*="${value}" i]){ display:none; }`;
			} else {
				(filterElement as HTMLElement).innerText = `sdr-card:not([${tag}*="${value}" i]){ display:none; }`;
			}
		});
	}

	static #getSuggestionListForTag(tag: FilterTypes, value: string) {
		const suggestionList: [string, string][] = [];

		switch (tag) {
			case 'sku':
				document.querySelectorAll<SdrCard>(`sdr-card[sku*="${value}" i]`).forEach((card) => {
					const skus = card.sku;
					const correctSku = skus.find((sku) => sku.includes(value));

					suggestionList.push([
						`sku: ${correctSku}`,
						card.title
					]);
				});
				break;

			case 'category':
				suggestionList.push(
					['category: rulebook', I18n.t`Rulebook`],
					['category: sourcebook', I18n.t`Sourcebook`],
					['category: mission', I18n.t`Mission`],
					['category: magazine', I18n.t`Magazine`],
					['category: novel', I18n.t`Novel`],
					['category: videogame', I18n.t`Videogame`],
					['category: tcg', I18n.t`T.C.G.`],
					['category: boardgame', I18n.t`Boardgame`],
					['category: misc', I18n.t`Misc.`]
				);
				break;

			case 'edition':
				suggestionList.push(
					['edition: 1', I18n.t`First Edition`],
					['edition: 2', I18n.t`Second Edition`],
					['edition: 3', I18n.t`Third Edition`],
					['edition: 4', I18n.t`Forth Edition`],
					['edition: 5', I18n.t`Fifth Edition`],
					['edition: 6', I18n.t`Sixth Edition`]
				);
				break;

			case 'type':
				suggestionList.push(
					['type: digital', I18n.t`Digital`],
					['type: print', I18n.t`Print`],
					['type: scan', I18n.t`Scan`],
					['type: ocr', I18n.t`OCR`],
					['type: physical', I18n.t`Physical`]
				);
				break;

			case 'status':
				suggestionList.push(
					['status: missing', I18n.t`Missing`],
					['status: outofscope', I18n.t`Out of scope`],
					['status: canceled', I18n.t`Canceled`],
					['status: ok', I18n.t`Okay`]
				);
				break;

			default:
				document.querySelectorAll<SdrCard>(`sdr-card[title*="${value}" i]`).forEach((card) => {
					suggestionList.push([`name: ${card.title}`, card.title]);
				});
				break;
		}

		return suggestionList;
	}

	static updateSuggestions(search: string, suggestionsList: HTMLDataListElement) {
		const MIN_STRING_LENGTH = 3;
		const { tag, value } = SearchEngine.#getFilterFromTagsString(search);

		suggestionsList.innerHTML = '';

		if ((tag === 'name' || tag === 'sku') && value.length <= MIN_STRING_LENGTH) {
			return;
		}

		const suggestions = SearchEngine.#getSuggestionListForTag(tag, value);

		suggestions.forEach(([optionValue, text]) => {
			const option = document.createElement('option');

			option.value = optionValue;
			option.text = text;

			suggestionsList.append(option);
		});
	}

	static updateSearchResults(searchString: string) {
		const { tag, value } = SearchEngine.#getFilterFromTagsString(searchString);

		SearchEngine.#updateCSSFilter(tag, value);
		SearchEngine.#updateUrlSearchParams(tag, value);
	}

	static updateFromURL() {
		const search = new URLSearchParams(window.location.search);
		const searchValue = search.get('search');

		if (searchValue) {
			SearchEngine.updateSearchResults(searchValue);
		}

		return searchValue ?? '';
	}
}
