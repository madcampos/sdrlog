import type { ModalDialog } from '../dialog/dialog';

export function updateInfoBoxFromURL() {
	const infobox = document.querySelector('menu-bar modal-dialog') as ModalDialog;
	const url = new URL(window.location.toString());
	const params = new URLSearchParams(url.search);

	if (params.has('info')) {
		infobox.show();
		window.history.pushState(null, window.document.title, '/?info');
	}
}
