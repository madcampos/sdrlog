import type { ModalDialog } from '../dialog/dialog';
import type { RadioGroup } from '../radio/radio-group';
import { I18n } from '../intl/translations';

const themeBox = document.querySelector('#theme-modal') as ModalDialog;
const themeSelector = document.querySelector('#theme-modal radio-group') as RadioGroup;

I18n.translateElementsContent(themeBox);

themeBox.addEventListener('open', () => {
	const theme = localStorage.getItem('appTheme') ?? 'system';

	themeSelector.value = theme;
});

themeBox.addEventListener('close', () => {
	window.history.pushState(null, import.meta.env.APP_NAME, import.meta.env.PUBLIC_URL);
	window.document.title = import.meta.env.APP_NAME;
}, { capture: false });

themeSelector.addEventListener('change', () => {
	localStorage.setItem('appTheme', themeSelector.value);

	document.body.className = document.body.className.split(' ').filter((className) => !className.startsWith('theme-')).join(' ');
	document.body.classList.add(`theme-${themeSelector.value}`);
});

window.addEventListener('keyup', (evt) => {
	if (evt.ctrlKey && evt.key === 't') {
		evt.preventDefault();

		themeBox.toggle();

		if (themeBox.isDialogOpen) {
			window.history.pushState(null, `${I18n.t`Theme Settings`} ● ${import.meta.env.APP_NAME}`, `${import.meta.env.PUBLIC_URL}#theme`);
			window.document.title = `${I18n.t`Theme Settings`} ● ${import.meta.env.APP_NAME}`;
		} else {
			window.history.pushState(null, import.meta.env.APP_NAME, `${import.meta.env.PUBLIC_URL}`);
			window.document.title = import.meta.env.APP_NAME;
		}
	}
}, { capture: false });

export function openThemeModal() {
	window.history.pushState(null, `${I18n.t`Theme Settings`} ● ${import.meta.env.APP_NAME}`, `${import.meta.env.PUBLIC_URL}#theme`);
	window.document.title = `${I18n.t`Theme Settings`} ● ${import.meta.env.APP_NAME}`;

	themeBox.show();
}

export function updateThemeBoxFromURL() {
	const url = new URL(window.location.toString());

	if (url.hash === '#theme') {
		themeBox.show();
		window.history.replaceState(null, `${I18n.t`Theme Settings`} ● ${import.meta.env.APP_NAME}`);
		window.document.title = `${I18n.t`Theme Settings`} ● ${import.meta.env.APP_NAME}`;
	}
}
