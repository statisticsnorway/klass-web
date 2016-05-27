import { combineReducers } from 'redux';
import classFamilies from './classFamilies';
import selectedClass from './selectedClass';
import selectedVersion from './selectedVersion';
import searchResult from './searchResult';

const initialState = {
	modalType: null,
	modalProps: {}
}
function modal(state = initialState, action) {
	switch (action.type) {
		case 'SHOW_MODAL':
			return {
				modalType: action.modalType,
				modalProps: action.modalProps
			}
		case 'HIDE_MODAL':
			return initialState
		default:
			return state

	}
}

const rootReducer = combineReducers({
	// modal,
	classFamilies,
	selectedClass,
	selectedVersion,
	searchResult
})

export default rootReducer
