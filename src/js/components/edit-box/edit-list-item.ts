export class EditListItem extends HTMLElement {
	static get observedAttributes() { return ['edit', 'value']; }

	#root: ShadowRoot;
	#closeButton: HTMLButtonElement;

	#value = '';

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<style>:host { display: none; }</style>
			<link rel="stylesheet" href="${import.meta.url.replace(/js$/iu, 'css')}"/>
			<div>
				<slot></slot>
				<button hidden>❌</button>
			</div>
		`;

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
		return typeof this.getAttribute('edit') === 'string';
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
				const edit = this.getAttribute('edit');

				if (edit === null || edit === 'false') {
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
