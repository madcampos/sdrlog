import { Router } from './router';

import { SdrViewCbzReader } from '../views/SdrComicBookReaderView';
import { SdrViewEmulator } from '../views/SdrEmulatorView';
import { SdrViewEpubReader } from '../views/SdrEpubReaderView';
import { SdrViewAppInfo } from '../views/SdrInfoView';
import { SdrViewItemDetails } from '../views/SdrItemDetailsView';
import { SdrViewLanguageSettings } from '../views/SdrLanguageSettingsView';
import { SdrViewMain } from '../views/SdrMainView';
import { SdrViewThemeSettings } from '../views/SdrThemeSettingsView';

Router.init({
	baseUrl: '/',
	routes: [
		{
			path: '/',
			view: SdrViewMain
		},
		{
			path: '/item/:id?',
			view: SdrViewItemDetails
		},
		{
			path: '/info',
			view: SdrViewAppInfo
		},
		{
			path: '/settings/theme',
			view: SdrViewThemeSettings
		},
		{
			path: '/settings/language',
			view: SdrViewLanguageSettings
		},
		{
			path: '/emulator/:id',
			view: SdrViewEmulator
		},
		{
			path: '/epub/:id',
			view: SdrViewEpubReader
		},
		{
			path: '/cbz/:id',
			view: SdrViewCbzReader
		}
	]
});
