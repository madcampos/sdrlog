import type { ComicBookReader } from './reader';
import '../intl/bootstrap';
import '../button/button';
import '../menu-bar/menu-bar';
import './reader';

const url = new URL(window.location.toString());
const params = new URLSearchParams(url.search);

if (params.has('file')) {
	const readerElement = document.querySelector('cbz-reader') as ComicBookReader;

	readerElement.file = params.get('file') as string;
}
