import type { SdrComicBookReader } from './reader';

import { I18n } from '../../js/intl/translations';

import '../button/button';
import '../menu-bar/menu-bar';
import './reader';

(async () => {
	await I18n.setLanguage(I18n.getLanguage());

	const url = new URL(window.location.toString());
	const params = new URLSearchParams(url.search);

	if (params.has('file')) {
		const readerElement = document.querySelector('cbz-reader') as SdrComicBookReader;

		readerElement.file = params.get('file') as string;
	}
})();
