import type { Emulator } from './emulator';
import '../intl/bootstrap';
import './emulator';

const url = new URL(window.location.toString());
const params = new URLSearchParams(url.search);

if (params.has('file')) {
	const emulatorElement = document.querySelector('rom-emulator') as Emulator;

	emulatorElement.file = params.get('file') as string;
}
