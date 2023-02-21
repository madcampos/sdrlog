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
	const { I18n } = await import('./intl/translations');
	const progressLoader = document.querySelector('#load-progress') as HTMLProgressElement;

	await I18n.setLanguage(I18n.getLanguage());

	progressLoader.max = 3;

	updateLoadStatus(I18n.t`Loading components...`);
	await import('../components');
	await import('./gamepad/gamepad-navigation');

	updateLoadStatus(I18n.t`Loading router...`);
	await import('../router');

	updateLoadStatus(I18n.t`Loading data...`);

	progressLoader.removeAttribute('value');
	progressLoader.removeAttribute('max');
	progressLoader.removeAttribute('min');

	document.addEventListener('apploaded', () => {
		document.querySelector('#splash-screen')?.remove();
	});
});
