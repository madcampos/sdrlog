import { marked } from 'marked';

import { SdrComponent } from '../base/BaseComponent';

import template from './template.html?raw';
import style from './style.css?raw';

const watchedAttributes = ['edit', 'value', 'disabled', 'required', 'readonly'];

export interface SdrTextArea {
	edit: boolean,
	value: string,
	disabled: boolean,
	required: boolean,
	readonly: boolean
}

export class SdrTextArea extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }
	#renderedTextArea: HTMLElement;

	constructor() {
		super({
			name: 'sdr-textarea',
			watchedAttributes,
			props: [
				{ name: 'edit', value: false, attributeName: 'edit' },
				{
					name: 'value',
					value: (newValue = '') => {
						this.#renderedTextArea.innerHTML = marked(newValue as string);

						return newValue;
					},
					attributeName: 'value'
				},
				{ name: 'disabled', value: false, attributeName: 'disabled' },
				{ name: 'required', value: false, attributeName: 'required' },
				{ name: 'readonly', value: false, attributeName: 'readonly' }
			],
			handlers: {
				update: () => {
					this.#renderedTextArea.innerHTML = marked(this.value);
					this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, cancelable: true }));
				}
			},
			template,
			style
		});

		this.#renderedTextArea = this.root.querySelector('article') as HTMLElement;
	}

	resetValue() {
		this.value = '';
	}
}

customElements.define('sdr-textarea', SdrTextArea);
