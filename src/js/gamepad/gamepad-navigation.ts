import { SdrDialog } from '../../components/SdrDialog';
import { SdrDropdown } from '../../components/SdrDropdown';
import { SdrCard } from '../../components/SdrCard';
import { SdrItemDetails } from '../../views/SdrItemDetails';
import { SdrSearchBox } from '../../components/SdrSearchBox';

import { GamepadEventNormalizer } from './gamepad-events';
import { SdrDropdownItem } from '../../components/SdrDropdownItem';

const ACTIVATION_TIME = 500;
const ACTIVATION_WEAK_VIBRATE = 0.8;
const ACTIVATION_STRONG_VIBRATE = 1;

function resetFocus() {
	document.querySelector<SdrCard>(SdrCard.elementName)?.focus();
}

const gamepadNormalizer = new GamepadEventNormalizer(resetFocus);

function selectNextMenuItem() {
	if (document.activeElement?.matches(SdrDropdownItem.elementName) ?? false) {
		document.activeElement?.closest<SdrDropdown>(SdrDropdown.elementName)?.focusNext();
		gamepadNormalizer.vibrate();
	}
}

function selectPreviousMenuItem() {
	if (document.activeElement?.matches(SdrDropdownItem.elementName) ?? false) {
		document.activeElement?.closest<SdrDropdown>(SdrDropdown.elementName)?.focusPrevious();
		gamepadNormalizer.vibrate();
	}
}

function activateMenuItem() {
	if (document.activeElement?.matches(SdrDropdownItem.elementName) ?? false) {
		(document.activeElement as HTMLElement).click();
		gamepadNormalizer.vibrate(ACTIVATION_TIME, ACTIVATION_WEAK_VIBRATE, ACTIVATION_STRONG_VIBRATE);
	}
}

function closeMenu() {
	if (document.activeElement?.matches(SdrDropdownItem.elementName) ?? false) {
		const menu = document.activeElement?.closest<SdrDropdown>(SdrDropdown.elementName);

		if (!(menu?.open ?? false)) {
			menu?.close();
			gamepadNormalizer.vibrate();
			resetFocus();
		}
	}
}

function openMenu(menuId: string) {
	const openModal = document.querySelector<SdrDialog>(SdrDialog.elementName);

	if (!openModal) {
		document.querySelector<SdrDropdown>(menuId)?.toggle();
		gamepadNormalizer.vibrate();
	}
}

function closeModal() {
	const openModal = document.querySelector<SdrDialog>(SdrDialog.elementName);

	if (openModal) {
		openModal.close();
		gamepadNormalizer.vibrate();
		resetFocus();
	}
}

function activateSearch() {
	const openModal = document.querySelector<SdrDialog>(SdrDialog.elementName);

	if (!openModal) {
		document.querySelector<SdrSearchBox>(SdrSearchBox.elementName)?.focus();
		gamepadNormalizer.vibrate(ACTIVATION_TIME, ACTIVATION_WEAK_VIBRATE, ACTIVATION_STRONG_VIBRATE);
	}
}

function exitSearch() {
	const searchBox = document.querySelector(SdrSearchBox.elementName);

	if (document.activeElement === searchBox) {
		resetFocus();
	}
}

function selectNextCard() {
	if (document.activeElement?.matches(SdrCard.elementName) ?? false) {
		if (document.activeElement?.nextElementSibling) {
			(document.activeElement.nextElementSibling as HTMLElement).focus();
		} else {
			(document.querySelector(`${SdrCard.elementName}:first-of-type`) as SdrCard).focus();
		}
	}
}

function selectPreviousCard() {
	if (document.activeElement?.matches(SdrCard.elementName) ?? false) {
		if (document.activeElement?.previousElementSibling) {
			(document.activeElement.previousElementSibling as HTMLElement).focus();
		} else {
			(document.querySelector(`${SdrCard.elementName}:last-of-type`) as SdrCard).focus();
		}
	}
}

function selectCardUp() {
	if (document.activeElement?.matches(SdrCard.elementName) ?? false) {
		const currentCard = document.activeElement as SdrCard;
		const { left: currentLeft, top: currentTop, width: currentWidth, height: currentHeight } = currentCard.getBoundingClientRect();

		const cards = [...document.querySelectorAll(SdrCard.elementName)];
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
			(elementUp as SdrCard).focus();
		} else {
			(document.querySelector(`${SdrCard.elementName}:last-of-type`) as SdrCard).focus();
		}
	}
}


function selectCardDown() {
	if (document.activeElement?.matches(SdrCard.elementName) ?? false) {
		const currentCard = document.activeElement as SdrCard;
		const { left: currentLeft, bottom: currentBottom, width: currentWidth, height: currentHeight } = currentCard.getBoundingClientRect();

		const cards = [...document.querySelectorAll(SdrCard.elementName)];
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

		if (elementDown?.matches(SdrCard.elementName) ?? false) {
			(elementDown as SdrCard).focus();
		} else {
			(document.querySelector(`${SdrCard.elementName}:first-of-type`) as SdrCard).focus();
		}
	}
}

function openCardDetails() {
	if (document.activeElement?.matches(SdrCard.elementName) ?? false) {
		(document.activeElement as SdrCard).click();
		gamepadNormalizer.vibrate(ACTIVATION_TIME, ACTIVATION_WEAK_VIBRATE, ACTIVATION_STRONG_VIBRATE);
	}
}

function closeCardDetails() {
	const openDetails = document.querySelector<SdrItemDetails>(`${SdrItemDetails.elementName}[open]`);

	if (openDetails) {
		openDetails.close();
		gamepadNormalizer.vibrate();
		resetFocus();
	}
}

// TODO: navigate modals, scroll, navigate item-details

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
		case 'select':
			closeCardDetails();
			closeModal();
			closeMenu();
			exitSearch();
			resetFocus();
			break;
	}
});
