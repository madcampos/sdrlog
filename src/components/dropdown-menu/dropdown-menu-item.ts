import type { SdrButton } from '../button/button';
import { I18n } from '../../js/intl/translations';

export class DropdownMenuItem extends HTMLElement {
	static get observedAttributes() { return ['icon']; }
	#root: ShadowRoot;
	#button: SdrButton;

	constructor() {
		super();

		const template = document.querySelector('#dropdown-menu-item') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));

		this.#button = this.#root.querySelector('custom-button') as SdrButton;
	}

	focus() {
		this.#button.focus();
	}

	attributeChangedCallback(_name: string, _oldValue: string, newValue: string) {
		this.#button.icon = newValue;
	}

	connectedCallback() {
		I18n.translateElementsContent(this);
		this.#button.icon = this.getAttribute('icon') ?? '';

		if (this.hasAttribute('separator')) {
			const divider = document.createElement('hr');

			this.#button.replaceWith(divider);
		}
	}
}

customElements.define('dropdown-menu-item', DropdownMenuItem);
