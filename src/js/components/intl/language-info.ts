import type { ModalDialog } from '../dialog/dialog';
import type { EditSelect } from '../edit-box/edit-select';
import { I18n } from '../intl/translations';

const languageBox = document.querySelector('#language-modal') as ModalDialog;
const languageSelect = document.querySelector('#language-select') as EditSelect;

I18n.translateElementsContent(languageBox);

languageSelect.addEventListener('change', async () => {
	if (languageSelect.value !== I18n.getLanguage()) {
		languageSelect.edit = false;

		await I18n.setLanguage(languageSelect.value);

		location.reload();
	}
});

languageBox.addEventListener('open', () => {
	languageSelect.value = I18n.getLanguage();
});

languageBox.addEventListener('close', () => {
	window.history.pushState(null, import.meta.env.APP_NAME, import.meta.env.PUBLIC_URL);
	window.document.title = import.meta.env.APP_NAME;
}, { capture: false });

window.addEventListener('keydown', (evt) => {
	if (evt.ctrlKey && evt.key === 'l') {
		evt.preventDefault();
		evt.stopPropagation();
	}
});

window.addEventListener('keyup', (evt) => {
	if (evt.ctrlKey && evt.key === 'l') {
		evt.preventDefault();

		languageBox.toggle();

		if (languageBox.hasAttribute('open')) {
			window.history.pushState(null, `${I18n.t`Language Settings`} ● ${import.meta.env.APP_NAME}`, `${import.meta.env.PUBLIC_URL}#language`);
			window.document.title = `${I18n.t`Language Settings`} ● ${import.meta.env.APP_NAME}`;
		} else {
			window.history.pushState(null, import.meta.env.APP_NAME, `${import.meta.env.PUBLIC_URL}`);
			window.document.title = import.meta.env.APP_NAME;
		}
	}
}, { capture: false });

export function openLanguageModal() {
	window.history.pushState(null, `${I18n.t`Language Settings`} ● ${import.meta.env.APP_NAME}`, `${import.meta.env.PUBLIC_URL}#language`);
	window.document.title = `${I18n.t`Language Settings`} ● ${import.meta.env.APP_NAME}`;

	languageBox.show();
}

export function updateLanguageBoxFromURL() {
	const url = new URL(window.location.toString());

	if (url.hash === '#language') {
		languageBox.show();
		window.history.replaceState(null, `${I18n.t`Language Settings`} ● ${import.meta.env.APP_NAME}`);
		window.document.title = `${I18n.t`Language Settings`} ● ${import.meta.env.APP_NAME}`;
	}
}
