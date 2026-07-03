import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FALLBACK_COVER, getThumbUrl, LOADING_SIMPLE_COVER } from '../../js/covers/cover-fetch';
import type { Material } from '../../js/data/data';
import { MATERIAL_CATEGORY, MATERIAL_EDITION, MATERIAL_STATUS, MATERIAL_TYPE } from '../../js/data/data.ts';

@customElement('sdr-card')
export class SdrCard extends LitElement {
	@property({ type: String, reflect: true })
	// oxlint-disable-next-line no-magic-numbers
	override id: string = Math.trunc(Math.random() * 100000).toString(16);

	@property({ type: String, reflect: true })
	override title = '';

	@property({ type: String, reflect: true })
	category?: Material['category'];

	@property({ type: Array, reflect: true, converter: (value) => value?.split(', ') })
	sku: string[] = [];

	@property({ type: String, reflect: true })
	type?: Material['type'];

	@property({ type: Number, reflect: true })
	edition?: Material['edition'];

	@property({ type: String, reflect: true })
	status?: Material['status'];

	@property({ type: String })
	thumbUrl = LOADING_SIMPLE_COVER;

	override createRenderRoot() {
		return this;
	}

	async #fallbackThumb() {
		if (this.thumbUrl !== FALLBACK_COVER) {
			this.thumbUrl = await getThumbUrl(this.id);
		}
	}

	override render() {
		return html`
			<article>
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
				</header>

				<card-contents>
					<dl>
						<div>
							<dt>SKU</dt>
							<dd>
								<span>
									${new Intl.ListFormat('en-US', { style: 'short', type: 'conjunction' }).format(this.sku)}
								</span>
							</dd>
						</div>
						<div>
							<dt>Status</dt>
							<dd>
								<span aria-hidden="true">
									${MATERIAL_STATUS[this.status ?? ''].icon}
								</span>
								<span>
									${MATERIAL_STATUS[this.status ?? ''].name}
								</span>
							</dd>
						</div>
						<div>
							<dt>Edition</dt>
							<dd>
								<span>
									${MATERIAL_EDITION[this.edition ?? 0]}
								</span>
							</dd>
						</div>
						<div>
							<dt>Category</dt>
							<dd>
								<span aria-hidden="true">
									${MATERIAL_CATEGORY[this.category ?? ''].icon}
								</span>
								<span>
									${MATERIAL_CATEGORY[this.category ?? ''].name}
								</span>
							</dd>
						</div>
						<div>
							<dt>Type</dt>
							<dd>
								<span aria-hidden="true">
									${MATERIAL_TYPE[this.type ?? ''].icon}
								</span>
								<span>
									${MATERIAL_TYPE[this.type ?? ''].name}
								</span>
							</dd>
						</div>
					</dl>
				</card-contents>
			</article>
		`;
	}
}
