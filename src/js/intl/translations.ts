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

	static #untranslateMessage(message: string) {
		return [...message].map((char) => {
			const RANDOM_CONST = 2;
			const repeatTimes = Math.floor(Math.random() * RANDOM_CONST);

			return char.repeat(repeatTimes);
		}).map((char) => {
			const ZALGO_CHARS = ['\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310', '\u0352', '\u0357', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343', '\u0344', '\u034a', '\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350', '\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313', '\u0314', '\u033d', '\u0309', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369', '\u036a', '\u036b', '\u036c', '\u036d', '\u036e', '\u036f', '\u033e', '\u035b', '\u0346', '\u031a'];

			return char + ZALGO_CHARS[Math.floor(Math.random() * ZALGO_CHARS.length)];
		}).join('');
	}

	static #translateHtmlText(text: string) {
		return text.replaceAll(/\$t\{(.+?)\}/gu, (_, original: string) => I18n.t([original]));
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
			// @ts-expect-error
			const translation = I18n.availableTranslations[translationLanguage] as string;

			const request = await fetch(translation);
			const translationJson = await request.json() as Record<string, string>;

			loadedTranslations = new Map(Object.entries(translationJson));
		} catch {
			loadedTranslations = new Map();
		}
	}

	static t(strings: TemplateStringsArray | string[]) {
		const [messageKey] = strings;
		// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
		const message = loadedTranslations.get(messageKey) || I18n.#untranslateMessage(messageKey);

		return message;
	}

	static translateTemplate(template: DocumentFragment) {
		const translateChildren = (node: Node) => {
			if (node.nodeType === Node.TEXT_NODE) {
				node.textContent = I18n.#translateHtmlText(node.textContent ?? '');
			}

			if (node.nodeType === Node.ELEMENT_NODE) {
				const { attributes } = node as Element;

				for (const attribute of [...attributes]) {
					attribute.value = I18n.#translateHtmlText(attribute.value);
				}
			}

			if (node.hasChildNodes()) {
				node.childNodes.forEach((childNode) => {
					translateChildren(childNode);
				});
			}
		};

		const translatedTemplate = template.cloneNode(true);

		translateChildren(translatedTemplate);

		return translatedTemplate as DocumentFragment;
	}
}
