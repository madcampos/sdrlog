export interface PropBinding {
	propName: string,
	boundElement: HTMLElement,
	boundAttribute?: string
}

export interface HandlerBinding {
	eventName: string,
	handlerName: string,
	boundElement: HTMLElement
}

export type TemplateParser = (template: DocumentFragment) => { props: PropBinding[], handlers: HandlerBinding[] };

export const templateParser: TemplateParser = (template) => {
	const props: PropBinding[] = [];
	const handlers: HandlerBinding[] = [];

	const processNode = (node: Node) => {
		if (node.nodeType === Node.ELEMENT_NODE) {
			const { attributes } = node as Element;

			for (const attribute of [...attributes]) {
				if ((/^(?:a-bind:|:)/giu).test(attribute.name)) {
					const attributeName = attribute.name.replace(/^(?:a-bind:|:)/giu, '');
					const prop = attribute.value;

					props.push({
						propName: prop,
						boundElement: node as HTMLElement,
						boundAttribute: attributeName
					});

					(node as Element).removeAttribute(attribute.name);
				} else if ((/^(?:a-on:|@)/giu).test(attribute.name)) {
					const eventName = attribute.name.replace(/^(?:a-on:|@)/giu, '');
					const handlerName = attribute.value;

					handlers.push({
						eventName,
						handlerName,
						boundElement: node as HTMLElement
					});

					(node as Element).removeAttribute(attribute.name);
				}
			}
		}

		if (node.nodeType === Node.TEXT_NODE) {
			const propMatch = node.textContent?.matchAll(/\{\{([a-z][a-z0-9]+?)\}\}/giu) ?? [];

			for (const [, prop] of propMatch) {
				props.push({
					propName: prop,
					boundElement: node.parentElement as HTMLElement
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
		props,
		handlers
	};
};
