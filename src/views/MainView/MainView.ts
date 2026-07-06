// oxlint-disable typescript/consistent-type-assertions typescript/no-unsafe-type-assertion
import { getHandle } from '@mad-c/file-system-helpers/access';
import { type TemplateResult, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { FALLBACK_COVER } from '../../js/data/cover.ts';
import {
	type MaterialEdition,
	type MaterialSku,
	MATERIAL_CATEGORY,
	MATERIAL_CATEGORY_ICONS,
	MATERIAL_EDITION,
	MATERIAL_EDITION_ICONS,
	MATERIAL_STATUS,
	MATERIAL_STATUS_ICONS,
	MATERIAL_TYPE,
	MATERIAL_TYPE_ICONS
} from '../../js/data/data';
import { getIDBItem } from '../../js/data/idb-helpers.ts';
import { fetchMaterials, saveMaterials } from '../../js/data/material.ts';

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

	@state()
	private accessor cardsHtml: TemplateResult[] = [];

	override createRenderRoot() {
		return this;
	}

	async #getThumbUrl(id: MaterialSku, thumbUrl?: string) {
		if (thumbUrl) {
			return thumbUrl;
		}

		const hash = await getIDBItem('thumbs', id);
		const { handle } = await getHandle(hash ?? '') ?? {};

		if (!(handle instanceof FileSystemFileHandle)) {
			return FALLBACK_COVER;
		}

		const file = await handle.getFile();

		return URL.createObjectURL(file);
	}

	override render() {
		return html`
			<h1>
				<sr-only>Material List</sr-only>
			</h1>
			<main>
				${this.cardsHtml}
			</main>
		`;
	}

	override async connectedCallback() {
		super.connectedCallback();
		const onlineItems = await fetchMaterials();
		const materials = await saveMaterials(onlineItems);

		const sorter = new Intl.Collator(navigator.language).compare;
		const sortedMaterials = materials.sort(({ name: nameA }, { name: nameB }) => sorter(nameA, nameB));

		for (const [index, material] of sortedMaterials.entries()) {
			// oxlint-disable-next-line typescript/no-non-null-assertion no-await-in-loop
			const thumbnail = await this.#getThumbUrl(material.sku[0]!, material.thumbnail);

			this.cardsHtml.push(html`
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
								src="${thumbnail}"
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
			`);

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
