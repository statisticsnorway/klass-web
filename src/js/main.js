import "../styles/main.scss";

import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import configureStore from "./store/configureStore";
import {Router, useRouterHistory} from "react-router";
import createBrowserHistory from "history/lib/createBrowserHistory";
import counterpart from "counterpart";
import SSBHeader from "./SSBHeader";
import SSBFooter from "./SSBFooter";

import routes from "./routes";
import ReactGA from "react-ga";
import config from "./config";


let baseName;
if (document.URL.match("\/klass-ssb-no\/")) {
    baseName = "/klass-ssb-no";
}else if (document.URL.match("\/klass.ssb.no\/")) {
    baseName = "/klass.ssb.no";
}else {
    baseName ="/klass";
}

const appHistory = useRouterHistory(createBrowserHistory)({basename: baseName})
const store = configureStore();
const rootElement = document.getElementById('app');

const hashBangRegex = new RegExp("(.*)(" + baseName + ")\/(#!\/)(.*)");
const hashRegex     = new RegExp("(.*)(" + baseName + ")\/(#\/)(.*)");

if (document.URL.match(hashBangRegex)) {
    let location = document.URL.replace(hashBangRegex, "$1$2/$4");
    window.location = location
}else if (document.URL.match(hashRegex)) {
    let location = document.URL.replace(hashRegex, "$1$2/$4");
    window.location = location
}

// this is required to disable counterpart's warning
// about a missing pluralization algorithm for German
counterpart.registerTranslations('de', require('counterpart/locales/de'));

counterpart.registerTranslations('en', require('./locales/en'))
counterpart.registerTranslations('nn', require('./locales/nn'))
counterpart.registerTranslations('nb', require('./locales/nb'))

counterpart.setLocale(sessionStorage.getItem('selectedLanguage'));
if (document.URL.match("http(s?):\/\/.*?\/en\/")) {
    sessionStorage.setItem('selectedLanguage', "en")
    sessionStorage.setItem('selectedAPILanguage', "en")
    counterpart.setLocale('en')
} else {
    sessionStorage.setItem('selectedLanguage', "nb")
    sessionStorage.setItem('selectedAPILanguage', "nb")
    counterpart.setLocale('nb')
}
document.title = counterpart.translate("PAGE.TITLE");




function gaTracking() {
    ReactGA.pageview(window.location.pathname + window.location.hash);
}

ReactGA.initialize(config.GA_TRACKING_ID);
let ComponentEl;
	ComponentEl = (
        <div>
            {/*<PerfProfiler />*/}
            <SSBHeader />
            <div id="page">
                <div className="sitewrapper">
                    <Router history={appHistory} routes={routes} onUpdate={gaTracking}/>
                </div>
            </div>
            <SSBFooter />
        </div>
	);
// }

// Render the React application to the DOM
ReactDOM.render(
  	<Provider store={store}>
    	{ComponentEl}
  	</Provider>,
  	rootElement
);

