import type { ModalDialog } from '../dialog/dialog';
import { I18n } from '../../js/intl/translations';
import { registerShortcut } from '../../js/util/keyboard';

const infobox = document.querySelector('#info-modal') as ModalDialog;

I18n.translateElementsContent(infobox);

infobox.addEventListener('close', () => {
	window.history.pushState(null, import.meta.env.APP_NAME, import.meta.env.APP_PUBLIC_URL);
	window.document.title = import.meta.env.APP_NAME;
}, { capture: false });

registerShortcut('i', () => {
	infobox.toggle();

	if (infobox.hasAttribute('open')) {
		window.history.pushState(null, `${I18n.t`Information`} · ${import.meta.env.APP_NAME}`, `${import.meta.env.APP_PUBLIC_URL}#information`);
		window.document.title = `${I18n.t`Information`} · ${import.meta.env.APP_NAME}`;
	} else {
		window.history.pushState(null, import.meta.env.APP_NAME, `${import.meta.env.APP_PUBLIC_URL}`);
		window.document.title = import.meta.env.APP_NAME;
	}
});

export function openInfoModal() {
	window.history.pushState(null, `${I18n.t`Information`} · ${import.meta.env.APP_NAME}`, `${import.meta.env.APP_PUBLIC_URL}#information`);
	window.document.title = `${I18n.t`Information`} · ${import.meta.env.APP_NAME}`;

	infobox.show();
}

export function updateInfoBoxFromURL() {
	const url = new URL(window.location.toString());

	if (url.hash === '#information') {
		infobox.show();
		window.history.replaceState(null, `${I18n.t`Information`} · ${import.meta.env.APP_NAME}`);
		window.document.title = `${I18n.t`Information`} · ${import.meta.env.APP_NAME}`;
	}
}
