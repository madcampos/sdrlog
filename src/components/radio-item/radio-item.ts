import { SdrComponent } from '../base/BaseComponent';

import template from './template.html?raw';
import style from './style.css?raw';

const watchedAttributes = ['icon', 'value'];

export interface SdrRadioItem {
	icon: string,
	value: string
}

export class SdrRadioItem extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }

	constructor() {
		super({
			name: 'sdr-radio-item',
			watchedAttributes,
			props: [
				{ name: 'icon', value: '', attributeName: 'icon' },
				{ name: 'value', value: '', attributeName: 'value' }
			],
			template,
			style
		});
	}
}
