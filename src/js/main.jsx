import "../styles/main.scss";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { BrowserRouter as Router } from "react-router-dom";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import SSBHeader from "./ssbHeader";
import SSBFooter from "./ssbFooter";
import RoutesConfig from "./routes";
import ReactGA from "react-ga";
import config from "./config";

import enTranslations from "./locales/en.js";
import nnTranslations from "./locales/nn.js";
import nbTranslations from "./locales/nb.js";
import { translate } from "./lib/languageUtils";

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    nn: { translation: nnTranslations },
    nb: { translation: nbTranslations },
  },
  lng: sessionStorage.getItem("selectedLanguage") || "nb",
  fallbackLng: "nb",
  interpolation: {
    escapeValue: false,
  },
});

let englishUrl = false;
const selectedLanguage = sessionStorage.getItem("selectedLanguage") || "nb";

if (document.URL.match(/https?:\/\/.*?\/en\//)) {
  sessionStorage.setItem("selectedLanguage", "en");
  sessionStorage.setItem("selectedAPILanguage", "en");
  i18next.changeLanguage("en");
  englishUrl = true;
} else {
  sessionStorage.setItem("selectedLanguage", "nb");
  sessionStorage.setItem("selectedAPILanguage", "nb");
  i18next.changeLanguage("nb");
  englishUrl = false;
}

document.title = translate("PAGE.TITLE");

let baseName = "/klass";
if (document.URL.includes("/klass-ssb-no/")) {
  baseName = "/klass-ssb-no";
} else if (document.URL.includes("/klass.ssb.no/")) {
  baseName = "/klass.ssb.no";
}
if (englishUrl) {
  baseName = `/en${baseName}`;
}

ReactGA.initialize(config.GA_TRACKING_ID);
function gaTracking() {
  ReactGA.pageview(window.location.pathname + window.location.hash);
}

const store = configureStore();
const rootElement = document.getElementById("app");

const ComponentEl = (
  <div>
    <SSBHeader />
    <div id="page">
      <div className="sitewrapper">
        <Router basename={baseName}>
          <RoutesConfig />
        </Router>
      </div>
    </div>
    <SSBFooter />
  </div>
);

const root = ReactDOM.createRoot(rootElement);
root.render(<Provider store={store}>{ComponentEl}</Provider>);
