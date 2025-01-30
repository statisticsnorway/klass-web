import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

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

server.use(cors());

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const MOCK_DATA_ROOT = path.resolve(__dirname, './mock_data');

// mock apis
server.post('/classifications/:id/trackChanges', (req, res) => {
    var email = req.body.email
    console.log(email + " subscribed on classId " + req.params.id)
    res.end("Subscription added successfully")
})

server.get('/classifications/:id/codes.csv', (req, res) => {
	let mockData = require('./mock_data/changes')
	res.send(mockData);
});

server.get('/classifications/:id/changes', (req, res) => {
	let mockData;
	try {
		let filePath = path.resolve(MOCK_DATA_ROOT, 'changes', req.params.id);
		if (!filePath.startsWith(MOCK_DATA_ROOT)) {
			throw new Error('Invalid path');
		}
		mockData = require(filePath);
	} catch (ex) {
		mockData = require('./mock_data/changes');
	}
	res.send(mockData);
});

server.get('/classifications/search', (req, res) => {
	let mockData;
	try {
		let filePath = path.resolve(MOCK_DATA_ROOT, 'search', 'search_' + req.params('query'));
		if (!filePath.startsWith(MOCK_DATA_ROOT)) {
			throw new Error('Invalid path');
		}
		mockData = require(filePath);
	} catch (ex) {
		mockData = require('./mock_data/search');
	}
	res.send(mockData);
});

server.get('/ssbsections', (req, res) => {
	let mockData = require('./mock_data/ssbsections');
	res.send(mockData);
});

server.get('/classificationfamilies', (req, res) => {
	let mockData = require('./mock_data/classificationfamilies');
	res.send(mockData);
});

server.get('/classificationfamilies/:id', (req, res) => {
	let mockData;
	try {
		mockData = require('./mock_data/classificationfamilies/classificationfamily_' + req.params.id);
	} catch (ex) {
		mockData = require('./mock_data/classificationfamilies/classificationfamily');
	}
	res.send(mockData);
});

server.get('/classifications', (req, res) => {
	let mockData = require('./mock_data/classifications');
	res.send(mockData);
});

server.get('/classifications/:id', (req, res) => {
	let mockData;
	try {
		mockData = require('./mock_data/classifications/classification_' + req.params.id);
	} catch (ex) {
		mockData = require('./mock_data/classifications/classification');
	}
	res.send(mockData);
});

server.get('/versions/:id', (req, res) => {
	let mockData;
	try {
		mockData = require('./mock_data/versions/version_' + req.params.id);
	} catch (ex) {
		mockData = require('./mock_data/versions/version');
	}
	res.send(mockData);
});

server.get('/correspondencetables/:id', (req, res) => {
	let mockData;
	try {
		mockData = require('./mock_data/correspondences/correspondence_' + req.params.id);
	} catch (ex) {
		mockData = require('./mock_data/correspondences');
	}
	res.send(mockData);
});

server.get('/variants/:id', (req, res) => {
	let mockData;
	try {
		mockData = require('./mock_data/variants/variant_' + req.params.id);
	} catch (ex) {
		mockData = require('./mock_data/variants/variant');
	}
	res.send(mockData);
});

console.log(`Server is listening to port: ${port}`);
server.listen(port);
