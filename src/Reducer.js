import {ERROR, LOAD_USER, LOGIN_SUCCESS, LOGOUT_SUCCESS, OPEN_DIALOG, RESET_PASSWORD, SIGNUP_SUCCESS, REQUEST_DATES, OPEN_ADD_DATE_DIALOG} from "./Actions";

const initialState = {
    token: null,
    username: '',
    user: {},
    dates: [],
    error: '',
    message: '',
    openDialog: false,
    openAddDateDialog: false,
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
        case REQUEST_DATES:
            return {
                ...state,
                dates: action.payload
            };
        case OPEN_ADD_DATE_DIALOG:
            return {
                ...state,
                openAddDateDialog: action.payload
            };
        default:
            return state
    }
};

export default reducer;
