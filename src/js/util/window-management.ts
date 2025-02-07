const MIN_WIDTH = 800;
const MIN_HEIGHT = 600;

window.addEventListener('resize', () => {
	const width = Math.min(Math.max(window.outerWidth, MIN_WIDTH), window.screen.availWidth);
	const height = Math.min(Math.max(window.outerHeight, MIN_HEIGHT), window.screen.availHeight);

	window.resizeTo(width, height);
});
