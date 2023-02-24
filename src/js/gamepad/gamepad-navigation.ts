/* eslint-disable default-case, @typescript-eslint/switch-exhaustiveness-check */
import type { SdrCard } from '../../components/SdrCard';
import type { SdrDropdown } from '../../components/SdrDropdown';
import type { SdrViewItemDetails } from '../../views/SdrItemDetailsView';

import { GamepadEventNormalizer } from './gamepad-events';

// TODO: export a class for shortcut registration

const ACTIVATION_TIME = 500;
const ACTIVATION_WEAK_VIBRATE = 0.8;
const ACTIVATION_STRONG_VIBRATE = 1;

function resetFocus() {
	document.querySelector('sdr-card')?.focus();
}

const gamepadNormalizer = new GamepadEventNormalizer(resetFocus);

function selectNextMenuItem() {
	if (document.activeElement?.matches('sdr-dropdown-item') ?? false) {
		document.activeElement?.closest('sdr-dropdown')?.focusNext();
		gamepadNormalizer.vibrate();
	}
}

function selectPreviousMenuItem() {
	if (document.activeElement?.matches('sdr-dropdown-item') ?? false) {
		document.activeElement?.closest('sdr-dropdown')?.focusPrevious();
		gamepadNormalizer.vibrate();
	}
}

function activateMenuItem() {
	if (document.activeElement?.matches('sdr-dropdown-item') ?? false) {
		(document.activeElement as HTMLElement).click();
		gamepadNormalizer.vibrate(ACTIVATION_TIME, ACTIVATION_WEAK_VIBRATE, ACTIVATION_STRONG_VIBRATE);
	}
}

function closeMenu() {
	if (document.activeElement?.matches('sdr-dropdown-item') ?? false) {
		const menu = document.activeElement?.closest<SdrDropdown>('sdr-dropdown');

		if (!(menu?.open ?? false)) {
			menu?.close();
			gamepadNormalizer.vibrate();
			resetFocus();
		}
	}
}

function openMenu(menuId: string) {
	const openModal = document.querySelector('sdr-dialog');

	if (!openModal) {
		document.querySelector<SdrDropdown>(menuId)?.toggle();
		gamepadNormalizer.vibrate();
	}
}

function closeModal() {
	const openModal = document.querySelector('sdr-dialog');

	if (openModal) {
		openModal.close();
		gamepadNormalizer.vibrate();
		resetFocus();
	}
}

function activateSearch() {
	const openModal = document.querySelector('sdr-dialog');

	if (!openModal) {
		document.querySelector('sdr-search-box')?.focus();
		gamepadNormalizer.vibrate(ACTIVATION_TIME, ACTIVATION_WEAK_VIBRATE, ACTIVATION_STRONG_VIBRATE);
	}
}

function exitSearch() {
	const searchBox = document.querySelector('sdr-search-box');

	if (document.activeElement === searchBox) {
		resetFocus();
	}
}

function selectNextCard() {
	if (document.activeElement?.matches('sdr-card') ?? false) {
		if (document.activeElement?.nextElementSibling) {
			(document.activeElement.nextElementSibling as HTMLElement).focus();
		} else {
			(document.querySelector('sdr-card:first-of-type') as SdrCard).focus();
		}
	}
}

function selectPreviousCard() {
	if (document.activeElement?.matches('sdr-card') ?? false) {
		if (document.activeElement?.previousElementSibling) {
			(document.activeElement.previousElementSibling as HTMLElement).focus();
		} else {
			(document.querySelector('sdr-card:last-of-type') as SdrCard).focus();
		}
	}
}

