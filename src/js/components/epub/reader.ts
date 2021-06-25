import '../../../../lib/zip/jszip';
import ePub from '../../../../lib/epub/epub';

document.querySelector('input')?.addEventListener('change', async (evt) => {
	const input = evt.target as HTMLInputElement;
	const [file] = Array.from(input.files ?? []);

	const book = ePub(await file.arrayBuffer());
	const rendition = book.renderTo('area', { flow: 'paginated', width: 600, height: 400 });

	await rendition.display();
});
