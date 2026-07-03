import { SearchEngine } from './search-engine.js';

function updateLoader(text: string, maxItems?: number) {
	const progress = document.querySelector('loading-screen progress');
	const paragraph = document.querySelector('loading-screen p');

	if (!paragraph || !progress) {
		return;
	}

	if (maxItems !== undefined) {
		progress.max = maxItems;
	}

	progress.value += 1;
	paragraph.textContent = text;
}

window.addEventListener('DOMContentLoaded', async () => {
	try {
		// oxlint-disable-next-line no-magic-numbers
		updateLoader('Starting app', 6);

		updateLoader('Loading components');
		await import('../components/index.js');
		await import('../views/index.js');

		updateLoader('Loading search engine');
		SearchEngine.init();

		updateLoader('Loading translations');
		// const { I18n } = await import('./intl/translations');

		// await I18n.setLanguage(I18n.getLanguage());

		updateLoader('Adding gamepad support');
		// const { GamepadHandler } = await import('./gamepad/gamepad-events');

		// GamepadHandler.init(() => {
		// 	document.querySelector('sdr-card')?.focus();
		// });

		updateLoader('Loading data');
		document.addEventListener('--itemloaded', (evt) => {
			updateLoader(evt.name, evt.total);
		});

		document.addEventListener('--apploaded', () => {
			document.querySelector('loading-screen')?.remove();
		});
	} catch (err) {
		console.error(err);
	}
});
