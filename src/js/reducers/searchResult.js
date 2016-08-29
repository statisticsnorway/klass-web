import * as types from '../constants/ActionTypes';
import merge from 'lodash/merge'

const initialState = {
	isFetching: false,
	search: {
		query: ""
	},
	items: []
}

function searchResult(state = initialState, action) {
	switch (action.type) {
		case types.SEARCH_REQUEST:
			return merge({}, state, {
				isFetching: true,
				search: action.params
			})
		case types.SEARCH_SUCCESS:

			return Object.assign({}, state, {
				isFetching: false,
				items: action.response._embedded ? action.response._embedded.searchResults : []
			})
		case types.SEARCH_FAILURE:
			return Object.assign({}, state, {
				isFetching: false
			})
		case types.SET_SEARCH_QUERY:
			return Object.assign({}, state, {
				search: action.search
			})
		default:
			return state;
	}

}

export default searchResult
