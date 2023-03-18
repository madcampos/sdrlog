import type {} from 'typed-query-selector/strict';

import type { RouterLink } from '../router/router-link';

import type { SdrButton } from '../components/SdrButton';
import type { SdrCard } from '../components/SdrCard';
import type { SdrDialog } from '../components/SdrDialog';
import type { SdrDropArea } from '../components/SdrDropArea';
import type { SdrDropdown } from '../components/SdrDropdown';
import type { SdrDropdownItem } from '../components/SdrDropdownItem';
import type { SdrEditBox } from '../components/SdrEditBox';
import type { SdrEditList } from '../components/SdrEditList';
import type { SdrEditListItem } from '../components/SdrEditListItem';
import type { SdrLoader } from '../components/SdrLoader';
import type { SdrMenuBar } from '../components/SdrMenuBar';
import type { SdrProgressOverlay } from '../components/SdrProgressOverlay';
import type { SdrRadioGroup } from '../components/SdrRadioGroup';
import type { SdrRadioItem } from '../components/SdrRadioItem';
import type { SdrSearchBox } from '../components/SdrSearchBox';
import type { SdrSelect } from '../components/SdrSelect';
import type { SdrTextArea } from '../components/SdrTextArea';
import type { SdrUpdateNotify } from '../components/SdrUpdateNotify';

import type { SdrViewMain } from '../views/SdrMainView';
import type { SdrViewCbzReader } from '../views/SdrComicBookReaderView';
import type { SdrViewEmulator } from '../views/SdrEmulatorView';
import type { SdrViewEpubReader } from '../views/SdrEpubReaderView';
import type { SdrViewAppInfo } from '../views/SdrInfoView';
import type { SdrViewItemDetails } from '../views/SdrItemDetailsView';
import type { SdrViewLanguageSettings } from '../views/SdrLanguageSettingsView';
import type { SdrViewThemeSettings } from '../views/SdrThemeSettingsView';

declare global {
	interface HTMLElementTagNameMap {
		'router-link': RouterLink,

		'sdr-button': SdrButton,
		'sdr-card': SdrCard,
		'sdr-dialog': SdrDialog,
		'sdr-drop-area': SdrDropArea,
		'sdr-dropdown': SdrDropdown,
		'sdr-dropdown-item': SdrDropdownItem,
		'sdr-edit-box': SdrEditBox,
		'sdr-edit-list': SdrEditList,
		'sdr-edit-list-item': SdrEditListItem,
		'sdr-loader': SdrLoader,
		'sdr-menu-bar': SdrMenuBar,
		'sdr-progress-overlay': SdrProgressOverlay,
		'sdr-radio-group': SdrRadioGroup,
		'sdr-radio-item': SdrRadioItem,
		'sdr-search-box': SdrSearchBox,
		'sdr-select': SdrSelect,
		'sdr-textarea': SdrTextArea,
		'sdr-update-notify': SdrUpdateNotify,

		'sdr-view-main': SdrViewMain,
		'sdr-view-cbz-reader': SdrViewCbzReader,
		'sdr-view-emulator': SdrViewEmulator,
		'sdr-view-epub-reader': SdrViewEpubReader,
		'sdr-view-app-info': SdrViewAppInfo,
		'sdr-view-item-details': SdrViewItemDetails,
		'sdr-view-language-settings': SdrViewLanguageSettings,
		'sdr-view-theme-settings': SdrViewThemeSettings
	}
}
