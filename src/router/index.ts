import { Router } from './router';

import { SdrViewMain } from '../views/SdrMainView';
import { SdrViewItemDetails } from '../views/SdrItemDetailsView';
import { SdrViewThemeSettings } from '../views/SdrThemeSettingsView';
import { SdrViewLanguageSettings } from '../views/SdrLanguageSettingsView';
import { SdrViewAppInfo } from '../views/SdrInfoView';

Router.init({
	baseUrl: import.meta.env.APP_PUBLIC_URL,
	routes: [
		{
			path: '/',
			view: SdrViewMain
		},
		{
			path: '/new-item',
			view: SdrViewItemDetails
		},
		{
			path: '/item/:id',
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
		}
	]
});
