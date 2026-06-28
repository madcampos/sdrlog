import { Router } from '@lit-labs/router';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

// #region Global events
export class RouterGoToEvent extends Event {
	route: string;
	constructor(path: string, init?: EventInit) {
		super('--router-goto', init);

		this.route = path;
	}
}

declare global {
	interface WindowEventMap {
		'--router-goto': RouterGoToEvent;
	}
}

// #endregion

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

	async handleEvent(evt: Event) {
		if (evt instanceof RouterGoToEvent) {
			await this.router.goto(evt.route);
		}
	}

	override connectedCallback() {
		super.connectedCallback();

		window.addEventListener('--router-goto', this);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();

		window.removeEventListener('--router-goto', this);
	}
}
