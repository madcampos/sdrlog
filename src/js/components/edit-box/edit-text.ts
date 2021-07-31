import { default as marked } from '../../../../lib/marked/marked';
import { I18n } from '../intl/translations';
import type { SkeletonLoader } from '../skeleton-loader/skeleton-loader';

const banList = [
	'id',
	'edit',
	'slot',
	'disabled',
	'readonly',
	'hidden'
];

export class EditText extends HTMLElement {
	static get observedAttributes() { return ['edit', 'value']; }

	#root: ShadowRoot;
	#loader: SkeletonLoader;
	#textArea: HTMLTextAreaElement;
	#renderedTextArea: HTMLElement;
	#renderedTextContainer: HTMLDivElement;

	constructor() {
		super();

		const template = document.querySelector('#edit-text') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));

		this.#renderedTextArea = this.#root.querySelector('article') as HTMLElement;
		this.#renderedTextContainer = this.#root.querySelector('#rendered-text') as HTMLDivElement;
		this.#textArea = this.#root.querySelector('textarea') as HTMLTextAreaElement;
		this.#loader = this.#root.querySelector('skeleton-loader') as SkeletonLoader;

		for (const attribute of this.attributes as NamedNodeMap & { [Symbol.iterator](): Iterator<Attr> }) {
			if (!banList.includes(attribute.name)) {
				this.#textArea.setAttribute(attribute.name, attribute.value);
			}
		}

		this.#textArea.addEventListener('change', () => {
			this.#renderedTextArea.innerHTML = marked(this.#textArea.value);
			this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, cancelable: true }));
		});
	}

	get value() {
		return this.#textArea.value;
	}

	set value(newValue: string) {
		this.#textArea.value = newValue;
		this.#renderedTextArea.innerHTML = marked(this.#textArea.value);
		this.#loader.loaded = true;
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

	get loaded() {
		return this.#loader.loaded;
	}

	set loaded(isLoaded: boolean) {
		this.#loader.loaded = isLoaded;
	}

	resetValue() {
		this.#textArea.value = '';
		this.#renderedTextArea.innerHTML = '';
		this.#loader.loaded = false;
	}

	connectedCallback() {
		I18n.translateElementsContent(this);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			if (name === 'edit') {
				this.#textArea.hidden = !this.hasAttribute('edit');
				this.#renderedTextContainer.hidden = this.hasAttribute('edit');
			} else if (name === 'value') {
				this.value = newValue;
			}
		}
	}
}

customElements.define('edit-text', EditText);
