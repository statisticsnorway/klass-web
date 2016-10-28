import '../styles/main.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore  from './store/configureStore'
import { Router, browserHistory, useRouterHistory  } from 'react-router'
import { createHashHistory } from 'history'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import counterpart from 'counterpart'
import SSBHeader from './SSBHeader'
import SSBFooter from './SSBFooter'

import routes from './routes';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

const store = configureStore();
const rootElement = document.getElementById('app');

// this is required to disable counterpart's warning
// about a missing pluralization algorithm for German
counterpart.registerTranslations('de', require('counterpart/locales/de'));

counterpart.registerTranslations('en', require('./locales/en'))
counterpart.registerTranslations('nn', require('./locales/nn'))
counterpart.registerTranslations('nb', require('./locales/nb'))

//if (sessionStorage.getItem('selectedLanguage')) {
    counterpart.setLocale(sessionStorage.getItem('selectedLanguage'));
//} else {
    if (document.URL.match("http(s?):\/\/.*?\/en\/")) {
        sessionStorage.setItem('selectedLanguage', "en")
        sessionStorage.setItem('selectedAPILanguage', "en")
        counterpart.setLocale('en')
    }else {
        sessionStorage.setItem('selectedLanguage', "nb")
        sessionStorage.setItem('selectedAPILanguage', "nb")
        counterpart.setLocale('nb')
    }
//}





let ComponentEl;

// if (process.env.NODE_ENV !== 'production') {
// 	const DevTools = require('./containers/DevTools').default;
//
// 	ComponentEl = (
// 		<div>
// 			<Router history={browserHistory} routes={routes}/>
// 			<DevTools/>
// 		</div>
// 	);
// } else {
	ComponentEl = (
        <div>
            <SSBHeader />
            <div id="page">
                <div className="sitewrapper">
                    <Router history={appHistory} routes={routes}/>
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
