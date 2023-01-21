import { registerComponent, SdrComponent } from '../SdrComponent';

import template from './template.html?raw' assert { type: 'html' };
import style from './style.css?inline' assert { type: 'css' };

export interface SdrUpdateNotify {
	message: string
}

export class SdrUpdateNotify extends SdrComponent {
	static readonly elementName = 'sdr-update-notify';

	#popup: HTMLElement;

	constructor() {
		super({
			name: SdrUpdateNotify.elementName,
			props: [{ name: 'message', value: '' }],
			handlers: {
				update: () => {
					window.location.reload();
				}
			},
			template,
			style
		});

		this.#popup = this.root.querySelector('aside') as HTMLElement;
	}

	show(message: string) {
		this.#popup.hidden = false;
		this.message = message;
	}

	hide() {
		this.#popup.hidden = true;
	}
}

registerComponent(SdrUpdateNotify);
