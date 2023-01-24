type ShortcutEventHandler = (evt?: KeyboardEvent) => void;

const shortcuts = new Map<string, ShortcutEventHandler>();

function isMacOs() {
	return navigator.userAgent.includes('Mac OS X') || navigator.platform.includes('Mac') || navigator.platform.includes('iPad') || navigator.platform.includes('iPhone') || navigator.platform.includes('darwin');
}

export function registerShortcut(key: string, callback: ShortcutEventHandler) {
	shortcuts.set(key, callback);
}

window.addEventListener('keydown', (evt) => {
	const isMac = isMacOs();

	if (isMac && !evt.metaKey) {
		return;
	} else if (!isMac && !evt.ctrlKey) {
		return;
	}

	const shortcutEventHandler = shortcuts.get(evt.key);

	if (shortcutEventHandler) {
		evt.preventDefault();
		evt.stopPropagation();
	}
});

window.addEventListener('keyup', (evt) => {
	const isMac = isMacOs();

	if (isMac && !evt.metaKey) {
		return;
	} else if (!isMac && !evt.ctrlKey) {
		return;
	}

	const shortcutEventHandler = shortcuts.get(evt.key);

	if (shortcutEventHandler) {
		evt.preventDefault();
		evt.stopPropagation();

		shortcutEventHandler(evt);
	}
}, { capture: false });
