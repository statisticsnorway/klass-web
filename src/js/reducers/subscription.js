import * as types from '../constants/ActionTypes';

const initialState = {
	isFetching: false,
	subscribed: false,
    errorMsg: ''
}

function subscription(state = initialState, action) {
	switch (action.type) {

		case types.SUBSCRIPTION_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
            	subscribed: false
			})
		case types.SUBSCRIPTION_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
            	subscribed: true
			})
		case types.SUBSCRIPTION_FAILURE:
			return Object.assign({}, state, {
				isFetching: false,
            	subscribed: false,
                errorMsg: action.error
			})



		default:
			return state;
	}

}

export default subscription
