/* eslint-disable max-lines */

import { type PropBinding, type TemplateParser, templateParser } from './serialization';

import baseStyle from './BaseComponent.css?raw';

type PropPrimitiveTypes = boolean | string | number | object;

type ComputedPropHandler<T extends PropPrimitiveTypes> = (newValue?: T) => T;

type PropTypes = PropPrimitiveTypes | ComputedPropHandler<PropPrimitiveTypes>;

export type PropValidationHandler = (value: PropTypes) => void;

interface PropDefinition<T extends PropTypes> {
	name: string,
	value: T,
	validate?: PropValidationHandler,
	attributeName?: string
}

type EventHandler = (evt: Event) => void | Promise<void>;

type Prop<T extends PropTypes> = PropDefinition<T> & {
	boundAttributes: [HTMLElement, string][],
	boundElements: HTMLElement[],
	boundLoops: {
		element: HTMLElement,
		template: HTMLTemplateElement,
		props: PropBinding[]
	}[]
};

type WatchedSlotEvent = Event & { target: HTMLSlotElement };

type WatchedSlotHandler = (evt: WatchedSlotEvent) => void;

type WatchedSlots = Record<string, WatchedSlotHandler | undefined>;

type ElementTemplate = string | HTMLTemplateElement;

export interface CustomElementInterface {
	observedAttributes?: string[],
	connectedCallback?(): void | Promise<void>,
	disconnectedCallback?(): void | Promise<void>,
	adoptedCallback?(): void | Promise<void>,
	attributeChangedCallback?(name: string, oldValue: string, newValue: string): void | Promise<void>
}

interface SdrComponentConstructor {
	name: string,
	watchedSlots?: WatchedSlots,
	props?: PropDefinition<PropTypes>[],
	watchedAttributes?: string[],
	template?: ElementTemplate,
	style?: string,
	handlers?: Record<string, EventHandler>
}

export class SdrComponent extends HTMLElement implements CustomElementInterface {
	static formAssociated = true;

	static get elementName(): string { throw new Error('Element name is not defined'); }

	#watchedSlots: WatchedSlots = {};
	#props = new Map<string, Prop<PropTypes>>();
	#computedPropsCache = new Map<string, PropPrimitiveTypes>();
	#watchedAttributes = new Map<string, string>();
	#root: ShadowRoot;
	#internals: ElementInternals | undefined = undefined;
	#elementId = 'NO ID';

	handlers: Record<string, EventHandler | undefined> = {};
	name = 'NO NAME';

