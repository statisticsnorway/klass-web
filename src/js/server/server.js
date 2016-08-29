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

server.get('/classifications/:id/codes.csv', (req, res) => {
  let mockData = require('./mockData/changes')
  res.send(mockData);
});

server.get('/classifications/:id/changes', (req, res) => {
  let mockData;
  try {
      mockData = require('./mockData/changes/' + req.params.id);
  } catch (ex) {
      mockData = require('./mockData/changes');
  }
  res.send(mockData);
});

server.get('/classifications/search', (req, res) => {
	let mockData;
	try {
		mockData = require('./mockData/search/search_' + req.params('query'));
	} catch (ex) {
		mockData = require('./mockData/search');
	}
  res.send(mockData);
});

server.get('/ssbsections', (req, res) => {
  let mockData = require('./mockData/ssbsections');
  res.send(mockData);
});

server.get('/classificationfamilies', (req, res) => {
  let mockData = require('./mockData/classificationfamilies');
  res.send(mockData);
});

server.get('/classificationfamilies/:id', (req, res) => {
	let mockData;
	try {
		mockData = require('./mockData/classificationfamilies/classificationfamily_' + req.params.id);
	} catch (ex) {
		mockData = require('./mockData/classificationfamilies/classificationfamily');
	}
  res.send(mockData);
});

server.get('/classifications', (req, res) => {
  let mockData = require('./mockData/classifications');
  res.send(mockData);
});

server.get('/classifications/:id', (req, res) => {
	let mockData;
	try {
		mockData = require('./mockData/classifications/classification_' + req.params.id);
	} catch (ex) {
		mockData = require('./mockData/classifications/classification');
	}
  res.send(mockData);
});

server.get('/versions/:id', (req, res) => {
  // let mockData = require('./mockData/versions');
	let mockData;
	try {
		mockData = require('./mockData/versions/version_' + req.params.id);
	} catch (ex) {
		mockData = require('./mockData/versions/version');
	}
  res.send(mockData);
});

server.get('/correspondencetables/:id', (req, res) => {
  // let mockData = require('./mockData/versions');
	let mockData;
	try {
		mockData = require('./mockData/correspondences/correspondence_' + req.params.id);
	} catch (ex) {
		mockData = require('./mockData/correspondences');
	}
  res.send(mockData);
});

server.get('/variants/:id', (req, res) => {
  // let mockData = require('./mockData/variants');
	let mockData;
	try {
		mockData = require('./mockData/variants/variant_' + req.params.id);
	} catch (ex) {
		mockData = require('./mockData/variants/variant');
	}
  res.send(mockData);
});

console.log(`Server is listening to port: ${port}`);
server.listen(port);
