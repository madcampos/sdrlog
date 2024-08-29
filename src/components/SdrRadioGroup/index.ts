import type { SdrRadioItem } from '../SdrRadioItem';

import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-radio-group')
class SdrRadioGroup extends LitElement {
	static override shadowRootOptions = { ...LitElement.shadowRootOptions };
	static override readonly styles = unsafeCSS(style);

	@property({ type: String, reflect: true })
	accessor value: string;

	@property({ type: Array })
	accessor values: string[];

	@query('#radio-container')
	// @ts-expect-error
	accessor #container: HTMLElement;

	@queryAssignedElements({ selector: 'sdr-radio-item' })
	// @ts-expect-error
	accessor #items: SdrRadioItem[];

	#groupName = crypto.randomUUID();

	constructor() {
		super();

		this.value = '';
		this.values = [];

		window.addEventListener('gamepadbuttonpress', (evt) => {
			if (evt.detail.button === 'left') {
				const currentItem = this.renderRoot.querySelector(`input[value="${this.value}"]`) as HTMLInputElement;
				const items = [...this.renderRoot.querySelectorAll('input')];
				const currentItemIndex = items.indexOf(currentItem);

				if (currentItemIndex > 0) {
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					items[currentItemIndex - 1]!.checked = true;
					this.value = items[currentItemIndex - 1]?.value ?? '';
				}
			}

			if (evt.detail.button === 'right') {
				const currentItem = this.renderRoot.querySelector(`input[value="${this.value}"]`) as HTMLInputElement;
				const items = [...this.renderRoot.querySelectorAll('input')];
				const currentItemIndex = items.indexOf(currentItem);

				if (currentItemIndex < items.length - 1) {
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					items[currentItemIndex + 1]!.checked = true;
					this.value = items[currentItemIndex + 1]?.value ?? '';
				}
			}

			if (evt.detail.button === 'a') {
				this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, cancelable: true }));
			}
		});
	}

	#moveItems() {
		this.#items.forEach((item) => {
			if (!this.values.includes(item.value)) {
				const label = document.createElement('label');
				const radio = document.createElement('input');
				const badge = document.createElement('sdr-gamepad-badge');

				badge.setAttribute('button', 'a');

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
				label.appendChild(badge);

				this.#container.appendChild(label);

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

	override render() {
		return html`
			<div id="radio-container" @change=${(evt: Event) => this.#change(evt)}></div>
			<slot @slotchange="${() => this.#moveItems()}"></slot>
		`;
	}
}

export { SdrRadioGroup };
