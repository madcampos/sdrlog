/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { SdrComponent } from '../base/BaseComponent';

import template from './template.html?raw';
import style from './style.css?raw';

const watchedAttributes = ['loaded'];

export interface SdrLoader {
	loaded: boolean
}

export class SdrLoader extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }

	constructor() {
		super({
			name: 'sdr-loader',
			watchedAttributes,
			props: [
				{
					name: 'loaded',
					value: (isLoaded = false) => {
						this.root.querySelector<HTMLDivElement>('#loader')!.hidden = isLoaded as boolean;
						this.root.querySelector<HTMLSlotElement>('slot')!.hidden = !(isLoaded as boolean);

						return isLoaded;
					},
					attributeName: 'loaded'
				}
			],
			template,
			style
		});
	}
}

customElements.define('sdr-loader', SdrLoader);