function selectCardUp() {
	if (document.activeElement?.matches('sdr-card') ?? false) {
		const currentCard = document.activeElement as SdrCard;
		const { left: currentLeft, top: currentTop, width: currentWidth, height: currentHeight } = currentCard.getBoundingClientRect();

		const cards = [...document.querySelectorAll('sdr-card')];
		const currentCardIndex = cards.findIndex((card) => card === currentCard);
		const MAX_SEARCH_INDEX = 20;
		const cardsToSearch = cards.slice(Math.max(currentCardIndex - MAX_SEARCH_INDEX, 0), currentCardIndex);

		/* eslint-disable @typescript-eslint/no-magic-numbers */
		const x = currentLeft + (currentWidth / 2);
		const y = currentTop - (currentHeight / 2);
		/* eslint-enable @typescript-eslint/no-magic-numbers */

		const elementUp = cardsToSearch.find((card) => {
			const { top, right, bottom, left } = card.getBoundingClientRect();
			const isInsideX = left < x && (x < right || right > currentLeft);
			const isInsideY = top < y && y < bottom;

			return isInsideX && isInsideY;
		});

		if (elementUp) {
			(elementUp).focus();
		} else {
			(document.querySelector('sdr-card:last-of-type') as SdrCard).focus();
		}
	}
}


function selectCardDown() {
	if (document.activeElement?.matches('sdr-card') ?? false) {
		const currentCard = document.activeElement as SdrCard;
		const { left: currentLeft, bottom: currentBottom, width: currentWidth, height: currentHeight } = currentCard.getBoundingClientRect();

		const cards = [...document.querySelectorAll('sdr-card')];
		const currentCardIndex = cards.findIndex((card) => card === currentCard);
		const MAX_SEARCH_INDEX = 20;
		const cardsToSearch = cards.slice(currentCardIndex, Math.min(currentCardIndex + MAX_SEARCH_INDEX, cards.length - 1));

		/* eslint-disable @typescript-eslint/no-magic-numbers */
		const x = currentLeft + (currentWidth / 2);
		const y = currentBottom + (currentHeight / 2);
		/* eslint-enable @typescript-eslint/no-magic-numbers */

		const elementDown = cardsToSearch.find((card) => {
			const { top, right, bottom, left } = card.getBoundingClientRect();
			const isInsideX = left < x && (x < right || right > currentLeft);
			const isInsideY = top < y && y < bottom;

			return isInsideX && isInsideY;
		});

		if (elementDown?.matches('sdr-card') ?? false) {
			(elementDown as SdrCard).focus();
		} else {
			(document.querySelector('sdr-card:first-of-type') as SdrCard).focus();
		}
	}
}

function openCardDetails() {
	if (document.activeElement?.matches('sdr-card') ?? false) {
		(document.activeElement as SdrCard).click();
		gamepadNormalizer.vibrate(ACTIVATION_TIME, ACTIVATION_WEAK_VIBRATE, ACTIVATION_STRONG_VIBRATE);
	}
}

function closeCardDetails() {
	const openDetails = document.querySelector<SdrViewItemDetails>('sdr-item-details[open]');

	if (openDetails) {
		gamepadNormalizer.vibrate();
		resetFocus();
	}
}

// TODO: navigate modals, scroll, navigate item-details
// TODO: move callbacks to the respective components

window.addEventListener('gamepadbuttondown', (evt) => {
	switch (evt.button) {
		case 'up':
			selectCardUp();
			selectPreviousMenuItem();
			break;
		case 'down':
			selectCardDown();
			selectNextMenuItem();
			break;
		case 'left':
			selectPreviousCard();
			selectPreviousMenuItem();
			break;
		case 'right':
			selectNextCard();
			selectNextMenuItem();
			break;
	}
});

window.addEventListener('gamepadstickmove', (evt) => {
	switch (evt.direction) {
		case 'up':
			selectCardUp();
			selectPreviousMenuItem();
			break;
		case 'down':
			selectCardDown();
			selectNextMenuItem();
			break;
		case 'left':
			selectPreviousCard();
			selectPreviousMenuItem();
			break;
		case 'right':
			selectNextCard();
			selectNextMenuItem();
			break;
	}
});

window.addEventListener('gamepadbuttonpress', (evt) => {
	switch (evt.button) {
		case 'y':
			activateSearch();
			break;
		case 'a':
			openCardDetails();
			activateMenuItem();
			break;
		case 'b':
			closeCardDetails();
			closeModal();
			closeMenu();
			exitSearch();
			break;
		case 'x':
			openMenu('#filters');
			break;
		case 'start':
			openMenu('#app-menu');
			break;
		case 'select':
			closeCardDetails();
			closeModal();
			closeMenu();
			exitSearch();
			resetFocus();
			break;
	}
});
