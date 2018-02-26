dialogPolyfill.registerDialog(document.querySelector('#item-details'));

//eslint-disable-next-line no-unused-vars
const itens = new Vue({
	data: {
		items: null,
		selectedItem: null,
		dateFormater: new Intl.DateTimeFormat('en-US', {timeZone: 'UTC', month: 'short', year: 'numeric'})
	},
	methods: {
		toggleItemDetails(sku){
			const itemDetails = document.querySelector('#item-details');

			if (!itemDetails.showModal) {
				dialogPolyfill.forceRegisterDialog(itemDetails);
			}

			if (itemDetails.open) {
				itemDetails.close();
			} else {
				this.selectedItem = this.items.get(sku);
				itemDetails.showModal();
			}
		}
	},
	async mounted(){
		document.querySelector('#load-overlay').classList.toggle('hidden');
		document.querySelector('main').classList.toggle('hidden');
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