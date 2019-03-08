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
    REQUEST_DATES, 
    OPEN_ADD_DATE_DIALOG,
    MODAL_CONTACT, 
    MODAL_ADDCONTACT, 
    ADD_CONTACT, 
    DEL_CONTACT, 
    ADD_DATE, 
    OPEN_DEL_DATE_DIALOG, 
    DEL_DATE, 
    OPEN_INFO_DATE_DIALOG, 
    SEND_INFOS, 
    OPEN_ADD_CONTACT_DIALOG, 
    ADD_CONTACT_TO_DATE, 
    OPEN_INFO_EVENT_DIALOG, 
    OPEN_ADD_GIFT_DIALOG, 
    LOAD_GIFTS, 
    LOAD_GIFT, 
    DEL_GIFT, 
    OPEN_UPDATE_GIFT_DIALOG, 
    OPEN_DEL_GIFT_DIALOG, 
    ADD_GIFT, 
    MODAL_UPDATECONTACT, 
    UPDATE_CONTACT,
    MODAL_LINKCONTACT, 
    DEL_REQUEST, 
    WAIT

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
    openScrollTabs: false,
    openDelDateDialog: false,
    openInfoDateDialog: false, 
    openAddContactDialog: false,
    openDelContactDialog: false,
    openInfoEventDialog: false,
    openAddGiftDialog: false,
    openUpdateGiftDialog: false,
    openDelGiftDialog: false,
    currentContact: {},
    gifts: [],
    gift: {},
    modalUpdateContact: false,
    modalLinkContact: false,
    idLinkContact:'',
    wait: false,

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
        case ADD_DATE:
            return {
                ...state,
                dates: [...state.dates, action.payload]
            };
        case OPEN_DEL_DATE_DIALOG:
            return {...state, openDelDateDialog: action.payload}
        case OPEN_INFO_DATE_DIALOG:
            return {...state, openInfoDateDialog: action.payload}
        case DEL_DATE:
            return {...state, dates: state.dates.filter((item) => (item.id !== action.payload))}
        case SEND_INFOS:
            return {
                ...state,
                dates: state.dates.map((date, index) => {
                        return date.id === action.payload.id ? {...date, description: action.payload.description, budget: action.payload.budget} : date
                    })   
            }
        case OPEN_ADD_CONTACT_DIALOG:
            return {...state, openAddContactDialog: action.payload}
        case ADD_CONTACT_TO_DATE:
            return {
                ...state, 
                dates: state.dates.map((date, index) => {
                    return date.id === action.idDate ? {...date, contacts:[...date.contacts, action.payload]} : date
                })
            };
        case OPEN_INFO_EVENT_DIALOG:
            return {...state, openInfoEventDialog: action.payload, currentContact: action.contact}
        case OPEN_ADD_GIFT_DIALOG: 
            return {...state, openAddGiftDialog: action.payload}
        case OPEN_UPDATE_GIFT_DIALOG: 
            return {...state, openUpdateGiftDialog: action.payload}
        case OPEN_DEL_GIFT_DIALOG: 
            return {...state, openDelGiftDialog: action.payload}
        case LOAD_GIFTS:
            return {...state, gifts: action.payload}
        case LOAD_GIFT:
            return {...state, gift: action.payload}
        case DEL_GIFT: 
            return {...state, gifts: state.gifts.filter((item) => (item.id !== action.payload))}
        case ADD_GIFT:
            return {...state, gifts: [...state.gifts, action.payload]}
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
        case WAIT:
            return {...state, wait: action.wait};
        default:
            return state
    }
};

export default reducer;
