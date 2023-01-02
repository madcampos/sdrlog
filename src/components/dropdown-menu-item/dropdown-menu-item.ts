import type { SdrButton } from '../button/button';

import { SdrComponent } from '../base/BaseComponent';

import template from './template.html?raw';
import style from './style.css?raw';

const watchedAttributes = ['icon', 'disabled'];

export interface SdrDropdownItem {
	icon: string
}

export class SdrDropdownItem extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }
	#button: SdrButton;

	constructor() {
		super({
			name: 'sdr-dropdown-item',
			watchedAttributes,
			props: [{ name: 'icon', value: '', attributeName: 'icon' }],
			template,
			style
		});

		this.#button = this.root.querySelector('custom-button') as SdrButton;
	}

	focus() {
		this.#button.focus();
	}

	connectedCallback() {
		super.connectedCallback();

		if (this.hasAttribute('separator')) {
			const divider = document.createElement('hr');

			this.#button.replaceWith(divider);
		}
	}
}

customElements.define('sdr-dropdown-item', SdrDropdownItem);
