export class EditListItem extends HTMLElement {
	static get observedAttributes() { return ['edit', 'value']; }

	#root: ShadowRoot;
	#closeButton: HTMLButtonElement;

	#value = '';

	constructor() {
		super();

		const template = document.querySelector('#edit-list-item') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));

		this.#closeButton = this.#root.querySelector('button') as HTMLButtonElement;

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
				const isEdit = this.hasAttribute('edit');

				if (!isEdit) {
					this.#closeButton.hidden = true;
				} else {
					this.#closeButton.hidden = false;
				}
			} else if (name === 'value') {
				this.#value = newValue;
			}
		}
	}
}

customElements.define('edit-list-item', EditListItem);
