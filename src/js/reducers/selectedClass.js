import { combineReducers } from 'redux'
import * as types from '../constants/ActionTypes'
import { loadVersion } from '../actions'
import _ from 'lodash'
import moment from 'moment'

const initialState = {
	isFetching: false,
	classification: {}
}

function selectedClass(state = initialState, action) {
	switch (action.type) {
		case types.SELECTED_CLASS_REQUEST:
			return _.merge({}, state, {
				isFetching: true
			})


		case types.SELECTED_CLASS_SUCCESS:
			let mappedVersion = action.response.versions.map(function(version, key){
				const url = version._links.self.href
				const id = url.substring(url.lastIndexOf("/") + 1, url.length)
				return _.merge({}, version, {"id": id})
			})

			mappedVersion.sort(function(a, b) {
				// a.validTo = moment(a.validTo).isValid() ? a.validTo : '9999-12-31'
				// b.validTo = moment(b.validTo).isValid() ? b.validTo : '9999-12-31'
				// return moment(a.validTo).isAfter(b.validTo) ? -1 : (moment(a.validTo).isBefore(b.validTo) ? 1 : 0)
				return (moment(b.validTo) - moment(a.validTo) ? moment(b.validTo) - moment(a.validTo) : 1)
			})

			const newState = {
				isFetching: false,
				classification: action.response
			}

			_.assign(newState.classification.versions, mappedVersion)

			return _.merge({}, newState)

		case types.SELECTED_CLASS_FAILURE:
			return _.merge({}, state, {
				isFetching: false
			})

		default:
			return state
	}
}

export default selectedClass
