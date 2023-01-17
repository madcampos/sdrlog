import { I18n } from '../../js/intl/translations';

import { SdrComicBookReader } from './reader';
import { SdrButton } from '../../components/button/button';
import { SdrMenuBar } from '../../components/menu-bar/menu-bar';

customElements.define('sdr-cbz-reader', SdrComicBookReader);
customElements.define('sdr-button', SdrButton);
customElements.define('sdr-menu-bar', SdrMenuBar);

(async () => {
	await I18n.setLanguage(I18n.getLanguage());

	const url = new URL(window.location.toString());
	const params = new URLSearchParams(url.search);

	if (params.has('file')) {
		let readerElement = document.querySelector<SdrComicBookReader>('sdr-cbz-reader');

		if (!readerElement) {
			readerElement = document.createElement('sdr-cbz-reader') as SdrComicBookReader;

			document.body.appendChild(readerElement);
		}

		readerElement.file = params.get('file') as string;
	}
})();
