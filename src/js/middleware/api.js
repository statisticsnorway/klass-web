import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'
import config from '../config'

const API_ROOT = config.API_BASE_URL;
const API_LOCAL_ROOT = config.API_LOCAL_BASE_URL;

function callApi(endpoint, headers, params, local) {
	const baseURL = local ? API_LOCAL_ROOT : API_ROOT
	const fullUrl = (endpoint.indexOf(baseURL) === -1) ? baseURL + endpoint : endpoint

	if (sessionStorage.getItem('selectedLanguage')) {
		if (!params) {
			params = {};
		}
		params["language"] = sessionStorage.getItem('selectedLanguage');
	}

	let apiParams = '';
	if (params) {
		apiParams = '?';
		apiParams += Object.keys(params).map(function(key){
			return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
		}).join('&');
	}

	if (config.API_LOCAL_STORAGE){
		return new Promise((resolve, reject) => {
			let cachedResponse = localStorage.getItem(fullUrl);

			if (cachedResponse) {
				resolve(JSON.parse(cachedResponse));
			}

			fetch(fullUrl + apiParams, {
				headers: headers
			}).then(function (response) {
				if (response.status >= 400) {
					reject(response)
				} else {
					return response.json().then(function (json) {
						return { json: json, response: response };
					});
				}
			}).then(function (_ref) {
				var json = _ref.json;
				var response = _ref.response;

				if (!response.ok) {
					reject(json)
				} else {
					localStorage.setItem(fullUrl, JSON.stringify(json))
					resolve(json)
				}
			});
		})
	} else {
		return fetch(fullUrl + apiParams, {
			headers: headers
			})
			.then(response =>
				response.json().then(json => ({ json, response }))
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

}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('CALL_API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
	const callAPI = action[CALL_API]
	if (typeof callAPI === 'undefined') {
		return next(action)
	}

	let { local, endpoint } = callAPI
	const { types, id, headers, params } = callAPI

	if (typeof endpoint === 'function') {
		endpoint = endpoint(store.getState())
	}

	if (typeof endpoint !== 'string') {
		throw new Error('Specify a string endpoint URL.')
	}

	if (!types.every(type => typeof type === 'string')) {
		throw new Error('Expected action types to be strings.')
	}

	function actionWith(data) {
		const finalAction = Object.assign({}, action, data)
		delete finalAction[CALL_API]
		return finalAction
	}

	const [ requestType, successType, failureType ] = types
	next(actionWith({ type: requestType, params }))

	return callApi(endpoint, headers, params, local).then(
		response => next(actionWith({
			response,
			type: successType,
			id: id
		})),
		error => next(actionWith({
			type: failureType,
			error: error.message || 'Something bad happened'
		}))
	)
}
