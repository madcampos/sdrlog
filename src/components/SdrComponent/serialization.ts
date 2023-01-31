export interface PropBinding {
	prop: string,
	element: HTMLElement,
	attribute?: string,
	type: 'attribute' | 'event' | 'text'
}

export interface HandlerBinding {
	eventName: string,
	handlerName: string,
	boundElement: HTMLElement
}

const BIND_REGEX = /^(?:s-bind:|:)/giu;
const EVENT_REGEX = /^(?:s-on:|@)/giu;
const TEXT_REGEX = /\{\{\s*([a-z][a-z0-9]+?)\s*\}\}/giu;

export type TemplateParser = (template: DocumentFragment) => { props: PropBinding[] };

export const templateParser: TemplateParser = (template) => {
	const props: PropBinding[] = [];

	const processNode = (node: Node) => {
		if (node.nodeType === Node.ELEMENT_NODE) {
			const { attributes } = node as Element;

			for (const attribute of [...attributes]) {
				if (BIND_REGEX.test(attribute.name)) {
					const attributeName = attribute.name.replace(BIND_REGEX, '');
					const prop = attribute.value;

					props.push({
						prop,
						element: node as HTMLElement,
						attribute: attributeName,
						type: 'attribute'
					});

					(node as Element).removeAttribute(attribute.name);
				} else if (EVENT_REGEX.test(attribute.name)) {
					const eventName = attribute.name.replace(EVENT_REGEX, '');
					const handlerName = attribute.value;

					props.push({
						prop: handlerName,
						element: node as HTMLElement,
						attribute: eventName,
						type: 'event'
					});

					(node as Element).removeAttribute(attribute.name);
				}
			}
		}

		if (node.nodeType === Node.TEXT_NODE) {
			const propMatch = node.textContent?.matchAll(TEXT_REGEX) ?? [];

			for (const [, prop] of propMatch) {
				props.push({
					prop,
					element: node.parentElement as HTMLElement,
					type: 'text'
				});
			}
		}

		if (node.hasChildNodes()) {
			node.childNodes.forEach((childNode) => {
				processNode(childNode);
			});
		}
	};

	processNode(template);

	return {
		props
	};
};
