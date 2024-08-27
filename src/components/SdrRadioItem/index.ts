import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-radio-item')
export class SdrRadioItem extends LitElement {
	static override readonly styles = unsafeCSS(style);

	@property({ type: String, reflect: true })
	accessor icon: string;

	@property({ type: String, reflect: true })
	accessor value: string;

	constructor() {
		super();

		this.icon = '';
		this.value = '';
	}

	override render() {
		return html`
			<span id="radio-icon">${this.icon}</span>
			<h4><slot name="title"></slot></h4>
			<p><slot></slot></p>
		`;
	}
}
