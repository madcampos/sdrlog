/* eslint-disable no-fallthrough */
/**
 * @file Basic app chrome.
 * @author madcampos <madcampos@outlook.com>
 * @version 1.0.0
 */

const chrome = document.querySelector('#chrome');

const searchBox = document.querySelector('#search input');

const infoBox = document.querySelector('#info-box');
const infoBoxButton = document.querySelector('#info-button');
const infoBoxBack = document.querySelector('#info-box .back-button');

const menu = document.querySelector('#menu ul');
const menuCategories = document.querySelectorAll('#menu .category');
const allCategories = document.querySelector('#menu li:last-child a');

const filterCSS = document.querySelector('#filterCSS');
const SEARCH_ITEM_SELECTOR = '.item';

const namedFilters = 'name|cat(?:egory)?|sku|id|pub(?:lisher)?|rel(?:ease)?|ed(?:ition)?|date|type|scope';
const searchRegexString = `(?<filter>${namedFilters})[:=]\\s*(?<term>.*?)(?=(?:,?\\s*(?:${namedFilters})[:=])|$)`;

/**
 * The Filter Object and it's properties.
 *
 * @typedef FilterObject
 * @property {string} [category] The category.
 * @property {string} [type] The type.
 * @property {string} [sku] The SKU.
 * @property {string} [name] The name.
 * @property {string} [edition] The edition.
 * @property {string} [publisher] The publisher.
 * @property {string} [date] The in game date.
 * @property {string} [release] The release date.
 * @property {("out"|"missing")} [scope] If it's missing or outo of scope.
 */

/**
 * Updates the search CSS with the given Filter Object.
 *
 * @param {FilterObject} filterObject The Filter Object.
 * @returns {number} The RAF ID.
 * @example
 */
function updateSearchFilter(filterObject) {
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
 *
 * @param {FilterObject} filterObject The filterObject.
 * @returns {number} The RAF ID.
 * @example
 */
function updateHistory(filterObject) {
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
			history.replaceState(filterObject, document.title, `?${new URLSearchParams(filterObject).toString()}`);
		} else {
			history.pushState(filterObject, document.title, `?${new URLSearchParams(filterObject).toString()}`);
		}
	});
}

/**
 * Updates the Input text with tags given the Filter Object.
 *
 * @param {FilterObject} filterObject The Filter Object.
 * @returns {number} The RAF ID.
 * @example
 */
function updateTags(filterObject) {
	let tagString = '';

	if (Object.keys(filterObject).length === 0) {
		return window.requestAnimationFrame(() => {
			searchBox.value = '';
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
		searchBox.value = tagString;
	});
}

/**
 * Transform a URL search part into a Filter Object.
 *
 * @param {string} [urlSearch] The URL search string to be parsed into tags.
 * @returns {FilterObject} The Filter Object.
 * @example
 */
function searchURLtoFilter(urlSearch = window.location.search) {
	// TODO: normalize string
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
 *
 * @param {string} [text] The text to search in.
 * @returns {FilterObject} The Filter Object.
 * @example
 */
function searchTagsToFilter(text = searchBox.value) {
	const filterObject = {};
	const search = new RegExp(searchRegexString, 'giu');

	//TODO: normalize string
	const normalizedString = text.toLowerCase();

	let match = search.exec(normalizedString);

	if (match) {
		do {
			switch (match.groups?.filter) {
				case 'scope':
					if (match.groups?.term === 'missing') {
						filterObject.scope = 'missing';
					} else if (match.groups?.term === 'out') {
						filterObject.scope = 'out';
					}
					break;

				case 'id':
					filterObject.sku = match.groups?.term;
					break;

				case 'edition':
				case 'ed':
					filterObject.edition = match.groups?.term;
					break;

				case 'release':
				case 'rel':
					filterObject.release = match.groups?.term;
					break;

				case 'publisher':
				case 'pub':
					filterObject.publisher = match.groups?.term;
					break;

				case 'category':
				case 'cat':
					filterObject.category = match.groups?.term;
					break;

				default:
					filterObject[match.groups?.filter] = match.groups?.term;
			}

			match = search.exec(normalizedString);
		} while (match);
	}

	return filterObject;
}

/**
 * Toggle the Information box modal.
 *
 * @param {boolean} forceOpen Force the modal to be open.
 * @example
 */
function toggleInfoModal(forceOpen = false) {
	if (!infoBox.open || forceOpen) {
		infoBox.showModal();
		history.pushState(null, 'Shadowrun Catalog', '?info');
	} else {
		infoBox.close();
		history.back();
	}
}

// Toggle infobox

infoBoxButton.addEventListener('click', toggleInfoModal);
infoBoxBack.addEventListener('click', toggleInfoModal);
window.addEventListener('keydown', (evt) => {
	if (evt.ctrlKey && evt.key === 'i') {
		evt.preventDefault();
		toggleInfoModal();
	}
});

// Toggle Search box
searchBox.addEventListener('focus', (evt) => evt.target.select());
window.addEventListener('keydown', (evt) => {
	if (evt.ctrlKey && evt.key === 'f') {
		evt.preventDefault();

		if (document.activeElement === searchBox) {
			searchBox.blur();
		} else {
			searchBox.focus();
		}
	}
});

searchBox.addEventListener('input', () => {
	const filterObject = searchTagsToFilter();

	updateHistory(filterObject);
	updateSearchFilter(filterObject);
});

// Categories
menuCategories.forEach((category) => category.addEventListener('click', (evt) => {
	evt.preventDefault();

	const filterObject = { category: new URLSearchParams(evt.target.href).get('category') };

	updateTags(filterObject);
	updateHistory(filterObject);
	updateSearchFilter(filterObject);

	menu.classList.toggle('hidden');
}));

allCategories.addEventListener('click', (evt) => {
	evt.preventDefault();

	const filterObject = {};

	updateTags(filterObject);
	updateHistory(filterObject);
	updateSearchFilter(filterObject);

	menu.classList.toggle('hidden');
});

document.addEventListener('DOMContentLoaded', () => {
	const filterObject = searchURLtoFilter();

	updateTags(filterObject);
	updateSearchFilter(filterObject);

	if (new URLSearchParams(window.location.search).has('info')) {
		toggleInfoModal(true);
	}

	chrome.classList.toggle('hidden');
});
