export class CustomButton extends HTMLElement {
	static get observedAttributes() { return ['icon', 'disabled']; }

	#root: ShadowRoot;
	#button: HTMLButtonElement;
	#icon: HTMLSpanElement;

	constructor() {
		super();

		const template = document.querySelector('#custom-button') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));

		this.#button = this.#root.querySelector('button') as HTMLButtonElement;
		this.#icon = this.#root.querySelector('span#button-icon') as HTMLSpanElement;
	}

	get disabled() {
		return this.#button.disabled;
	}

	set disabled(newValue: boolean) {
		this.#button.disabled = newValue;
	}

	get icon() {
		return this.#icon.innerText;
	}

	set icon(newValue: string) {
		this.#icon.innerText = newValue;
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			if (name === 'icon') {
				this.#icon.innerText = newValue;
			}
		}
	}

	connectedCallback() {
		this.#icon.innerText = this.getAttribute('icon') ?? '';
	}
}

customElements.define('custom-button', CustomButton);
