import { registerComponent, SdrComponent } from '../SdrComponent';

import template from './template.html?raw' assert { type: 'html' };
import style from './style.css?inline' assert { type: 'css' };

const watchedAttributes = ['disabled', 'value'];

export interface SdrEditListItem {
	disabled: boolean,
	value: string
}

export class SdrEditListItem extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }
	static readonly elementName = 'sdr-edit-list-item';

	constructor() {
		super({
			name: SdrEditListItem.elementName,
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

registerComponent(SdrEditListItem);
