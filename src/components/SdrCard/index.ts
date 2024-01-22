import type { Material } from '../../data/data';

import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Router } from '../../router/router';
import { FALLBACK_COVER, getThumbUrl, LOADING_SIMPLE_COVER } from '../../js/covers/cover-fetch';
import { getIDBItem } from '../../js/data/idb-persistence';

import style from './style.css?inline' assert { type: 'css' };
import { GamepadHandler } from '../../js/gamepad/gamepad-events';

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
	static formAssociated = true;
	static readonly styles = unsafeCSS(style);

	@property({ type: String, reflect: true }) accessor id: string;
	@property({ type: String, reflect: true }) accessor title: string;
	@property({ type: String, reflect: true }) accessor category: Material['category'];
	@property({ type: Array, reflect: true }) accessor sku: string[];
	@property({ type: String, reflect: true }) accessor type: Material['type'];
	@property({ type: String, reflect: true }) accessor edition: Material['edition'];
	@property({ type: String, reflect: true }) accessor status: Material['status'];

	@property({ type: String }) accessor thumbUrl: string;

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

		window.addEventListener('gamepadbuttondown', (evt) => {
			if (document.activeElement === this && evt.detail.button === 'left') {
				evt.stopPropagation();
				this.#selectPreviousCard();
			}

			if (document.activeElement === this && evt.detail.button === 'right') {
				evt.stopPropagation();
				this.#selectNextCard();
			}

			if (document.activeElement === this && evt.detail.button === 'down') {
				evt.stopPropagation();
				this.#selectCardDown();
			}

			if (document.activeElement === this && evt.detail.button === 'up') {
				evt.stopPropagation();
				this.#selectCardUp();
			}
		});

		window.addEventListener('gamepadbuttonpress', (evt) => {
			if (document.activeElement === this && evt.detail.button === 'a') {
				GamepadHandler.longVibration();
				void Router.navigate(`/item/${this.id}`);
			}
		});

		window.addEventListener('gamepadstickmove', (evt) => {
			if (document.activeElement === this && evt.detail.stick === 'left') {
				if (evt.detail.directionY === 'up') {
					evt.stopPropagation();
					this.#selectCardUp();
				}

				if (evt.detail.directionY === 'down') {
					evt.stopPropagation();
					this.#selectCardDown();
				}

				if (evt.detail.directionX === 'left') {
					evt.stopPropagation();
					this.#selectPreviousCard();
				}

				if (evt.detail.directionX === 'right') {
					evt.stopPropagation();
					this.#selectNextCard();
				}
			}
		});
	}

	#handleKeyboardNavigation(evt: KeyboardEvent) {
		if (evt.code === 'Space' || evt.code === 'Enter') {
			evt.preventDefault();
			evt.stopPropagation();

			void Router.navigate(`/item/${this.id}`);
		}
	}

	#selectNextCard() {
		if (this.nextElementSibling) {
			window.requestAnimationFrame(() => {
				(this.nextElementSibling as SdrCard).focus();
			});
		} else {
			window.requestAnimationFrame(() => {
				document.querySelector('sdr-card')?.focus();
			});
		}
	}

	#selectPreviousCard() {
		if (this.previousElementSibling) {
			window.requestAnimationFrame(() => {
				(this.previousElementSibling as SdrCard).focus();
			});
		} else {
			window.requestAnimationFrame(() => {
				this.parentElement?.querySelector('sdr-card:last-child')?.focus();
			});
		}
	}

	#selectCardDown() {
		const { marginLeft, marginRight } = window.getComputedStyle(this);
		const width = this.offsetWidth + Number.parseFloat(marginLeft) + Number.parseFloat(marginRight);
		const parentElement = this.parentElement as HTMLElement;
		const parentWidth = parentElement.clientWidth;
		const columns = Math.floor(parentWidth / width);
		const index = [...parentElement.children].indexOf(this);
		const column = index % columns;
		const nextRowCard = (parentElement.children.item(index + columns) ?? parentElement.children.item(column)) as SdrCard;

		window.requestAnimationFrame(() => {
			nextRowCard.focus();
		});
	}

	#selectCardUp() {
		const { marginLeft, marginRight } = window.getComputedStyle(this);
		const width = this.offsetWidth + Number.parseFloat(marginLeft) + Number.parseFloat(marginRight);
		const parentElement = this.parentElement as HTMLElement;
		const parentWidth = parentElement.clientWidth;
		const columns = Math.floor(parentWidth / width);
		const index = [...parentElement.children].indexOf(this);
		const column = index % columns;
		const previousRowCard = (parentElement.children.item(index - columns) ?? parentElement.children.item(parentElement.children.length - columns + column)) as SdrCard;

		window.requestAnimationFrame(() => {
			previousRowCard.focus();
		});
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
				this.thumbUrl = `${import.meta.env.BASE_URL}images/thumbs/${this.id}.jpg`;
			}
		}
	}

	render() {
		return html`
			<figure
				tabindex="0"

				@click=${async () => Router.navigate(`/item/${this.id}`)}
				@keydown=${(evt: KeyboardEvent) => this.#handleKeyboardNavigation(evt)}
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
			<h4 id="title">${this.title}</h4>
		`;
	}

	connectedCallback() {
		super.connectedCallback();

		if (this.id !== '') {
			void this.#setMaterial(this.id);
		}
	}
}
