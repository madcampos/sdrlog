dialogPolyfill.registerDialog(document.querySelector('#item-details'));
const IMAGES_PATH = '/img/full/';
const PUBLISHER_PATH = '/img/publishers/';
const dateFormater = new Intl.DateTimeFormat('en-US', {timeZone: 'UTC', month: 'short', year: 'numeric'});
const sorter = new Intl.Collator('en-US', {sensitivity: 'accent', numeric: true, caseFirst: 'upper'});
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
let items;

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
	document.querySelector('#item-details-category abbr').title = item.category; //TODO: uppercase
	document.querySelector('#item-details-type abbr').textContent = types.get(item.type);
	document.querySelector('#item-details-type abbr').title = item.type; //TODO: uppercase
	document.querySelector('#item-details-publisher abbr').title = item.publisher; //TODO: uppercase
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
function fillItemCard(item){
	const itemCard = document.importNode(document.querySelector('#card-template').content, true);
	const cardLink = itemCard.querySelector('a').dataset;

	itemCard.querySelector('.thumb').src = `${IMAGES_PATH}${item.image || `${item.sku[0]}.jpg`}`;
	itemCard.querySelector('.title').textContent(item.name);

	cardLink.name = item.name;
	cardLink.category = item.category;
	cardLink.sku = item.sku;
	cardLink.publisher = item.publisher;
	cardLink.release = item.releaseDate;
	cardLink.edition = item.edition;
	cardLink.date = item.gameDate;
	cardLink.type = item.type;

	if (item.scope) {
		cardLink.missing = item.scope;
	}

	document.querySelector('main').appendChild(itemCard);
}

/**
 * Loads more items in the main content area.
 */
function loadItems(){
	//TODO
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
	//TODO: cleanup fetchs and use methods.
	//check data in storage
	//split data in storage
	//fetch last part if available
	//keep record of last fetched thumb/image
	//add lazy load of images and data

	const patchData = [];
	let data = JSON.parse(localStorage.getItem('data') || '[]');
	let i = 1;
	let res;

	if (data.length !== 0) {
		i = localStorage.getItem('lastDataFile');
	}

	for (i; i > 0; i++) {
		try {
			res = await fetch(`/data/data-${i}.json`);
		} catch (err) {
			//eslint-disable-next-line no-console
			console.error(err);
		}

		if (!res || res.type === 'error' || !res.ok) {
			localStorage.setItem('lastDataFile', i - 1);
			break;
		}

		patchData.push(...await res.json());
	}

	data = data.filter(([id]) => !patchData.find(([patchId]) => patchId === id));
	data = [...data, ...patchData];
	data = data.sort(([, obj1], [, obj2]) => sorter.compare(obj1.name, obj2.name));

	localStorage.setItem('data', JSON.stringify(data));

	items = new Map(data);
	//TODO: throttle data output/rendering
	//Virtual list?
	//Timeout/wait previous rendering?
	//Infinite scrolling?
	//TODO: lazy load images
	//Load only a few images at a time
	//test events: load, loadend, error
	//test attributes: completed, naturalWidth
	//test mutation observer
	//Lazy load with js reuzing image objects
	//Use facebook technique: https://code.facebook.com/posts/991252547593574/the-technology-behind-preview-photos/
	// itens.$mount('#itens');

	if (window.location.hash) {
		const sku = window.location.hash.replace('#', '');
		toggleItemDetails(sku, true);
	}

	document.querySelector('#load-overlay').classList.toggle('hidden');
	document.querySelector('main').classList.toggle('hidden');
});