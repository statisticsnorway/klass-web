import * as types from '../constants/ActionTypes';
import merge from 'lodash/merge'

const initialState = {
	isFetching: false,
	items: [],
	ssbSections: []
	// search: {}
}

function classFamilies(state = initialState, action) {
	switch (action.type) {
		case types.SUBJECTS_REQUEST:
			return Object.assign({}, state, {
				isFetching: true
			})
		case types.SUBJECTS_SUCCESS:
			if (action.response._embedded && action.response._embedded.classificationFamilies) {
				return Object.assign({}, state, {
					isFetching: false,
					items: action.response._embedded.classificationFamilies
				})
			} else {
				let mappedClass = [];
				if (action.response.classifications) {
					mappedClass = action.response.classifications.map(function(classification){
						const url = classification._links.self.href
						const id = url.substring(url.lastIndexOf("/") + 1, url.length)
						return merge({}, classification, {"id": id})
					})
				}
				merge(state.items[action.id], {
					active: !state.items[action.id].active,
					children: mappedClass
				})
				return merge({}, state, {
					isFetching: false
				})
			}
		case types.SUBJECTS_FAILURE:
			return Object.assign({}, state, {
				isFetching: false
			})
		case types.TOGGLE_SUBJECT:
			merge(state.items[action.id], {
				active: !state.items[action.id].active
			})
			return merge({}, state)



		case types.SSB_SECTION_REQUEST:
			return Object.assign({}, state, {
				isFetching: true
			})
		case types.SSB_SECTION_SUCCESS:
			return merge({}, state, {
				isFetching: false,
				// search: {
					ssbSections: action.response._embedded.ssbSections
				// 	query: "",
				// 	includeCodelists: false
				// }
			})
		case types.SSB_SECTION_FAILURE:
			return Object.assign({}, state, {
				isFetching: false
			})



		default:
			return state;
	}

}

export default classFamilies
