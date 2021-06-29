/* eslint-disable max-statements-per-line */
import '../../../../lib/nipplejs/nipplejs';

const game = document.querySelector('canvas') as HTMLCanvasElement;
const selectButton = document.querySelector('#button-select') as HTMLButtonElement;
const startButton = document.querySelector('#button-start') as HTMLButtonElement;
const bumperLeft = document.querySelector('#bumper-left') as HTMLButtonElement;
const bumperRight = document.querySelector('#bumper-right') as HTMLButtonElement;
const aButton = document.querySelector('#button-a') as HTMLButtonElement;
const bButton = document.querySelector('#button-b') as HTMLButtonElement;
const xButton = document.querySelector('#button-x') as HTMLButtonElement;
const yButton = document.querySelector('#button-y') as HTMLButtonElement;

interface KeyData {
	key: string,
	code: string,
	keyCode: number
}

const keyMap: Record<string, KeyData> = {
	select: { key: 'Enter', code: 'Enter', keyCode: 13 },
	start: { key: ' ', code: 'Space', keyCode: 32 },
	leftBumber: { key: 'E', code: 'KeyE', keyCode: 69 },
	rightBumber: { key: 'P', code: 'KeyP', keyCode: 32 },
	up: { key: 'ArrowUp', code: 'ArrowUp', keyCode: 38 },
	down: { key: 'ArrowDown', code: 'ArrowDown', keyCode: 40 },
	left: { key: 'ArrowLeft', code: 'ArrowLeft', keyCode: 37 },
	right: { key: 'ArrowRight', code: 'ArrowRight', keyCode: 39 },
	a: { key: 'H', code: 'KeyH', keyCode: 72 },
	b: { key: 'G', code: 'KeyG', keyCode: 71 },
	x: { key: 'Y', code: 'KeyY', keyCode: 89 },
	y: { key: 'T', code: 'KeyT', keyCode: 84 }
};

function sendKeyEvent(type: 'keydown' | 'keyup', key: keyof typeof keyMap) {
	game.dispatchEvent(new KeyboardEvent(type, {
		bubbles: true,
		cancelable: false,
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		...keyMap[key]
	}));
}

const dpad = nipplejs.create({
	zone: document.querySelector('#dpad') as HTMLDivElement,
	color: 'white',
	multitouch: false,
	position: { left: '50%', top: '50%' },
	mode: 'static',
	restJoystick: true,
	shape: 'circle',
	follow: false
});

let dpadDirection: string | null = null;

dpad.on('move', (_, { direction }) => {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	dpadDirection = direction?.angle ?? null;

	if (dpadDirection) {
		sendKeyEvent('keydown', dpadDirection);
	}
});

dpad.on('end', () => {
	if (dpadDirection) {
		sendKeyEvent('keyup', dpadDirection);
	}
});

selectButton.addEventListener('pointerdown', () => { sendKeyEvent('keydown', 'select'); });
selectButton.addEventListener('pointerup', () => { sendKeyEvent('keyup', 'select'); });

startButton.addEventListener('pointerdown', () => { sendKeyEvent('keydown', 'start'); });
startButton.addEventListener('pointerup', () => { sendKeyEvent('keyup', 'start'); });

bumperLeft.addEventListener('pointerdown', () => { sendKeyEvent('keydown', 'leftBumber'); });
bumperLeft.addEventListener('pointerup', () => { sendKeyEvent('keyup', 'leftBumber'); });

bumperRight.addEventListener('pointerdown', () => { sendKeyEvent('keydown', 'rightBumper'); });
bumperRight.addEventListener('pointerup', () => { sendKeyEvent('keyup', 'rightBumper'); });

aButton.addEventListener('pointerdown', () => { sendKeyEvent('keydown', 'a'); });
aButton.addEventListener('pointerup', () => { sendKeyEvent('keyup', 'a'); });

bButton.addEventListener('pointerdown', () => { sendKeyEvent('keydown', 'b'); });
bButton.addEventListener('pointerup', () => { sendKeyEvent('keyup', 'b'); });

xButton.addEventListener('pointerdown', () => { sendKeyEvent('keydown', 'x'); });
xButton.addEventListener('pointerup', () => { sendKeyEvent('keyup', 'x'); });

yButton.addEventListener('pointerdown', () => { sendKeyEvent('keydown', 'y'); });
yButton.addEventListener('pointerup', () => { sendKeyEvent('keyup', 'y'); });
