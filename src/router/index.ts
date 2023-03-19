import { Router } from './router';

import { SdrViewMain } from '../views/SdrMainView';
import { SdrViewItemDetails } from '../views/SdrItemDetailsView';
import { SdrViewThemeSettings } from '../views/SdrThemeSettingsView';
import { SdrViewLanguageSettings } from '../views/SdrLanguageSettingsView';
import { SdrViewAppInfo } from '../views/SdrInfoView';
import { SdrViewEmulator } from '../views/SdrEmulatorView';
import { SdrViewEpubReader } from '../views/SdrEpubReaderView';
import { SdrViewCbzReader } from '../views/SdrComicBookReaderView';

Router.init({
	baseUrl: import.meta.env.BASE_URL,
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
