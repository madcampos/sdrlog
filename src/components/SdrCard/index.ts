import type { Material } from '../../data/data';

import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { FALLBACK_COVER, getThumbUrl, LOADING_SIMPLE_COVER } from '../../js/covers/cover-fetch';
import { getIDBItem } from '../../js/data/idb-persistence';
import { Router } from '../../router/router';

import { MATERIAL_CATEGORY_INFO, MATERIAL_EDITION_INFO, MATERIAL_STATUS_INFO, MATERIAL_TYPE_INFO } from '../../data/constants.ts';
import style from './style.css?inline' assert { type: 'css' };

interface CreateCardOptions {
	name: string;
	id: string;
	category: Material['category'];
	sku: string[];
	type: Material['type'];
	edition: Material['edition'];
	status?: Material['status'];
}

@customElement('sdr-card')
class SdrCard extends LitElement {
	static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static formAssociated = true;
	static override readonly styles = unsafeCSS(style);

	@property({ type: String, reflect: true })
	override accessor id: string;
	@property({ type: String, reflect: true })
	override accessor title: string;
	@property({ type: String, reflect: true })
	accessor category: Material['category'];
	@property({ type: Array, reflect: true })
	accessor sku: string[];
	@property({ type: String, reflect: true })
	accessor type: Material['type'];
	@property({ type: Number, reflect: true })
	accessor edition: Material['edition'];
	@property({ type: String, reflect: true })
	accessor status: Material['status'];

	@property({ type: String })
	accessor thumbUrl: string;

	#internals: ElementInternals;

	constructor({ id, name, category, sku, type, edition, status }: Partial<CreateCardOptions> = {}) {
		super();

		this.#internals = this.attachInternals();

		this.id = id ?? '';
		this.title = name ?? '';
		this.category = category ?? '' as Material['category'];
		this.sku = sku ?? [];
		this.type = type ?? '' as Material['type'];
		this.edition = edition ?? 0 as Material['edition'];
		this.status = status ?? '' as Material['status'];
		this.thumbUrl = LOADING_SIMPLE_COVER;

		this.#internals.role = 'listitem';
		this.#internals.ariaLabel = this.title;
	}

	#handleKeyboardNavigation(evt: KeyboardEvent) {
		if (evt.code === 'Space' || evt.code === 'Enter') {
			evt.preventDefault();
			evt.stopPropagation();

			void Router.navigate(`/item/${this.id}`);
		}
	}

	async #fallbackThumb() {
		if (this.thumbUrl !== FALLBACK_COVER) {
			this.thumbUrl = await getThumbUrl(this.id);
		}
	}

	async #setMaterial(id: string) {
		if (!this.title) {
			const material = await getIDBItem('items', id);

			if (material) {
				this.title = material.name;
				this.category = material.category;
				this.sku = material.sku;
				this.type = material.type;
				this.edition = material.edition;
				this.status = material.status;
				this.thumbUrl = import.meta.resolve(`/images/thumbs/${this.id}.jpg`);
			}
		}
	}

	override render() {
		return html`
			<article
				tabindex="0"

				@click=${async () => Router.navigate(`/item/${this.id}`)}
				@keydown=${(evt: KeyboardEvent) => this.#handleKeyboardNavigation(evt)}
			>
				<aside id="badges">
					<span id="status" data-status="${this.status}">
						<span id="status-label">Status: </span>
						<span>${MATERIAL_STATUS_INFO[this.status].name}</span>
					</span>
					<span id="edition" title="${MATERIAL_EDITION_INFO[this.edition]} edition" data-edition="${this.edition}">Edition: ${this.edition} edition</span>
				</aside>
				<picture>
					<img
						decoding="async"
						loading="lazy"
						width="100"
						height="160"
						role="presentation"
						src="${this.thumbUrl}"
						alt=${this.title}

						@error=${async () => this.#fallbackThumb()}
					/>
				</picture>
				<header>
					<h2>${this.title}</h2>
					<small id="sku"><strong>SKU:</strong> ${new Intl.ListFormat('en-US', { style: 'short', type: 'conjunction' }).format(this.sku)}</small>
				</header>
				<footer>
					<small id="category" data-category="${this.category}">
						<span id="category-label">Category: </span>
						<span role="none">${MATERIAL_CATEGORY_INFO[this.category].icon}</span>
						<span>${MATERIAL_CATEGORY_INFO[this.category].name}</span>
					</small>
					<small id="type"data-type="${this.type}">
						<span id="type-label">Type: </span>
						<span role="none">${MATERIAL_TYPE_INFO[this.type].icon}</span>
						<span>${MATERIAL_TYPE_INFO[this.type].name}</span>
					</small>
				</footer>
			</article>
		`;
	}

	override connectedCallback() {
		super.connectedCallback();

		if (this.id !== '') {
			void this.#setMaterial(this.id);
		}
	}
}

export { SdrCard };
