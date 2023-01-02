import { SdrComponent } from '../base/BaseComponent';

import template from './template.html?raw';
import style from './style.css?raw';

const watchedAttributes = ['edit', 'value'];

export interface SdrEditListItem {
	edit: boolean,
	value: string
}

export class SdrEditListItem extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }

	constructor() {
		super({
			name: 'sdr-edit-list-item',
			props: [
				{ name: 'edit', value: false, attributeName: 'edit' },
				{ name: 'value', value: '', attributeName: 'value' }
			],
			handlers: {
				close: () => {
					this.remove();
				}
			},
			template,
			style
		});
	}
}

customElements.define('sdr-edit-list-item', SdrEditListItem);
