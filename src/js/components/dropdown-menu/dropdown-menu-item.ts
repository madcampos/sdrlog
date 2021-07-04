class DropdownMenuItem extends HTMLElement {
	static get observedAttributes() { return ['icon']; }
	#root: ShadowRoot;
	#icon: HTMLSpanElement;

	constructor() {
		super();

		const template = document.querySelector('#dropdown-menu-item') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));

		this.#icon = this.#root.querySelector('#dropdown-menu-icon') as HTMLSpanElement;
	}

	attributeChangedCallback(_name: string, _oldValue: string, newValue: string) {
		this.#icon.innerText = newValue;
	}

	connectedCallback() {
		this.#icon.innerText = this.getAttribute('icon') ?? '';

		if (this.hasAttribute('separator')) {
			const divider = document.createElement('hr');

			this.#root.querySelector('button')?.replaceWith(divider);
		}
	}
}

customElements.define('dropdown-menu-item', DropdownMenuItem);
