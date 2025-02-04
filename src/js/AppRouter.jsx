import "../styles/main.scss";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import {
  BrowserRouter as Router,
  Routes,
  Route,
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
import { translate } from "./lib/languageUtils";

import enTranslations from "./locales/en.js";
import nnTranslations from "./locales/nn.js";
import nbTranslations from "./locales/nb.js";

// 1️⃣ Initialize i18next for language support
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

// 2️⃣ Detect if user is on an /en/ URL to set language
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

// 3️⃣ Set page title
document.title = translate("PAGE.TITLE");

// 4️⃣ Initialize Google Analytics
ReactGA.initialize(config.GA_TRACKING_ID);
function gaTracking() {
  ReactGA.pageview(window.location.pathname + window.location.hash);
}

// 5️⃣ Create Redux store & root element
const store = configureStore();
const rootElement = document.getElementById("app");

// 6️⃣ Set the base name for routing (e.g., /klass)
const baseName = process.env.REACT_APP_BASE_NAME || "/klass";

const ComponentEl = (
  <div>
    <SSBHeader />
    <div id="page">
      <div className="sitewrapper">
        <Router basename={baseName}>
          <Routes>
            {/* 
              Outer route: path="/" => <App />
              This acts like your top-level layout from v3 
            */}
            <Route path="/" element={<App />}>
              {/* 
                index => ClassFamiliesPage
                Replaces <IndexRoute component={ClassFamiliesPage} /> 
              */}
              <Route index element={<ClassFamiliesPage />} />

              {/* 
                Next we replicate your old optional segments. 
                1) /klassifikasjoner/:classId
                2) /klassifikasjoner/:classId/:tab  <-- new route so /koder, /varianter, /om, etc. works
                3) /klassifikasjoner/:classId/versjon/:versionId
                4) /klassifikasjoner/:classId/versjon/:versionId/:tab
                5) /klassifikasjoner/:classId/versjon/:versionId/:tab/:itemId
              */}
              <Route
                path="klassifikasjoner/:classId"
                element={<ClassItemPage />}
              />
              <Route
                path="klassifikasjoner/:classId/:tab"
                element={<ClassItemPage />}
              />
              <Route
                path="klassifikasjoner/:classId/versjon/:versionId"
                element={<ClassItemPage />}
              />
              <Route
                path="klassifikasjoner/:classId/versjon/:versionId/:tab"
                element={<ClassItemPage />}
              />
              <Route
                path="klassifikasjoner/:classId/versjon/:versionId/:tab/:itemId"
                element={<ClassItemPage />}
              />

              {/* /sok => <SearchPage /> */}
              <Route path="sok" element={<SearchPage />} />

              {/* /404 => NotFoundView */}
              <Route path="404" element={<NotFoundView />} />

              {/* Fallback => Navigate to /404 */}
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
