import {default as Vue} from 'https://unpkg.com/vue/dist/vue.esm.browser.js';

dialogPolyfill.registerDialog(document.querySelector('#item-details'));
window.addEventListener('popstate', () => {
	const details = document.querySelector('#item-details');

	if (!details.showModal) {
		dialogPolyfill.forceRegisterDialog(details);
	}

	if (!window.location.hash) {
		details.close();
	}
});

//eslint-disable-next-line no-unused-vars
const itens = new Vue({
	data: {
		items: null,
		selectedItem: null,
		dateFormater: new Intl.DateTimeFormat('en-US', {timeZone: 'UTC', month: 'short', year: 'numeric'}),
		fullImgPath: '/img/full/',
		thumbsPath: '/img/thumbs/',
		categoryMap: new Map([
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
		]),
		typeMap: new Map([
			['digital', '💽'],
			['scan', '📠'],
			['print', '🖨️'],
			['physical', '🎲']
		])
	},
	methods: {
		toggleItemDetails(sku){
			const itemDetails = document.querySelector('#item-details');

			if (!itemDetails.showModal) {
				dialogPolyfill.forceRegisterDialog(itemDetails);
			}

			if (itemDetails.open) {
				itemDetails.close();
				history.back();
			} else {
				this.selectedItem = this.items.get(sku);
				itemDetails.showModal();
				history.pushState(history.state, `Shadowrun Catalog | ${sku}: "${this.selectedItem.name}"`, `#${sku}`);
			}
		}
	},
	async mounted(){
		document.querySelector('#load-overlay').classList.toggle('hidden');
		document.querySelector('main').classList.toggle('hidden');

		if (window.location.hash) {
			this.selectedItem = this.items.get(window.location.hash.replace('#', ''));

			if (this.selectedItem) {
				const itemDetails = document.querySelector('#item-details');

				if (!itemDetails.showModal) {
					dialogPolyfill.forceRegisterDialog(itemDetails);
				}

				itemDetails.showModal();
			}
		}
	}
});

(async () => {
	try {
		const items = [];
		const sorter = new Intl.Collator('en-US', {sensitivity: 'accent', numeric: true, caseFirst: 'upper'});
		for (let i = 1; i > 0; i++) {
			const res = await fetch(`/data/data-${i}.json`);

			if (!res.ok) {
				break;
			}

			items.push(...await res.json());
		}

		//eslint-disable-next-line no-unused-vars
		itens.$data.items = new Map(items.sort(([id1, obj1], [id2, obj2]) => sorter.compare(obj1.name, obj2.name)));
		itens.$mount('#itens');
	} catch (err) {
		//eslint-disable-next-line no-console
		console.error(err);
	}
})();