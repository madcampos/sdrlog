const sorters: Partial<Record<string, Intl.Collator>> = {};

export function createComparer(options: Intl.CollatorOptions = {}, language: string = navigator.language) {
	const sorterKey = JSON.stringify({ language, ...options });

	if (!sorters[sorterKey]) {
		sorters[sorterKey] = new Intl.Collator(language, options);
	}

	return (x: string, y: string) => (sorters[sorterKey] as Intl.Collator).compare(x, y);
}


// FIXME: remove comment after this is available/merged: https://github.com/microsoft/TypeScript/pull/44022
interface DisplayNames {
	of(lang: string): string
}

const langNames: Partial<Record<string, DisplayNames>> = {};

export function translateLanguageName(nameToTranslate: string, language: string = navigator.language) {
	if (!langNames[language]) {
		// @ts-expect-error
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		langNames[language] = new Intl.DisplayNames([language], { type: 'language' }) as DisplayNames;
	}

	return (langNames[language] as DisplayNames).of(nameToTranslate);
}

const dateFormaters: Partial<Record<string, Intl.DateTimeFormat>> = {};

export function formatDate(dateToFormat: Date | number, language: string = navigator.language, options: Intl.DateTimeFormatOptions = { month: 'short', timeZone: 'UTC', year: 'numeric' }) {
	if (!dateFormaters[language]) {
		dateFormaters[language] = new Intl.DateTimeFormat(language, options);
	}

	return (dateFormaters[language] as Intl.DateTimeFormat).format(dateToFormat);
}
