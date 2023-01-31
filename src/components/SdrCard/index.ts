import type { Material } from '../../data/data';

import { getThumbUrl } from '../../js/covers/cover-fetch';
import { getMaterial } from '../../js/data/idb-persistence';
import { registerComponent, SdrComponent } from '../SdrComponent';
import { SdrItemDetails } from '../../views/SdrItemDetails';

import template from './template.html?raw' assert { type: 'html' };
import style from './style.css?inline' assert { type: 'css' };

const watchedAttributes = ['id', 'title', 'category', 'sku', 'type', 'edition', 'status'];

interface CreateCardOptions {
	name: string,
	id: string,
	category: Material['category'],
	sku: string[],
	type: Material['type'],
	edition: Material['edition'],
	status?: Material['status']
}

export interface SdrCard {
	id: string,
	title: string,
	category: Material['category'],
	sku: string[],
	type: Material['type'],
	edition: Material['edition'],
	status: Material['status'] | 'OK'
}

export class SdrCard extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }
	static readonly elementName = 'sdr-card';

	constructor() {
		super({
			name: SdrCard.elementName,
			watchedAttributes,
			props: [
				{ name: 'id', value: '', attributeName: 'id' },
				{ name: 'title', value: '', attributeName: 'title' },
				{ name: 'category', value: '', attributeName: 'category' },
				{ name: 'sku', value: '', attributeName: 'sku' },
				{ name: 'type', value: '', attributeName: 'type' },
				{ name: 'edition', value: '', attributeName: 'edition' },
				{ name: 'status', value: '', attributeName: 'status' }
			],
			template,
			style
		});

		this.addEventListener('click', async () => SdrItemDetails.openModal(this.id));

		this.addEventListener('keyup', (evt) => {
			if (evt.code === 'Space' || evt.code === 'Enter') {
				evt.preventDefault();
				evt.stopPropagation();

				this.click();
			}
		});
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute('role', 'listitem');
		this.setAttribute('tabindex', '0');

		if (this.id !== '') {
			void this.setMaterial(this.id);
		}
	}

	async setMaterial(id: string) {
		if (!this.hasAttribute('title')) {
			// TODO: avoid db query if we have all the data needed
			const material = await getMaterial(id);

			if (material) {
				this.title = material.name;
				this.category = material.category;
				this.sku = material.sku;
				this.type = material.type;
				this.edition = material.edition;
				this.status = material.status;
			}
		}

		const thumb = this.root.querySelector('img') as HTMLImageElement;

		thumb.src = `${import.meta.env.APP_PUBLIC_URL}images/thumbs/${id}.jpg`;

		thumb.addEventListener('error', async () => {
			thumb.src = await getThumbUrl(id);
		}, { capture: false, once: true, passive: true });
	}

	static createCard({ id, name, category, sku, type, edition, status }: CreateCardOptions) {
		const itemCard = document.createElement(SdrCard.elementName) as SdrCard;

		itemCard.id = id;
		itemCard.title = name;
		itemCard.category = category;
		itemCard.sku = sku;
		itemCard.type = type;
		itemCard.edition = edition;
		itemCard.status = status ?? 'OK';
		document.querySelector('main')?.appendChild(itemCard);
	}
}

registerComponent(SdrCard);
