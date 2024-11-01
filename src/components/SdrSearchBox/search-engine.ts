import type { SdrCard } from '../SdrCard';

type FilterTypes = 'category' | 'edition' | 'name' | 'sku' | 'status' | 'type';

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
					['category: rulebook', 'Rulebook'],
					['category: sourcebook', 'Sourcebook'],
					['category: mission', 'Mission'],
					['category: magazine', 'Magazine'],
					['category: novel', 'Novel'],
					['category: videogame', 'Videogame'],
					['category: tcg', 'T.C.G.'],
					['category: boardgame', 'Boardgame'],
					['category: misc', 'Misc.']
				);
				break;

			case 'edition':
				suggestionList.push(
					['edition: 1', 'First Edition'],
					['edition: 2', 'Second Edition'],
					['edition: 3', 'Third Edition'],
					['edition: 4', 'Forth Edition'],
					['edition: 5', 'Fifth Edition'],
					['edition: 6', 'Sixth Edition']
				);
				break;

			case 'type':
				suggestionList.push(
					['type: digital', 'Digital'],
					['type: print', 'Print'],
					['type: scan', 'Scan'],
					['type: ocr', 'OCR'],
					['type: physical', 'Physical']
				);
				break;

			case 'status':
				suggestionList.push(
					['status: missing', 'Missing'],
					['status: outofscope', 'Out of scope'],
					['status: canceled', 'Canceled'],
					['status: ok', 'Okay']
				);
				break;

			case 'name':
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
		const { tag, value = '' } = SearchEngine.#getFilterFromTagsString(search);

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
		const { tag, value = '' } = SearchEngine.#getFilterFromTagsString(searchString);

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
