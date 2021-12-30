import { I18n } from '../intl/translations';
import type { ItemCard } from '../item-info/item-card';
import { getFiltersFromTagsString } from './update-filter';

function getSuggestionListForTag(tag: string, value: string) {
	const suggestionList: [string, string][] = [];

	switch (tag) {
		case 'sku':
			document.querySelectorAll<ItemCard>(`item-card[data-sku*="${value}" i]`).forEach((card) => {
				const skus = (card.getAttribute('data-sku') as string).split(' ');
				const correctSku = skus.find((sku) => sku.includes(value));

				suggestionList.push([
					`sku: ${correctSku}`,
					card.getAttribute('title') as string
				]);
			});
			break;

		case 'category':
			suggestionList.push(
				['category: rulebook', I18n.t`Rulebook`],
				['category: sourcebook', I18n.t`Sourcebook`],
				['category: mission', I18n.t`Mission`],
				['category: magazine', I18n.t`Magazine`],
				['category: novel', I18n.t`Novel`],
				['category: videogame', I18n.t`Videogame`],
				['category: tcg', I18n.t`T.C.G.`],
				['category: boardgame', I18n.t`Boardgame`],
				['category: misc', I18n.t`Misc.`]
			);
			break;

		case 'edition':
			suggestionList.push(
				['edition: 1', I18n.t`First Edition`],
				['edition: 2', I18n.t`Second Edition`],
				['edition: 3', I18n.t`Third Edition`],
				['edition: 4', I18n.t`Forth Edition`],
				['edition: 5', I18n.t`Fifth Edition`],
				['edition: 6', I18n.t`Sixth Edition`]
			);
			break;

		case 'type':
			suggestionList.push(
				['type: digital', I18n.t`Digital`],
				['type: print', I18n.t`Print`],
				['type: scan', I18n.t`Scan`],
				['type: ocr', I18n.t`OCR`],
				['type: physical', I18n.t`Physical`]
			);
			break;

		case 'status':
			suggestionList.push(
				['status: missing', I18n.t`Missing`],
				['status: outofscope', I18n.t`Out of scope`],
				['status: canceled', I18n.t`Canceled`],
				['status: ok', I18n.t`Okay`]
			);
			break;

		default:
			document.querySelectorAll<ItemCard>(`item-card[title*="${value}" i]`).forEach((card) => {
				suggestionList.push([`name: ${card.getAttribute('title') ?? ''}`, card.getAttribute('title') ?? '']);
			});
			break;
	}

	return suggestionList;
}

export function getSuggestions(tagString: string) {
	const MIN_STRING_LENGTH = 3;
	const filter = getFiltersFromTagsString(tagString, true);
	const optionsList: HTMLOptionElement[] = [];
	const [firstTag, ...otherTags] = Object.keys(filter);
	const [firstValue] = Object.values(filter);

	if (otherTags.length > 0) {
		const tags = [firstTag, ...otherTags];
		const query = Object.entries(filter).reduce((currentQuery, [tag, value]) => {
			let updatedQuery = currentQuery;

			if (tag === 'name') {
				updatedQuery += `[title*="${value}" i]`;
			} else if (tag === 'sku') {
				updatedQuery += `[data-${tag}*="${value}" i]`;
			}

			return updatedQuery;
		}, 'item-card');

		const elements = document.querySelectorAll<ItemCard>(query);

		elements.forEach((card) => {
			const option = document.createElement('option');
			const value = tags.map((tag) => {
				if (tag === 'name') {
					return `name: ${card.getAttribute('title') as string}`;
				} else if (tag === 'sku') {
					return `sku: ${(card.getAttribute('data-sku') as string).split(' ')[0]}`;
				}

				return `${tag}: ${card.getAttribute(`data-${tag}`) as string}`;
			}).join(' ');

			option.value = value;
			option.text = `${tagString} ▸ "${card.getAttribute('title') as string}"`;
			optionsList.push(option);
		});
	} else if (firstTag === 'name' || firstTag === 'sku') {
		if (firstValue.length >= MIN_STRING_LENGTH) {
			getSuggestionListForTag(firstTag, firstValue).forEach((suggestion) => {
				const option = document.createElement('option');
				const [value, text] = suggestion;

				option.value = value;
				option.text = `${tagString} ▸ "${text}"`;
				optionsList.push(option);
			});
		}
	} else {
		getSuggestionListForTag(firstTag, firstValue).forEach((suggestion) => {
			const option = document.createElement('option');
			const [value, text] = suggestion;

			option.value = value;
			option.text = `${tagString} ▸ "${text}"`;
			optionsList.push(option);
		});
	}

	return optionsList;
}
