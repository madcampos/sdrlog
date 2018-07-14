dialogPolyfill.registerDialog(document.querySelector('#info-box'));
const searchInput = document.querySelector('#search input');

/**
 * The Filter Object and it's properties.
 * @typedef Object FilterObject
 * @prop {String} [category] The category.
 * @prop {String} [type] The type.
 * @prop {String} [sku] The SKU.
 * @prop {String} [name] The name.
 * @prop {String} [edition] The edition.
 * @prop {String} [publisher] The publisher.
 * @prop {String} [date] The in game date.
 * @prop {String} [release] The release date.
 * @prop {("out"|"missing")} [scope] If it's missing or outo of scope.
 */

/**
 * Updates the search suggestion box.
 * @param {filterObject} filterObject The filter object.
 * @returns {Number} The RAF ID.
 */
function updateSugestionBox(filterObject){
	return requestAnimationFrame(() => {
		//TODO: throttle
		//1. get current filtered
		//2. if empty
		//2.1. set scope to full Map
		//2.2.
		//3. get new query
		//4. if new query contains the current query set scope to current filtered
		//5. if current query contains new query (step back) set scope to previous filtered (superset)
		//6. filter scope
		//7. set previous filtered to current filtered
		//8. set current query to new query
		//9. set previous

		//1. Clear datalist options
		//2. Filter items map for condition
		//2.1. Keep reperence of one step back and current step so we can rollback and improve the currnt search
		//3. throttle request for 1 second or it's finished processing
	});
}

/**
 * Updates the search CSS with the given Filter Object.
 * @param {FilterObject} filterObject The Filter Object.
 * @returns {Number} The RAF ID.
 */
function updateSearchFilter(filterObject){
	const SEARCH_ITEM_SELECTOR = '.item';
	const filterCSS = document.querySelector('#filterCSS');
	let styleString = '';

	if (Object.keys(filterObject).length === 0) {
		return window.requestAnimationFrame(() => {
			filterCSS.innerHTML = '';
		});
	}

	for (const [tag, value] of Object.entries(filterObject)) {
		if (tag === 'scope') {
			if (value === 'missing') {
				styleString += `${SEARCH_ITEM_SELECTOR}:not([data-missing]){display:none}`;
			} else {
				styleString += `${SEARCH_ITEM_SELECTOR}:not([data-missing="outOfScope"]){display:none}`;
			}
		} else {
			styleString += `${SEARCH_ITEM_SELECTOR}:not([data-${tag}*="${value}"]){display:none}`;
		}
	}

	return window.requestAnimationFrame(() => {
		filterCSS.innerHTML = styleString;
	});
}

/**
 * Updates the browser history with the info passed.
 * @param {FilterObject} filterObject The filterObject.
 * @returns {Number} The RAF ID.
 */
function updateHistory(filterObject){
	if (Object.keys(filterObject).length === 0) {
		return window.requestAnimationFrame(() => {
			if (history.state) {
				history.replaceState(filterObject, document.title, '?all');
			} else {
				history.pushState(filterObject, document.title, '?all');
			}
		});
	}

	return window.requestAnimationFrame(() => {
		if (history.state) {
			history.replaceState(filterObject, document.title, `?${(new URLSearchParams(filterObject)).toString()}`);
		} else {
			history.pushState(filterObject, document.title, `?${(new URLSearchParams(filterObject)).toString()}`);
		}
	});
}

/**
 * Updates the Input text with tags given the Filter Object.
 * @param {FilterObject} filterObject The Filter Object.
 * @returns {Number} The RAF ID.
 */
function updateTags(filterObject){
	let tagString = '';

	if (Object.keys(filterObject).length === 0) {
		return window.requestAnimationFrame(() => {
			searchInput.value = '';
		});
	}

	for (const [tag, value] of Object.entries(filterObject)) {
		if (tag === 'scope') {
			if (value === 'missing') {
				tagString += 'scope: missing';
			} else {
				tagString += 'scope: out';
			}
		} else {
			tagString += `${tag}: ${value}`;
		}
	}

	return window.requestAnimationFrame(() => {
		searchInput.value = tagString;
	});
}

/**
 * Transform a URL search part into a Filter Object.
 * @param {String} [urlSearch=window.location.search] The URL search string to be parsed into tags.
 * @returns {FilterObject} The Filter Object.
 */
