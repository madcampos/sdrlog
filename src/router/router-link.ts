import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Router } from './router';

@customElement('router-link')
class RouterLink extends LitElement {
	@property({ type: String, reflect: true, attribute: 'router-link' })
	// oxlint-disable-next-line id-length
	to = '/';

	#click(evt: MouseEvent) {
		evt.preventDefault();
		evt.stopPropagation();

		// oxlint-disable-next-line typescript/consistent-type-assertions typescript/no-unsafe-type-assertion
		const target = evt.target as HTMLAnchorElement;
		const path = target.href;

		if (path) {
			void Router.navigate(path);
		} else {
			console.warn('[⛵️] RouterLink is missing "to" attribute');
		}
	}

	override render() {
		return html`
			<a href="${this.to}" @click=${(evt: MouseEvent) => this.#click(evt)}>
				<slot></slot>
			</a>
		`;
	}
}

export { RouterLink };
