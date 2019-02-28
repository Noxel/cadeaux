import {ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS, OPEN_DIALOG} from "./Actions";

const initialState = {
    token: null,
    user: null,
    error: '',
    openDialog: false,
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
        case OPEN_DIALOG:
            return {
                ...state,
                openDialog: action.payload
            }
        default:
            return state
    }
};

export default reducer;
