const availableLanguages = ['en', 'fr', 'pt-BR'];

let loadedTranslations: Map<string, string>;

function translateHtmlText(text: string) {
	// eslint-disable-next-line prefer-named-capture-group, @typescript-eslint/no-use-before-define
	return text.replaceAll(/\bt\(['"`](.+?)['"`]\)/gu, (_, original: string) => I18n.t([original]));
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class I18n {
	static getLanguage() {
		return localStorage.getItem('appLanguage') ?? navigator.language;
	}

	static getTranslationLanguage() {
		return localStorage.getItem('translationLanguage') ?? 'en';
	}

	static async setLanguage(language: string) {
		const translationLanguage = availableLanguages.find((lang) => language.startsWith(lang)) ?? 'en';

		localStorage.setItem('appLanguage', language);
		localStorage.setItem('translationLanguage', translationLanguage);

		try {
			const request = await fetch(`../../../_locales/${translationLanguage}/messages.json`);
			const translationJson = await request.json() as Record<string, string>;

			loadedTranslations = new Map(Object.entries(translationJson));
		} catch {
			loadedTranslations = new Map();
		}
	}

	// eslint-disable-next-line id-length
	static t(strings: TemplateStringsArray | string[]) {
		// eslint-disable-next-line no-template-curly-in-string
		const [messageKey] = strings;
		const message = loadedTranslations.get(messageKey) ?? messageKey;

		return message;
	}

	static translateTemplateElements(template: DocumentFragment) {
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
	}
}
