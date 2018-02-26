import {Router} from './router';

//Info box
const info = document.querySelector('#info');
dialogPolyfill.registerDialog(info);

Router.routes.set('info', () => info.showModal());

document.querySelector('#close-info').addEventListener('click', () => {
	Router.current.remove('info');
	info.close();
});

document.querySelector('#info-button').addEventListener('click', () => {
	Router.current.append('info');
});

window.addEventListener('keydown', (evt) => {
	if (evt.ctrlKey && evt.key === 'i') {
		if (info.open) {
			Router.current.remove('info');
			info.close();
		} else {
			Router.current.append('info');
		}
	}
});

//Menu
Routers.routes.set('category', (category) => {
	console.warn('TODO: implement "category filter"');
	debugger;
});

function navigateToMenuItem(evt){
	evt.preventDefault();
	Router.current.set(evt.target.search);
	document.querySelector('#menu').classList.toggle('open');
}

document.querySelectorAll('#menu a').forEach((link) => link.addEventListener('click', navigateToMenuItem));