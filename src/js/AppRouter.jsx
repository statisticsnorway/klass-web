import "../styles/main.scss";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import ReactGA from "react-ga";
import config from "./config";

import SSBHeader from "./ssbHeader";
import SSBFooter from "./ssbFooter";
import App from "./containers/App";
import ClassFamiliesPage from "./containers/ClassFamiliesPage";
import ClassItemPage from "./containers/ClassItemPage";
import SearchPage from "./containers/SearchPage";
import NotFoundView from "./views/NotFoundView";
import { TranslateComponent } from "./lib/languageUtils";
import { translate } from "./lib/languageUtils";

import enTranslations from "./locales/en.js";
import nnTranslations from "./locales/nn.js";
import nbTranslations from "./locales/nb.js";

// Initialize i18next for language support
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

// Initialize Google Analytics
ReactGA.initialize(config.GA_TRACKING_ID);
function gaTracking() {
  ReactGA.pageview(window.location.pathname + window.location.hash);
}

const store = configureStore();
const rootElement = document.getElementById("app");

// Setting the base name for routing (e.g., /klass)
const baseName = process.env.REACT_APP_BASE_NAME || "/klass"; // Can be dynamically set based on env variables

const ComponentEl = (
  <div>
    <SSBHeader />
    <div id="page">
      <div className="sitewrapper">
        <Router basename={baseName}>
          {" "}
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<ClassFamiliesPage />} />
              <Route path="klassifikasjoner" element={<ClassItemPage />}>
                <Route
                  path=":classId(/versjon/:versionId)(/:tab)(/:itemId)"
                  element={<ClassItemPage />}
                />
              </Route>
              <Route path="sok" element={<SearchPage />} />
              <Route path="404" element={<NotFoundView />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </div>
    <SSBFooter />
  </div>
);

const root = ReactDOM.createRoot(rootElement);
root.render(<Provider store={store}>{ComponentEl}</Provider>);
