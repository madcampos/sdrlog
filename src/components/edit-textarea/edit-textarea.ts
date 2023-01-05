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
	#textArea: HTMLTextAreaElement;

	constructor() {
		super({
			name: 'sdr-textarea',
			watchedAttributes,
			props: [
				{ name: 'edit', value: false, attributeName: 'edit' },
				{
					name: 'value',
					value: (newValue = '') => {
						this.#textArea.innerText = newValue as string;
						this.#renderedTextArea.innerHTML = marked(newValue as string);

						this.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true, cancelable: true }));

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
					if (this.#textArea.innerText !== this.value) {
						this.value = this.#textArea.innerText;
						this.#renderedTextArea.innerHTML = marked(this.value);
						this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, cancelable: true }));
					}
				}
			},
			template,
			style
		});

		this.#renderedTextArea = this.root.querySelector('article') as HTMLElement;
		this.#textArea = this.root.querySelector('textarea') as HTMLTextAreaElement;
	}

	resetValue() {
		this.value = '';
	}
}
