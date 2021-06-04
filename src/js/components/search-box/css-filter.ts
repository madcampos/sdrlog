/* eslint-disable @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition */
let filterElement: HTMLStyleElement;

export function updateSearchFilter(filteredName: string) {
	let cssString = '';

	if (!filterElement) {
		filterElement = document.createElement('style');
		document.head.appendChild(filterElement);
	}

	if (filteredName) {
		cssString = `item-card:not([title*="${filteredName}"]){display:none}`;
	}

	window.requestAnimationFrame(() => {
		filterElement.innerText = cssString;
	});
}
