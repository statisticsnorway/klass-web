import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import api from "../middleware/api";
import rootReducer from "../reducers";
import { createLogger } from "redux-logger";
import { persistState } from "@redux-devtools/core";

// Dynamic import for DevTools container
let DevTools;

if (process.env.NODE_ENV !== "production") {
  import("../containers/DevTools").then((module) => {
    DevTools = module.default;
  });
}

export default function configureStore(initialState) {
  let enhancer;
  const logger = createLogger({
    level: "info",
    collapsed: false,
    logger: console,
  });

  if (process.env.NODE_ENV !== "production") {
    const getDebugSessionKey = function () {
      // By default, we try to read the key from ?debug_session=<key> in the address bar
      const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
      return matches && matches.length ? matches[1] : null;
    };

    enhancer = compose(
      // Middleware we want to use in development
      applyMiddleware(thunk, api ),
      window.devToolsExtension
        ? window.devToolsExtension()
        : (DevTools && DevTools.instrument()) || compose,

      // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
      persistState(getDebugSessionKey())
    );
  } else {
    enhancer = compose(applyMiddleware(thunk, api));
  }

  const store = createStore(rootReducer, initialState, enhancer);

  // Enable Webpack hot module replacement for reducers
  if (import.meta.hot) {
    import.meta.hot.accept("../reducers", async () => {
      const newRootReducer = (await import("../reducers")).default;
      store.replaceReducer(newRootReducer);
    });
  }

  return store;
}
