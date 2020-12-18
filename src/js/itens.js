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

const cardTemplate = document.querySelector('#card-template');
const itemDetails = {
	category: document.querySelector('#item-details-category abbr'),
	description: document.querySelector('#item-details-description'),
	edition: document.querySelector('#item-details-edition'),
	element: document.querySelector('#item-details'),
	gameDate: document.querySelector('#item-details-gamedate'),
	image: document.querySelector('#item-details-image'),
	notes: document.querySelector('#item-details-notes'),
	publisher: document.querySelector('#item-details-publisher abbr'),
	releaseDate: document.querySelector('#item-details-releasedate'),
	sku: document.querySelector('#item-details-sku'),
	title: document.querySelector('#item-details-title'),
	type: document.querySelector('#item-details-type abbr')
};

const capitalizeString = ([first, ...other]) => `${first.toUpperCase()}${other.join('')}`;

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
	itemDetails.title.textContent = item.title;
	itemDetails.image.src = `${IMAGES_PATH}${item.image || `${item.sku[0]}.jpg`}`;
	itemDetails.description.textContent = item.description;

	itemDetails.sku.textContent = item.sku;
	itemDetails.edition.textContent = item.edition;
	itemDetails.gameDate.textContent = dateFormater.format(new Date(item.gameDate));
	itemDetails.releaseDate.textContent = dateFormater.format(new Date(item.releaseDate));
	itemDetails.category.textContent = categories.get(item.category);
	itemDetails.category.title = capitalizeString(item.category);
	itemDetails.type.textContent = types.get(item.type);
	itemDetails.type.title = capitalizeString(item.type);
	itemDetails.publisher.title = capitalizeString(item.publisher);
	itemDetails.publisher.src = `${PUBLISHER_PATH}${item.publisher}.png`;

	if (item.notes) {
		itemDetails.notes.textContent = item.notes;
	} else {
		itemDetails.notes.classList.toggle('hidden');
	}
}

/**
 * Fills the item card with the data provided.
 *
 * @param {object} item The item data.
 * @example
 */
function addItemCard(item) {
	const itemCard = document.importNode(cardTemplate.content, true);
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
 * Finds a batch of itens for a index.
 *
 * @param {number} index The index to find a item batch.
 * @returns {object[]} The list of items.
 */
async function fetchItems(index) {
	let currentData = localStorage.getItem(`data-${index}`);

	if (!currentData) {
		try {
			const res = await fetch(`${DATA_PATH}data-${index}.json`);

			if (res.ok) {
				currentData = await res.json();
			}
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err);
		}
	} else {
		currentData = JSON.parse(currentData);
	}

	return currentData ?? [];
}

/**
 * Fetches the next batch of items from storage or network.
 *
 * @returns {Array} A key-value pair of items, empty if no new data.
 */
async function fetchAllItems() {
	let currentDataFile = 1;

	const updateItems = [];

	do {
		// eslint-disable-next-line no-await-in-loop
		const newItems = await fetchItems(currentDataFile);

		updateItems.push(...newItems);

		if (newItems.length > 0) {
			localStorage.setItem(`data-${currentDataFile}`, JSON.stringify(newItems));
		} else {
			localStorage.setItem('lastDataFile', currentDataFile);
			break;
		}

		currentDataFile += 1;
	} while (updateItems.length > 0);

	return updateItems;
}

/**
 * Shows the item details of the given SKU.
 *
 * @param {string} sku The SKU to show.
 * @param {boolean} forceOpen Force the modal to be open.
 * @example
 */
function toggleItemDetails(sku, forceOpen = false) {
	if (!itemDetails.element.open || forceOpen) {
		fillItemDetails(items.get(sku));
		itemDetails.element.showModal();
		history.pushState(history.state, 'Shadowrun Catalog', `#${sku}`);
	} else {
		itemDetails.element.close();
		history.back();
	}
}

window.addEventListener('DOMContentLoaded', async () => {
	const itemsData = await fetchAllItems();

	itemsData.forEach((item) => {
		items.set(item.sku[0], item);
		addItemCard(item);
	});

	if (window.location.hash) {
		const sku = window.location.hash.replace('#', '');

		toggleItemDetails(sku, true);
	}

	document.querySelector('#load-overlay').classList.add('hidden');
	document.querySelector('main').classList.remove('hidden');
});
