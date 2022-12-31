import type { SdrButton } from '../button/button';
import { I18n } from '../intl/translations';

export class EditListItem extends HTMLElement {
	static get observedAttributes() { return ['edit', 'value']; }

	#root: ShadowRoot;
	#closeButton: SdrButton;

	#value = '';

	constructor() {
		super();

		const template = document.querySelector('#edit-list-item') as HTMLTemplateElement;
		const translatedTemplate = I18n.translateElementsContent(template.content.cloneNode(true));

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(translatedTemplate);

		this.#closeButton = this.#root.querySelector('custom-button') as SdrButton;

		this.#closeButton.addEventListener('click', () => {
			this.remove();
		});
	}

	get value() {
		return this.#value;
	}

	set value(newValue: string) {
		this.setAttribute('value', newValue);
	}

	get edit() {
		return this.hasAttribute('edit');
	}

	set edit(isEditing: boolean) {
		if (isEditing) {
			this.setAttribute('edit', '');
		} else {
			this.removeAttribute('edit');
		}
	}

	connectedCallback() {
		I18n.translateElementsContent(this);
		const value = this.getAttribute('value');

		this.#value = value ?? '';
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			if (name === 'edit') {
				this.#closeButton.hidden = !this.hasAttribute('edit');
			} else if (name === 'value') {
				this.#value = newValue;
			}
		}
	}
}

customElements.define('edit-list-item', EditListItem);
