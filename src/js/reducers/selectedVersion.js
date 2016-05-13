import { combineReducers } from 'redux'
import * as types from '../constants/ActionTypes'
import _ from 'lodash'
import { loadVersion } from '../actions'

const initialState = {
	isFetching: false,
	version: {}
}

function selectedVersion(state = initialState, action) {
	switch (action.type) {
		case types.SELECTED_VERSION_REQUEST:
			return _.merge({}, state, {
				isFetching: true
			})


		case types.SELECTED_VERSION_SUCCESS:
			const mappedVersion = _.merge({}, action.response, {"id": action.id})

			return _.assign({}, state, {
				isFetching: false,
				version: mappedVersion
			})


		case types.CHANGES_SUCCESS:
			return _.merge({}, state, {
				isFetching: false,
				version: {
					changes: action.response
				}
			})

		case types.TOGGLE_CODE:
			let items = state.version.classificationItems
			const idx = _.findIndex(items, ['code', action.code])
			_.merge(items[idx], {
				active: !items[idx].active
			})
			return _.merge({}, state)

		case types.SELECTED_VERSION_FAILURE:
		case types.CHANGES_FAILURE:
			return _.merge({}, state, {
				isFetching: false
			})

		default:
			return state
	}
}

export default selectedVersion