function searchURLtoFilter(urlSearch = window.location.search){
	const search = new URLSearchParams(urlSearch);
	const filterObject = {};

	if (!search.has('all')) {
		for (const [tag, value] of search.entries()) {
			switch (tag) {
				case 'scope':
					if (value === 'missing') {
						filterObject.scope = 'missing';
					} else if (value === 'out') {
						filterObject.scope = 'out';
					}
					break;
				case 'id':
					filterObject.sku = value;
					break;
				case 'ed':
					filterObject.edition = value;
					break;
				case 'rel':
					filterObject.release = value;
					break;
				case 'pub':
					filterObject.publisher = value;
					break;
				case 'cat':
					filterObject.category = value;
					break;
				default:
					filterObject[tag] = value;
			}
		}
	}

	return filterObject;
}

/**
 * Transform a string of tags into a Filter Object.
 * @param {String} [text=searchInput.value] The text to search in.
 * @returns {FilterObject} The Filter Object.
 */
function searchTagsToFilter(text = searchInput.value){
	const filterObject = {};
	const search = /(name|cat(?:egory)?|sku|id|pub(?:lisher)?|rel(?:ease)?|ed(?:ition)?|date|type|scope)[:=]\s*(.*?)(?=(?:,?\s*(?:name|cat(?:egory)?|sku|id|pub(?:lisher)?|rel(?:ease)?|ed(?:ition)?|date|type|scope)[:=])|$)/giu;
	let match = search.exec(text.toLowerCase());

	if (match) {
		do {
			switch (match[1]) {
				case 'scope':
					if (match[2] === 'missing') {
						filterObject.scope = 'missing';
					} else if (match[2] === 'out') {
						filterObject.scope = 'out';
					}
					break;
				case 'id':
					filterObject.sku = match[2];
					break;
				case 'ed':
					filterObject.edition = match[2];
					break;
				case 'rel':
					filterObject.release = match[2];
					break;
				case 'pub':
					filterObject.publisher = match[2];
					break;
				case 'cat':
					filterObject.category = match[2];
					break;
				default:
					filterObject[match[1]] = match[2];
			}

			match = search.exec(text.toLowerCase());
		} while (match);
	}

	return filterObject;
}

/**
 * Toggle the Information box modal.
 * @param {Boolean} forceOpen Force the modal to be open.
 */
function toggleInfoModal(forceOpen = false){
	const info = document.querySelector('#info-box');

	if (!info.showModal) {
		dialogPolyfill.forceRegisterDialog(info);
	}

	if (!info.open || forceOpen) {
		info.showModal();
		history.pushState(null, 'Shadowrun Catalog', '?info');
	} else {
		info.close();
		history.back();
	}
}

//Toggle infobox
document.querySelector('#info-button').addEventListener('click', toggleInfoModal);
document.querySelector('#info-box .back-button').addEventListener('click', toggleInfoModal);
window.addEventListener('keydown', (evt) => {
	if (evt.ctrlKey && evt.key === 'i') {
		evt.preventDefault();
		toggleInfoModal();
	}
});

//Toggle Search box
searchInput.addEventListener('focus', (evt) => evt.target.select());
window.addEventListener('keydown', (evt) => {
	if (evt.ctrlKey && evt.key === 'f') {
		evt.preventDefault();
		const searchField = document.querySelector('#search input');

		if (document.activeElement === searchField) {
			searchField.blur();
		} else {
			searchField.focus();
		}
	}
});
searchInput.addEventListener('input', () => {
	const filterObject = searchTagsToFilter();
	updateHistory(filterObject);
	updateSearchFilter(filterObject);
	updateSugestionBox(filterObject);
});

//Categories
document.querySelectorAll('#menu .category').forEach((category) => category.addEventListener('click', (evt) => {
	evt.preventDefault();

	const filterObject = {category: (new URLSearchParams(evt.target.href)).get('category')};
	updateTags(filterObject);
	updateHistory(filterObject);
	updateSearchFilter(filterObject);

	document.querySelector('#menu ul').classList.toggle('hidden');
}));

document.querySelector('#menu li:last-child a').addEventListener('click', (evt) => {
	evt.preventDefault();

	const filterObject = {};
	updateTags(filterObject);
	updateHistory(filterObject);
	updateSearchFilter(filterObject);

	document.querySelector('#menu ul').classList.toggle('hidden');
});

document.addEventListener('DOMContentLoaded', () => {
	const filterObject = searchURLtoFilter();
	updateTags(filterObject);
	updateSearchFilter(filterObject);

	if ((new URLSearchParams(window.location.search)).has('info')) {
		toggleInfoModal(true);
	}

	document.querySelector('#chrome').classList.toggle('hidden');
});