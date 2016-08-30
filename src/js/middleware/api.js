import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'
import config from '../config'
import _ from 'lodash'

const API_ROOT = config.API_BASE_URL;
const API_LOCAL_ROOT = config.API_LOCAL_BASE_URL;

function callApi(endpoint, headers, params, frontpage) {
	const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

    if (!params) {
        params = {};
    }
	if (sessionStorage.getItem('selectedLanguage')) {
		params["language"] = sessionStorage.getItem('selectedLanguage');
	}
	if (sessionStorage.getItem('selectedAPILanguage') && !frontpage) {
        params["language"] = sessionStorage.getItem('selectedAPILanguage');
    }

	let apiParams = '';
	if (!_.isEmpty(params)) {
		apiParams = '?';
		apiParams += Object.keys(params).map(function(key){
			return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
		}).join('&');
	}

	return fetch(fullUrl + apiParams, {
		headers: headers
		})
		.then((response) =>
			response.json().then((json) => ({ json, response }))
		).then(({ json, response }) => {
			if (!response.ok) {
				return Promise.reject(json)
			}

			// const camelizedJson = camelizeKeys(json)
			//
			// return Object.assign({},
			// 	normalize(camelizedJson)
			// )
			return json
		})

}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('CALL_API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default (store) => (next) => (action) => {
	const callAPI = action[CALL_API]
	if (typeof callAPI === 'undefined') {
		return next(action)
	}

	let { frontpage, endpoint } = callAPI
	const { types, id, headers, params } = callAPI

	if (typeof endpoint === 'function') {
		endpoint = endpoint(store.getState())
	}

	if (typeof endpoint !== 'string') {
		throw new Error('Specify a string endpoint URL.')
	}

	if (!types.every((type) => typeof type === 'string')) {
		throw new Error('Expected action types to be strings.')
	}

	function actionWith(data) {
		const finalAction = Object.assign({}, action, data)
		delete finalAction[CALL_API]
		return finalAction
	}

	const [ requestType, successType, failureType ] = types
	next(actionWith({ type: requestType, params }))

	return callApi(endpoint, headers, params, frontpage).then(
		(response) => next(actionWith({
			response,
			type: successType,
			id: id
		})),
		(error) => next(actionWith({
			type: failureType,
			error: error.message || 'Something bad happened'
		}))
	)
}
