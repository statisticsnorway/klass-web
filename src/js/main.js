import '../styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore  from './store/configureStore';
import { Router, browserHistory } from 'react-router';
import counterpart from 'counterpart'

import routes from './routes';

const store = configureStore();
const rootElement = document.getElementById('app');

// this is required to disable counterpart's warning
// about a missing pluralization algorithm for German
counterpart.registerTranslations('DE', require('counterpart/locales/de'));

counterpart.registerTranslations('EN', require('./locales/en'))
counterpart.registerTranslations('NO', require('./locales/no'))

counterpart.setLocale('NO');		// TODO: Will be set from topmenu in outer frame

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
		<div className="sitewrapper">
			<div id="navigation-path">
				<h2 className="screen-reader-only">Du er her:</h2>
				<ul id="breadcrumbs" className="nav leftadjust">
					<li><a href="/">Forsiden</a> > </li>
					<li>Klassifikasjoner og kodelister</li>
				</ul>
			</div>
			<Router history={browserHistory} routes={routes}/>
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
