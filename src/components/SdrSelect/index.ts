import { registerComponent, SdrComponent } from '../SdrComponent';

import template from './template.html?raw' assert { type: 'html' };
import style from './style.css?inline' assert { type: 'css' };

const watchedAttributes = ['value', 'disabled', 'required', 'readonly'];

export interface SdrSelect {
	value: string,
	disabled: boolean,
	required: boolean,
	readonly: boolean
}

export class SdrSelect extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }
	static readonly elementName = 'sdr-select';
	#select: HTMLSelectElement;

	constructor() {
		super({
			name: SdrSelect.elementName,
			watchedAttributes,
			props: [
				{
					name: 'value',
					value: (newValue = '') => {
						const oldValue = this.#select.value;

						this.#select.value = newValue as string;

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
					if (this.#select.value !== this.value) {
						this.value = this.#select.value;
						this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, cancelable: true }));
					}
				}
			},
			watchedSlots: {
				'default': (evt) => {
					const optionList = [...evt.target.assignedElements()].filter((option) => option instanceof HTMLOptGroupElement || option instanceof HTMLOptionElement);

					for (const option of optionList) {
						this.#select.add(option as HTMLOptGroupElement | HTMLOptionElement);
					}
				}
			},
			template,
			style
		});

		this.#select = this.root.querySelector('select') as HTMLSelectElement;
	}

	resetValue() {
		this.#select.selectedIndex = 0;
	}
}

registerComponent(SdrSelect);