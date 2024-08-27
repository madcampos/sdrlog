const touchTreshold = 50;

let startX: number | null = null;
let startY: number | null = null;

export interface SwipeEvent extends CustomEvent<'swipe'> {
	direction: 'down' | 'left' | 'right' | 'up';
}

declare global {
	interface WindowEventMap {
		['swipe']: SwipeEvent;
	}
}

function handleTouchStart(evt: TouchEvent) {
	const firstTouch = evt.touches[0] as Touch;

	startX = firstTouch.clientX;
	startY = firstTouch.clientY;
}

function handleTouchMove(evt: TouchEvent) {
	if (startX === null || startY === null) {
		return;
	}

	const firstTouch = evt.touches[0] as Touch;
	const endX = firstTouch.clientX;
	const endY = firstTouch.clientY;

	const xDiff = startX - endX;
	const yDiff = startY - endY;

	if (Math.abs(xDiff) < touchTreshold && Math.abs(yDiff) < touchTreshold) {
		return;
	}

	// @ts-expect-error
	const swipeEvent: SwipeEvent = new CustomEvent('swipe', { bubbles: true, composed: true, cancelable: true });

	if (Math.abs(xDiff) > Math.abs(yDiff)) {
		if (xDiff > 0) {
			swipeEvent.direction = 'left';
		} else {
			swipeEvent.direction = 'right';
		}
	} else if (yDiff > 0) {
		swipeEvent.direction = 'up';
	} else {
		swipeEvent.direction = 'down';
	}

	startX = null;
	startY = null;

	window.dispatchEvent(swipeEvent);
}

window.addEventListener('touchstart', handleTouchStart, false);
window.addEventListener('touchmove', handleTouchMove, false);
