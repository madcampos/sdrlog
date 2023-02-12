import type {} from 'typed-query-selector/strict';

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

import type { SdrComicBookReader } from '../views/SdrComicBookReader';
import type { SdrEmulator } from '../views/SdrEmulator';
import type { SdrEpubReader } from '../views/SdrEpubReader';
import type { SdrInfoBox } from '../views/SdrInfoBox';
import type { SdrItemDetails } from '../views/SdrItemDetails';
import type { SdrLanguageBox } from '../views/SdrLanguageBox';
import type { SdrThemeBox } from '../views/SdrThemeBox';

declare global {
	interface HTMLElementTagNameMap {
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

		'sdr-comic-book-reader': SdrComicBookReader,
		'sdr-emulator': SdrEmulator,
		'sdr-epub-reader': SdrEpubReader,
		'sdr-info-box': SdrInfoBox,
		'sdr-item-details': SdrItemDetails,
		'sdr-language-box': SdrLanguageBox,
		'sdr-theme-box': SdrThemeBox
	}
}
