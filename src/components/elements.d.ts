import type {} from 'typed-query-selector/strict';

import type { RouterLink } from '../router/router-link.ts';

import type { SdrButton } from './SdrButton/index.ts';
import type { SdrCard } from './SdrCard/index.ts';
import type { SdrDialog } from './SdrDialog/index.ts';
import type { SdrDropArea } from './SdrDropArea/index.ts';
import type { SdrDropdown } from './SdrDropdown/index.ts';
import type { SdrDropdownItem } from './SdrDropdownItem/index.ts';
import type { SdrEditBox } from './SdrEditBox/index.ts';
import type { SdrEditList } from './SdrEditList/index.ts';
import type { SdrEditListItem } from './SdrEditListItem/index.ts';
import type { SdrLoader } from './SdrLoader/index.ts';
import type { SdrLoadingScreen } from './SdrLoadingScreen/index.ts';
import type { SdrProgressOverlay } from './SdrProgressOverlay/index.ts';
import type { SdrRadioGroup } from './SdrRadioGroup/index.ts';
import type { SdrRadioItem } from './SdrRadioItem/index.ts';
import type { SdrSearchBox } from './SdrSearchBox/index.ts';
import type { SdrSelect } from './SdrSelect/index.ts';
import type { SdrTextArea } from './SdrTextArea/index.ts';
import type { SdrTitleBar } from './SdrTitleBar/index.ts';
import type { SdrUpdateNotify } from './SdrUpdateNotify/index.ts';

import type { SdrViewCbzReader } from '../views/SdrComicBookReaderView/index.ts';
import type { SdrViewEmulator } from '../views/SdrEmulatorView/index.ts';
import type { SdrViewEpubReader } from '../views/SdrEpubReaderView/index.ts';
import type { SdrViewAppInfo } from '../views/SdrInfoView/index.ts';
import type { SdrViewItemDetails } from '../views/SdrItemDetailsView/index.ts';
import type { SdrViewLanguageSettings } from '../views/SdrLanguageSettingsView/index.ts';
import type { SdrViewMain } from '../views/SdrMainView/index.ts';
import type { SdrViewThemeSettings } from '../views/SdrThemeSettingsView/index.ts';

declare global {
	interface HTMLElementTagNameMap {
		'router-link': RouterLink;

		'sdr-button': SdrButton;
		'sdr-card': SdrCard;
		'sdr-dialog': SdrDialog;
		'sdr-drop-area': SdrDropArea;
		'sdr-dropdown': SdrDropdown;
		'sdr-dropdown-item': SdrDropdownItem;
		'sdr-edit-box': SdrEditBox;
		'sdr-edit-list': SdrEditList;
		'sdr-edit-list-item': SdrEditListItem;
		'sdr-loader': SdrLoader;
		'sdr-title-bar': SdrTitleBar;
		'sdr-progress-overlay': SdrProgressOverlay;
		'sdr-radio-group': SdrRadioGroup;
		'sdr-radio-item': SdrRadioItem;
		'sdr-search-box': SdrSearchBox;
		'sdr-select': SdrSelect;
		'sdr-loading-screen': SdrLoadingScreen;
		'sdr-textarea': SdrTextArea;
		'sdr-update-notify': SdrUpdateNotify;

		'sdr-view-main': SdrViewMain;
		'sdr-view-cbz-reader': SdrViewCbzReader;
		'sdr-view-emulator': SdrViewEmulator;
		'sdr-view-epub-reader': SdrViewEpubReader;
		'sdr-view-app-info': SdrViewAppInfo;
		'sdr-view-item-details': SdrViewItemDetails;
		'sdr-view-language-settings': SdrViewLanguageSettings;
		'sdr-view-theme-settings': SdrViewThemeSettings;
	}
}
