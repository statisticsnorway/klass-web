import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'
import config from '../config'

const API_ROOT = config.API_BASE_URL;
const API_LOCAL_ROOT = config.API_LOCAL_BASE_URL;

function callApi(endpoint, local) {
	const baseURL = local ? API_LOCAL_ROOT : API_ROOT
	const fullUrl = (endpoint.indexOf(baseURL) === -1) ? baseURL + endpoint : endpoint

	return fetch(fullUrl)
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
	const { types, id } = callAPI

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
	next(actionWith({ type: requestType }))

	return callApi(endpoint, local).then(
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
