import { SdrComponent } from '../base/BaseComponent';

import template from './template.html?raw';
import style from './style.css?raw';

export class SdrMenuBar extends SdrComponent {
	constructor() {
		super({
			name: 'menu-bar',
			handlers: {
			},
			template,
			style
		});
	}
}
