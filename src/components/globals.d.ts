import type { IconifyIcon } from 'iconify-icon';
import type { SearchEvent, SearchResetEvent, SearchUpdateEvent } from '../js/search-engine.ts';

declare global {
	interface HTMLElementTagNameMap {
		'iconify-icon': IconifyIcon;

		'dialog-content': HTMLElement;
		'rendered-content': HTMLElement;
		'sr-only': HTMLElement;
		'svg-defs': HTMLElement;

		'input-wrapper': HTMLElement;
		'input-error': HTMLElement;
		'input-hint': HTMLElement;
		'input-infix': HTMLElement;
		'input-required': HTMLElement;
		'input-success': HTMLElement;
		'form-status': HTMLElement;
	}

	interface DocumentEventMap {
		'--search': SearchEvent;
		'--search-reset': SearchResetEvent;
		'--search-update': SearchUpdateEvent;
	}
}
