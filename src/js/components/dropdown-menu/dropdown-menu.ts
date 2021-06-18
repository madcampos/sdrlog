import dialogPolyfill from '../../../../lib/dialog/dialog-polyfill';

class DropdownMenu extends HTMLElement {
	static get observedAttributes() { return ['title']; }
	#root: ShadowRoot;
	#button: HTMLButtonElement;
	#dialog: HTMLDialogElement;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<style>:host { display: none; }</style>
			<link rel="stylesheet" href="${import.meta.url.replace(/js$/iu, 'css')}"/>
			<button></button>
			<dialog>
				<slot></slot>
			</dialog>
		`;

		this.#button = this.#root.querySelector('button') as HTMLButtonElement;
		this.#dialog = this.#root.querySelector('dialog') as HTMLDialogElement;

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions
		if (!this.#dialog.showModal) {
			dialogPolyfill.registerDialog(this.#dialog);
		}

		this.#button.addEventListener('click', (evt) => {
			evt.preventDefault();
			evt.stopPropagation();

			this.#dialog.show();

			const rect = this.#dialog.getBoundingClientRect();

			if (rect.right > window.innerWidth) {
				this.#dialog.classList.add('right');
			}
		});

		window.addEventListener('click', () => {
			if (this.#dialog.hasAttribute('open')) {
				this.#dialog.close();
			}
		});

		this.addEventListener('keypress', (evt) => {
			if (evt.key === 'Escape' && this.#dialog.hasAttribute('open')) {
				this.#dialog.close();
			}
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
