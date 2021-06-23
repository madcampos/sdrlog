class DropdownMenuItem extends HTMLElement {
	static get observedAttributes() { return ['icon']; }
	#root: ShadowRoot;
	#icon: HTMLImageElement | null | undefined;

	constructor() {
		super();

		const template = document.querySelector('#dropdown-menu-item') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));

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
