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
	const data = JSON.parse(localStorage.getItem('data') || '[]');
	let i = 1;
	let res;

	if (data.length !== 0) {
		i = localStorage.getItem('lastDataFile');
	}

	for (i; i > 0; i++) {
		try {
			res = await fetch(`/data/data-${i}.json`);
		} catch (err) {
			//eslint-disable-next-line no-console
			console.error(err);
			console.log(res.clone());
		}

		if (!res || res.type === 'error' || !res.ok) {
			localStorage.setItem('lastDataFile', i - 1);
			break;
		}

		data.push(...await res.json());
	}

	//TODO: find duplicates before sorting
	// const sorter = new Intl.Collator('en-US', {sensitivity: 'accent', numeric: true, caseFirst: 'upper'});
	// //eslint-disable-next-line no-unused-vars
	// data = data.sort(([id1, obj1], [id2, obj2]) => sorter.compare(obj1.name, obj2.name));
	localStorage.setItem('data', JSON.stringify(data));

	itens.$data.items = new Map(data);
	itens.$mount('#itens');
})();