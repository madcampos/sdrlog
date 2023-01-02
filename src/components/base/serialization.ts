export interface PropBinding {
	prop: string,
	element: HTMLElement,
	attribute?: string,
	type: 'attribute' | 'event' | 'text' | 'loop' | 'conditional'
}

export interface HandlerBinding {
	eventName: string,
	handlerName: string,
	boundElement: HTMLElement
}

const BIND_REGEX = /^(?:s-bind:|:)/giu;
const EVENT_REGEX = /^(?:s-on:|@)/giu;
const TEXT_REGEX = /\{\{([a-z][a-z0-9]+?)\}\}/giu;
const LOOP_REGEX = /^(?<item>[a-z][a-z0-9]+?) in (?<list>[a-z][a-z0-9]+?)$/giu;
const CONDITIONAL_REGEX = /^(?<prop>[a-z][a-z0-9]+?)\?$/giu;

export type TemplateParser = (template: DocumentFragment) => { props: PropBinding[] };

export const templateParser: TemplateParser = (template) => {
	const props: PropBinding[] = [];
	const loopProps = new Map<Element, { item: string, list: string }>();

	const processNode = (node: Node) => {
		if (node.nodeType === Node.ELEMENT_NODE) {
			const { attributes } = node as Element;
			const loopProp = loopProps.get(node.parentElement as Element);

			for (const attribute of [...attributes]) {
				// If the prop is the same as the loop item, skip it
				if (attribute.value === loopProp?.item) {
					// eslint-disable-next-line no-continue
					continue;
				}

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
				} else if (attribute.name === 's-if') {
					const { prop } = attribute.value.match(CONDITIONAL_REGEX)?.groups ?? {};

					if (!prop) {
						throw new Error(`Invalid conditional syntax: ${attribute.value}`);
					}

					props.push({
						prop,
						element: node as HTMLElement,
						type: 'conditional'
					});

					(node as Element).removeAttribute(attribute.name);
				} else if (attribute.name === 's-for') {
					const { list, item } = attribute.value.match(LOOP_REGEX)?.groups ?? {};

					if (!list || !item) {
						throw new Error(`Invalid loop syntax: ${attribute.value}`);
					}

					props.push({
						prop: list,
						element: node as HTMLElement,
						type: 'loop'
					});

					loopProps.set(node as Element, { list, item });

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
