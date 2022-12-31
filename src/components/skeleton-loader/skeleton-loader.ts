import { I18n } from '../../js/intl/translations';

export class SkeletonLoader extends HTMLElement {
	static get observedAttributes() { return ['loaded']; }

	#root: ShadowRoot;
	#content: HTMLSlotElement;
	#loader: HTMLDivElement;

	constructor() {
		super();

		const template = document.querySelector('#skeleton-loader') as HTMLTemplateElement;
		const translatedTemplate = I18n.translateElementsContent(template.content.cloneNode(true));

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(translatedTemplate);


		this.#content = this.#root.querySelector('slot') as HTMLSlotElement;
		this.#loader = this.#root.querySelector('#loader') as HTMLDivElement;
	}

	get loaded() {
		return this.hasAttribute('loaded');
	}

	set loaded(isLoaded: boolean) {
		if (isLoaded) {
			this.setAttribute('loaded', '');
		} else {
			this.removeAttribute('loaded');
		}
	}

	attributeChangedCallback() {
		if (this.hasAttribute('loaded')) {
			this.#content.hidden = false;
			this.#loader.hidden = true;
		} else {
			this.#content.hidden = true;
			this.#loader.hidden = false;
		}
	}

	connectedCallback() {
		if (this.hasAttribute('loaded')) {
			this.#content.hidden = false;
			this.#loader.hidden = true;
		}
	}
}

customElements.define('skeleton-loader', SkeletonLoader);
