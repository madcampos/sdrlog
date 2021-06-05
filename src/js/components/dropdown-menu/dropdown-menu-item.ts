class DropdownMenuItem extends HTMLElement {
	static get observedAttributes() { return ['icon']; }
	#root: ShadowRoot;
	#icon: HTMLImageElement;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<button>
				<img role="presentation"/>
				<span>
					<slot></slot>
				</span>
			</button>
		`;

		this.#icon = this.#root.querySelector('img') as HTMLImageElement;
	}

	attributeChangedCallback(_name: string, _oldValue: string, newValue: string) {
		this.#icon.src = newValue;
	}

	connectedCallbak() {
		this.#icon.src = this.getAttribute('icon') ?? '';
	}
}

customElements.define('dropdown-menu-item', DropdownMenuItem);
