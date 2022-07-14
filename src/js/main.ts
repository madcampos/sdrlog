import type { SearchBox } from './components/search-box/search-box';
import type { WorkerMessage } from './rpc-messages';

function updateLoadStatus(status: string) {
	const text = document.querySelector('#load-text') as HTMLHeadingElement;
	const progress = document.querySelector('#load-progress') as HTMLProgressElement;

	text.innerText = status;
	progress.value += 1;
}

function updateAppTheme() {
	const theme = localStorage.getItem('appTheme') ?? 'system';

	document.body.classList.add(`theme-${theme}`);
}

async function init() {
	const { I18n } = await import('./components/intl/translations');
	const progressLoader = document.querySelector('#load-progress') as HTMLProgressElement;

	await I18n.setLanguage(I18n.getLanguage());

	updateAppTheme();

	progressLoader.max = 8;

	updateLoadStatus(I18n.t`Loading components.`);
	await import('./components/components');
	await import('./components/gamepad/gamepad-navigation');

	updateLoadStatus(I18n.t`Adding menu bar.`);
	await import('./components/menu-bar/main-menu-items');

	updateLoadStatus(I18n.t`Importing helper functions.`);
	const { fetchItems } = await import('./components/data-operations/data-import');
	const { updateFiltersFromURL } = await import('./components/search-box/update-filter');
	const { updateInfoBoxFromURL } = await import('./components/info-box/info-box');
	const { updateThemeBoxFromURL } = await import('./components/theme-box/theme-box');
	const { updateLanguageBoxFromURL } = await import('./components/intl/language-info');
	const { checkForMatchingId, updateItemModalFromURL } = await import('./components/item-info/item-details-url');
	const { createComparer } = await import('./components/intl/formatting');

	updateLoadStatus(I18n.t`Fetching items database.`);

	const materials = await fetchItems();

	updateLoadStatus(I18n.t`Sorting materials.`);

	const sorter = createComparer();
	const sortedMaterials = materials.sort(({ name: nameA }, { name: nameB }) => sorter(nameA, nameB));
	let matchedId: string | null = null;
	let matchedTitle = '';

	updateLoadStatus(I18n.t`Adding materials to the display.`);
	progressLoader.max = sortedMaterials.length;
	progressLoader.value = 0;

	for (const material of sortedMaterials) {
		const itemCard = document.createElement('item-card');
		const [materialId] = material.sku;

		itemCard.id = materialId;
		itemCard.title = material.name;
		itemCard.dataset.category = material.category;
		itemCard.dataset.sku = material.sku.join(' ');
		itemCard.dataset.type = material.type;
		itemCard.dataset.edition = material.edition.toString();
		itemCard.dataset.status = material.status ?? '';
		document.querySelector('main')?.appendChild(itemCard);

		progressLoader.value += 1;

		if (checkForMatchingId(materialId)) {
			matchedId = materialId;
			matchedTitle = material.name;
		}
	}

	if (matchedId) {
		updateLoadStatus(I18n.t`Setting modal from URL.`);

		updateItemModalFromURL(matchedId, matchedTitle);
	}

	updateLoadStatus(I18n.t`Setting information from URL.`);

	updateInfoBoxFromURL();
	updateThemeBoxFromURL();
	updateLanguageBoxFromURL();
	updateFiltersFromURL();
	document.querySelector<SearchBox>('search-box')?.updateSuggestions();

	updateLoadStatus(I18n.t`Done!`);
	document.querySelector('#splash-screen')?.remove();
}

window.addEventListener('load', async () => {
	try {
		const workerRegistration = await navigator.serviceWorker.register(`${import.meta.env.PUBLIC_URL}sw.js`);

		if (workerRegistration.active) {
			await init();
		}
	} catch (err) {
		console.error(err);

		await init();
	}
}, { once: true });

navigator.serviceWorker.addEventListener('message', async (evt) => {
	const message = evt.data as WorkerMessage;

	if (message.type === 'worker-ready') {
		await init();
	}
}, { once: true });
