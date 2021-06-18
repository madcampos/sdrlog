class DropdownMenuItem extends HTMLElement {
	static get observedAttributes() { return ['icon']; }
	#root: ShadowRoot;
	#icon: HTMLImageElement | null | undefined;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<style>:host { display: none; }</style>
			<link rel="stylesheet" href="${import.meta.url.replace(/js$/iu, 'css')}"/>
			<button>
				<img role="presentation"/>
				<span>
					<slot></slot>
				</span>
			</button>
		`;

		this.#icon = this.#root.querySelector('img');
	}

	attributeChangedCallback(_name: string, _oldValue: string, newValue: string) {
		if (this.#icon) {
			this.#icon.src = newValue;
		}
	}

	connectedCallback() {
		if (this.#icon) {
			this.#icon.src = this.getAttribute('icon') ?? '';
		}

		if (this.hasAttribute('separator')) {
			const divider = document.createElement('hr');

			this.#root.querySelector('button')?.replaceWith(divider);
		}
	}
}

customElements.define('dropdown-menu-item', DropdownMenuItem);
