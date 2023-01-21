import { registerComponent, SdrComponent } from '../SdrComponent';

import template from './template.html?raw' assert { type: 'html' };
import style from './style.css?inline' assert { type: 'css' };

const watchedAttributes = ['icon', 'value'];

export interface SdrRadioItem {
	icon: string,
	value: string
}

export class SdrRadioItem extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }

	static readonly elementName = 'sdr-radio-item';

	constructor() {
		super({
			name: SdrRadioItem.elementName,
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

registerComponent(SdrRadioItem);
