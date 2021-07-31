export type {};

class MenuBar extends HTMLElement {
	#root: ShadowRoot;

	constructor() {
		super();

		const template = document.querySelector('#menu-bar') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));
	}
}

customElements.define('menu-bar', MenuBar);
