class DropdownMenuItem extends HTMLElement {
	static get observedAttributes() { return ['icon']; }
	#root: ShadowRoot;
	#icon: HTMLImageElement;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		const template = document.createElement('template');
		const icon = this.getAttribute('icon');

		template.innerHTML = `
			<button>
				<img src="${icon ?? ''}">
				<span>
					<slot></slot>
				</span>
			</button>
		`;

		this.#root.appendChild(template.content.cloneNode(true));
		this.#icon = this.#root.querySelector('img') as HTMLImageElement;
	}

	attributeChangedCallback(_name: string, _oldValue: string, newValue: string) {
		this.#icon.src = newValue;
	}
}

customElements.define('dropdown-menu-item', DropdownMenuItem);
