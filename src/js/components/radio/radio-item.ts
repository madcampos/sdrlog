import { I18n } from '../intl/translations';

export class RadioItem extends HTMLElement {
	static get observedAttributes() { return ['icon', 'name', 'value']; }
	#root: ShadowRoot;

	#icon: HTMLSpanElement;

	constructor() {
		super();

		const template = document.querySelector('#radio-item') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));

		this.#icon = this.#root.querySelector('span#radio-icon') as HTMLSpanElement;
	}

	get icon() {
		return this.#icon.innerText;
	}

	set icon(newValue: string) {
		this.#icon.innerText = newValue;
	}

	get value() {
		return this.getAttribute('value') ?? '';
	}

	set value(newValue: string) {
		this.setAttribute('value', newValue);
	}

	get name() {
		return this.getAttribute('name') ?? '';
	}

	set name(newValue: string) {
		this.setAttribute('name', newValue);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			if (name === 'icon') {
				this.#icon.innerText = newValue;
			} else if (name === 'name') {
				this.setAttribute('name', newValue);
			} else if (name === 'value') {
				this.setAttribute('value', newValue);
			}
		}
	}

	connectedCallback() {
		I18n.translateElementsContent(this);
		this.#icon.innerText = this.getAttribute('icon') ?? '';
	}
}

customElements.define('radio-item', RadioItem);
