import type { SkeletonLoader } from '../skeleton-loader/skeleton-loader';

export class EditList extends HTMLElement {
	static get observedAttributes() { return ['edit', 'open']; }

	#root: ShadowRoot;
	#loader: SkeletonLoader;
	#details: HTMLDetailsElement;
	#input: HTMLDivElement;
	#inputSlot: HTMLSlotElement;
	#items: HTMLSlotElement;
	#addButton: HTMLButtonElement;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<style>@import "${import.meta.url.replace(/js$/iu, 'css')}";</style>
			<details>
				<summary>
					<slot name="label"></slot>
					<div id="input" hidden>
						<slot name="input"></slot>
						<button id="add">➕</button>
					</div>
				</summary>

				<skeleton-loader>
					<slot></slot>
				</skeleton-loader>
			</details>
		`;

		this.#loader = this.#root.querySelector('skeleton-loader') as SkeletonLoader;
		this.#details = this.#root.querySelector('details') as HTMLDetailsElement;
		this.#input = this.#root.querySelector('#input') as HTMLDivElement;
		this.#inputSlot = this.#root.querySelector('slot[name="input"]') as HTMLSlotElement;
		this.#items = this.#root.querySelector('slot:not([name])') as HTMLSlotElement;
		this.#addButton = this.#root.querySelector('#add') as HTMLButtonElement;

		this.#addButton.addEventListener('click', () => {
			this.dispatchEvent(new CustomEvent('change', {
				bubbles: true,
				cancelable: true,
				composed: true
			}));
		});

		this.#root.addEventListener('slotchange', (evt) => {
			const slot = evt.target as HTMLSlotElement;

			if (!slot.name) {
				this.#loader.loaded = true;
			}
		});
	}

	get edit() {
		return typeof this.getAttribute('edit') === 'string';
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
		return typeof this.getAttribute('open') === 'string';
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
		return [...this.#items.assignedElements()];
	}

	resetValues() {
		this.#input.hidden = true;
		this.#loader.loaded = false;

		[...this.#items.assignedElements()].forEach((item) => {
			item.remove();
		});
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			if (name === 'edit') {
				const edit = this.getAttribute('edit');

				if (edit === null || edit === 'false') {
					this.#input.hidden = true;
				} else {
					this.#input.hidden = false;
				}
			}
		}

		if (name === 'open') {
			const isOpen = this.getAttribute('open');

			if (isOpen === null || isOpen === 'false') {
				this.#details.removeAttribute('open');
			} else {
				this.#details.setAttribute('open', '');
			}
		}
	}

	connectedCallback() {
		const isOpen = typeof this.getAttribute('open') === 'string';

		this.open = isOpen;
	}
}

customElements.define('edit-list', EditList);
