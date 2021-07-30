const availableLanguages = ['en'];

let loadedTranslations: Map<string, string[]>;

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

		loadedTranslations = await import(`../../../_locales/${translationLanguage}/messages`) as Map<string, string[]>;
	}

	// eslint-disable-next-line id-length
	static t(strings: string[], ...keys: string[]) {
		// eslint-disable-next-line no-template-curly-in-string
		const messageKey = strings.join('${param}');
		const message = loadedTranslations.get(messageKey) ?? [];

		return message.reduce((res: string, part: string, i: number) => `${res}${part}${keys[i] ?? ''}`, '');
	}

	static translateTemplate(template: DocumentFragment) {
		// TODO
	}
}
