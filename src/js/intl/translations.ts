import enUSTranslation from '../../locales/en-US.json?url';
import ptBRTranslation from '../../locales/pt-BR.json?url';
import frFRTranslation from '../../locales/fr-FR.json?url';

let loadedTranslations = new Map<string, string>();

export class I18n {
	static get defaultLocale() {
		return new Intl.Locale('en-US');
	}

	static get availableLocales() {
		return [
			new Intl.Locale('en-US'),
			new Intl.Locale('pt-BR'),
			new Intl.Locale('fr-FR')
		];
	}

	static get availableTranslations() {
		return {
			'en-US': enUSTranslation,
			'pt-BR': ptBRTranslation,
			'fr-FR': frFRTranslation
		};
	}

	static getMatchingLocale(locale: Intl.Locale) {
		const matchingLocale = I18n.availableLocales.find((availableLocale) => availableLocale.language === locale.language);

		return matchingLocale ?? I18n.defaultLocale;
	}

	static #translateHtmlText(text: string) {
		return text.replaceAll(/\bt\(['"`](.+?)['"`]\)/gu, (_, original: string) => I18n.t([original]));
	}

	static getLanguage() {
		return localStorage.getItem('app-language') ?? navigator.language;
	}

	static async setLanguage(language: string) {
		const locale = new Intl.Locale(language);
		const translationLocale = I18n.getMatchingLocale(locale);
		const translationLanguage = `${translationLocale.language}-${translationLocale.region}`;

		(document.querySelector('html') as HTMLHtmlElement).lang = translationLanguage;
		localStorage.setItem('app-language', translationLanguage);

		try {
			const request = await fetch(I18n.availableTranslations[translationLanguage]);
			const translationJson = await request.json() as Record<string, string>;

			loadedTranslations = new Map(Object.entries(translationJson));
		} catch {
			loadedTranslations = new Map();
		}
	}

	static t(strings: TemplateStringsArray | string[]) {
		const [messageKey] = strings;
		// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
		const message = loadedTranslations.get(messageKey) || messageKey;

		return message;
	}

	static translateElementsContent(template: Node) {
		const translateChildren = (baseNode: Node) => {
			baseNode.childNodes.forEach((node) => {
				if (node.nodeType === Node.TEXT_NODE) {
					node.textContent = I18n.#translateHtmlText(node.textContent ?? '');
				}

				if (node.nodeType === Node.ELEMENT_NODE) {
					translateChildren(node);

					[...(node as Element).attributes].forEach((attribute) => {
						attribute.value = I18n.#translateHtmlText(attribute.value);
					});
				}
			});
		};

		translateChildren(template);

		return template;
	}
}
