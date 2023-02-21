import type { Material } from '../../data/data';

import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Router } from '../../router/router';
import { FALLBACK_COVER, getThumbUrl, LOADING_SIMPLE_COVER } from '../../js/covers/cover-fetch';
import { getIDBItem } from '../../js/data/idb-persistence';

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
	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static styles = unsafeCSS(style);

	@property({ type: String, reflect: true }) declare id: string;
	@property({ type: String, reflect: true }) declare title: string;
	@property({ type: String, reflect: true }) declare category: Material['category'];
	@property({ type: Array, reflect: true }) declare sku: string[];
	@property({ type: String, reflect: true }) declare type: Material['type'];
	@property({ type: String, reflect: true }) declare edition: Material['edition'];
	@property({ type: String, reflect: true }) declare status: Material['status'];

	@property({ type: String }) declare thumbUrl: string;

	constructor({ id, name, category, sku, type, edition, status }: Partial<CreateCardOptions> = {}) {
		super();

		this.id = id ?? '';
		this.title = name ?? '';
		this.category = category ?? '' as Material['category'];
		this.sku = sku ?? [];
		this.type = type ?? '' as Material['type'];
		this.edition = edition ?? 0 as Material['edition'];
		this.status = status ?? '' as Material['status'];
		this.thumbUrl = LOADING_SIMPLE_COVER;
	}

	#handleKeyboardNavigation(evt: KeyboardEvent) {
		if (evt.code === 'Space' || evt.code === 'Enter') {
			evt.preventDefault();
			evt.stopPropagation();

			this.click();
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
				this.thumbUrl = `${import.meta.env.APP_PUBLIC_URL}images/thumbs/${this.id}.jpg`;
			}
		}
	}

	render() {
		return html`
			<figure
				tabindex="0"
				role="listitem"

				@click=${async () => Router.navigate(`/item/${this.id}`)}
				@keyup=${(evt: KeyboardEvent) => this.#handleKeyboardNavigation(evt)}
			>
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
}
