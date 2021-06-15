import type { SkeletonLoader } from '../skeleton-loader/skeleton-loader';

const banList = [
	'id',
	'slot',
	'edit',
	'disabled',
	'readonly',
	'hidden'
];

export class EditBox extends HTMLElement {
	static get observedAttributes() { return ['edit', 'value']; }

	#root: ShadowRoot;
	#input: HTMLInputElement;
	#loader: SkeletonLoader;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<style>:host { display: none; }</style>
			<link rel="stylesheet" href="${import.meta.url.replace(/js$/iu, 'css')}"/>
			<div>
				<label for="edit-box">
					<slot name="label"></slot>
				</label>
				<skeleton-loader>
					<input id="edit-box" readonly/>
				</skeleton-loader>
			</div>
		`;

		this.#input = this.#root.querySelector('input') as HTMLInputElement;
		this.#loader = this.#root.querySelector('skeleton-loader') as SkeletonLoader;

		for (const attribute of this.attributes as NamedNodeMap & { [Symbol.iterator](): Iterator<Attr> }) {
			if (!banList.includes(attribute.name)) {
				this.#input.setAttribute(attribute.name, attribute.value);
			}
		}

		this.#input.addEventListener('change', () => {
			this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, cancelable: true }));
		});
	}

	get value() {
		return this.#input.value;
	}

	set value(newValue: string) {
		this.#input.value = newValue;
		this.#loader.loaded = true;
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

	resetValue() {
		this.#input.value = '';
		this.#loader.loaded = false;
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			if (name === 'edit') {
				const edit = this.getAttribute('edit');

				if (edit === null || edit === 'false') {
					this.#input.readOnly = true;
				} else {
					this.#input.readOnly = false;
				}
			} else if (name === 'value') {
				this.value = newValue;
			}
		}
	}
}

customElements.define('edit-box', EditBox);
