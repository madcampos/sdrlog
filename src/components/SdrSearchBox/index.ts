import { registerShortcut } from '../../js/util/keyboard';
import { registerComponent, SdrComponent } from '../SdrComponent';

import { SearchEngine } from './search-engine';

import template from './template.html?raw' assert { type: 'html' };
import style from './style.css?inline' assert { type: 'css' };

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
				updateSuggestions: (evt) => {
					const { value } = evt.target as HTMLInputElement;

					this.value = value;

					window.requestAnimationFrame(() => {
						const datalist = this.root.querySelector('datalist') as HTMLDataListElement;

						SearchEngine.updateSuggestions(this.value, datalist);
					});
				},
				updateFilter: () => {
					SearchEngine.updateSearchResults(this.value);
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

		this.value = SearchEngine.updateFromURL();
	}

	focus() {
		this.root.querySelector('input')?.focus();
	}

	blur() {
		this.root.querySelector('input')?.blur();
	}
}

registerComponent(SdrSearchBox);
