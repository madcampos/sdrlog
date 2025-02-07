import { registerSW } from 'virtual:pwa-register';
import type { SdrLoadingScreen } from '../components/SdrLoadingScreen/index.ts';

registerSW({
	onOfflineReady() {
		// TODO: add notification
	},
	onNeedRefresh() {
		// TODO: invoke refresh updater
	}
});

window.addEventListener('DOMContentLoaded', async () => {
	try {
		const loadingScreen = document.querySelector('sdr-loading-screen') as SdrLoadingScreen;
		loadingScreen.max = 3;

		const { I18n } = await import('./intl/translations');

		await I18n.setLanguage(I18n.getLanguage());

		loadingScreen.update('Loading components...');
		await import('../components/index.js');
		const { GamepadHandler } = await import('./gamepad/gamepad-events');

		GamepadHandler.init(() => {
			document.querySelector('sdr-card')?.focus();
		});

		loadingScreen.update('Loading router...');
		await import('../router');

		loadingScreen.update('Loading data...');
		document.addEventListener('itemloaded', (evt) => {
			loadingScreen.max = evt.detail.total;

			loadingScreen.update(evt.detail.name);
		});

		document.addEventListener('apploaded', () => {
			loadingScreen?.remove();
		});
	} catch (err) {
		console.error(err);
	}
});
