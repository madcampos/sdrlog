import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Material } from '../../data/data';
import { fetchItems } from '../../js/data/data-import';
import { createComparer } from '../../js/intl/formatting';

declare global {
	interface GlobalEventHandlersEventMap {
		itemloaded: CustomEvent<{
			index: number,
			total: number,
			name: string
		}>;
		apploaded: CustomEvent<undefined>;
	}
}

@customElement('main-view')
export class MainView extends LitElement {
	static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	@property({ type: Array, attribute: false })
	accessor cards: Pick<Material, 'category' | 'edition' | 'name' | 'sku' | 'status' | 'type'>[] = [];

	override createRenderRoot() {
		return this;
	}

	override render() {
		return html`
			<main>
				<h1>Main view</h1>
			</main>
		`;
	}

	override connectedCallback() {
		super.connectedCallback();

		// const materials = await fetchItems();

		// const sorter = createComparer();
		// const sortedMaterials = materials.sort(({ name: nameA }, { name: nameB }) => sorter(nameA, nameB));

		// for (const [index, material] of sortedMaterials.entries()) {
		// 	this.cards.push({
		// 		name: material.name,
		// 		category: material.category,
		// 		sku: material.sku,
		// 		type: material.type,
		// 		edition: material.edition,
		// 		status: material.status
		// 	});

		// 	this.dispatchEvent(new CustomEvent('itemloaded', { bubbles: true, composed: true, detail: { item: index, total: sortedMaterials.length, name: material.name } }));
		// }

		// this.dispatchEvent(new CustomEvent('apploaded', { bubbles: true, composed: true }));
	}
}
