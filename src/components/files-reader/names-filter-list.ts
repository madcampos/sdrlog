export const filterList: string[] = [
	// Adventures
	'(Player Aid)',
	'Calendar',
	'Transfer Log',
	'FAQ',
	'Season 5 Contacts',

	// Misc
	'D.M.Z.',
	'TCG01',
	'27700',

	// Rulebook
	'26100',
	'27100X',
	'Errata',
	'28010',

	// Sourcebooks
	'27110',
	'45068'
];

export function isNameExcluded(name: string) {
	return filterList.some((filter) => name.includes(filter));
}
