import { SdrEditListItem } from '../edit-list-item/edit-list-item';
import { SdrComponent } from '../base/BaseComponent';

import template from './template.html?raw';
import style from './style.css?raw';

const watchedAttributes = ['disabled', 'open', 'value', 'values'];

export interface SdrEditList {
	disabled: boolean,
	open: boolean,
	value: string,
	values: string[]
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
					value: (isEditing = false) => {
						this.#updateDisabledItems(isEditing as boolean);

						return isEditing;
					},
					attributeName: 'disabled'
				},
				{ name: 'open', value: false, attributeName: 'open' },
				{ name: 'value', value: '', attributeName: 'value' },
				{ name: 'values', value: [], attributeName: 'values' },
				{ name: 'type', value: 'text', attributeName: 'type' }
			],
			handlers: {
				addItem: () => {
					this.dispatchEvent(new CustomEvent('additem', { bubbles: true, cancelable: true, composed: true }));
				}
			},
			watchedSlots: {
				'default': (evt) => {
					const items = evt.target.assignedElements().filter((element) => element instanceof SdrEditListItem) as SdrEditListItem[];
					const newItems = items.filter((item) => !this.values.includes(item.value));

					newItems.forEach((item) => {
						item.disabled = this.disabled;
						this.values.push(item.value);

						item.addEventListener('remove', (removeEvt) => {
							const target = removeEvt.target as SdrEditListItem;

							this.values.splice(this.values.indexOf(target.value), 1);

							this.dispatchEvent(new CustomEvent('removeitem', {
								bubbles: true,
								cancelable: true,
								composed: true,
								detail: {
									type: target.type,
									value: target.value,
									url: target.url,
									icon: target.icon
								}
							}));
						});
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
