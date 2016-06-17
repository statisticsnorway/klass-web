import Express from 'express';
import path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { RoutingContext, match } from 'react-router';

import { createMemoryHistory, useQueries } from 'history';
import compression from 'compression';
import Promise from 'bluebird';

import configureStore from '../store/configureStore';
import crateRoutes from '../routes';
import cors from 'cors';

import { Provider } from 'react-redux';

let server = new Express();
let port = process.env.PORT || 3001;
let scriptSrcs;

let styleSrc;

scriptSrcs = [
	'http://localhost:3000/js/vendor.js',
	'http://localhost:3000/js/dev.js',
	'http://localhost:3000/js/app.js'
];
styleSrc = '/main.css';

// server.use(compression());
// server.use(Express.static(path.join(__dirname, '../..', 'dist')));
// server.set('views', path.join(__dirname, 'views'));
// server.set('view engine', 'ejs');

server.use(cors());

// mock apis

server.get('/classifications/:id/codes.csv', (req, res)=> {
  let mock_data = require('./mock_data/changes');
  res.send(mock_data);
});

server.get('/classifications/:id/changes', (req, res)=> {
  let mock_data = require('./mock_data/changes');
  res.send(mock_data);
});

server.get('/classifications/search', (req, res)=> {
	let mock_data;
	try {
		mock_data = require('./mock_data/search/search_' + req.params('query'));
	} catch (ex) {
		mock_data = require('./mock_data/search');
	}
  res.send(mock_data);
});

server.get('/ssbsections', (req, res)=> {
  let mock_data = require('./mock_data/ssbsections');
  res.send(mock_data);
});

server.get('/classificationfamilies', (req, res)=> {
  let mock_data = require('./mock_data/classificationfamilies');
  res.send(mock_data);
});

server.get('/classificationfamilies/:id', (req, res)=> {
	let mock_data;
	try {
		mock_data = require('./mock_data/classificationfamilies/classificationfamily_' + req.params.id);
	} catch (ex) {
		mock_data = require('./mock_data/classificationfamilies/classificationfamily');
	}
  res.send(mock_data);
});

server.get('/classifications', (req, res)=> {
  let mock_data = require('./mock_data/classifications');
  res.send(mock_data);
});

server.get('/classifications/:id', (req, res)=> {
	let mock_data;
	try {
		mock_data = require('./mock_data/classifications/classification_' + req.params.id);
	} catch (ex) {
		mock_data = require('./mock_data/classifications/classification');
	}
  res.send(mock_data);
});

server.get('/versions/:id', (req, res)=> {
  // let mock_data = require('./mock_data/versions');
	let mock_data;
	try {
		mock_data = require('./mock_data/versions/version_' + req.params.id);
	} catch (ex) {
		mock_data = require('./mock_data/versions/version');
	}
  res.send(mock_data);
});

server.get('/correspondencetables/:id', (req, res)=> {
  // let mock_data = require('./mock_data/versions');
	let mock_data;
	try {
		mock_data = require('./mock_data/correspondences/correspondence_' + req.params.id);
	} catch (ex) {
		mock_data = require('./mock_data/correspondences');
	}
  res.send(mock_data);
});

server.get('/variants/:id', (req, res)=> {
  // let mock_data = require('./mock_data/variants');
	let mock_data;
	try {
		mock_data = require('./mock_data/variants/variant_' + req.params.id);
	} catch (ex) {
		mock_data = require('./mock_data/variants/variant');
	}
  res.send(mock_data);
});

console.log(`Server is listening to port: ${port}`);
server.listen(port);
