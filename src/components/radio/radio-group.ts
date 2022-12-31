import type { RadioItem } from './radio-item';
import { I18n } from '../../js/intl/translations';

export class RadioGroup extends HTMLElement {
	#root: ShadowRoot;
	#itemsContainer: HTMLDivElement;
	#id: string;

	constructor() {
		super();

		const template = document.querySelector('#radio-group') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));

		this.#itemsContainer = this.#root.querySelector('#radio-container') as HTMLDivElement;

		this.#id = Math.trunc(Math.random() * 1000000).toString(16);

		this.#root.addEventListener('slotchange', (evt) => {
			const slot = evt.target as HTMLSlotElement;

			([...slot.assignedElements()] as RadioItem[]).forEach((element) => {
				const label = document.createElement('label');
				const radio = document.createElement('input');

				radio.type = 'radio';
				radio.value = element.value;
				radio.name = this.#id;
				radio.id = Math.trunc(Math.random() * 1000000).toString(16);

				label.setAttribute('for', radio.id);

				label.appendChild(radio);
				label.appendChild(element);

				this.#itemsContainer.appendChild(label);
			});
		});

		this.#itemsContainer.addEventListener('change', (evt) => {
			evt.preventDefault();
			evt.stopPropagation();

			this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, cancelable: true }));
		});
	}

	get value() {
		return this.#root.querySelector<HTMLInputElement>('input[type="radio"]:checked')?.value ?? '';
	}

	set value(newValue: string) {
		this.#root.querySelectorAll<HTMLInputElement>('input[type="radio"]').forEach((radio) => {
			if (radio.value === newValue) {
				radio.checked = true;
			}
		});
	}

	connectedCallback() {
		I18n.translateElementsContent(this);
	}
}

customElements.define('radio-group', RadioGroup);
