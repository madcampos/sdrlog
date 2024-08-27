type ButtonNames =
	| 'a'
	| 'b'
	| 'down'
	| 'left'
	| 'leftBumper'
	| 'leftStick'
	| 'leftTrigger'
	| 'logo'
	| 'right'
	| 'rightBumper'
	| 'rightStick'
	| 'rightTrigger'
	| 'select'
	| 'share'
	| 'start'
	| 'up'
	| 'x'
	| 'y';

interface GamepadButtonEventDetail {
	button: ButtonNames;
}

interface GamepadStickEventDetail {
	stick: 'left' | 'right';
	directionX?: 'left' | 'right';
	directionY?: 'down' | 'up';
	deltaX: number;
	deltaY: number;
}

declare global {
	interface WindowEventMap {
		['gamepadbuttondown']: CustomEvent<GamepadButtonEventDetail>;
		['gamepadbuttonup']: CustomEvent<GamepadButtonEventDetail>;
		['gamepadbuttonpress']: CustomEvent<GamepadButtonEventDetail>;
		['gamepadstickmove']: CustomEvent<GamepadStickEventDetail>;
	}
}

export class GamepadHandler extends EventTarget {
	static #buttonsPressed: Record<ButtonNames, boolean> = {
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
		logo: false,
		share: false
	};

	static #timestamp = 0;

	static init(callback?: () => void) {
		window.addEventListener('gamepadconnected', () => {
			// eslint-disable-next-line no-console
			console.info('[🎮] Gamepad connected.');

			GamepadHandler.#timestamp = performance.now();

			GamepadHandler.#updateLoop();

			callback?.();
		});
	}

	static #updateLoop() {
		GamepadHandler.#triggerEvents();

		window.requestAnimationFrame(() => {
			GamepadHandler.#updateLoop();
		});
	}

	static #triggerStickEvents(stick: 'left' | 'right', x: number, y: number) {
		const DEADZONE_TRESHOLD = 0.2;

		window.dispatchEvent(
			new CustomEvent<GamepadStickEventDetail>('gamepadstickmove', {
				bubbles: true,
				composed: true,
				cancelable: true,
				detail: {
					// eslint-disable-next-line no-nested-ternary
					directionX: x > DEADZONE_TRESHOLD ? 'right' : x < -DEADZONE_TRESHOLD ? 'left' : undefined,
					// eslint-disable-next-line no-nested-ternary
					directionY: y > DEADZONE_TRESHOLD ? 'down' : y < -DEADZONE_TRESHOLD ? 'up' : undefined,
					deltaX: x,
					deltaY: y,
					stick
				}
			})
		);
	}

	static #triggerButtonEvents(buttonName: ButtonNames, isButtonDown: boolean) {
		const wasButtonDown = GamepadHandler.#buttonsPressed[buttonName];

		if (isButtonDown) {
			GamepadHandler.#buttonsPressed[buttonName] = true;

			window.dispatchEvent(
				new CustomEvent<GamepadButtonEventDetail>('gamepadbuttondown', {
					bubbles: true,
					composed: true,
					cancelable: true,
					detail: { button: buttonName }
				})
			);
		}

		if (wasButtonDown && !isButtonDown) {
			GamepadHandler.#buttonsPressed[buttonName] = false;

			window.dispatchEvent(
				new CustomEvent<GamepadButtonEventDetail>('gamepadbuttonup', {
					bubbles: true,
					composed: true,
					cancelable: true,
					detail: { button: buttonName }
				})
			);

			window.dispatchEvent(
				new CustomEvent<GamepadButtonEventDetail>('gamepadbuttonpress', {
					bubbles: true,
					composed: true,
					cancelable: true,
					detail: { button: buttonName }
				})
			);
		}
	}

	static #triggerEvents() {
		const THROTTLE_TIME = 100;

		const [gamepad] = navigator.getGamepads();
		const currentTimestamp = performance.now();

		if (gamepad && currentTimestamp - GamepadHandler.#timestamp > THROTTLE_TIME) {
			GamepadHandler.#timestamp = currentTimestamp;

			const [leftX = 0, leftY = 0, rightX = 0, rightY = 0] = gamepad.axes;

			GamepadHandler.#triggerStickEvents('left', leftX, leftY);
			GamepadHandler.#triggerStickEvents('right', rightX, rightY);

			(Object.keys(GamepadHandler.#buttonsPressed) as ButtonNames[]).forEach((buttonName, i) => {
				const isButtonDown = gamepad.buttons[i]?.pressed ?? false;

				GamepadHandler.#triggerButtonEvents(buttonName, isButtonDown);
			});
		}
	}

	static vibrate(time = 100, weakIntensity = 0.4, strongIntentisy = 0) {
		const [gamepad] = navigator.getGamepads();

		void gamepad?.vibrationActuator?.playEffect('dual-rumble', {
			startDelay: 0,
			duration: time,
			weakMagnitude: weakIntensity,
			strongMagnitude: strongIntentisy
		});
	}

	static shortVibration() {
		GamepadHandler.vibrate();
	}

	static longVibration() {
		const ACTIVATION_TIME = 300;
		const ACTIVATION_WEAK_VIBRATE = 0.8;
		const ACTIVATION_STRONG_VIBRATE = 0.2;

		GamepadHandler.vibrate(ACTIVATION_TIME, ACTIVATION_WEAK_VIBRATE, ACTIVATION_STRONG_VIBRATE);
	}
}
