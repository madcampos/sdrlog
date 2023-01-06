import { SdrComponent } from '../base/BaseComponent';

import template from './template.html?raw';
import style from './style.css?raw';

const watchedAttributes = ['disabled', 'value'];

export interface SdrEditListItem {
	disabled: boolean,
	value: string
}

export class SdrEditListItem extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }

	constructor() {
		super({
			name: 'sdr-edit-list-item',
			watchedAttributes,
			props: [
				{ name: 'disabled', value: false, attributeName: 'disabled' },
				{ name: 'value', value: '', attributeName: 'value' }
			],
			handlers: {
				remove: (evt) => {
					this.dispatchEvent(new CustomEvent('remove', {
						bubbles: true,
						cancelable: true,
						composed: true,
						detail: {
							value: (evt.target as SdrEditListItem).value
						}
					}));

					this.remove();
				}
			},
			template,
			style
		});
	}
}
