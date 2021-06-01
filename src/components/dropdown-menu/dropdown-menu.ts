class DropdownMenu extends HTMLElement {
	static get observedAttributes() { return ['title']; }
	#root: ShadowRoot;
	#button: HTMLButtonElement;
	#dialog: HTMLDialogElement;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		const template = document.createElement('template');
		const label = this.getAttribute('label');

		template.innerHTML = `
			<span>
				<button>${label ?? ''}</button>
				<dialog>
					<slot></slot>
				</dialog>
			</span>
		`;

		this.#root.appendChild(template.content.cloneNode(true));
		this.#button = this.#root.querySelector('button') as HTMLButtonElement;
		this.#dialog = this.#root.querySelector('dialog') as HTMLDialogElement;

		this.#button.addEventListener('click', (evt) => {
			evt.preventDefault();
			evt.stopPropagation();

			this.#dialog.show();
		});

		this.#dialog.addEventListener('click', () => {
			this.#dialog.close();
		});
	}

	attributeChangedCallback(_name: string, _oldValue: string, newValue: string) {
		(this.#root.querySelector('button') as HTMLButtonElement).innerHTML = newValue;
	}
}

customElements.define('dropdown-menu', DropdownMenu);
