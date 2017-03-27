import * as types from "../constants/ActionTypes";

const initialState = {
    isFetching: false,
    subscribed: false,
    errorMsg: '',
    errorCode: '',
}

function subscription(state = initialState, action) {
    switch (action.type) {

        case types.SUBSCRIPTION_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                subscribed: false,
                errorMsg: "",
                errorCode: ""
            })
        case types.SUBSCRIPTION_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                subscribed: true,
                errorMsg: "",
                errorCode: ""
            })
        case types.SUBSCRIPTION_FAILURE:
            let code = "";
            let msg = "";
            try {
                let parse = JSON.parse(action.error);
                code = parse.code;
                msg = parse.message;
            } catch (err) {
            }
            return Object.assign({}, state, {
                isFetching: false,
                subscribed: false,
                errorMsg: msg,
                errorCode: code
            })
        default:
            return state;
    }

}

export default subscription
