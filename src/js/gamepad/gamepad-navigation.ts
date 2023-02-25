/* eslint-disable default-case, @typescript-eslint/switch-exhaustiveness-check */
import type { SdrCard } from '../../components/SdrCard';

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
