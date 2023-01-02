import { I18n } from '../../js/intl/translations';
import { SdrEditListItem } from '../edit-list-item/edit-list-item';
import { SdrComponent } from '../base/BaseComponent';

import template from './template.html?raw';
import style from './style.css?raw';

const watchedAttributes = ['edit', 'open', 'value', 'values'];

export interface SdrEditList {
	edit: boolean,
	open: boolean,
	value: string,
	values: string[]
}

export class SdrEditList extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }

	#inputSlot: HTMLSlotElement;
	#items: HTMLSlotElement;

	constructor() {
		super({
			name: 'sdr-edit-list',
			props: [
				{
					name: 'edit',
					value: (isEditing = false) => {
						this.#updateEditItems(isEditing as boolean);

						return isEditing;
					},
					attributeName: 'edit'
				},
				{ name: 'open', value: false, attributeName: 'open' },
				{
					name: 'value',
					value: () => {
						const [input] = this.#inputSlot.assignedElements() as (HTMLInputElement | HTMLSelectElement | null)[];

						return input?.value ?? '';
					},
					attributeName: 'value'
				},
				{
					name: 'values',
					value: () => [...this.#items.assignedElements()].map((item) => (item as SdrEditListItem).value),
					attributeName: 'values'
				}
			],
			handlers: {
				addItem: () => {
					const [input] = this.#inputSlot.assignedElements() as (HTMLInputElement | HTMLSelectElement | null)[];
					let validationMessage = '';

					if (this.values.includes(input?.value ?? '')) {
						validationMessage = I18n.t`Item already exists in the list.`;
					} else if (!input?.value) {
						validationMessage = I18n.t`Please fill the field.`;
					} else {
						this.dispatchEvent(new CustomEvent('additem', {
							bubbles: true,
							cancelable: true,
							composed: true
						}));
					}

					input?.setCustomValidity(validationMessage);
					input?.reportValidity();
				}
			},
			template,
			style
		});

		this.#inputSlot = this.root.querySelector('slot[name="input"]') as HTMLSlotElement;
		this.#items = this.root.querySelector('slot:not([name])') as HTMLSlotElement;
	}

	resetValue() {
		this.value = '';

		[...this.#items.assignedElements()].forEach((item) => {
			item.remove();
		});
	}

	#updateEditItems(isEditing: boolean) {
		const items = this.#items.assignedElements().filter((element) => element instanceof SdrEditListItem) as SdrEditListItem[];

		items.forEach((item) => {
			item.edit = isEditing;
		});
	}
}

customElements.define('sdr-edit-list', SdrEditList);
