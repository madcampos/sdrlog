import type { SkeletonLoader } from '../skeleton-loader/skeleton-loader';

const banList = [
	'id',
	'slot',
	'edit',
	'disabled',
	'hidden'
];

export class EditSelect extends HTMLElement {
	static get observedAttributes() { return ['edit', 'value']; }

	#root: ShadowRoot;
	#select: HTMLSelectElement;
	#loader: SkeletonLoader;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<style>label { display: none; }</style>
			<link rel="stylesheet" href="${import.meta.url.replace(/js$/iu, 'css')}"/>
			<label for="edit-box">
				<slot name="label"></slot>
			</label>

			<skeleton-loader>
				<select id="edit-box" disabled>
					<option selected disabled hidden value="">Please select an option...</option>
				</select>
			</skeleton-loader>

			<div hidden>
				<slot></slot>
			</div>
		`;

		this.#select = this.#root.querySelector('select') as HTMLSelectElement;
		this.#loader = this.#root.querySelector('skeleton-loader') as SkeletonLoader;

		this.#root.addEventListener('slotchange', (evt) => {
			const slot = evt.target as HTMLSlotElement;

			if (!slot.name) {
				const optionList = [...slot.assignedElements()].filter((option) => option instanceof HTMLOptGroupElement || option instanceof HTMLOptionElement);

				for (const option of optionList) {
					this.#select.add(option as HTMLOptGroupElement | HTMLOptionElement);
				}
			}
		});

		for (const attribute of this.attributes as NamedNodeMap & { [Symbol.iterator](): Iterator<Attr> }) {
			if (!banList.includes(attribute.name)) {
				this.#select.setAttribute(attribute.name, attribute.value);
			}
		}

		this.#select.addEventListener('change', () => {
			this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, cancelable: true }));
		});
	}

	get value() {
		return this.#select.value;
	}

	set value(newValue: string) {
		if (newValue !== '') {
			this.#select.value = newValue;
		}

		this.#loader.loaded = true;
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

	resetValue() {
		this.#select.selectedIndex = 0;
		this.#loader.loaded = false;
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			if (name === 'edit') {
				const isEdit = this.hasAttribute('edit');

				if (!isEdit) {
					this.#select.disabled = true;
				} else {
					this.#select.disabled = false;
				}
			} else if (name === 'value') {
				this.value = newValue;
			}
		}
	}
}

customElements.define('edit-select', EditSelect);
