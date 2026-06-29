import { Router } from '@lit-labs/router';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-router')
export class AppRouter extends LitElement {
	private router = new Router(this, [
		{ path: '/', render: () => html`<main-view></main-view>` }
	]);

	protected override createRenderRoot() {
		return this;
	}

	protected override render() {
		return this.router.outlet();
	}

	handleEvent(evt: Event) {
		if (evt instanceof NavigateEvent) {
			if (!evt.canIntercept) {
				return;
			}

			if (evt.hashChange || evt.downloadRequest !== null) {
				return;
			}

			const sourceUrl = new URL(window.location.href);
			const destUrl = new URL(evt.destination.url);
			if (sourceUrl.pathname !== destUrl.pathname) {
				evt.intercept({
					handler: async () => {
						await this.router.goto(destUrl.href);
					}
				});
			}
		}
	}

	override connectedCallback() {
		super.connectedCallback();

		window.navigation.addEventListener('navigate', this);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();

		window.navigation.removeEventListener('navigate', this);
	}
}
