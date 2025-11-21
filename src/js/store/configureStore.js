import { persistState } from "@redux-devtools/core";
import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import api from "../middleware/api";
import rootReducer from "../reducers";

export default function configureStore(initialState) {
	let enhancer;
	const logger = createLogger({
		level: "info",
		collapsed: false,
		logger: console,
	});

	if (process.env.NODE_ENV !== "production") {
		const getDebugSessionKey = () => {
			// By default we try to read the key from ?debug_session=<key> in the address bar
			const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
			return matches && matches.length ? matches[1] : null;
		};

		enhancer = compose(
			// Middleware we want to use in development
			applyMiddleware(thunk, api, logger),
			window.devToolsExtension
				? window.devToolsExtension()
				: require("../containers/DevTools").default.instrument(),

			// Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
			persistState(getDebugSessionKey()),
		);
	} else {
		enhancer = compose(applyMiddleware(thunk, api));
	}

	const store = createStore(rootReducer, initialState, enhancer);

	// Enable Webpack hot module replacement for reducers
	if (module.hot) {
		module.hot.accept("../reducers", () =>
			store.replaceReducer(require("../reducers").default),
		);
	}

	return store;
}
