
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

	// TODO: normalize string
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
