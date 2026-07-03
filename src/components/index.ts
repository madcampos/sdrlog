import type { IconifyIconHTMLElement } from 'iconify-icon';
import 'iconify-icon';

import './TopBar/TopBar.ts';
import './AppRouter/AppRouter.ts';
import './SvgDefs/SvgDefs.ts';

// #region HTML only elements
declare global {
	interface HTMLElementTagNameMap {
		'iconify-icon': IconifyIconHTMLElement;

		'dialog-content': HTMLElement;
		'dropdown-menu': HTMLElement;
		'form-status': HTMLElement;
		'icon-wrapper': HTMLElement;
		'input-error': HTMLElement;
		'input-hint': HTMLElement;
		'input-infix': HTMLElement;
		'input-required': HTMLElement;
		'input-success': HTMLElement;
		'input-wrapper': HTMLElement;
		'material-card': HTMLElement;
		'rendered-content': HTMLElement;
		'sr-only': HTMLElement;
		'svg-defs': HTMLElement;
	}
}
// #endregion
