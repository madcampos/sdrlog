import { I18n } from '../js/intl/translations';
import type { IsoCode, MaterialCategory, MaterialPublisher, MaterialStatus, MaterialType } from './data';

export const MATERIAL_LANGUAGES_INFO: Readonly<Record<IsoCode, { name: string, icon: string }>> = {
	'de-DE': { icon: '🇩🇪', name: I18n.t`German` },
	'fr-FR': { icon: '🇫🇷', name: I18n.t`French` },
	'jp-JP': { icon: '🇯🇵', name: I18n.t`Japanese` },
	'es-ES': { icon: '🇪🇸', name: I18n.t`Spanish` },
	'hu-HU': { icon: '🇭🇺', name: I18n.t`Hungarian` },
	'it-IT': { icon: '🇮🇹', name: I18n.t`Italian` },
	'pt-BR': { icon: '🇧🇷', name: I18n.t`Brazilian Portuguese` },
	'cs-CZ': { icon: '🇨🇿', name: I18n.t`Czech` },
	'he-IL': { icon: '🇮🇱', name: I18n.t`Hebrew` },
	'pl-PL': { icon: '🇵🇱', name: I18n.t`Polish` },
	'fi-FI': { icon: '🇫🇮', name: I18n.t`Finnish` },
	'en-US': { icon: '🇺🇸', name: I18n.t`English` }
} as const;

export const MATERIAL_PUBLISHERS: Readonly<MaterialPublisher[]> = [
	'Catalyst Game Labs',
	'Cliffhanger Productions',
	'FASA Corporation',
	'Fantasy Productions',
	'Harebrained Schemes',
	'Pegasus Spiele',
	'WizKids Games',
	'Heyne Verlag',
	'Other',
	'Unofficial'
] as const;

export const MATERIAL_CATEGORY_INFO: Readonly<Record<MaterialCategory, { name: string, icon: string }>> = {
	novel: { icon: '📚', name: I18n.t`Novel` },
	sourcebook: { icon: '📜', name: I18n.t`Sourcebook` },
	mission: { icon: '🗺️', name: I18n.t`Mission` },
	rulebook: { icon: '📝', name: I18n.t`Rulebook` },
	misc: { icon: '🔣', name: I18n.t`Misc.` },
	magazine: { icon: '📰', name: I18n.t`Magazine` },
	boardgame: { icon: '♟️', name: I18n.t`Boardgame` },
	videogame: { icon: '🎮', name: I18n.t`Videogame` },
	tcg: { icon: '🃏', name: I18n.t`T.C.G.` },
	unofficial: { icon: '📓', name: I18n.t`Unofficial` }
} as const;

export const MATERIAL_TYPE_INFO: Readonly<Record<MaterialType, { name: string, icon: string }>> = {
	digital: { icon: '💽', name: I18n.t`Digital` },
	scan: { icon: '📠', name: I18n.t`Scan` },
	ocr: { icon: '💾', name: I18n.t`OCR` },
	print: { icon: '🖨️', name: I18n.t`Print` },
	physical: { icon: '🎲', name: I18n.t`Physical` }
} as const;


export const MATERIAL_STATUS_INFO: Readonly<Record<MaterialStatus, { name: string, icon: string }>> = {
	ok: { icon: '✅', name: I18n.t`OK` },
	missing: { icon: '❌', name: I18n.t`Missing` },
	outofscope: { icon: '⛔', name: I18n.t`Out of scope` },
	canceled: { icon: '🚫', name: I18n.t`Canceled` }
} as const;
