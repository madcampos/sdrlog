import { SdrComponent } from '../base/BaseComponent';

import template from './template.html?raw';
import style from './style.css?raw';

const watchedAttributes = ['edit', 'value', 'disabled', 'required', 'readonly'];

export interface SdrEditBox {
	edit: boolean,
	value: string,
	disabled: boolean,
	required: boolean,
	readonly: boolean
}

export class SdrEditBox extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }

	#input: HTMLInputElement;

	constructor() {
		super({
			name: 'sdr-edit-box',
			watchedAttributes,
			props: [
				{ name: 'edit', value: false, attributeName: 'edit' },
				{
					name: 'value',
					value: (newValue = '') => {
						this.#input.value = newValue as string;

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
				updateValue: () => {
					if (this.#input.value !== this.value) {
						this.value = this.#input.value;

						this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, cancelable: true }));
					}
				}
			},
			template,
			style
		});

		this.#input = this.root.querySelector('input') as HTMLInputElement;

		for (const attribute of [...this.attributes]) {
			if (!watchedAttributes.includes(attribute.name)) {
				this.#input.setAttribute(attribute.name, attribute.value);
			}
		}
	}

	resetValue() {
		this.#input.value = '';
	}
}
