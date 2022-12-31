const availableLocales = [
	new Intl.Locale('en-US'),
	new Intl.Locale('pt-BR'),
	new Intl.Locale('es-ES'),
	new Intl.Locale('fr-FR')
];

let loadedTranslations = new Map<string, string>();

function translateHtmlText(text: string) {
	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	return text.replaceAll(/\bt\(['"`](.+?)['"`]\)/gu, (_, original: string) => I18n.t([original]));
}

export class I18n {
	static getLanguage() {
		return localStorage.getItem('appLanguage') ?? navigator.language;
	}

	static async setLanguage(language: string) {
		const locale = new Intl.Locale(language);
		const translationLocale = availableLocales.find((availableLocale) => availableLocale.language === locale.language) ?? availableLocales[0];
		const translationLanguage = `${translationLocale.language}-${translationLocale.region}`;

		(document.querySelector('html') as HTMLHtmlElement).lang = translationLanguage;
		localStorage.setItem('appLanguage', translationLanguage);
		localStorage.setItem('translationLanguage', translationLanguage);

		try {
			const request = await fetch(`${import.meta.env.APP_PUBLIC_URL}locales/${translationLanguage}/messages.json`);
			const translationJson = await request.json() as Record<string, string>;

			loadedTranslations = new Map(Object.entries(translationJson));
		} catch {
			loadedTranslations = new Map();
		}
	}

	// eslint-disable-next-line id-length
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
					node.textContent = translateHtmlText(node.textContent ?? '');
				}

				if (node.nodeType === Node.ELEMENT_NODE) {
					translateChildren(node);

					[...(node as Element).attributes].forEach((attribute) => {
						attribute.value = translateHtmlText(attribute.value);
					});
				}
			});
		};

		translateChildren(template);

		return template;
	}
}
