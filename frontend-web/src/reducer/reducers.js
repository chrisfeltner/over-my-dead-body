import * as types from '../actions/actionTypes';

const initialState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    token: "",
    mount: "login",
    displayMessages: false
}

const reducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case types.LOGIN:
            return Object.assign({}, state,
                {
                    userId: payload.userId,
                    token: payload.token,
                    error: payload.error
                });
        default:
            return state;
    }
}

export default reducer;