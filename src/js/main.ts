import { registerSW } from 'virtual:pwa-register';
import { SdrCard } from '../components/SdrCard';

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

	progressLoader.max = 8;

	updateLoadStatus(I18n.t`Loading components.`);
	await import('../components');
	await import('../views');
	await import('./gamepad/gamepad-navigation');

	const { SdrInfoBox } = await import('../views/SdrInfoBox');
	const { SdrThemeBox } = await import('../views/SdrThemeBox');
	const { SdrLanguageBox } = await import('../views/SdrLanguageBox');
	const { SdrItemDetails } = await import('../views/SdrItemDetails');

	updateLoadStatus(I18n.t`Importing helper functions.`);
	const { fetchItems } = await import('./data/data-import');
	const { createComparer } = await import('./intl/formatting');

	updateLoadStatus(I18n.t`Fetching items database.`);

	const materials = await fetchItems();

	updateLoadStatus(I18n.t`Sorting materials.`);

	const sorter = createComparer();
	const sortedMaterials = materials.sort(({ name: nameA }, { name: nameB }) => sorter(nameA, nameB));

	updateLoadStatus(I18n.t`Adding materials to the display.`);
	progressLoader.max = sortedMaterials.length;
	progressLoader.value = 0;

	for (const material of sortedMaterials) {
		const [materialId] = material.sku;

		// SdrCard.createCard({
		// 	Name: material.name,
		// 	Id: materialId,
		// 	Category: material.category,
		// 	Sku: material.sku,
		// 	Type: material.type,
		// 	Edition: material.edition,
		// 	Status: material.status
		// });

		progressLoader.value += 1;
	}

	updateLoadStatus(I18n.t`Setting information from URL.`);

	await SdrItemDetails.updateFromURL();
	SdrInfoBox.updateFromURL();
	SdrThemeBox.updateFromURL();
	SdrLanguageBox.updateFromURL();

	updateLoadStatus(I18n.t`Done!`);
	document.querySelector('#splash-screen')?.remove();
});
