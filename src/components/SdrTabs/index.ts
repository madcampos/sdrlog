import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-tab')
export class SdrTab extends LitElement {
	static formAssociated = true;

	@property({ type: String, reflect: true }) declare role: string;

	declare ariaControls: string;

	#internals: ElementInternals;

	constructor() {
		super();

		this.#internals = this.attachInternals();

		this.role = 'tab';
		this.#internals.role = 'tab';
	}

	render() {
		return html`<div id="tab"><slot></slot></div>`;
	}
}

@customElement('sdr-tab-panel')
export class SdrTabPanel extends LitElement {
	static formAssociated = true;

	@property({ type: String, reflect: true }) declare role: string;

	declare ariaLabeledBy: string;

	#internals: ElementInternals;

	constructor() {
		super();

		this.#internals = this.attachInternals();

		this.role = 'tabpanel';
		this.#internals.role = 'tabpanel';
	}

	render() {
		return html`<section id="tab-panel"><slot></slot></section>`;
	}
}

@customElement('sdr-tabs')
export class SdrTabs extends LitElement {
	static formAssociated = true;
	static styles = unsafeCSS(style);

	@property({ type: String, reflect: true }) declare role: string;
	@property({ type: Number }) declare selectedTab: number;

	@queryAssignedElements({ selector: 'sdr-tab', slot: 'tab' }) declare tabList: SdrTab[];
	@queryAssignedElements({ selector: 'sdr-tab-panel', slot: 'tabpanel' }) declare tabPanels: SdrTabPanel[];

	#internals: ElementInternals;

	constructor() {
		super();

		this.#internals = this.attachInternals();

		this.selectedTab = 0;
		this.role = 'tablist';
		this.#internals.role = 'tablist';
	}

	#updateTabs() {
		this.tabPanels.forEach((tabPanel, index) => {
			tabPanel.role = 'tabpanel';
			tabPanel.id = `section${index}`;
			tabPanel.ariaLabeledBy = `tab${index}`;
			tabPanel.hidden = index !== this.selectedTab;
		});

		this.tabList.forEach((tab, index) => {
			tab.role = 'tab';
			tab.id = `tab${index}`;
			tab.ariaSelected = index === this.selectedTab ? 'true' : 'false';
			tab.ariaControls = `section${index}`;

			if (index !== this.selectedTab) {
				tab.tabIndex = -1;
			}
		});
	}

	#tabClick(evt: Event) {
		const target = evt.target as SdrTab;
		const tabPanel = this.tabPanels.find((panel) => panel.id === target.ariaControls);

		if (tabPanel) {
			this.selectedTab = this.tabPanels.indexOf(tabPanel);

			this.tabPanels.forEach((panel, index) => {
				panel.hidden = index !== this.selectedTab;
			});

			this.tabList.forEach((tab, index) => {
				tab.ariaSelected = index === this.selectedTab ? 'true' : 'false';

				if (index !== this.selectedTab) {
					tab.tabIndex = -1;
				}
			});
		}
	}

	render() {
		return html`
			<div id="tabs">
				<slot name="tab" @slotchange="${() => this.#updateTabs()}" @click="${(evt: Event) => this.#tabClick(evt)}"></slot>
			</div>
			<div id="tab-panels">
				<slot name="tabpanel" @slotchange="${() => this.#updateTabs()}"></slot>
			</div>
		`;
	}
}
