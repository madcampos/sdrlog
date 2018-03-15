import {default as Vue} from 'https://unpkg.com/vue/dist/vue.esm.browser.js';

//Info box
dialogPolyfill.registerDialog(document.querySelector('#info-box'));
window.addEventListener('keydown', (evt) => {
	if (evt.ctrlKey && evt.key === 'i') {
		evt.preventDefault();
		const info = document.querySelector('#info-box');

		if (!info.showModal) {
			dialogPolyfill.forceRegisterDialog(info);
		}

		if (info.open) {
			info.close();
			history.back();
		} else {
			info.showModal();
			history.pushState({info: true}, 'Shadowrun Catalog | Informations', '?info');
		}
	}
});

window.addEventListener('popstate', () => {
	const search = new URLSearchParams(window.location.search);
	const info = document.querySelector('#info-box');

	if (!info.showModal) {
		dialogPolyfill.forceRegisterDialog(info);
	}

	if (!search.has('info')) {
		info.close();
	}
});

//Search box
const ITEM_SELECTOR = '.item';
const filterCSS = document.querySelector('#filterCSS');
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

//eslint-disable-next-line no-unused-vars
const chrome = new Vue({
	el: '#chrome',
	data: {
		categories: [
			{type: 'sourcebook', name: 'Sourcebooks'},
			{type: 'rulebook', name: 'Rulebooks'},
			{type: 'mission', name: 'Adventures & Campaigns'},
			{type: 'novel', name: 'Novels'},
			{type: 'magazine', name: 'Magazines'},
			{type: 'boardgame', name: 'Tabletop'},
			{type: 'videogame', name: 'Video-games'},
			{type: 'misc', name: 'Misc.'}
		],
		searchText: '',
		isMenuOpen: false
	},
	methods: {
		toogleInfoModal(){
			const info = document.querySelector('#info-box');

			if (!info.showModal) {
				dialogPolyfill.forceRegisterDialog(info);
			}

			if (info.open) {
				info.close();
				history.back();
			} else {
				info.showModal();
				history.pushState({info: true}, 'Shadowrun Catalog | Informations', '?info');
			}
		},
		navigateToMenu(category){
			this.isMenuOpen = !this.isMenuOpen;
			return window.requestAnimationFrame(() => {
				history.pushState({category}, `Shadowrun Catalog | Category: ${category}`, `?category=${category}`);
				this.searchText = `category: ${category}`;
			});
		}
	},
	watch: {
		searchText(){
			//TODO: debounce search
			//https://css-tricks.com/debouncing-throttling-explained-examples/
			//TODO: add fuzzy search?
			//https://github.com/krisk/Fuse
			if (!this.searchText) {
				return window.requestAnimationFrame(() => {
					history.pushState({}, 'Shadowrun Catalog', '?all');
					filterCSS.innerHTML = '';
				});
			}

			const searchTerms = this.searchText.toLowerCase();
			const search = /(name|cat(?:egory)?|sku|id|pub(?:lisher)?|rel(?:ease)?|ed(?:ition)?|date|type|scope)[:=]\s*(.*?)(?=(?:,?\s*(?:name|cat(?:egory)?|sku|id|pub(?:lisher)?|rel(?:ease)?|ed(?:ition)?|date|type|scope)[:=])|$)/giu;
			let match = search.exec(searchTerms);

			if (match) {
				const searchParams = new URLSearchParams();
				let styleString = '';
				const newState = {};

				do {
					if (match[1] === 'scope') {
						if (match[2] === 'missing') {
							searchParams.append('scope', 'missing');
							newState.scope = 'missing';
							styleString += `${ITEM_SELECTOR}:not([data-missing]){display:none}`;
						} else if (match[2] === 'out') {
							searchParams.append('scope', 'out');
							newState.scope = 'out';
							styleString += `${ITEM_SELECTOR}:not([data-missing="outOfScope"]){display:none}`;
						}
					} else {
						searchParams.append(match[1], match[2]);
						newState[match[1]] = match[2];
						styleString += `${ITEM_SELECTOR}:not([data-${match[1]}*="${match[2]}"]){display:none}`;
					}

					match = search.exec(searchTerms);
				} while (match);

				//If state is null, it is probablly a new page.
				//Instead of pushing the state we force a equal comparison.
				const isNewState = Object.keys(history.state || newState).sort().join() !== Object.keys(newState).sort().join();

				return window.requestAnimationFrame(() => {
					/* eslint-disable no-unused-vars, id-length */
					if (isNewState) {
						history.pushState(newState, `Shadowrun Catalog | ${searchTerms.replace(search, (m, p1, p2) => `${p1.replace(/^\w/, (l) => l.toUpperCase())}: ${p2}`)}`, `?${searchParams.toString()}`);
					} else {
						history.replaceState(newState, `Shadowrun Catalog | ${searchTerms.replace(search, (m, p1, p2) => `${p1.replace(/^\w/, (l) => l.toUpperCase())}: ${p2}`)}`, `?${searchParams.toString()}`);
					}
					/* eslint-enable no-unused-vars, id-length */

					filterCSS.innerHTML = styleString;
				});
			}

			return window.requestAnimationFrame(() => {
				if (history.state.name) {
					history.replaceState({name: searchTerms}, `Shadowrun Catalog | Name: ${searchTerms}`, `?name=${searchTerms}`);
				} else {
					history.pushState({name: searchTerms}, `Shadowrun Catalog | Name: ${searchTerms}`, `?name=${searchTerms}`);
				}
				filterCSS.innerHTML = `${ITEM_SELECTOR}:not([data-name*="${searchTerms}"]){display:none}`;
			});
		}
	},
	mounted(){
		const search = new URLSearchParams(window.location.search);

		if (search.has('info') && !window.location.hash) {
			const info = document.querySelector('#info-box');

			if (!info.showModal) {
				dialogPolyfill.forceRegisterDialog(info);
			}

			info.showModal();
		}

		if (!search.has('all')) {
			let searchTags = '';
			for (const [key, value] of search.entries()) {
				searchTags += `${key}: ${value}`;
			}

			this.searchText = searchTags;
		}

		this.$el.classList.toggle('hidden');
	}
});