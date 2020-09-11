/**
 * @file Item processing module.
 * @author madcampos <madcampos@outlook.com>
 * @version 1.0.0
 */

const IMAGES_PATH = '/img/full/';
const PUBLISHER_PATH = '/img/publishers/';
const DATA_PATH = '/data/';

const dateFormater = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC', year: 'numeric' });
const sorter = new Intl.Collator('en-US', { caseFirst: 'upper', numeric: true, sensitivity: 'accent' });
const capitalizeString = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const categories = new Map([
	['novel', '📚'],
	['sourcebook', '📜'],
	['mission', '🗺️'],
	['rulebook', '📝'],
	['misc', '🔣'],
	['magazine', '📰'],
	['boardgame', '♟️'],
	['videogame', '🎮'],
	['tcg', '🃏'],
	['unofficial', '📓']
]);
const types = new Map([
	['digital', '💽'],
	['scan', '📠'],
	['print', '🖨️'],
	['physical', '🎲']
]);

const items = new Map();

/**
 * Fills the item details modal with the data provided.
 *
 * @param {object} item The item data.
 * @example
 */
function fillItemDetails(item) {
	// TODO: map terms to canonical decomposition form
	document.querySelector('#item-details-title').textContent = item.title;
	document.querySelector('#item-details-image').src = `${IMAGES_PATH}${item.image || `${item.sku[0]}.jpg`}`;
	document.querySelector('#item-details-description').textContent = item.description;

	document.querySelector('#item-details-sku').textContent = item.sku;
	document.querySelector('#item-details-edition').textContent = item.edition;
	document.querySelector('#item-details-gamedate').textContent = dateFormater.format(new Date(item.gameDate));
	document.querySelector('#item-details-releasedate').textContent = dateFormater.format(new Date(item.releaseDate));
	document.querySelector('#item-details-category abbr').textContent = categories.get(item.category);
	document.querySelector('#item-details-category abbr').title = capitalizeString(item.category);
	document.querySelector('#item-details-type abbr').textContent = types.get(item.type);
	document.querySelector('#item-details-type abbr').title = capitalizeString(item.type);
	document.querySelector('#item-details-publisher abbr').title = capitalizeString(item.publisher);
	document.querySelector('#item-details-publisher abbr').src = `${PUBLISHER_PATH}${item.publisher}.png`;

	if (item.notes) {
		document.querySelector('#item-details-notes').textContent = item.notes;
	} else {
		document.querySelector('#item-details-notes').classList.toggle('hidden');
	}
}

/**
 * Fills the item card with the data provided.
 *
 * @param {object} item The item data.
 * @example
 */
function addItemCard(item) {
	const itemCard = document.importNode(document.querySelector('#card-template').content, true);
	const cardLinkData = itemCard.querySelector('a').dataset;

	itemCard.querySelector('.thumb').src = `${IMAGES_PATH}${item.image || `${item.sku[0]}.jpg`}`;
	itemCard.querySelector('.title').textContent(item.name);

	cardLinkData.name = item.name;
	cardLinkData.category = item.category;
	cardLinkData.sku = item.sku;
	cardLinkData.publisher = item.publisher;
	cardLinkData.release = item.releaseDate;
	cardLinkData.edition = item.edition;
	cardLinkData.date = item.gameDate;
	cardLinkData.type = item.type;

	if (item.scope) {
		cardLinkData.missing = item.scope;
	}

	document.querySelector('main').appendChild(itemCard);
}

/**
 * Fetches the next batch of items from storage or network.
 *
 * @returns {Array|null} A key-value pair of items or null if there is no new data.
 * @example
 */
async function fetchNextItems() {
	const lastDataFile = localStorage.getItem('lastDataFile') || 1;
	const currentDataFile = sessionStorage.getItem('currentDataFile') || 1;
	let currentData = localStorage.getItem(`data${currentDataFile}`);

	if (!currentData && lastDataFile === currentDataFile) {
		try {
			const res = await fetch(`${DATA_PATH}data-${currentDataFile}.json`);

			if (res || res.type !== 'error' || res.ok) {
				localStorage.setItem('lastDataFile', lastDataFile + 1);

				currentData = await res.json();
				localStorage.setItem(`data${lastDataFile + 1}`, JSON.stringify(currentData));
			}
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err);
		}
	} else {
		currentData = JSON.parse(currentData);
	}

	sessionStorage.setItem('currentDataFile', currentDataFile + 1);

	return currentData || null;
}

/**
 * Shows the item details of the given SKU.
 *
 * @param {string} sku The SKU to show.
 * @param {boolean} forceOpen Force the modal to be open.
 * @example
 */
function toggleItemDetails(sku, forceOpen = false) {
	const itemDetails = document.querySelector('#item-details');

	if (!itemDetails.open || forceOpen) {
		fillItemDetails(items.get(sku));
		itemDetails.showModal();
		history.pushState(history.state, 'Shadowrun Catalog', `#${sku}`);
	} else {
		itemDetails.close();
		history.back();
	}
}

window.addEventListener('DOMContentLoaded', async () => {
	let lastItems = null;

	do {
		// eslint-disable-next-line no-await-in-loop
		lastItems = await fetchNextItems();
		lastItems.forEach(([id, item]) => {
			items.set(id, item);
			addItemCard(item);
		});
	} while (lastItems);

	if (window.location.hash) {
		const sku = window.location.hash.replace('#', '');

		toggleItemDetails(sku, true);
	}

	document.querySelector('#load-overlay').classList.add('hidden');
	document.querySelector('main').classList.remove('hidden');
});
