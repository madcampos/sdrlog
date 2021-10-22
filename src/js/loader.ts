import type { WorkerReadyMessage } from './rpc-messages';

async function loadModules() {
	await import('./components/intl/bootstrap');
	await import('./main');
}

window.addEventListener('load', async () => {
	try {
		const workerRegistration = await navigator.serviceWorker.register(`${import.meta.env.PUBLIC_URL}sw.js`);

		if (workerRegistration.active) {
			await loadModules();
		}
	} catch (err) {
		console.error(err);
	}
}, { once: true });

navigator.serviceWorker.addEventListener('message', async (evt) => {
	const message = evt.data as WorkerReadyMessage;

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (message.type === 'worker-ready') {
		await loadModules();
	}
}, { once: true });
