import type { SdrEditListItem } from '../SdrEditListItem';

import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-edit-list')
export class SdrEditList extends LitElement {
	static readonly elementName = 'sdr-edit-list';
	static readonly styles = unsafeCSS(style);

	#isDisabled = false;

	@property({ type: Boolean, reflect: true })
	get disabled() { return this.#isDisabled; }

	set disabled(value: boolean) {
		const oldValue = this.#isDisabled;

		this.#isDisabled = value;

		this.items.forEach((item) => {
			item.disabled = value;
		});

		this.requestUpdate('disabled', oldValue);
	}

	@property({ type: Boolean, reflect: true }) declare open: boolean;
	@property({ type: Array }) declare values: string[];

	@queryAssignedElements({ selector: 'sdr-edit-list-item' }) declare private items: SdrEditListItem[];

	constructor() {
		super();

		this.open = false;
		this.values = [];
	}

	resetValue() {
		this.items.forEach((item) => {
			item.remove();
		});
	}

	#addItem(){
		this.dispatchEvent(new CustomEvent('add-item', { bubbles: true, composed: true, cancelable: true }));
	}

	render() {
		return html`
			<details
				?open="${this.open}"
			>
				<summary>
					<slot name="label"></slot>
				</summary>

				<div id="input-container" hidden>
					<slot name="input"></slot>
					<sdr-button
						icon-button
						id="add-button"
						title="$t{Add item}"

						@click="${() => this.#addItem()}"
					>➕</sdr-button>
				</div>

				<article id="items-container">
					<slot></slot>
				</article>
			</details>
		`;
	}
}
