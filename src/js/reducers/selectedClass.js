import { combineReducers } from 'redux'
import * as types from '../constants/ActionTypes'
import _ from 'lodash'
import klassList from './klassList'
import { loadVersion } from '../actions'

const initialState = {
	isFetching: false,
	classification: {},
	version: {}
}

function selectedClass(state = initialState, action) {
	switch (action.type) {
		case types.SELECTED_CLASS_REQUEST:
			return _.merge({}, state, {
				isFetching: true
			})
		case types.SELECTED_CLASS_SUCCESS:
			let newState
			if (action.response.versions) {
				newState = {
					isFetching: false,
					classification: action.response
				}
			} else if (action.response.classificationItems) {
				newState = {
					isFetching: false,
					version: action.response
				}
			}

			return _.assign({}, state, newState)
		case types.SELECTED_CLASS_FAILURE:
			return _.merge({}, state, {
				isFetching: true
			})
		case types.TOGGLE_CODE:
			let items = state.version.classificationItems
			const idx = _.findIndex(items, ['code', action.code])
			_.merge(items[idx], {
				active: !items[idx].active
			})
			return _.merge({}, state)
		default:
			return state
	}
}

const combinedReducer = combineReducers({
	klassList,
	selectedClass
})

export default selectedClass
