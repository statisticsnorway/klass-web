import { combineReducers } from 'redux';
import classFamilies from './classFamilies';
import selectedClass from './selectedClass';
import selectedVersion from './selectedVersion';
import searchResult from './searchResult';
import ssbSections from './ssbSections';
import subscription from './subscription';
import merge from 'lodash/merge'

const initialState = {
	modalIsOpen: false,
	item: {},
	contentType: "notes"
}
function modal(state = initialState, action) {
	switch (action.type) {
		case 'TOGGLE_MODAL':
			return merge({}, state, {
				modalIsOpen: action.display,
				item: action.item,
                contentType: action.contentType
			})
		default:
			return state

	}
}

const rootReducer = combineReducers({
	modal,
	classFamilies,
    ssbSections,
	selectedClass,
	selectedVersion,
	searchResult,
    subscription
})

export default rootReducer
