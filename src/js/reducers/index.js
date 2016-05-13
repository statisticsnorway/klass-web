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

// function selectedKlass(state = 'reactjs', action) {
// 	switch (action.type) {
// 		case SELECT_KLASS:
// 			return action.klass
// 		default:
// 			return state
// 	}
// }
//
// function posts(state = {
// 	isFetching: false,
// 	didInvalidate: false,
// 	items: []
// }, action) {
// 	switch (action.type) {
// 		case INVALIDATE_KLASS:
// 			return Object.assign({}, state, {
// 				didInvalidate: true
// 			})
// 		case REQUEST_POSTS:
// 			return Object.assign({}, state, {
// 				isFetching: true,
// 				didInvalidate: false
// 			})
// 		case RECEIVE_KLASS:
// 			return Object.assign({}, state, {
// 				isFetching: false,
// 				didInvalidate: false,
// 				items: action.posts,
// 				lastUpdated: action.receivedAt
// 			})
// 		defult:
// 			return state
// 	}
// }
//
// function klassList(state = {}, action) {
// 	switch (action.type) {
// 		case INVALIDATE_KLASS:
// 		case RECEIVE_KLASS:
// 		case REQUEST_KLASS:
// 			return  Object.assign({}, state, {
// 				[action.klass]: posts(state[action.klass], action)
// 			})
// 		default:
// 			return state
// 	}
// }
