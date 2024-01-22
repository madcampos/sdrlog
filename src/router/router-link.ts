import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Router } from './router';

@customElement('router-link')
export class RouterLink extends LitElement {
	// eslint-disable-next-line id-length
	@property({ type: String, reflect: true, attribute: 'router-link' }) to = '/';

	#click(evt: MouseEvent) {
		evt.preventDefault();
		evt.stopPropagation();

		const target = evt.target as HTMLAnchorElement;
		const path = target.href;

		if (path) {
			void Router.navigate(path);
		} else {
			console.warn('[⛵️] RouterLink is missing "to" attribute');
		}
	}

	render() {
		return html`
			<a href="${this.to}" @click=${(evt: MouseEvent) => this.#click(evt)}>
				<slot></slot>
			</a>
		`;
	}
}
