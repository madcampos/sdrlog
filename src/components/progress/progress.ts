import { SdrComponent } from '../base/BaseComponent';

import template from './template.html?raw';
import style from './style.css?raw';

export interface SdrProgressOverlay {
	title: string,
	info: string,
	total: number,
	count: string,
	value: number
}

export class SdrProgressOverlay extends SdrComponent {
	#dialog: HTMLDialogElement;

	constructor() {
		super({
			name: 'sdr-progress-overlay',
			props: [
				{ name: 'title', value: '' },
				{ name: 'info', value: '' },
				{ name: 'total', value: 100 },
				{ name: 'count', value: '' },
				{
					name: 'value',
					value: (newValue = 0) => {
						this.count = `${newValue as number} / ${this.total}`;

						return newValue;
					}
				}
			],
			template,
			style
		});

		this.#dialog = this.root.querySelector('dialog') as HTMLDialogElement;
	}

	static createOverlay({ total, title, info }: { total?: number, title?: string, info?: string }) {
		const overlay = new SdrProgressOverlay();

		overlay.title = title ?? '';
		overlay.info = info ?? '';

		if (typeof total === 'number') {
			overlay.total = total;
		} else {
			overlay.setIndefinite();
		}

		document.body.appendChild(overlay);
		overlay.show();

		return overlay;
	}

	setIndefinite() {
		this.total = 0;
		this.value = 0;
		this.count = '';
	}

	increment() {
		this.value += 1;
	}

	show() {
		this.#dialog.showModal();
		this.#dialog.focus();
	}

	close() {
		if (this.#dialog.hasAttribute('open')) {
			this.#dialog.close();
		}
	}
}
