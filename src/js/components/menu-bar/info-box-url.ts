import type { ModalDialog } from '../dialog/dialog';

export function updateInfoBoxFromURL() {
	const infobox = document.querySelector('menu-bar modal-dialog') as ModalDialog;
	const url = new URL(window.location.toString());

	if (url.hash === '#information') {
		infobox.show();
		window.history.replaceState(null, `Information ● ${import.meta.env.APP_NAME}`);
		window.document.title = `Information ● ${import.meta.env.APP_NAME}`;
	}
}
