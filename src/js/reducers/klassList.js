import * as types from '../constants/ActionTypes';
import merge from 'lodash/merge'

const initialState = {
	isFetching: false,
	version: {}
}

function klassList(state = initialState, action) {
	switch (action.type) {
		case types.SELECTED_CLASS_VERSION_REQUEST:
			return merge({}, state, {
				isFetching: true
			})
		case types.SELECTED_CLASS_VERSION_SUCCESS:
			return merge({}, state, {
				isFetching: false,
				version: action.response
			});
		case types.SELECTED_CLASS_VERSION_FAILURE:
			return merge({}, state, {
				isFetching: true
			})
		default:
			return state;
	}

}

export default klassList
