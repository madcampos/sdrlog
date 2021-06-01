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

const template = `

<div id="search-and-info">
	<label id="search" title="Search">🔍<input type="search" role="search"/></label>
	<button id="info-button" title="Information">ℹ</button>
</div>`;
