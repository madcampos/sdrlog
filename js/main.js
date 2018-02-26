//TODO: add service worker
import {Router} from './router.js';
//import './search.js';
//import './chrome.js';
//import './gamepad.js';
import items from './data.js';

Router.init();

new Vue({
	el: '#app',
	data: {
		items: items,
		selectedItem: null,
		dateFormater: new Intl.DateTimeFormat('en-US', {timeZone: 'UTC', month: 'short', year: 'numeric'})
	},
	methods: {
		toogleItemDetails(sku){
			this.selectedItem = item.get(sku);
		}
	}
});