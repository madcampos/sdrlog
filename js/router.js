const routes = new Map();

//Monkey-patch history to add pushState and replaceState event dispatching.
class PushStateEvent extends Event{
	constructor(state){
		super('pushstate');
		this.state = state;
	}

	get [Symbol.toStringTag](){
		return 'PushStateEvent';
	}
}

class ReplaceStateEvent extends Event{
	constructor(state){
		super('replacestate');
		this.state = state;
	}

	get [Symbol.toStringTag](){
		return 'ReplaceStateEvent';
	}
}

(function(history){
	const oldPushState = history.pushState;
	const oldReplaceState = history.replaceState;

	history.pushState = function(state, ...args){
		if (typeof history.onpushstate === 'function') {
			history.onpushstate({state: state});
		}

		window.dispatchEvent(new PushStateEvent(state));
		oldPushState.apply(history, [state, ...args]);
	}

	history.replaceState = function(state, ...args){
		if (typeof history.onreplacestate === 'function') {
			history.onreplacestate({state: state});
		}

		window.dispatchEvent(new ReplaceStateEvent(state));
		oldReplaceState.apply(history, [state, ...args]);
	}
})(window.history);


/**
 * Gets the current route.
 * @returns {URLSearchParams} The current route.
 */
function getCurrentRoute(){
	return new URLSearchParams(window.location.search);
}

/**
 * Sets the router to the route passed and execute the associated method.
 * @param {String|URLSearchParams} route The route to use.
 * @returns {Boolean} If the operation succeded.
 */
function setCurrentRoute(route){
	const search = new URLSearchParams(route);

	for (route of search.keys()) {
		if (routes.has(route)) {
			/**
			 * A handler function called when the route matches.
			 * @callback HandlerFunction
			 * @param {String} route The route matched.
			 * @param {Object} [params] the named params matched.
			 */
			routes.get(route)(route, search.getAll(route));
		}
	}

	history.pushState(null, '', `?${search.toString()}`);
	return true;
}

/**
 * Adds a route and a value to this new route to the current routes.
 * @param {String} route The route string to add.
 * @param {String} param The param to this route.
 */
function addToCurrentRoute(route, param){
	const newRoute = this.getCurrentRoute();
	newRoute.append(route, param);

	this.setCurrentRoute(newRoute);
}

/**
 * Remove The routes named by route from the current routes.
 * @param {String} route The route to remove.
 */
function removeFromCurrentRoute(route){
	const newRoute = this.getCurrentRoute();
	newRoute.delete(route);

	this.setCurrentRoute(newRoute);
}

export class Router{
	/**
	 * Initialize the routes
	 * @return {Boolean} If the operation succeded.
	 */
	static init(){
		return setCurrentRoute(window.location.search);
	}

	static get routes(){
		return routes;
	}

	static get current(){
		return {
			get: getCurrentRoute,
			set: setCurrentRoute,
			append: addToCurrentRoute,
			remove: removeFromCurrentRoute,
		};
	}
}