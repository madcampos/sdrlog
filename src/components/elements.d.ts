import type {} from 'typed-query-selector/strict';

import type { RouterLink } from '../router/router-link';

import type { SdrButton } from './SdrButton';
import type { SdrCard } from './SdrCard';
import type { SdrDialog } from './SdrDialog';
import type { SdrDropArea } from './SdrDropArea';
import type { SdrDropdown } from './SdrDropdown';
import type { SdrDropdownItem } from './SdrDropdownItem';
import type { SdrEditBox } from './SdrEditBox';
import type { SdrEditList } from './SdrEditList';
import type { SdrEditListItem } from './SdrEditListItem';
import type { SdrLoader } from './SdrLoader';
import type { SdrMenuBar } from './SdrMenuBar';
import type { SdrProgressOverlay } from './SdrProgressOverlay';
import type { SdrRadioGroup } from './SdrRadioGroup';
import type { SdrRadioItem } from './SdrRadioItem';
import type { SdrSearchBox } from './SdrSearchBox';
import type { SdrSelect } from './SdrSelect';
import type { SdrTextArea } from './SdrTextArea';
import type { SdrUpdateNotify } from './SdrUpdateNotify';

import type { SdrViewCbzReader } from '../views/SdrComicBookReaderView';
import type { SdrViewEmulator } from '../views/SdrEmulatorView';
import type { SdrViewEpubReader } from '../views/SdrEpubReaderView';
import type { SdrViewAppInfo } from '../views/SdrInfoView';
import type { SdrViewItemDetails } from '../views/SdrItemDetailsView';
import type { SdrViewLanguageSettings } from '../views/SdrLanguageSettingsView';
import type { SdrViewMain } from '../views/SdrMainView';
import type { SdrViewThemeSettings } from '../views/SdrThemeSettingsView';

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
		'sdr-menu-bar': SdrMenuBar;
		'sdr-progress-overlay': SdrProgressOverlay;
		'sdr-radio-group': SdrRadioGroup;
		'sdr-radio-item': SdrRadioItem;
		'sdr-search-box': SdrSearchBox;
		'sdr-select': SdrSelect;
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
