import type { Emulator } from './emulator';

import { I18n } from '../../js/intl/translations';
import './emulator';

(async () => {
	await I18n.setLanguage(I18n.getLanguage());

	const url = new URL(window.location.toString());
	const params = new URLSearchParams(url.search);

	if (params.has('file')) {
		const emulatorElement = document.querySelector('rom-emulator') as Emulator;

		emulatorElement.file = params.get('file') as string;
	}
})();
