/* eslint-disable max-classes-per-file, no-console */
type ButtonNames = 'a' | 'b' | 'x' | 'y' | 'leftBumper' | 'rightBumper' | 'leftTrigger' | 'rightTrigger' | 'select' | 'start' | 'leftStick' | 'rightStick' | 'up' | 'down' | 'left' | 'right' | 'logo';
export declare class ButtonEvent<T = 'buttondown' | 'buttonup' | 'buttonpress'> extends CustomEvent<T> {
	button: ButtonNames;
}

type StickDirection = 'up' | 'down' | 'left' | 'right';

export declare class StickEvent extends CustomEvent<'stickmove'> {
	direction: StickDirection;
	delta: number;
}

declare global {
	interface WindowEventMap {
		['buttondown']: ButtonEvent<'buttondown'>,
		['buttonup']: ButtonEvent<'buttonup'>,
		['buttonpress']: ButtonEvent<'buttonpress'>,
		['stickmove']: StickEvent
	}
}

export class GamepadEventNormalizer extends EventTarget {
	#buttonsPressed: Record<ButtonNames, boolean> = {
		a: false,
		b: false,
		x: false,
		y: false,
		leftBumper: false,
		rightBumper: false,
		leftTrigger: false,
		rightTrigger: false,
		select: false,
		start: false,
		leftStick: false,
		rightStick: false,
		up: false,
		down: false,
		left: false,
		right: false,
		logo: false
	};

	#timestamp = 0;

	constructor(callback?: () => void) {
		super();

		window.addEventListener('gamepadconnected', () => {
			console.log('[🎮] Gamepad connected.');

			this.#startEventLoop();
			callback?.();
		});
	}

	#updateLoop() {
		this.#triggerEvents();

		window.requestAnimationFrame(() => {
			this.#updateLoop();
		});
	}

	#startEventLoop() {
		console.log('[🎮] Gamepad update loop initialized.');
		this.#timestamp = performance.now();

		this.#updateLoop();
	}

	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	vibrate(time = 100, weakIntensity = 0.4, strongIntentisy = 0) {
		const [gamepad] = navigator.getGamepads();

		console.log(`[🎮] Vibrate gamepad for ${time}ms with ${weakIntensity}/${strongIntentisy} intensity.`);
		// @ts-expect-error
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
		gamepad?.vibrationActuator?.playEffect('dual-rumble', {
			startDelay: 0,
			duration: time,
			weakMagnitude: weakIntensity,
			strongMagnitude: strongIntentisy
		});
	}

	#triggerEvents() {
		const DEADZONE_TRESHOLD = 0.2;
		const THROTTLE_TIME = 128;

		const [gamepad] = navigator.getGamepads();
		const currentTimestamp = performance.now();

		if (gamepad && currentTimestamp - this.#timestamp > THROTTLE_TIME) {
			this.#timestamp = currentTimestamp;

			const [leftX, leftY] = gamepad.axes;

			if (leftX < -DEADZONE_TRESHOLD) {
				console.log('[🎮] Gamepad stick move: left.');
				// @ts-expect-error
				const stickEvent: StickEvent = new CustomEvent('stickmove', { bubbles: true, composed: true, cancelable: true });

				stickEvent.direction = 'left';
				stickEvent.delta = leftX;

				window.dispatchEvent(stickEvent);
			}

			if (leftX > DEADZONE_TRESHOLD) {
				console.log('[🎮] Gamepad stick move: right.');
				// @ts-expect-error
				const stickEvent: StickEvent = new CustomEvent('stickmove', { bubbles: true, composed: true, cancelable: true });

				stickEvent.direction = 'right';
				stickEvent.delta = leftX;

				window.dispatchEvent(stickEvent);
			}

			if (leftY < -DEADZONE_TRESHOLD) {
				console.log('[🎮] Gamepad stick move: up.');
				// @ts-expect-error
				const stickEvent: StickEvent = new CustomEvent('stickmove', { bubbles: true, composed: true, cancelable: true });

				stickEvent.direction = 'up';
				stickEvent.delta = leftY;

				window.dispatchEvent(stickEvent);
			}

			if (leftY > DEADZONE_TRESHOLD) {
				console.log('[🎮] Gamepad stick move: down.');
				// @ts-expect-error
				const stickEvent: StickEvent = new CustomEvent('stickmove', { bubbles: true, composed: true, cancelable: true });

				stickEvent.direction = 'down';
				stickEvent.delta = leftY;

				window.dispatchEvent(stickEvent);
			}

			(Object.keys(this.#buttonsPressed) as ButtonNames[]).forEach((buttonName, i) => {
				const wasButtonDown = this.#buttonsPressed[buttonName];
				const isButtonDown = gamepad.buttons[i]?.pressed;

				if (isButtonDown) {
					console.log(`[🎮] Gamepad button down: ${buttonName}.`);
					this.#buttonsPressed[buttonName] = true;

					// @ts-expect-error
					const buttonDownEvent: ButtonEvent<'buttondown'> = new CustomEvent('buttondown', { bubbles: true, composed: true, cancelable: true });

					buttonDownEvent.button = buttonName;

					window.dispatchEvent(buttonDownEvent);
				}

				if (wasButtonDown && !isButtonDown) {
					console.log(`[🎮] Gamepad button up: ${buttonName}.`);
					console.log(`[🎮] Gamepad button press: ${buttonName}.`);
					this.#buttonsPressed[buttonName] = false;

					// @ts-expect-error
					const buttonUpEvent: ButtonEvent<'buttonup'> = new CustomEvent('buttonup', { bubbles: true, composed: true, cancelable: true });

					// @ts-expect-error
					const buttonPressEvent: ButtonEvent<'buttonpress'> = new CustomEvent('buttonpress', { bubbles: true, composed: true, cancelable: true });

					buttonUpEvent.button = buttonName;
					buttonPressEvent.button = buttonName;

					window.dispatchEvent(buttonUpEvent);
					window.dispatchEvent(buttonPressEvent);
				}
			});
		}
	}
}