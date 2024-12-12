import "../styles/main.scss";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { Router, useRouterHistory } from "react-router";
import createBrowserHistory from "history/lib/createBrowserHistory";
import counterpart from "counterpart";
import SSBHeader from "./ssbHeader";
import SSBFooter from "./ssbFooter";
import routes from "./routes";
import ReactGA from "react-ga";
import config from "./config";

// Import locales from the project
import deLocale from "counterpart/locales/de";
import enLocale from "./locales/en";
import nnLocale from "./locales/nn";
import nbLocale from "./locales/nb";
import { translate } from "./lib/languageUtils";

// Register translations
counterpart.registerTranslations("de", deLocale);
counterpart.registerTranslations("en", enLocale);
counterpart.registerTranslations("nn", nnLocale);
counterpart.registerTranslations("nb", nbLocale);

// Handle locale and language selection
let englishUrl = false;
const selectedLanguage = sessionStorage.getItem("selectedLanguage") || "nb";

if (document.URL.match(/https?:\/\/.*?\/en\//)) {
  sessionStorage.setItem("selectedLanguage", "en");
  sessionStorage.setItem("selectedAPILanguage", "en");
  counterpart.setLocale("en");
  englishUrl = true;
} else {
  sessionStorage.setItem("selectedLanguage", "nb");
  sessionStorage.setItem("selectedAPILanguage", "nb");
  counterpart.setLocale("nb");
  englishUrl = false;
}

document.title = translate("PAGE.TITLE");

// Handle base name for routing
let baseName = "/klass";
if (document.URL.includes("/klass-ssb-no/")) {
  baseName = "/klass-ssb-no";
} else if (document.URL.includes("/klass.ssb.no/")) {
  baseName = "/klass.ssb.no";
}
if (englishUrl) {
  baseName = `/en${baseName}`;
}

// Rewrite URL rules
const hashBangRegex = new RegExp(`(.*)(${baseName})/(#!/)(.*)`);
const hashRegex = new RegExp(`(.*)(${baseName})/(#/)(.*)`);

if (document.URL.match(hashBangRegex)) {
  const location = document.URL.replace(hashBangRegex, "$1$2/$4");
  window.location = location;
} else if (document.URL.match(hashRegex)) {
  const location = document.URL.replace(hashRegex, "$1$2/$4");
  window.location = location;
}

// Configure Redux store and app history
const appHistory = useRouterHistory(createBrowserHistory)({
  basename: baseName,
});
const store = configureStore();
const rootElement = document.getElementById("app");

// Google Analytics tracking
ReactGA.initialize(config.GA_TRACKING_ID);
function gaTracking() {
  ReactGA.pageview(window.location.pathname + window.location.hash);
}

// Main App component
const ComponentEl = (
  <div>
    <SSBHeader />
    <div id="page">
      <div className="sitewrapper">
        <Router history={appHistory} routes={routes} onUpdate={gaTracking} />
      </div>
    </div>
    <SSBFooter />
  </div>
);

// Render the React application to the DOM
ReactDOM.render(<Provider store={store}>{ComponentEl}</Provider>, rootElement);
