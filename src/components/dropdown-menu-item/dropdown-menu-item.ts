import { SdrButton } from '../button/button';

import { registerComponent, SdrComponent } from '../base/BaseComponent';

import template from './template.html?raw';
import style from './style.css?raw';

const watchedAttributes = ['icon'];

export interface SdrDropdownItem {
	icon: string
}

export class SdrDropdownItem extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }
	static readonly elementName = 'sdr-dropdown-item';
	#button: SdrButton;

	constructor() {
		super({
			name: SdrDropdownItem.elementName,
			watchedAttributes,
			props: [{ name: 'icon', value: '', attributeName: 'icon' }],
			template,
			style
		});

		this.#button = this.root.querySelector(SdrButton.elementName) as SdrButton;

		if (this.hasAttribute('separator')) {
			const divider = document.createElement('hr');

			this.#button.replaceWith(divider);
		}
	}

	focus() {
		this.#button.focus();
	}
}

registerComponent(SdrDropdownItem);
