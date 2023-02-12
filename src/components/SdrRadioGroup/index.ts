import type { SdrRadioItem } from '../SdrRadioItem';

import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-radio-group')
export class SdrRadioGroup extends LitElement {
	static styles = unsafeCSS(style);

	@property({ type: String, reflect: true }) declare value: string;
	@property({ type: Array }) declare values: string[];

	@query('#radio-container') private declare container: HTMLElement;

	@queryAssignedElements({ selector: 'sdr-radio-item' }) private declare items: SdrRadioItem[];

	#groupName = crypto.randomUUID();

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
				radio.name = this.#groupName;
				radio.id = `${radio.name}-${item.value}`;

				if (this.value === item.value) {
					radio.checked = true;
				}

				label.setAttribute('for', radio.id);

				label.appendChild(radio);
				label.appendChild(item);

				this.container.appendChild(label);

				this.values.push(item.value);
			}
		});
	}

	#change(evt: Event) {
		evt.preventDefault();
		evt.stopPropagation();

		this.value = (evt.target as HTMLInputElement).value;

		this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, cancelable: true }));
	}

	render() {
		return html`
			<div id="radio-container" @change=${(evt: Event) => this.#change(evt)}></div>
			<slot @slotchange="${() => this.#moveItems()}"></slot>
		`;
	}
}
