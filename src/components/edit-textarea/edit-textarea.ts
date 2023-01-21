import { marked } from 'marked';

import { registerComponent, SdrComponent } from '../base/BaseComponent';

import template from './template.html?raw' assert { type: 'html' };
import style from './style.css?inline' assert { type: 'css' };

const watchedAttributes = ['value', 'disabled', 'required', 'readonly'];

export interface SdrTextArea {
	value: string,
	disabled: boolean,
	required: boolean,
	readonly: boolean
}

export class SdrTextArea extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }
	static readonly elementName = 'sdr-textarea';
	#renderedTextArea: HTMLElement;
	#textArea: HTMLTextAreaElement;

	constructor() {
		super({
			name: SdrTextArea.elementName,
			watchedAttributes,
			props: [
				{
					name: 'value',
					value: (newValue = '') => {
						const oldValue = this.#textArea.value;

						this.#textArea.value = newValue as string;
						this.#renderedTextArea.innerHTML = marked(newValue as string);

						if (oldValue !== newValue) {
							this.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true, cancelable: true }));
						}

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
					if (this.#textArea.value !== this.value) {
						this.value = this.#textArea.value;
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

registerComponent(SdrTextArea);
