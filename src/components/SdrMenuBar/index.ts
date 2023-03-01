import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };


@customElement('sdr-menu-bar')
export class SdrMenuBar extends LitElement {
	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static readonly styles = unsafeCSS(style);

	render() {
		return html`
			<nav>
				<slot></slot>
			</nav>
		`;
	}
}
