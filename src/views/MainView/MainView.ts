// oxlint-disable typescript/consistent-type-assertions typescript/no-unsafe-type-assertion
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
	type Material,
	type MaterialEdition,
	MATERIAL_CATEGORY,
	MATERIAL_CATEGORY_ICONS,
	MATERIAL_EDITION,
	MATERIAL_EDITION_ICONS,
	MATERIAL_STATUS,
	MATERIAL_STATUS_ICONS,
	MATERIAL_TYPE,
	MATERIAL_TYPE_ICONS
} from '../../js/data/data';
import { fetchOnlineItems, saveItems } from '../../js/files/import.ts';

const listFormatter = new Intl.ListFormat('en-US', { style: 'short', type: 'conjunction' });

export class ItemLoadedEvent extends Event {
	index: number;
	total: number;
	name: string;

	constructor(data: { index: number, total: number, name: string }, init?: EventInit) {
		super('--itemloaded', {
			...init,
			bubbles: true,
			composed: true
		});

		this.index = data.index;
		this.total = data.total;
		this.name = data.name;
	}
}

export class AppLoadedEvent extends Event {
	constructor(init?: EventInit) {
		super('--apploaded', {
			...init,
			bubbles: true,
			composed: true
		});
	}
}

declare global {
	interface GlobalEventHandlersEventMap {
		'--itemloaded': ItemLoadedEvent;
		'--apploaded': AppLoadedEvent;
	}
}

// TODO: add gamepad focus?
// TODO: add gamepad helper icons

@customElement('main-view')
export class MainView extends LitElement {
	static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	@property({ type: Array, attribute: false })
	accessor materials: Pick<Material, 'category' | 'edition' | 'name' | 'sku' | 'status' | 'type' | 'thumbnail'>[] = [];

	override createRenderRoot() {
		return this;
	}

	override render() {
		const cardsHtml = this.materials.map((material) =>
			html`
			<material-card
				data-sku="${material.sku.join(' ')}"
				data-category="${material.category}"
				data-edition="${material.edition}"
				data-type="${material.type}"
				data-status="${material.status}"
				data-name="${material.name}"
			>
				<header>
					<h2>
						<a href="/${material.sku[0]}">${material.name}</a>
					</h2>
				</header>
				<picture>
					<a href="/${material.sku[0]}">
						<img
							width="192"
							height="256"
							loading="lazy"
							decoding="async"
							alt="Cover image for ${material.name}"
							src="${material.thumbnail}"
						/>
					</a>
				</picture>
				<aside>
					<dl>
						<dt>SKU</dt>
						<dd>${listFormatter.format(material.sku)}</dd>

						<dt>Category</dt>
						<dd>
							<iconify-icon icon="${MATERIAL_CATEGORY_ICONS[material.category]}" aria-hidden="true"></iconify-icon>
							<span>${MATERIAL_CATEGORY[material.category]}</span>
						</dd>

						<dt>Type</dt>
						<dd>
							<iconify-icon icon="${MATERIAL_TYPE_ICONS[material.type]}" aria-hidden="true"></iconify-icon>
							<span>${MATERIAL_TYPE[material.type]}</span>
						</dd>

						<dt>Edition</dt>
						<dd>
							<img
								width="16"
								height="16"
								loading="lazy"
								decoding="async"
								alt=""
								aria-hidden="true"
								src="${MATERIAL_EDITION_ICONS[material.edition as MaterialEdition]}"
							/>
							<span>${MATERIAL_EDITION[material.edition as MaterialEdition]}</span>
						</dd>

						<dt>Status</dt>
						<dd>
							<iconify-icon icon="${MATERIAL_STATUS_ICONS[material.status]}" aria-hidden="true"></iconify-icon>
							<span>${MATERIAL_STATUS[material.status]}</span>
						</dd>
					</dl>
				</aside>
				<footer>
					<a href="/${material.sku[0]}">
						<span>View Material</span>
						<sr-only>${material.name}</sr-only>
					</a>
				</footer>
			</material-card>
		`
		);

		return html`
			<h1>
				<sr-only>Material List</sr-only>
			</h1>
			<main>
				${cardsHtml}
			</main>
		`;
	}

	override async connectedCallback() {
		super.connectedCallback();
		const onlineItems = await fetchOnlineItems();
		const materials = await saveItems(onlineItems);

		const sorter = new Intl.Collator(navigator.language).compare;
		const sortedMaterials = materials.sort(({ name: nameA }, { name: nameB }) => sorter(nameA, nameB));

		for (const [index, material] of sortedMaterials.entries()) {
			this.materials.push({
				name: material.name,
				category: material.category,
				sku: material.sku,
				type: material.type,
				edition: material.edition,
				status: material.status,
				thumbnail: material.thumbnail
			});

			this.dispatchEvent(
				new ItemLoadedEvent({
					index,
					total: sortedMaterials.length,
					name: material.name
				})
			);
		}

		this.dispatchEvent(new AppLoadedEvent());
		this.requestUpdate();
	}
}
