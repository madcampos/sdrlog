import { registerShortcut } from '../../js/util/keyboard';
import { getSuggestions } from './search-suggestions';
import { registerComponent, SdrComponent } from '../base/BaseComponent';

import { getFiltersFromTagsString, getFiltersFromURL, getTagStringFromFilters, updateSearchFilter } from './update-filter';

import template from './template.html?raw';
import style from './style.css?raw';

const watchedAttributes = ['value'];

export interface SdrSearchBox {
	value: string
}

export class SdrSearchBox extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }
	static readonly elementName = 'sdr-search-box';

	constructor() {
		super({
			name: SdrSearchBox.elementName,
			watchedAttributes,
			props: [{ name: 'value', value: '', attributeName: 'value' }],
			handlers: {
				updateSuggestions: () => {
					window.requestAnimationFrame(() => {
						const suggestions = getSuggestions(this.value);
						const datalist = this.root.querySelector('datalist') as HTMLDataListElement;

						datalist.innerHTML = '';
						datalist.append(...suggestions);
					});
				},
				updateFilter: () => {
					if (!this.value) {
						updateSearchFilter({});
					} else {
						const filters = getFiltersFromTagsString(this.value);

						updateSearchFilter(filters);
					}
				},
				searchClick: () => {
					this.root.querySelector('input')?.dispatchEvent(new Event('change'));
				}
			},
			template,
			style
		});

		registerShortcut('f', () => {
			if (document.activeElement === this) {
				this.blur();
			} else {
				this.focus();
			}
		});

		this.value = getTagStringFromFilters(getFiltersFromURL());
	}

	focus() {
		this.root.querySelector('input')?.focus();
	}

	blur() {
		this.root.querySelector('input')?.blur();
	}
}

registerComponent(SdrSearchBox);
