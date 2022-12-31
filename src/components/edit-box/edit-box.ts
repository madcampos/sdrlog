import { I18n } from '../../js/intl/translations';
import type { SdrLoader } from '../skeleton-loader/skeleton-loader';

const banList = [
	'id',
	'slot',
	'edit',
	'disabled',
	'readonly',
	'hidden'
];

export class EditBox extends HTMLElement {
	static get observedAttributes() { return ['edit', 'value']; }

	#root: ShadowRoot;
	#input: HTMLInputElement;
	#loader: SdrLoader;

	constructor() {
		super();

		const template = document.querySelector('#edit-box') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));

		this.#input = this.#root.querySelector('input') as HTMLInputElement;
		this.#loader = this.#root.querySelector('skeleton-loader') as SdrLoader;

		for (const attribute of this.attributes as NamedNodeMap & { [Symbol.iterator](): Iterator<Attr> }) {
			if (!banList.includes(attribute.name)) {
				this.#input.setAttribute(attribute.name, attribute.value);
			}
		}

		this.#root.addEventListener('slotchange', (evt) => {
			const slot = evt.target as HTMLSlotElement;
			const slotHasElements = slot.assignedElements().length > 0;

			if (slot.name === 'label') {
				(this.#root.querySelector('label') as HTMLLabelElement).hidden = !slotHasElements;
			}
		});

		this.#input.addEventListener('change', () => {
			this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, cancelable: true }));
		});
	}

	get value() {
		return this.#input.value;
	}

	set value(newValue: string) {
		this.#input.value = newValue;
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
		this.#input.value = '';
		this.#loader.loaded = false;
	}

	connectedCallback() {
		I18n.translateElementsContent(this);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			if (name === 'edit') {
				this.#input.readOnly = !this.hasAttribute('edit');
			} else if (name === 'value') {
				this.value = newValue;
			}
		}
	}
}

customElements.define('edit-box', EditBox);
