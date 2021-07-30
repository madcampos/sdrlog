import type { ModalDialog } from '../dialog/dialog';

const infobox = document.querySelector('#info-modal') as ModalDialog;

infobox.addEventListener('close', () => {
	window.history.pushState(null, import.meta.env.APP_NAME, import.meta.env.PUBLIC_URL);
	window.document.title = import.meta.env.APP_NAME;
}, { capture: false });

window.addEventListener('keyup', (evt) => {
	if (evt.ctrlKey && evt.key === 'i') {
		evt.preventDefault();

		infobox.toggle();

		if (infobox.isDialogOpen) {
			window.history.pushState(null, `Information ● ${import.meta.env.APP_NAME}`, `${import.meta.env.PUBLIC_URL}#information`);
			window.document.title = `Information ● ${import.meta.env.APP_NAME}`;
		} else {
			window.history.pushState(null, import.meta.env.APP_NAME, `${import.meta.env.PUBLIC_URL}`);
			window.document.title = import.meta.env.APP_NAME;
		}
	}
}, { capture: false });

export function openInfoModal() {
	window.history.pushState(null, `Information ● ${import.meta.env.APP_NAME}`, `${import.meta.env.PUBLIC_URL}#information`);
	window.document.title = `Information ● ${import.meta.env.APP_NAME}`;

	infobox.show();
}

export function updateInfoBoxFromURL() {
	const url = new URL(window.location.toString());

	if (url.hash === '#information') {
		infobox.show();
		window.history.replaceState(null, `Information ● ${import.meta.env.APP_NAME}`);
		window.document.title = `Information ● ${import.meta.env.APP_NAME}`;
	}
}
