dialogPolyfill.registerDialog(document.querySelector('#item-details'));

const IMAGES_PATH = '/img/full/';
const PUBLISHER_PATH = '/img/publishers/';
const DATA_PATH = '/data/';

const dateFormater = new Intl.DateTimeFormat('en-US', {timeZone: 'UTC', month: 'short', year: 'numeric'});
const sorter = new Intl.Collator('en-US', {sensitivity: 'accent', numeric: true, caseFirst: 'upper'});
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
 * @param {Object} item The item data.
 */
function fillItemDetails(item){
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
 * @param {Object} item The item data.
 */
function addItemCard(item){
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
 * @returns {Array|null} A key-value pair of items or null if there is no new data.
 */
async function fetchNextItems(){
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
			//eslint-disable-next-line no-console
			console.error(err);
		}
	} else {
		currentData = JSON.parse(currentData);
	}

	sessionStorage.setItem('currentDataFile', currentDataFile + 1);
	return currentData || null;
}

/**
 * Lazy load images.
 */
async function lazyLoadImages(){
	//TODO: keep record of last fetched thumb/image
	//Load only a few images at a time
	//test events: load, loadend, error
	//test attributes: completed, naturalWidth
	//test mutation observer
	//Lazy load with js reuzing image objects
	//Use facebook technique: https://code.facebook.com/posts/991252547593574/the-technology-behind-preview-photos/
	//https://www.sitepoint.com/five-techniques-lazy-load-images-website-performance/
}

/**
 * Shows the item details of the given SKU.
 * @param {String} sku The SKU to show.
 * @param {Boolean} forceOpen Force the modal to be open.
 */
function toggleItemDetails(sku, forceOpen = false){
	const itemDetails = document.querySelector('#item-details');

	if (!itemDetails.showModal) {
		dialogPolyfill.forceRegisterDialog(itemDetails);
	}

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