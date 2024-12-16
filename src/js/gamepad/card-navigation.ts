// #selectNextCard() {
// 	If (this.nextElementSibling) {
// 		Window.requestAnimationFrame(() => {
// 			(this.nextElementSibling as SdrCard).focus();
// 		});
// 	} else {
// 		Window.requestAnimationFrame(() => {
// 			Document.querySelector('sdr-card')?.focus();
// 		});
// 	}
// }

// #selectPreviousCard() {
// 	If (this.previousElementSibling) {
// 		Window.requestAnimationFrame(() => {
// 			(this.previousElementSibling as SdrCard).focus();
// 		});
// 	} else {
// 		Window.requestAnimationFrame(() => {
// 			This.parentElement?.querySelector('sdr-card:last-child')?.focus();
// 		});
// 	}
// }

// #selectCardDown() {
// 	Const { marginLeft, marginRight } = window.getComputedStyle(this);
// 	Const width = this.offsetWidth + Number.parseFloat(marginLeft) + Number.parseFloat(marginRight);
// 	Const parentElement = this.parentElement as HTMLElement;
// 	Const parentWidth = parentElement.clientWidth;
// 	Const columns = Math.floor(parentWidth / width);
// 	Const index = [...parentElement.children].indexOf(this);
// 	Const column = index % columns;
// 	Const nextRowCard = (parentElement.children.item(index + columns) ?? parentElement.children.item(column)) as SdrCard;

// 	Window.requestAnimationFrame(() => {
// 		NextRowCard.focus();
// 	});
// }

// #selectCardUp() {
// 	Const { marginLeft, marginRight } = window.getComputedStyle(this);
// 	Const width = this.offsetWidth + Number.parseFloat(marginLeft) + Number.parseFloat(marginRight);
// 	Const parentElement = this.parentElement as HTMLElement;
// 	Const parentWidth = parentElement.clientWidth;
// 	Const columns = Math.floor(parentWidth / width);
// 	Const index = [...parentElement.children].indexOf(this);
// 	Const column = index % columns;
// 	Const previousRowCard = (parentElement.children.item(index - columns) ?? parentElement.children.item(parentElement.children.length - columns + column)) as SdrCard;

// 	Window.requestAnimationFrame(() => {
// 		PreviousRowCard.focus();
// 	});
// }

// Window.addEventListener('gamepadbuttondown', (evt) => {
// 	If (document.activeElement === this && evt.detail.button === 'left') {
// 		Evt.stopPropagation();
// 		This.#selectPreviousCard();
// 	}

// 	If (document.activeElement === this && evt.detail.button === 'right') {
// 		Evt.stopPropagation();
// 		This.#selectNextCard();
// 	}

// 	If (document.activeElement === this && evt.detail.button === 'down') {
// 		Evt.stopPropagation();
// 		This.#selectCardDown();
// 	}

// 	If (document.activeElement === this && evt.detail.button === 'up') {
// 		Evt.stopPropagation();
// 		This.#selectCardUp();
// 	}
// });

// Window.addEventListener('gamepadbuttonpress', (evt) => {
// 	If (document.activeElement === this && evt.detail.button === 'a') {
// 		GamepadHandler.longVibration();
// 		Void Router.navigate(`/item/${this.id}`);
// 	}
// });

// Window.addEventListener('gamepadstickmove', (evt) => {
// 	If (document.activeElement === this && evt.detail.stick === 'left') {
// 		If (evt.detail.directionY === 'up') {
// 			Evt.stopPropagation();
// 			This.#selectCardUp();
// 		}

// 		If (evt.detail.directionY === 'down') {
// 			Evt.stopPropagation();
// 			This.#selectCardDown();
// 		}

// 		If (evt.detail.directionX === 'left') {
// 			Evt.stopPropagation();
// 			This.#selectPreviousCard();
// 		}

// 		If (evt.detail.directionX === 'right') {
// 			Evt.stopPropagation();
// 			This.#selectNextCard();
// 		}
// 	}
// });
