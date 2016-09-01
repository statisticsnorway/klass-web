import { combineReducers } from 'redux';
import classFamilies from './classFamilies';
import selectedClass from './selectedClass';
import selectedVersion from './selectedVersion';
import searchResult from './searchResult';
import ssbSections from './ssbSections';
import subscription from './subscription';

const initialState = {
	modalIsOpen: false,
	item: {}
}
function modal(state = initialState, action) {
	switch (action.type) {
		case 'TOGGLE_MODAL':
			return {
				modalIsOpen: action.display,
				item: action.item
			}
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
