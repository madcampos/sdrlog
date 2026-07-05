import type { IconifyIconHTMLElement } from 'iconify-icon';
import 'iconify-icon';

import './AppInfo/AppInfo.ts';
import './AppRouter/AppRouter.ts';
import './StatsReport/StatsReport.ts';
import './SvgDefs/SvgDefs.ts';
import './TopBar/TopBar.ts';

// #region HTML only elements
declare global {
	interface HTMLElementTagNameMap {
		'iconify-icon': IconifyIconHTMLElement;

		'card-content': HTMLElement;
		'dialog-content': HTMLElement;
		'dropdown-menu': HTMLElement;
		'form-status': HTMLElement;
		'icon-wrapper': HTMLElement;
		'inline-card': HTMLElement;
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
