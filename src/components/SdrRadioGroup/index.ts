import type { SdrRadioItem } from '../SdrRadioItem';

import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-radio-group')
export class SdrRadioGroup extends LitElement {
	static readonly elementName = 'sdr-radio-group';
	static styles = unsafeCSS(style);

	@property({ type: String, reflect: true }) declare value: string;
	@property({ type: Array }) declare values: string[];

	@query('#radio-container') declare private container: HTMLElement;

	@queryAssignedElements({ selector: 'sdr-radio-item' }) declare private items: SdrRadioItem[];

	constructor() {
		super();

		this.value = '';
		this.values = [];
	}

	#moveItems() {
		this.items.forEach((item) => {
			if (!this.values.includes(item.value)) {
				const label = document.createElement('label');
				const radio = document.createElement('input');

				radio.type = 'radio';
				radio.value = item.value;
				radio.name = crypto.randomUUID();
				radio.id = `${radio.name}-${item.value}`;

				label.setAttribute('for', radio.id);

				label.appendChild(radio);
				label.appendChild(item);

				this.container.appendChild(label);
			}
		});
	}

	connectedCallback() {
		super.connectedCallback();

		this.renderRoot.addEventListener('change', (evt) => {
			evt.preventDefault();
			evt.stopPropagation();

			this.value = (evt.target as HTMLInputElement).value;

			this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, cancelable: true }));
		});
	}

	render() {
		return html`
			<div id="radio-container"></div>
			<slot @slotchange="${() => this.#moveItems()}"></slot>
		`;
	}
}
