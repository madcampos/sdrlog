if (!('URLPattern' in globalThis)) {
	await import('urlpattern-polyfill');
}

type IsParameter<Part> = Part extends `:${infer ParamName}` ? ParamName : never;

type FilteredParts<Path> = Path extends `${infer PartA}/${infer PartB}`
	? IsParameter<PartA> | FilteredParts<PartB>
	: IsParameter<Path>;

type Params<Path> = {
	[Key in FilteredParts<Path>]: string;
};

export interface RouteLocation<Path = string> {
	path: Path,
	params: Params<Path>,
	query?: Record<string, string | undefined>,
	hash?: string
}

type RenderHandler<DestinationPath = string, OriginPath = string> = (origin: RouteLocation<OriginPath>, destination: RouteLocation<DestinationPath>) => void;

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
type RouteGuardReturnTypes = false | RouteLocation | void | Promise<false | RouteLocation | void>;

type RouteGuardHandler<DestinationPath = string, OriginPath = string> = (origin: OriginPath, destination: DestinationPath) => RouteGuardReturnTypes;

export interface View {
	readonly template: string,
	readonly rootElement: HTMLElement,
	render: RenderHandler
}

type ViewImplementation = new (rootElement: HTMLElement) => View;


interface RouteDefinition<Path = string> {
	path: Path,
	view: ViewImplementation,
	guard?: RouteGuardHandler<Path>
}

interface RouterConfig {
	routes: RouteDefinition[],
	baseUrl: string,
	attribute?: string,
	beforeEach?: RouteGuardHandler,
	fallback?: View
}

export class Router {
	static #routes: [URLPattern, View][] = [];
	static #beforeEach: RouteGuardHandler | undefined;
	static #fallback: View | undefined;
	static readonly #fallbackPattern = new URLPattern({ pathname: '*' });
	static #selectorAttribute = 'router-link';
	static #baseUrl: string;

	static #currentPath = '';
	static #currentLocation: RouteLocation;

	static get selectorAttribute() {
		return this.#selectorAttribute;
	}

	// @ts-expect-error
	static get beforeEach(): RouteGuardHandler | undefined {
		return Router.#beforeEach;
	}

	static set beforeEach(handler: RouteGuardHandler) {
		Router.#beforeEach = handler;
	}

	// @ts-expect-error
	static get fallback(): View | undefined {
		return Router.#fallback;
	}

	static set fallback(view: View) {
		Router.#fallback = view;
	}

	static add<T extends ViewImplementation>(path: string, ViewClass: T) {
		const view = new ViewClass(document.createElement('main'));

		Router.#routes.push([new URLPattern({ pathname: path }), view]);
	}

	static async navigate(path: string) {
		try {
			if (Router.#currentPath === path) {
				return;
			}

			const guardResult = await Router.#beforeEach?.(this.#currentPath, path);

			if (guardResult === false) {
				return;
			}

			const pathToSearch = guardResult?.path ?? path;

			const [matcher, view] = Router.#routes.find(([pattern]) => pattern.test(pathToSearch, this.#baseUrl)) ?? [];

			if (matcher !== undefined && view) {
				const destinationMatcher = matcher.exec(pathToSearch, Router.#baseUrl);
				const destination: RouteLocation = {
					path: pathToSearch,
					params: destinationMatcher?.pathname.groups ?? {},
					query: destinationMatcher?.search.groups ?? {},
					hash: destinationMatcher?.hash.input
				};

				// TODO: change method to something like `navigate`
				// TODO: use singleton to create views if they don't not exist or change it to display none/block if they exist
				// Ref: https://github.com/hamedasemi/lit-element-router/blob/mainline/lit-element-router.js#L133-L149
				view.render(Router.#currentLocation, destination);

				document.querySelector('main')?.replaceWith(view.rootElement);

				/* eslint-disable require-atomic-updates */
				Router.#currentPath = pathToSearch;
				Router.#currentLocation = destination;
				/* eslint-enable require-atomic-updates */

				window.history.pushState(null, '', path);
			}
		} catch (err) {
			console.error(`[⛵️] Error while navigating to ${path}:`, err);
		}
	}

	static init({ routes, baseUrl, attribute, beforeEach, fallback }: RouterConfig) {
		Router.#baseUrl = baseUrl;

		const currentMatcher = Router.#fallbackPattern.exec(window.location.href, Router.#baseUrl);

		Router.#currentPath = currentMatcher?.pathname.input ?? '';
		Router.#currentLocation = {
			path: Router.#currentPath,
			params: currentMatcher?.pathname.groups ?? {},
			query: currentMatcher?.search.groups ?? {},
			hash: currentMatcher?.hash.input
		};

		routes.forEach(({ path, view }) => Router.add(path, view));

		if (attribute) {
			Router.#selectorAttribute = attribute;
		}

		if (beforeEach) {
			Router.beforeEach = beforeEach;
		}

		if (fallback) {
			Router.fallback = fallback;
		}

		window.addEventListener('popstate', async (evt) => {
			evt.preventDefault();
			evt.stopPropagation();

			await Router.navigate(window.location.href);
		});

		window.addEventListener('hashchange', async () => {
			await Router.navigate(window.location.href);
		});

		window.addEventListener('click', async (evt) => {
			const element = evt.target as HTMLElement;

			if (element.matches(`a[${Router.#selectorAttribute}]`)) {
				evt.preventDefault();
				evt.stopPropagation();

				// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
				const path = element.getAttribute(Router.#selectorAttribute) || element.getAttribute('href');

				if (path) {
					await Router.navigate(path);
				}
			}
		});

		// eslint-disable-next-line no-console
		console.info('[⛵️] Router initialized');

		void Router.navigate(window.location.href);
	}
}

export class RouterLink extends HTMLElement {
	static get observedAttributes() { return ['to']; }

	#root: ShadowRoot;

	constructor(link = '/') {
		super();

		const template = document.createElement('template');

		template.innerHTML = `<a href="${link}"><slot></slot></a>`;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));

		this.#root.querySelector('a')?.addEventListener('click', (evt) => {
			evt.preventDefault();
			evt.stopPropagation();

			const target = evt.target as HTMLAnchorElement;
			const path = target.getAttribute('href');

			if (path) {
				void Router.navigate(path);
			} else {
				console.warn('[⛵️] RouterLink is missing "to" attribute');
			}
		});

		this.setAttribute(Router.selectorAttribute, link);
	}

	get to() {
		return this.getAttribute(Router.selectorAttribute) ?? '';
	}

	set to(value: string) {
		this.setAttribute(Router.selectorAttribute, value);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (name === 'to' && oldValue !== newValue) {
			this.#root.querySelector('a')?.setAttribute(Router.selectorAttribute, newValue);
		}
	}
}

customElements.define('router-link', RouterLink);
