import {ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS} from "./Actions";

const initialState = {
    token: null,
    user: null,
    error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.token,
                user: action.user,
            };
        case ERROR:
            return {
                ...state,
                error: action.error
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                token: null,
            };
        default:
            return state
    }
};

export default reducer;
