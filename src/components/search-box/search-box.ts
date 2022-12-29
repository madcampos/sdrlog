import type { CustomButton } from '../button/button';
import { I18n } from '../intl/translations';
import { registerShortcut } from '../keyboard/keyboard';
import { getSuggestions } from './search-suggestions';

import { getFiltersFromTagsString, getFiltersFromURL, getTagStringFromFilters, updateSearchFilter } from './update-filter';

export class SearchBox extends HTMLElement {
	#root: ShadowRoot;
	#searchBox: HTMLInputElement;
	#datalist: HTMLDataListElement;
	#searchButton: CustomButton;

	constructor() {
		super();

		const template = document.querySelector('#search-box') as HTMLTemplateElement;
		const translatedTemplate = I18n.translateElementsContent(template.content.cloneNode(true));

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(translatedTemplate);

		this.#searchBox = this.#root.querySelector('input') as HTMLInputElement;
		this.#searchButton = this.#root.querySelector('custom-button') as CustomButton;
		this.#datalist = this.#root.querySelector('datalist') as HTMLDataListElement;

		const initialFilters = getFiltersFromURL();
		const initialValue = getTagStringFromFilters(initialFilters);

		this.#searchBox.value = initialValue;

		this.#searchButton.addEventListener('click', () => {
			this.#searchBox.dispatchEvent(new Event('change'));
		});

		this.#searchBox.addEventListener('input', () => {
			this.updateSuggestions();
		});

		this.#searchBox.addEventListener('change', () => {
			if (!this.#searchBox.value) {
				updateSearchFilter({});
			} else {
				const filters = getFiltersFromTagsString(this.#searchBox.value);

				updateSearchFilter(filters);
			}
		});

		registerShortcut('f', () => {
			if (document.activeElement === this) {
				this.#searchBox.blur();
			} else {
				this.#searchBox.focus();
			}
		});
	}

	focus() {
		this.#searchBox.focus();
	}

	updateSuggestions() {
		window.requestAnimationFrame(() => {
			const suggestions = getSuggestions(this.#searchBox.value);

			this.#datalist.innerHTML = '';
			this.#datalist.append(...suggestions);
		});
	}
}

customElements.define('search-box', SearchBox);
