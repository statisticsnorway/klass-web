import * as types from '../constants/ActionTypes';
import merge from 'lodash/merge'

const initialState = {
	isFetching: false,
	ssbSections: []
}

function ssbSections(state = initialState, action) {
	switch (action.type) {

		case types.SSB_SECTION_REQUEST:
			return Object.assign({}, state, {
				isFetching: true
			})
		case types.SSB_SECTION_SUCCESS:
			return merge({}, state, {
				isFetching: false,
				ssbSections: action.response._embedded.ssbSections
			})
		case types.SSB_SECTION_FAILURE:
			return Object.assign({}, state, {
				isFetching: false,
                ssbSections: []
			})



		default:
			return state;
	}

}

export default ssbSections
