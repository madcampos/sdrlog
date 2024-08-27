import { registerSW } from 'virtual:pwa-register';

registerSW({
	onOfflineReady() {
		// TODO: add notification
	},
	onNeedRefresh() {
		// TODO: invoke refresh updater
	}
});

function updateLoadStatus(status: string) {
	const text = document.querySelector('#load-text') as HTMLHeadingElement;
	const progress = document.querySelector('#load-progress') as HTMLProgressElement;

	text.innerText = status;
	progress.value += 1;
}

window.addEventListener('DOMContentLoaded', async () => {
	try {
		const { I18n } = await import('./intl/translations');
		const progressLoader = document.querySelector('#load-progress') as HTMLProgressElement;

		await I18n.setLanguage(I18n.getLanguage());

		progressLoader.max = 3;

		updateLoadStatus('Loading components...');
		await import('../components/index.js');
		const { GamepadHandler } = await import('./gamepad/gamepad-events');

		GamepadHandler.init(() => {
			document.querySelector('sdr-card')?.focus();
		});

		updateLoadStatus('Loading router...');
		await import('../router');

		updateLoadStatus('Loading data...');
		document.addEventListener('itemloaded', (evt) => {
			progressLoader.max = evt.detail.total;

			updateLoadStatus(evt.detail.name);
		});

		document.addEventListener('apploaded', () => {
			document.querySelector('#splash-screen')?.remove();
		});
	} catch (err) {
		console.error(err);
	}
});
