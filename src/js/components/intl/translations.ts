/* eslint-disable max-classes-per-file */
const availableLanguages = {
	en: 'en-US',
	fr: 'fr-FR',
	es: 'es-ES',
	pt: 'pt-BR'
};

let loadedTranslations: Map<string, string>;

function translateHtmlText(text: string) {
	// eslint-disable-next-line prefer-named-capture-group, @typescript-eslint/no-use-before-define
	return text.replaceAll(/\bt\(['"`](.+?)['"`]\)/gu, (_, original: string) => I18n.t([original]));
}


// FIXME: remove comment after this is available/merged: https://github.com/microsoft/TypeScript/pull/39664
declare class Locale {
	constructor(tag: string);
	language: string;
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class I18n {
	static getLanguage() {
		return localStorage.getItem('appLanguage') ?? navigator.language;
	}

	static async setLanguage(language: string) {
		// @ts-expect-error
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		const locale = new Intl.Locale(language) as Locale;
		const [, translationLanguage] = Object.entries(availableLanguages).find(([lang]) => locale.language.startsWith(lang)) ?? [null, 'en-US'];

		(document.querySelector('html') as HTMLHtmlElement).lang = translationLanguage;
		localStorage.setItem('appLanguage', translationLanguage);
		localStorage.setItem('translationLanguage', translationLanguage);

		try {
			const request = await fetch(`${import.meta.env.PUBLIC_URL}_locales/${translationLanguage}/messages.json`);
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
