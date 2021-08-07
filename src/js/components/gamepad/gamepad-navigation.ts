import type { ModalDialog } from '../dialog/dialog';
import type { DropdownMenu } from '../dropdown-menu/dropdown-menu';
import type { ItemCard } from '../item-info/item-card';
import type { ItemDetails } from '../item-info/item-details';
import type { SearchBox } from '../search-box/search-box';

import { GamepadEventNormalizer } from './gamepad-events';

const ACTIVATION_TIME = 500;
const ACTIVATION_WEAK_VIBRATE = 0.8;
const ACTIVATION_STRONG_VIBRATE = 1;

function resetFocus() {
	document.querySelector<ItemCard>('item-card')?.focus();
}

const gamepadNormalizer = new GamepadEventNormalizer(resetFocus);

function selectNextMenuItem() {
	if (document.activeElement?.matches('dropdown-menu-item') ?? false) {
		document.activeElement?.closest<DropdownMenu>('dropdown-menu')?.focusNext();
		gamepadNormalizer.vibrate();
	}
}

function selectPreviousMenuItem() {
	if (document.activeElement?.matches('dropdown-menu-item') ?? false) {
		document.activeElement?.closest<DropdownMenu>('dropdown-menu')?.focusPrevious();
		gamepadNormalizer.vibrate();
	}
}

function activateMenuItem() {
	if (document.activeElement?.matches('dropdown-menu-item') ?? false) {
		(document.activeElement as HTMLElement).click();
		gamepadNormalizer.vibrate(ACTIVATION_TIME, ACTIVATION_WEAK_VIBRATE, ACTIVATION_STRONG_VIBRATE);
	}
}

function closeMenu() {
	if (document.activeElement?.matches('dropdown-menu-item') ?? false) {
		const menu = document.activeElement?.closest<DropdownMenu>('dropdown-menu');

		if (menu?.isClosed ?? false) {
			menu?.close();
			gamepadNormalizer.vibrate();
			resetFocus();
		}
	}
}

function openMenu(menuId: string) {
	const openModal = document.querySelector<ModalDialog>('modal-dialog[open]');

	if (!openModal) {
		document.querySelector<DropdownMenu>(menuId)?.toggle();
		gamepadNormalizer.vibrate();
	}
}

function closeModal() {
	const openModal = document.querySelector<ModalDialog>('modal-dialog[open]');

	if (openModal) {
		openModal.close();
		gamepadNormalizer.vibrate();
		resetFocus();
	}
}

function activateSearch() {
	const openModal = document.querySelector<ModalDialog>('modal-dialog[open]');

	if (!openModal) {
		document.querySelector<SearchBox>('search-box')?.focus();
		gamepadNormalizer.vibrate(ACTIVATION_TIME, ACTIVATION_WEAK_VIBRATE, ACTIVATION_STRONG_VIBRATE);
	}
}

function exitSearch() {
	const searchBox = document.querySelector('search-box');

	if (document.activeElement === searchBox) {
		resetFocus();
	}
}

function selectNextCard() {
	if (document.activeElement?.matches('item-card') ?? false) {
		if (document.activeElement?.nextElementSibling) {
			(document.activeElement.nextElementSibling as HTMLElement).focus();
		} else {
			(document.querySelector('item-card:first-of-type') as ItemCard).focus();
		}
	}
}

function selectPreviousCard() {
	if (document.activeElement?.matches('item-card') ?? false) {
		if (document.activeElement?.previousElementSibling) {
			(document.activeElement.previousElementSibling as HTMLElement).focus();
		} else {
			(document.querySelector('item-card:last-of-type') as ItemCard).focus();
		}
	}
}

function selectCardUp() {
	if (document.activeElement?.matches('item-card') ?? false) {
		const currentCard = document.activeElement as ItemCard;
		const { left: currentLeft, top: currentTop, width: currentWidth, height: currentHeight } = currentCard.getBoundingClientRect();

		const cards = [...document.querySelectorAll('item-card')];
		const currentCardIndex = cards.findIndex((card) => card === currentCard);
		const MAX_SEARCH_INDEX = 20;
		const cardsToSearch = cards.slice(Math.max(currentCardIndex - MAX_SEARCH_INDEX, 0), currentCardIndex);

		/* eslint-disable @typescript-eslint/no-magic-numbers, @typescript-eslint/no-extra-parens */
		const x = currentLeft + (currentWidth / 2);
		const y = currentTop - (currentHeight / 2);
		/* eslint-enable @typescript-eslint/no-magic-numbers, @typescript-eslint/no-extra-parens */

		const elementUp = cardsToSearch.find((card) => {
			const { top, right, bottom, left } = card.getBoundingClientRect();
			const isInsideX = left < x && (x < right || right > currentLeft);
			const isInsideY = top < y && y < bottom;

			return isInsideX && isInsideY;
		});

		if (elementUp) {
			(elementUp as ItemCard).focus();
		} else {
			(document.querySelector('item-card:last-of-type') as ItemCard).focus();
		}
	}
}


function selectCardDown() {
	if (document.activeElement?.matches('item-card') ?? false) {
		const currentCard = document.activeElement as ItemCard;
		const { left: currentLeft, bottom: currentBottom, width: currentWidth, height: currentHeight } = currentCard.getBoundingClientRect();

		const cards = [...document.querySelectorAll('item-card')];
		const currentCardIndex = cards.findIndex((card) => card === currentCard);
		const MAX_SEARCH_INDEX = 20;
		const cardsToSearch = cards.slice(currentCardIndex, Math.min(currentCardIndex + MAX_SEARCH_INDEX, cards.length - 1));

		/* eslint-disable @typescript-eslint/no-magic-numbers, @typescript-eslint/no-extra-parens */
		const x = currentLeft + (currentWidth / 2);
		const y = currentBottom + (currentHeight / 2);
		/* eslint-enable @typescript-eslint/no-magic-numbers, @typescript-eslint/no-extra-parens */

		const elementDown = cardsToSearch.find((card) => {
			const { top, right, bottom, left } = card.getBoundingClientRect();
			const isInsideX = left < x && (x < right || right > currentLeft);
			const isInsideY = top < y && y < bottom;

			return isInsideX && isInsideY;
		});

		if (elementDown?.matches('item-card') ?? false) {
			(elementDown as ItemCard).focus();
		} else {
			(document.querySelector('item-card:first-of-type') as ItemCard).focus();
		}
	}
}

function openCardDetails() {
	if (document.activeElement?.matches('item-card') ?? false) {
		(document.activeElement as ItemCard).click();
		gamepadNormalizer.vibrate(ACTIVATION_TIME, ACTIVATION_WEAK_VIBRATE, ACTIVATION_STRONG_VIBRATE);
	}
}

function closeCardDetails() {
	const openDetails = document.querySelector<ItemDetails>('item-details[open]');

	if (openDetails) {
		openDetails.close();
		gamepadNormalizer.vibrate();
		resetFocus();
	}
}

window.addEventListener('buttondown', (evt) => {
	// eslint-disable-next-line default-case, @typescript-eslint/switch-exhaustiveness-check
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

window.addEventListener('stickmove', (evt) => {
	// eslint-disable-next-line default-case, @typescript-eslint/switch-exhaustiveness-check
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

window.addEventListener('buttonpress', (evt) => {
	// eslint-disable-next-line default-case, @typescript-eslint/switch-exhaustiveness-check
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
	}
});
