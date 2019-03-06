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
    REQUEST_DATES, OPEN_ADD_DATE_DIALOG,
    MODAL_CONTACT, MODAL_ADDCONTACT, ADD_CONTACT, DEL_CONTACT, MODAL_UPDATECONTACT, UPDATE_CONTACT,
    MODAL_LINKCONTACT, DEL_REQUEST
} from "./Actions";

const initialState = {
    token: null,
    username: '',
    user: {
        request: [

        ]
    },
    dates: [],
    error: '',
    message: '',
    contacts: [],
    contact: {  birthday: {},
                dates: [],
                gifts: [],},
    openDialog: false,
    openAddDateDialog: false,
    modalContact: false,
    modalAddContact: false,
    modalUpdateContact: false,
    modalLinkContact: false,
    idLinkContact:''

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
        case LOAD_CONTACTS:
            return {...state, contacts: action.contacts };
        case LOAD_CONTACT:
            return {...state, contact: action.contact };
        case MODAL_CONTACT :
            return  {...state, modalContact: action.modal};
        case MODAL_ADDCONTACT:
            return {...state, modalAddContact: action.modal};
        case MODAL_UPDATECONTACT:
            return {...state, modalUpdateContact: action.modal};
        case ADD_CONTACT :
            return {...state, contacts: [...state.contacts, action.contact]};
        case DEL_CONTACT:
            return {...state, contacts: state.contacts.filter((item)=>(item.id !== action.id))};
        case UPDATE_CONTACT:
            return {...state, contacts: state.contacts.map((item)=>{ if( item.id === action.contact.id ){
                                                                                    item.name = action.contact.name;
                                                                                    item.surname = action.contact.surname;
                                                                                    item.birthday = action.contact.birthday;
                                                                                }
                                                                                return item
                                                                            })};
        case MODAL_LINKCONTACT:
            return {...state, modalLinkContact: action.modal, idLinkContact: action.id};
        case DEL_REQUEST:
            return {...state, user: {...state.user, request: state.user.request.filter(item=>(item.id !== action.id))}};
        default:
            return state
    }
};

export default reducer;
