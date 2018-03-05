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
		} else {
			info.showModal();
		}
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
			} else {
				info.showModal();
			}
		},
		navigateToMenu(category){
			this.isMenuOpen = !this.isMenuOpen;
			return window.requestAnimationFrame(() => {
				history.replaceState(null, '', `?category=${category}`);
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
					history.replaceState(null, '', '?all');
					filterCSS.innerHTML = '';
				});
			}

			const searchTerms = this.searchText.toLowerCase();
			const search = /(name|cat(?:egory)?|sku|ed(?:ition)?|rel(?:ease)?|date|pub(?:lisher)?|type|id|scope)[:=]\s*(.*?)(?=(?:,?\s*(?:name|cat(?:egory)?|sku|ed(?:ition)?|rel(?:ease)?|date|pub(?:lisher)?|type|id|scope)[:=])|$)/gu;
			let match = search.exec(searchTerms);

			if (match) {
				const searchParams = new URLSearchParams();
				let styleString = '';

				do {
					if (match[1] === 'scope') {
						if (match[2] === 'missing') {
							searchParams.append('scope', 'missing');
							styleString += `${ITEM_SELECTOR}:not([data-missing]){display:none}`;
						} else if (match[2] === 'out') {
							searchParams.append('scope', 'out');
							styleString += `${ITEM_SELECTOR}:not([data-missing="outOfScope"]){display:none}`;
						}
					} else {
						searchParams.append(match[1], match[2]);
						styleString += `${ITEM_SELECTOR}:not([data-${match[1]}*="${match[2]}"]){display:none}`;
					}

					match = search.exec(searchTerms);
				} while (match);

				return window.requestAnimationFrame(() => {
					history.replaceState(null, '', `?${searchParams.toString()}`);
					filterCSS.innerHTML = styleString;
				});
			}

			return window.requestAnimationFrame(() => {
				history.replaceState(null, '', `?name=${searchTerms}`);
				filterCSS.innerHTML = `${ITEM_SELECTOR}:not([data-name*="${searchTerms}"]){display:none}`;
			});
		}
	},
	mounted(){
		const search = new URLSearchParams(window.location.search);

		if (search.has('info')) {
			document.querySelector('#info').showModal();
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