	constructor({ name, template, watchedSlots, props, watchedAttributes, style, handlers }: SdrComponentConstructor) {
		super();

		this.name = name;
		this.#elementId = `${this.name}-${SdrComponent.uniqueID}`;
		this.#root = this.attachShadow({ mode: 'closed', delegatesFocus: true });

		if ('attachInternals' in this) {
			this.#internals = this.attachInternals();
		}

		this.addStyle(baseStyle);

		const { props: parsedProps, template: parsedTemplate } = this.#parseTemplate(template);

		if (style && style !== '') {
			this.addStyle(style);
		}

		this.#root.addEventListener('slotchange', (evt) => {
			const slot = (evt.target as HTMLSlotElement).name || 'default';

			this.#watchedSlots[slot]?.(evt as WatchedSlotEvent);
		});

		this.#root.appendChild(parsedTemplate);

		if (handlers) {
			Object.entries(handlers).forEach(([handlerName, handler]) => {
				this.handlers[handlerName] = handler.bind(this);
			});
		}

		const parsedHandlers = parsedProps.filter((prop) => prop.type === 'event');

		for (const handler of parsedHandlers) {
			if (this.handlers[handler.prop] === undefined) {
				throw new Error(`Handler "${handler.prop}" is not defined in watched handlers`);
			}

			handler.element.addEventListener(handler.attribute as string, (evt) => {
				void this.handlers[handler.prop]?.(evt);
			});
		}

		for (const prop of props ?? []) {
			this.watchProp(prop);
		}

		const simplePropsTypes = ['attribute', 'text'];
		const simpleParsedProps = parsedProps.filter((prop) => simplePropsTypes.includes(prop.type));

		for (const prop of simpleParsedProps) {
			if (!this.#props.has(prop.prop)) {
				throw new Error(`Prop "${prop.prop}" is not defined in watched props`);
			}

			if (!prop.attribute) {
				this.#bindPropToInternalElement(prop.prop, prop.element);
			} else {
				this.#bindPropToInternalAttribute(prop.prop, prop.attribute, prop.element);
			}
		}

		const loopProps = parsedProps.filter((prop) => prop.type === 'loop');

		for (const prop of loopProps) {
			if (!this.#props.has(prop.prop)) {
				throw new Error(`Prop "${prop.prop}" is not defined in watched props`);
			}

			this.#bindPropToLoop(prop.prop, prop.element);
		}

		for (const attribute of watchedAttributes ?? []) {
			if (!this.#watchedAttributes.has(attribute)) {
				throw new Error(`Attribute "${attribute}" is not defined in props`);
			}
		}

		if (watchedSlots) {
			this.#watchedSlots = watchedSlots;
		}
	}

	static get uniqueID() {
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		return Math.trunc(Math.random() * 10000000).toString(16);
	}

	get elementId() {
		return this.#elementId;
	}

	get root() {
		return this.#root;
	}

	get internals() {
		return this.#internals;
	}

	#parseTemplate(template?: ElementTemplate) {
		const tempTemplate = document.createElement('template');

		if (typeof template === 'string') {
			tempTemplate.innerHTML = template;
		} else if (template instanceof HTMLTemplateElement) {
			tempTemplate.content.appendChild(template.content.cloneNode(true));
		} else {
			throw new TypeError('Template must be a string or HTMLTemplateElement');
		}

		if (tempTemplate.content.children.length === 0) {
			throw new Error('Template is empty');
		}

		if (tempTemplate.content.children[0] instanceof HTMLTemplateElement) {
			// eslint-disable-next-line prefer-destructuring
			const wrappedTemplate = tempTemplate.content.children[0];

			tempTemplate.content.removeChild(wrappedTemplate);

			[...wrappedTemplate.content.children].forEach((child) => {
				tempTemplate.content.appendChild(child);
			});
		}

		const domTree = tempTemplate.content.cloneNode(true) as DocumentFragment;

		const { props } = SdrComponent.templateParser(domTree);

		return {
			template: domTree,
			props
		};
	}

	#parseValue(value: string | null, type: PropTypes) {
		let parsedValue: PropTypes;

		switch (type) {
			case 'number':
				parsedValue = Number.parseFloat(value ?? '0');
				break;
			case 'boolean':
				parsedValue = value !== null;
				break;
			case 'object':
				parsedValue = JSON.parse(value ?? '{}');
				break;
			default:
				parsedValue = value ?? '';
				break;
		}

		return parsedValue;
	}

	#serializePropToAttribute(attr: string, element: HTMLElement, value: PropTypes) {
		const isInputElement = element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement;
		const isClassAttribute = attr === 'class';
		const isStyleAttribute = attr === 'style';

		switch (typeof value) {
			case 'boolean':
				if (value) {
					element.setAttribute(attr, '');

					if (isInputElement && attr === 'value') {
						element.value = 'on';
					}
				} else {
					element.removeAttribute(attr);

					if (isInputElement && attr === 'value') {
						element.value = 'off';
					}
				}
				break;
			case 'object':
				element.setAttribute(attr, JSON.stringify(value));

				if (isInputElement && attr === 'value') {
					element.value = JSON.stringify(value);
				}

				if (isClassAttribute) {
					Object.values(value).forEach((className) => {
						element.classList.add(className);
					});
				}

				if (isStyleAttribute) {
					Object.entries(value).forEach(([styleName, styleValue]) => {
						element.style[styleName] = styleValue;
					});
				}
				break;
			case 'function':
				element.setAttribute(attr, '[function]');

				if (isInputElement && attr === 'value') {
					element.value = '[function]';
				}
				break;
			default:
				element.setAttribute(attr, value.toString());

				if (isInputElement && attr === 'value') {
					element.value = value.toString();
				}
				break;
		}
	}

	#serializePropToElement(element: HTMLElement, value: PropTypes) {
		switch (typeof value) {
			case 'object':
				element.textContent = JSON.stringify(value);
				break;
			case 'function':
				element.textContent = '[function]';
				break;
			default:
				element.textContent = value.toString();
				break;
		}
	}

	#getPropValue(name: string) {
		return this.#props.get(name)?.value as PropPrimitiveTypes;
	}

	#getComputedPropValue<T extends PropPrimitiveTypes>(name: string): T {
		if (!this.#computedPropsCache.has(name)) {
			const prop = this.#props.get(name) as Prop<T>;

			this.#updateProp(name, prop.value, true);
		}

		const computedValue = this.#computedPropsCache.get(name) as T;

		return computedValue;
	}

	#propagatePropUpdates<T extends PropTypes>(prop: Prop<T>, newValue: T) {
		prop.validate?.(newValue);

		prop.boundAttributes.forEach(([boundElement, attr]) => {
			this.#serializePropToAttribute(attr, boundElement, newValue);
		});

		prop.boundElements.forEach((boundElement) => {
			this.#serializePropToElement(boundElement, newValue);
		});

		if (prop.attributeName) {
			this.#serializePropToAttribute(prop.attributeName, this, newValue);
		}

		prop.boundLoops.forEach((boundLoop) => {
			// TODO: Implement loop update
		});
	}

	#updateProp(propName: string, value: PropTypes, forceUpdate = false) {
		const prop = this.#props.get(propName) as Prop<typeof value>;

		if (typeof prop.value === 'function') {
			let tempValue = value;

			// Don't stringify functions, instead call it without any value
			if (typeof tempValue === 'function') {
				tempValue = undefined as unknown as typeof value;
			}

			tempValue = (prop.value as ComputedPropHandler<typeof value>)(tempValue);

			this.#computedPropsCache.set(propName, tempValue);
			this.#propagatePropUpdates(prop, tempValue);
		} else if (prop.value !== value || forceUpdate) {
			this.#propagatePropUpdates(prop, value);

			if (typeof prop.value !== 'object') {
				prop.value = value;
			}
		}
	}

	#bindPropToInternalAttribute(prop: string, attributeName: string, element: HTMLElement) {
		this.#props.get(prop)?.boundAttributes.push([element, attributeName]);
	}

	#bindPropToInternalElement(propName: string, element: HTMLElement) {
		const prop = this.#props.get(propName) as Prop<PropTypes>;

		if (typeof prop.value === 'function') {
			this.#serializePropToElement(element, '');
		} else {
			this.#serializePropToElement(element, prop.value);
		}

		prop.boundElements.push(element);
	}

	#bindPropToLoop(prop: string, element: HTMLElement) {
		const elementTemplate = document.createElement('template');

		elementTemplate.content.append(...element.childNodes);

		const { props } = SdrComponent.templateParser(elementTemplate.content);

		this.#props.get(prop)?.boundLoops.push({
			element,
			template: elementTemplate,
			props
		});

		// TODO: render loop inside element
	}

	static templateParser: TemplateParser = (template) => templateParser(template);

	watchProp({ name, value, attributeName, validate }: PropDefinition<PropTypes>) {
		let propValue = value;

		if (typeof value === 'object') {
			propValue = new Proxy(value, {
				set: (target, prop, newValue) => {
					target[prop] = newValue;

					this.#updateProp(name, target);

					return true;
				},
				deleteProperty: (target, prop) => {
					if (prop in target) {
						// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
						delete target[prop];

						this.#updateProp(name, target);

						return true;
					}

					return false;
				},
				defineProperty: (target, property, attributes) => {
					Object.defineProperty(target, property, attributes);

					this.#updateProp(name, target);

					return true;
				}
			});
		}

		this.#props.set(name, {
			name,
			value: propValue,
			boundAttributes: [],
			boundElements: [],
			boundLoops: [],
			validate,
			attributeName
		});

		if (attributeName) {
			this.#watchedAttributes.set(attributeName, name);
		}

		if (typeof value === 'function') {
			Object.defineProperty(this, name, {
				configurable: false,
				enumerable: true,
				get(): typeof value {
					return this.#getComputedPropValue(name);
				},
				set(newValue: typeof value) {
					this.#updateProp(name, newValue);
				}
			});
		} else {
			Object.defineProperty(this, name, {
				configurable: false,
				enumerable: true,
				get(): typeof value {
					return this.#getPropValue(name);
				},
				set(newValue: typeof value) {
					this.#updateProp(name, newValue);
				}
			});
		}
	}

	updateComputedProp(name: string, value: PropTypes) {
		const prop = this.#props.get(name);

		if (typeof prop?.value !== 'function') {
			throw new Error(`"${name}" is not a computed prop`);
		}

		this.#updateProp(name, value, true);
	}

	addStyle(style: string) {
		const stylesheet = document.createElement('style');

		stylesheet.innerHTML = style;

		this.#root.insertBefore(stylesheet, this.#root.firstChild);
	}

	connectedCallback() {
		// Props have to be updated after the component is initialized
		this.#props.forEach((prop) => {
			if (!prop.attributeName) {
				this.#updateProp(prop.name, prop.value, true);
			}
		});
	}

	adoptedCallback() {
		// NOOP
	}

	disconnectedCallback() {
		// NOOP
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			const propName = this.#watchedAttributes.get(name) ?? '';
			const prop = this.#props.get(propName);

			if (prop) {
				if (typeof prop.value === 'function') {
					this.#updateProp(propName, newValue, true);
				} else {
					const propValue = this.#parseValue(newValue, typeof prop.value);

					this.#updateProp(prop.name, propValue);
				}
			}
		}
	}
}

export function registerComponent(component: typeof SdrComponent & { elementName: string }) {
	if (!component.elementName) {
		throw new Error('Component must have a name');
	}

	if (!customElements.get(component.elementName)) {
		customElements.define(component.elementName, component);
	}
}
