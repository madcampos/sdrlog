import type { SdrRadioItem } from '../radio-item/radio-item';

import { registerComponent, SdrComponent } from '../base/BaseComponent';

import template from './template.html?raw';
import style from './style.css?raw';

export interface SdrRadioGroup {
	value: string,
	values: string[]
}

export class SdrRadioGroup extends SdrComponent {
	static readonly elementName = 'sdr-radio-group';

	constructor() {
		super({
			name: SdrRadioGroup.elementName,
			props: [
				{
					name: 'value',
					value: (newValue = '') => {
						this.root.querySelectorAll<HTMLInputElement>('input[type="radio"]').forEach((radio) => {
							if (radio.value === newValue) {
								radio.checked = true;
							}
						});

						return this.root.querySelector<HTMLInputElement>('input[type="radio"]:checked')?.value ?? '';
					},
					attributeName: 'value'
				},
				{ name: 'values', value: [] }
			],
			watchedSlots: {
				'default': (evt) => {
					const slot = evt.target;

					([...slot.assignedElements()] as SdrRadioItem[]).forEach((element) => {
						if (!this.values.includes(element.value)) {
							const label = document.createElement('label');
							const radio = document.createElement('input');

							radio.type = 'radio';
							radio.value = element.value;
							radio.name = this.elementId;
							radio.id = `${this.elementId}-${element.value}`;

							label.setAttribute('for', radio.id);

							label.appendChild(radio);
							label.appendChild(element);

							this.root.querySelector('#radio-container')?.appendChild(label);
						}
					});
				}
			},
			template,
			style
		});

		this.addEventListener('change', (evt) => {
			evt.preventDefault();
			evt.stopPropagation();

			this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, cancelable: true }));
		});
	}
}

registerComponent(SdrRadioGroup);