import 'isomorphic-fetch'
import config from '../config'
import _ from 'lodash'

const API_ROOT = config.API_BASE_URL;
const API_LOCAL_ROOT = config.API_LOCAL_BASE_URL;

function callApi(endpoint, method, headers, params, frontpage) {
	const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
	
    // only set language if we have not defined a language (allows us to override)
    if (typeof params["language"] === "undefined") {
		if (sessionStorage.getItem('selectedLanguage')) {
			params["language"] = sessionStorage.getItem('selectedLanguage');
		}
		if (sessionStorage.getItem('selectedAPILanguage') && !frontpage) {
			params["language"] = sessionStorage.getItem('selectedAPILanguage');
		}
	}

	let apiParams = _.isEmpty(params) ? ''
		: '?' + Object.keys(params).filter(key => params[key]).map(key =>
			`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');

	return fetch(fullUrl + apiParams, {
            method: method,
    		headers: headers
		})
        .then((response) => {
            if (response.status >= 400) {
                return response.text().then((json) => ({ json, response }))
            }
            return response.clone().json().catch(() => {
                return response.text()
            }).then((json) => ({ json, response }))
        }).then(({ json, response }) => {
			if (!response.ok) {
				return Promise.reject(json)
			}

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
	let { types, id, method, headers, params, language } = callAPI
	if (!params)params = {};

	if (typeof endpoint === 'function') {
		endpoint = endpoint(store.getState())
	}

	if (typeof endpoint !== 'string') {
		throw new Error('Specify a string endpoint URL.')
	}

	if (!types.every((type) => typeof type === 'string')) {
		throw new Error('Expected action types to be strings.')
	}

	if (typeof language == 'string') {
		params["language"] = language;
	}

	function actionWith(data) {
		const finalAction = Object.assign({}, action, data)
		delete finalAction[CALL_API]
		return finalAction
	}

	const [ requestType, successType, failureType ] = types
	next(actionWith({ type: requestType, params }))

	return callApi(endpoint, method, headers, params, frontpage).then(
		(response) => next(actionWith({
			response,
			requestParams: params,
			type: successType,
			id: id
		})),
		(error) => next(actionWith({
			type: failureType,
			error: error || 'Something bad happened'
		}))
	)
}
