import {
    ERROR,
    LOAD_USER,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    OPEN_DIALOG,
    RESET_PASSWORD,
    SIGNUP_SUCCESS,
    LOAD_CONTACTS,
    LOAD_CONTACT,
    MODAL_CONTACT, MODAL_ADDCONTACT, ADD_CONTACT, DEL_CONTACT
} from "./Actions";

const initialState = {
    token: null,
    username: '',
    user: {},
    error: '',
    message: '',
    contacts: [],
    contact: { dates: [],
                gifts: [],},
    openDialog: false,
    modalContact: false,
    modalAddContact: false,
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
        case LOAD_CONTACTS:
            return {...state, contacts: action.contacts };
        case LOAD_CONTACT:
            return {...state, contact: action.contact };
        case MODAL_CONTACT :
            return  {...state, modalContact: action.modal};
        case MODAL_ADDCONTACT:
            return {...state, modalAddContact: action.modal};
        case ADD_CONTACT :
            return {...state, contacts: [...state.contacts, action.contact]};
        case DEL_CONTACT:
            return {...state, contacts: state.contacts.filter((item)=>(item.id !== action.id))};
        default:
            return state
    }
};

export default reducer;
