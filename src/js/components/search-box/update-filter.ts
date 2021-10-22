type FilterOptions = Partial<Record<'name' | 'category' | 'type' | 'status' | 'sku' | 'edition', string>>;

let filterElement: HTMLStyleElement | undefined;

const rulesMap = new Map([
	['name', (value: string) => `item-card:not([title*="${value}" i]){ display:none; }`],
	['category', (value: string) => `item-card:not([data-category="${value}" i]){ display:none; }`],
	['type', (value: string) => `item-card:not([data-type="${value}" i]){ display:none; }`],
	['status', (value: string) => `item-card:not([data-status="${value}" i]){ display:none; }`],
	['sku', (value: string) => `item-card:not([data-sku*="${value}" i]){ display:none; }`],
	['edition', (value: string) => `item-card:not([data-edition="${value}" i]){ display:none; }`]
]);

const validations = new Map([
	['name', (value: string) => value !== ''],
	['category', (value: string) => ['rulebook', 'sourcebook', 'mission', 'magazine', 'novel', 'videogame', 'tcg', 'boardgame', 'misc'].includes(value)],
	['type', (value: string) => ['digital', 'print', 'scan', 'ocr', 'physical'].includes(value)],
	['status', (value: string) => ['outofscope', 'missing', 'canceled'].includes(value)],
	['sku', (value: string) => (/^[A-Z0-9](?:-?[A-Z0-9])+$/giu).test(value)],
	['edition', (value: string) => (/^[0-6]$/gu).test(value)]
]);

function updateUrlSearch(searchOptions: FilterOptions) {
	const search = new URLSearchParams(Object.entries(searchOptions));
	let searchString = `?${search.toString()}`;

	if (searchString === '?') {
		searchString = '';
	}

	const url = `${import.meta.env.PUBLIC_URL}${searchString}${window.location.hash}`;
	const data = {
		type: 'search',
		value: searchOptions
	};

	window.history.pushState(data, document.title, url);
}

function updateCSSSearchFilter(filterOption: FilterOptions) {
	let cssString = '';

	if (!filterElement) {
		filterElement = document.createElement('style');
		document.head.appendChild(filterElement);
	}

	Object.entries(filterOption).forEach(([name, value]: [string, string]) => {
		cssString += rulesMap.get(name)?.(value) ?? '';
	});

	window.requestAnimationFrame(() => {
		(filterElement as HTMLElement).innerText = cssString;
	});
}

export function getTagStringFromFilters(filter: FilterOptions) {
	const tagStringParts: string[] = [];
	const filterEntries = Object.entries(filter);

	if (filterEntries.length === 1 && filterEntries[0][0] === 'name') {
		return filterEntries[0][1];
	}

	filterEntries.forEach(([name, value]) => {
		tagStringParts.push(`${name}: ${value}`);
	});

	return tagStringParts.join(' ');
}

export function getFiltersFromTagsString(tagString: string, allowEmptyTags = false) {
	const tagsRegex = /(sku|type|category|edition|status|name):\s?/igu;
	const [untaggedString, ...values] = tagString.split(tagsRegex);

	if (untaggedString === tagString) {
		return { name: tagString };
	}

	const filters: FilterOptions = {};

	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	for (let i = 0; i < values.length; i += 2) {
		const tag = values[i];
		const value = values[i + 1].trim();
		const isValid = (allowEmptyTags && value === '') || (validations.get(tag)?.(value) ?? false);

		if (isValid) {
			filters[tag] = value;
		}
	}

	return filters;
}

export function getFiltersFromURL() {
	const url = new URL(window.location.toString());
	const params = new URLSearchParams(url.search);
	const allowedFilters = [...rulesMap.keys()];
	const filters: FilterOptions = {};

	params.forEach((value, name) => {
		const hasTag = allowedFilters.includes(name);
		const isValid = validations.get(name)?.(value) ?? false;

		if (hasTag && isValid) {
			filters[name] = value;
		}
	});

	return filters;
}

export function updateFiltersFromURL() {
	const filters = getFiltersFromURL();

	updateCSSSearchFilter(filters);
}

export function updateSearchFilter(searchOptions: FilterOptions) {
	if (searchOptions.category === 'all') {
		updateCSSSearchFilter({});
		updateUrlSearch({});
	} else {
		updateCSSSearchFilter(searchOptions);
		updateUrlSearch(searchOptions);
	}
}
