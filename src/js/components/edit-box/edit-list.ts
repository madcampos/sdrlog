import type { CustomButton } from '../button/button';
import type { SkeletonLoader } from '../skeleton-loader/skeleton-loader';
import { EditListItem } from './edit-list-item';

export class EditList extends HTMLElement {
	static get observedAttributes() { return ['edit', 'open']; }

	#root: ShadowRoot;
	#loader: SkeletonLoader;
	#details: HTMLDetailsElement;
	#input: HTMLDivElement;
	#inputSlot: HTMLSlotElement;
	#items: HTMLSlotElement;
	#addButton: CustomButton;

	constructor() {
		super();

		const template = document.querySelector('#edit-list') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));

		this.#loader = this.#root.querySelector('skeleton-loader') as SkeletonLoader;
		this.#details = this.#root.querySelector('details') as HTMLDetailsElement;
		this.#input = this.#root.querySelector('#input-container') as HTMLDivElement;
		this.#inputSlot = this.#root.querySelector('slot[name="input"]') as HTMLSlotElement;
		this.#items = this.#root.querySelector('slot:not([name])') as HTMLSlotElement;
		this.#addButton = this.#root.querySelector('#add-button') as CustomButton;

		this.#addButton.addEventListener('click', () => {
			const [input] = this.#inputSlot.assignedElements() as (HTMLInputElement | HTMLSelectElement | null)[];
			let validationMessage = '';

			if (this.values.includes(input?.value ?? '')) {
				validationMessage = 'Item already exists in the list.';
			} else if (!input?.value) {
				validationMessage = 'Please fill the field.';
			} else {
				this.dispatchEvent(new CustomEvent('additem', {
					bubbles: true,
					cancelable: true,
					composed: true
				}));
			}

			input?.setCustomValidity(validationMessage);
			input?.reportValidity();
		});

		this.#root.addEventListener('slotchange', (evt) => {
			const slot = evt.target as HTMLSlotElement;
			const slotHasElements = slot.assignedElements().length > 0;

			if (!slot.name && slotHasElements) {
				this.#loader.loaded = true;
			}
		});
	}

	get edit() {
		return this.hasAttribute('edit');
	}

	set edit(isEditing: boolean) {
		if (isEditing) {
			this.setAttribute('edit', '');
		} else {
			this.removeAttribute('edit');
		}
	}

	get loaded() {
		return this.#loader.loaded;
	}

	set loaded(isLoaded: boolean) {
		this.#loader.loaded = isLoaded;
	}

	get open() {
		return this.hasAttribute('open');
	}

	set open(isOpened: boolean) {
		if (isOpened) {
			this.setAttribute('open', '');
		} else {
			this.removeAttribute('open');
		}
	}

	get value() {
		const [input] = this.#inputSlot.assignedElements() as (HTMLInputElement | HTMLSelectElement | null)[];

		return input?.value ?? '';
	}

	set value(newValue: string) {
		const [input] = this.#inputSlot.assignedElements() as (HTMLInputElement | HTMLSelectElement | null)[];

		if (input) {
			input.value = newValue;
		}
	}

	get values() {
		return [...this.#items.assignedElements()].map((item) => (item as EditListItem).value);
	}

	resetValue() {
		this.#input.hidden = true;
		this.#loader.loaded = false;

		this.value = '';

		[...this.#items.assignedElements()].forEach((item) => {
			item.remove();
		});
	}

	updateEditItems() {
		const items = this.#items.assignedElements().filter((element) => element instanceof EditListItem) as EditListItem[];

		items.forEach((item) => {
			item.edit = this.edit;
		});
	}

	attributeChangedCallback(name: string) {
		if (name === 'edit') {
			const isEdit = this.hasAttribute('edit');

			if (!isEdit) {
				this.#input.hidden = true;
			} else {
				this.#input.hidden = false;
			}

			this.updateEditItems();
		}

		if (name === 'open') {
			const isOpen = this.hasAttribute('open');

			if (!isOpen) {
				this.#details.removeAttribute('open');
			} else {
				this.#details.setAttribute('open', '');
			}
		}
	}

	connectedCallback() {
		const isOpen = this.hasAttribute('open');

		this.open = isOpen;
	}
}

customElements.define('edit-list', EditList);
