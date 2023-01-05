import { SdrComponent } from '../base/BaseComponent';

import template from './template.html?raw';
import style from './style.css?raw';

const watchedAttributes = ['disabled', 'value', 'type', 'url', 'icon'];

export interface SdrEditListItem {
	disabled: boolean,
	value: string,
	type: 'text' | 'image' | 'link' | 'list',
	url: string,
	icon: string
}

export class SdrEditListItem extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }

	constructor() {
		super({
			name: 'sdr-edit-list-item',
			watchedAttributes,
			props: [
				{ name: 'disabled', value: false, attributeName: 'disabled' },
				{ name: 'value', value: '', attributeName: 'value' },
				{ name: 'type', value: 'text', attributeName: 'type' },
				{ name: 'url', value: '', attributeName: 'url' },
				{ name: 'icon', value: '', attributeName: 'icon' }
			],
			handlers: {
				remove: (evt) => {
					this.dispatchEvent(new CustomEvent('remove', {
						bubbles: true,
						cancelable: true,
						composed: true,
						detail: {
							value: (evt.target as SdrEditListItem).value
						}
					}));

					this.remove();
				}
			},
			template,
			style
		});

		switch (this.type) {
			case 'image':
				this.#renderImage();
				break;
			case 'link':
				this.#renderLink();
				break;
			case 'list':
				this.#renderList();
				break;
			default:
				this.#renderText();
				break;
		}
	}

	#renderImage() {
		const image = document.createElement('img');

		image.src = this.url;
		image.alt = this.value;

		this.appendChild(image);
	}

	#renderLink() {
		const link = document.createElement('a');

		link.href = this.url;
		link.textContent = this.value;
		link.target = '_blank';
		link.rel = 'noopener noreferrer';

		this.appendChild(link);
	}

	#renderList() {
		const span = document.createElement('span');

		span.textContent = JSON.parse(this.value).join(', ');

		this.appendChild(span);
	}

	#renderText() {
		const span = document.createElement('span');

		span.textContent = this.value;

		this.appendChild(span);
	}
}
