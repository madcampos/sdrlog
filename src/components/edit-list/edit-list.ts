import { SdrEditListItem } from '../edit-list-item/edit-list-item';
import { SdrComponent } from '../base/BaseComponent';

import template from './template.html?raw';
import style from './style.css?raw';

const watchedAttributes = ['disabled', 'open', 'value'];

export interface SdrEditList {
	disabled: boolean,
	open: boolean,
	value: string
}

export class SdrEditList extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }

	#items: HTMLSlotElement;

	constructor() {
		super({
			name: 'sdr-edit-list',
			watchedAttributes,
			props: [
				{
					name: 'disabled',
					value: (newValue = false) => {
						const parsedValue = newValue === '';

						this.#updateDisabledItems(parsedValue);

						return parsedValue;
					},
					attributeName: 'disabled'
				},
				{ name: 'open', value: false, attributeName: 'open' },
				{ name: 'value', value: '', attributeName: 'value' }
			],
			handlers: {
				addItem: () => {
					if (this.value !== '') {
						this.dispatchEvent(new CustomEvent('itemadded', {
							bubbles: true,
							cancelable: true,
							composed: true
						}));
					}
				}
			},
			watchedSlots: {
				'default': (evt) => {
					const items = evt.target.assignedElements().filter((element) => element instanceof SdrEditListItem) as SdrEditListItem[];
					const newItems = items.filter((item) => !this.values.includes(item.value));

					newItems.forEach((item) => {
						item.disabled = this.disabled;
					});
				},
				input: (evt) => {
					const [input] = evt.target.assignedElements();

					input.addEventListener('input', (inputEvt) => {
						const target = inputEvt.target as HTMLInputElement;

						this.value = target.value;
					});
				}
			},
			template,
			style
		});

		this.#items = this.root.querySelector('slot:not([name])') as HTMLSlotElement;

		this.addEventListener('remove', (evt) => {
			const target = evt.target as SdrEditListItem;

			this.dispatchEvent(new CustomEvent('itemremoved', {
				bubbles: true,
				cancelable: true,
				composed: true,
				detail: { value: target.value }
			}));
		});
	}

	get values() {
		const items = this.#items.assignedElements().filter((element) => element instanceof SdrEditListItem) as SdrEditListItem[];

		return items.map((item) => item.value);
	}

	resetValue() {
		this.value = '';

		[...this.#items.assignedElements()].forEach((item) => {
			item.remove();
		});
	}

	#updateDisabledItems(isDisabled: boolean) {
		const items = this.#items.assignedElements().filter((element) => element instanceof SdrEditListItem) as SdrEditListItem[];

		items.forEach((item) => {
			item.disabled = isDisabled;
		});
	}
}
