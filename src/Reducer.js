import {ERROR, LOAD_USER, LOGIN_SUCCESS, LOGOUT_SUCCESS, OPEN_DIALOG, RESET_PASSWORD, SIGNUP_SUCCESS} from "./Actions";

const initialState = {
    token: null,
    username: '',
    user: {},
    error: '',
    message: '',
    openDialog: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.token,
                username: action.username,
            };
        case ERROR:
            return {
                ...state,
                error: action.error
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                token: null,
                username: '',
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                token: action.token,
                username: action.username
            };
        case RESET_PASSWORD:
            return {
                ...state,
                message: 'Un nouveau mot de passe a été envoyé à votre adresse mail'
            };
        case OPEN_DIALOG:
            return {
                ...state,
                openDialog: action.payload
            };
        case LOAD_USER:
            return {...state, username: action.username, user: action.user };
        default:
            return state
    }
};

export default reducer;
