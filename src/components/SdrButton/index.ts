import { registerComponent, SdrComponent } from '../SdrComponent';

import template from './template.html?raw' assert { type: 'html' };
import style from './style.css?inline' assert { type: 'css' };

const watchedAttributes = ['icon', 'disabled'];

export interface SdrButton {
	disabled: boolean,
	icon: string,
	focus(): void
}

export class SdrButton extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }

	static readonly elementName = 'sdr-button';

	#button: HTMLButtonElement;

	constructor() {
		super({
			name: SdrButton.elementName,
			watchedAttributes,
			props: [
				{ name: 'disabled', value: false, attributeName: 'disabled' },
				{ name: 'icon', value: '', attributeName: 'icon' }
			],
			template,
			style
		});

		this.#button = this.root.querySelector('button') as HTMLButtonElement;
	}

	focus() {
		this.#button.focus();
	}
}

registerComponent(SdrButton);
