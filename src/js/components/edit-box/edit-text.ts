import type { SkeletonLoader } from '../skeleton-loader/skeleton-loader';

const banList = [
	'id',
	'edit',
	'slot',
	'disabled',
	'readonly',
	'hidden'
];

export class EditText extends HTMLElement {
	static get observedAttributes() { return ['edit', 'value']; }

	#root: ShadowRoot;
	#loader: SkeletonLoader;
	#textArea: HTMLTextAreaElement;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<style>@import "${import.meta.url.replace(/js$/iu, 'css')}";</style>
			<div>
				<label for="edit-box">
					<slot name="label"></slot>
				</label>
				<skeleton-loader>
					<textarea id="edit-box" readonly></textarea>
				</skeleton-loader>
			</div>
		`;

		this.#textArea = this.#root.querySelector('textarea') as HTMLTextAreaElement;
		this.#loader = this.#root.querySelector('skeleton-loader') as SkeletonLoader;

		for (const attribute of this.attributes as NamedNodeMap & { [Symbol.iterator](): Iterator<Attr> }) {
			if (!banList.includes(attribute.name)) {
				this.#textArea.setAttribute(attribute.name, attribute.value);
			}
		}

		this.#textArea.addEventListener('change', () => {
			this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, cancelable: true }));
		});
	}

	get value() {
		return this.#textArea.value;
	}

	set value(newValue: string) {
		this.#textArea.value = newValue;
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

	resetValue() {
		this.#textArea.value = '';
		this.#loader.loaded = false;
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			if (name === 'edit') {
				const edit = this.getAttribute('edit');

				if (edit === null || edit === 'false') {
					this.#textArea.readOnly = true;
				} else {
					this.#textArea.readOnly = false;
				}
			} else if (name === 'value') {
				this.value = newValue;
			}
		}
	}
}

customElements.define('edit-text', EditText);
