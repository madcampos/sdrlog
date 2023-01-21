export interface PropBinding {
	prop: string,
	element: HTMLElement,
	attribute?: string,
	type: 'attribute' | 'event' | 'text' | 'loop'
}

export interface HandlerBinding {
	eventName: string,
	handlerName: string,
	boundElement: HTMLElement
}

const BIND_REGEX = /^(?:s-bind:|:)/giu;
const EVENT_REGEX = /^(?:s-on:|@)/giu;
const TEXT_REGEX = /\{\{\s*([a-z][a-z0-9]+?)\s*\}\}/giu;
const LOOP_REGEX = /^(?<item>[a-z][a-z0-9]+?) in (?<list>[a-z][a-z0-9]+?)$/giu;

// TODO: update parser to support property accessors

export type TemplateParser = (template: DocumentFragment) => { props: PropBinding[] };

export const templateParser: TemplateParser = (template) => {
	const props: PropBinding[] = [];
	const loopElments: Element[] = [];

	const processNode = (node: Node) => {
		if (node.nodeType === Node.ELEMENT_NODE) {
			const { attributes } = node as Element;
			const isInsideLoop = loopElments.includes(node.parentElement as Element);

			if (!isInsideLoop) {
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
					} else if (attribute.name === 's-for') {
						const { list, item } = attribute.value.match(LOOP_REGEX)?.groups ?? {};

						// eslint-disable-next-line max-depth
						if (!list || !item) {
							throw new Error(`Invalid loop syntax: ${attribute.value}`);
						}

						props.push({
							prop: list,
							element: node as HTMLElement,
							type: 'loop'
						});

						loopElments.push(node as Element);

						(node as Element).removeAttribute(attribute.name);
					}
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
