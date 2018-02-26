import {Router} from './router.js';

const searchTags = 'cat(?:egory)?|sku|ed(?:tion)?|rel(?:ease)?|date|pub(?:lisher)?|type|missing|id|scope';
const searchRegExp = new RegExp(`(${searchTags})[:=](.*?)(?=(?:(?:\\s${searchTags})[:=])|$)`, 'giu');

const searchField = doucment.querySelector('#search input');
const cssFilterElement = document.getElementById('searchFilterCSS');

Router.routes.set('all', () => cssFilterElement.innerText = '');
['cat', 'category', 'sku', 'id', 'ed', 'edition', 'rel', 'release', 'date', 'pub', 'publisher', 'type', 'missing', 'scope', 'name'].forEach((tag) => {
	Router.routes.set(tag, filterAndUpdateInput);
});

function tagsToQuery(tags){
	if (searchRegExp.test(tags)) {
		return tags.toLowerCase().replace(searchRegExp, ($$, $1, $2, offset) => `${offset ? '&' : '?'}${$1}=${encodeURIComponent($2)}`);
	}

	return `?name=${tags.toLowerCase()}`;
}

function filterAndUpdateInput(category, values){
	queryToTag(category, values);
	filterMaterial(values.join(), category);
}

function queryToTag(category, values){
	return `${category}: ${values.join()}`;
}

function filterMaterial(value, category = 'name', append = true){
	const searchStyle = document.getElementById('searchFilterCSS');

	let styleString = `.card:not([data-${category}*="${value}"]) { display: none; }`;

	if ((category === 'scope' && value === 'missing') || category === 'missing') {
		styleString = '.card:not([data-missing]){ display: none; }';
	}

	if (category === 'scope' && value === 'out') {
		styleString = '.card:not([data-out-scope]){ display: none; }';
	}

	if (!append) {
		return window.requestAnimationFrame(() => searchStyle.innerHTML = styleString);
	}

	return window.requestAnimationFrame(() => searchStyle.innerHTML += styleString);
}

window.addEventListener('keydown', (evt) => {
	if (evt.ctrlKey && evt.key === 'f') {
		evt.preventDefault();

		if (document.activeElement === searchField) {
			searchField.blur();
		} else {
			searchField.focus();
		}
	}
});

searchField.addEventListener('focus', (evt) => evt.target.select());
searchField.addEventListener('input', (evt) => {
	if (!searchField.value) {
		Router.current.set('all');
	} else {
		Router.current.set(tagsToQuery(searchField.value));
	}
});