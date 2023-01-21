/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { registerComponent, SdrComponent } from '../SdrComponent';

import template from './template.html?raw' assert { type: 'html' };
import style from './style.css?inline' assert { type: 'css' };

const watchedAttributes = ['loaded'];

export interface SdrLoader {
	loaded: boolean
}

export class SdrLoader extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }

	static readonly elementName = 'sdr-loader';

	constructor() {
		super({
			name: SdrLoader.elementName,
			watchedAttributes,
			props: [
				{
					name: 'loaded',
					value: (newValue = false) => {
						const parsedValue = newValue === '' || newValue === true;

						this.root.querySelector<HTMLDivElement>('#loader')!.hidden = parsedValue;
						this.root.querySelector<HTMLSlotElement>('slot')!.hidden = !parsedValue;

						return parsedValue;
					},
					attributeName: 'loaded'
				}
			],
			template,
			style
		});
	}
}

registerComponent(SdrLoader);
