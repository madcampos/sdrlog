class DropdownMenu extends HTMLElement {
	static get observedAttributes() { return ['title']; }
	#root: ShadowRoot;
	#button: HTMLButtonElement;
	#dialog: HTMLDialogElement;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<span>
				<button></button>
				<dialog>
					<slot></slot>
				</dialog>
			</span>
		`;

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
		this.#button.innerHTML = newValue;
	}

	connectedCallback() {
		this.#button.innerHTML = this.getAttribute('label') ?? '';
	}
}

customElements.define('dropdown-menu', DropdownMenu);
