export class EditListItem extends HTMLElement {
	static get observedAttributes() { return ['edit']; }

	#root: ShadowRoot;
	#closeButton: HTMLButtonElement;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<style>@import "${import.meta.url.replace(/js$/iu, 'css')}";</style>
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

	attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			const edit = this.getAttribute('edit');

			if (edit === null || edit === 'false') {
				this.#closeButton.hidden = true;
			} else {
				this.#closeButton.hidden = false;
			}
		}
	}
}

customElements.define('edit-list-item', EditListItem);
