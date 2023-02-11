import type { Material } from '../../data/data';

import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, query } from 'lit/decorators.js';

import { FALLBACK_COVER, getThumbUrl } from '../../js/covers/cover-fetch';
import { getIDBItem } from '../../js/data/idb-persistence';
import { SdrItemDetails } from '../../views/SdrItemDetails';

import style from './style.css?inline' assert { type: 'css' };

interface CreateCardOptions {
	name: string,
	id: string,
	category: Material['category'],
	sku: string[],
	type: Material['type'],
	edition: Material['edition'],
	status?: Material['status']
}

@customElement('sdr-card')
export class SdrCard extends LitElement {
	static readonly elementName = 'sdr-card';
	static styles = unsafeCSS(style);

	@property({ type: String, reflect: true }) declare id: string;
	@property({ type: String, reflect: true }) declare title: string;
	@property({ type: String, reflect: true }) declare category: Material['category'];
	@property({ type: Array, reflect: true }) declare sku: string[];
	@property({ type: String, reflect: true }) declare type: Material['type'];
	@property({ type: String, reflect: true }) declare edition: Material['edition'];
	@property({ type: String, reflect: true }) declare status: Material['status'];

	@query('img') declare private thumb: HTMLImageElement;

	constructor() {
		super();

		this.id = '';
		this.title = '';
	}

	#handleKeyboardNavigation(evt: KeyboardEvent) {
		if (evt.code === 'Space' || evt.code === 'Enter') {
			evt.preventDefault();
			evt.stopPropagation();

			this.click();
		}
	}

	@eventOptions({ passive: true, once: true })
	private loadThumb() {
		this.thumb.src = `${import.meta.env.APP_PUBLIC_URL}images/thumbs/${this.id}.jpg`;
	}

	@eventOptions({ passive: true, once: true })
	private async fallbackThumb() {
		if (this.thumb.src !== FALLBACK_COVER) {
			this.thumb.src = await getThumbUrl(this.id);
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
			}
		}
	}

	render() {
		return html`
			<figure
				tabindex="0"
				role="listitem"

				@click=${async () => SdrItemDetails.openModal(this.id)}
				@keyup=${(evt: KeyboardEvent) => this.#handleKeyboardNavigation(evt)}
			>
				<img
					decoding="async"
					loading="lazy"
					width="100"
					height="160"
					role="presentation"
					src="./images/base-covers/loading-simple.svg"
					alt=${this.title}

					@load=${() => this.loadThumb()}
					@error=${async () => this.fallbackThumb()}
				/>
			</figure>
			<h4>${this.title}</h4>
		`;
	}

	connectedCallback() {
		super.connectedCallback();

		if (this.id !== '') {
			void this.#setMaterial(this.id);
		}
	}

	static createCard({ id, name, category, sku, type, edition, status }: CreateCardOptions) {
		const itemCard = document.createElement('sdr-card');

		itemCard.id = id;
		itemCard.title = name;
		itemCard.category = category;
		itemCard.sku = sku;
		itemCard.type = type;
		itemCard.edition = edition;
		itemCard.status = status ?? 'missing';
		document.querySelector('main')?.appendChild(itemCard);
	}
}
