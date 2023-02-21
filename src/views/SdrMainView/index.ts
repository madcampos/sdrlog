import type { RouterView } from '../../router/router';
import type { Material } from '../../data/data';

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { fetchItems } from '../../js/data/data-import';
import { createComparer } from '../../js/intl/formatting';

declare global {
	interface GlobalEventHandlersEventMap {
		itemloaded: CustomEvent<{
			index: number,
			total: number,
			name: string
		}>,
		apploaded: CustomEvent<undefined>
	}
}

@customElement('sdr-view-main')
export class SdrViewMain extends LitElement implements RouterView {
	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	@property({ type: Array }) declare cards: Pick<Material, 'name' | 'category' | 'sku' | 'type' | 'edition' | 'status'>[];

	#hasLoadedData = false;

	constructor() {
		super();

		this.cards = [];
		this.hidden = true;

		document.body.appendChild(this);
	}

	protected createRenderRoot() {
		return this;
	}

	navigate() {
		this.hidden = false;
	}

	protected shouldUpdate(_changedProperties: Map<PropertyKey, unknown>): boolean {
		return this.#hasLoadedData && super.shouldUpdate(_changedProperties);
	}

	render() {
		return html`
			<sdr-menu-bar></sdr-menu-bar>

			<main role="list">
				${this.cards.map(({ name, category, sku, type, edition, status }) => html`
					<sdr-card
						id="${sku[0]}"
						.sku="${sku}"
						name="${name}"
						category="${category}"
						type="${type}"
						edition="${edition}"
						status="${status}"
					></sdr-card>
				`)}
			</main>

			<sdr-update-notify></sdr-update-notify>
		`;
	}

	async connectedCallback() {
		super.connectedCallback();

		const materials = await fetchItems();

		const sorter = createComparer();
		const sortedMaterials = materials.sort(({ name: nameA }, { name: nameB }) => sorter(nameA, nameB));

		for (const [index, material] of sortedMaterials.entries()) {
			this.cards.push({
				name: material.name,
				category: material.category,
				sku: material.sku,
				type: material.type,
				edition: material.edition,
				status: material.status
			});

			this.dispatchEvent(new CustomEvent('itemloaded', { bubbles: true, composed: true, detail: { item: index, total: sortedMaterials.length, name: material.name } }));
		}

		this.#hasLoadedData = true;
		this.requestUpdate();

		this.dispatchEvent(new CustomEvent('apploaded', { bubbles: true, composed: true }));
	}
}
