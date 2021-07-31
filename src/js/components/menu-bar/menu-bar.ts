import { I18n } from '../intl/translations';

export type {};

class MenuBar extends HTMLElement {
	#root: ShadowRoot;

	constructor() {
		super();

		const template = document.querySelector('#menu-bar') as HTMLTemplateElement;
		const translatedTemplate = I18n.translateElementsContent(template.content.cloneNode(true));

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(translatedTemplate);
	}

	connectedCallback() {
		I18n.translateElementsContent(this);
	}
}

customElements.define('menu-bar', MenuBar);
