const sorters: Partial<Record<string, Intl.Collator>> = {};

export function createComparer(options: Intl.CollatorOptions = {}, language: string = navigator.language) {
	const sorterKey = JSON.stringify({ language, ...options });

	sorters[sorterKey] ||= new Intl.Collator(language, options);

	return (x: string, y: string) => (sorters[sorterKey] as Intl.Collator).compare(x, y);
}

const langNames: Partial<Record<string, Intl.DisplayNames>> = {};

export function translateLanguageName(nameToTranslate: string, language: string = navigator.language) {
	langNames[language] ||= new Intl.DisplayNames([language], { type: 'language' });

	return langNames[language].of(nameToTranslate);
}

const dateFormaters: Partial<Record<string, Intl.DateTimeFormat>> = {};

export function formatFullDate(
	dateToFormat: Date | number,
	language: string = navigator.language,
	options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', timeZone: 'UTC', year: 'numeric' }
) {
	dateFormaters[language] ||= new Intl.DateTimeFormat(language, options);

	return dateFormaters[language].format(dateToFormat);
}

export function formatMonth(dateToFormat: Date | number | string) {
	const date = new Date(dateToFormat);
	const year = date.getUTCFullYear();
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');

	return `${year}-${month}`;
}
