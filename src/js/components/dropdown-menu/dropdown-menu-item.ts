class DropdownMenuItem extends HTMLElement {
	static get observedAttributes() { return ['icon']; }
	#root: ShadowRoot;
	#icon: HTMLImageElement;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<style>@import "${import.meta.url.replace(/js$/iu, 'css')}";</style>
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

	connectedCallback() {
		this.#icon.src = this.getAttribute('icon') ?? '';

		if (typeof this.getAttribute('separator') === 'string') {
			const divider = document.createElement('hr');

			this.#root.querySelector('button')?.replaceWith(divider);
		}
	}
}

customElements.define('dropdown-menu-item', DropdownMenuItem);
