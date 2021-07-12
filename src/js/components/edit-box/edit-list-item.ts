import type { CustomButton } from '../button/button';

export class EditListItem extends HTMLElement {
	static get observedAttributes() { return ['edit', 'value']; }

	#root: ShadowRoot;
	#closeButton: CustomButton;

	#value = '';

	constructor() {
		super();

		const template = document.querySelector('#edit-list-item') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));

		this.#closeButton = this.#root.querySelector('custom-button') as CustomButton;

		this.#closeButton.addEventListener('click', () => {
			this.remove();
		});
	}

	get value() {
		return this.#value;
	}

	set value(newValue: string) {
		this.setAttribute('value', newValue);
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

	connectedCallback() {
		const value = this.getAttribute('value');

		this.#value = value ?? '';
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			if (name === 'edit') {
				this.#closeButton.hidden = !this.hasAttribute('edit');
			} else if (name === 'value') {
				this.#value = newValue;
			}
		}
	}
}

customElements.define('edit-list-item', EditListItem);
