import { registerComponent, SdrComponent } from '../base/BaseComponent';

import template from './template.html?raw';
import style from './style.css?raw';

const watchedAttributes = ['value', 'disabled', 'required', 'readonly'];

export interface SdrEditBox {
	value: string,
	disabled: boolean,
	required: boolean,
	readonly: boolean
}

export class SdrEditBox extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }
	static readonly elementName = 'sdr-edit-box';

	#input: HTMLInputElement;

	constructor() {
		super({
			name: SdrEditBox.elementName,
			watchedAttributes,
			props: [
				{
					name: 'value',
					value: (newValue = '') => {
						const oldValue = this.#input.value;

						this.#input.value = newValue as string;

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

registerComponent(SdrEditBox);
