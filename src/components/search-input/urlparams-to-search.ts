document.addEventListener('DOMContentLoaded', () => {
	const filterObject = searchURLtoFilter();

	updateTags(filterObject);
	updateSearchFilter(filterObject);

	if (new URLSearchParams(window.location.search).has('info')) {
		toggleInfoModal(true);
	}

	chrome.classList.toggle('hidden');
});

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
