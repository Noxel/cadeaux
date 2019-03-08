export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const ERROR = 'ERROR';
export const OPEN_DIALOG = "OPEN_DIALOG";
export const OPEN_DIALOG_ERROR = "OPEN_DIALOG_ERROR";
export const LOAD_USER = 'LOAD_USER';
export const REQUEST_DATES = 'REQUEST_DATES';
export const OPEN_ADD_DATE_DIALOG = "OPEN_ADD_DATE_DIALOG";
export const LOAD_CONTACTS = 'LOAD_CONTACTS';
export const MODAL_CONTACT = 'MODAL_CONTACT';
export const MODAL_ADDCONTACT = 'MODAL_ADDCONTACT';
export const LOAD_CONTACT = 'LOAD_CONTACT';
export const ADD_CONTACT = 'ADD_CONTACT';
export const DEL_CONTACT = 'DEL_CONTACT';
export const ADD_DATE = 'ADD_DATE';
export const DEL_DATE = 'DEL_DATE';
export const OPEN_DEL_DATE_DIALOG = "OPEN_DEL_DATE_DIALOG";
export const OPEN_INFO_DATE_DIALOG = "OPEN_INFO_DATE_DIALOG";
export const OPEN_ADD_CONTACT_DIALOG = "OPEN_ADD_CONTACT_DIALOG";
export const OPEN_DEL_CONTACT_DIALOG = "OPEN_DEL_CONTACT_DIALOG";
export const SEND_INFOS = "SEND_INFOS";
export const ADD_CONTACT_TO_DATE = 'ADD_CONTACT_TO_DATE';
export const OPEN_INFO_EVENT_DIALOG = "OPEN_INFO_EVENT_DIALOG";
export const LOAD_GIFTS = "LOAD_GIFTS";
export const LOAD_GIFT = "LOAD_GIFTS";
export const DEL_GIFT = "DEL_GIFT";
export const OPEN_ADD_GIFT_DIALOG = "OPEN_ADD_GIFT_DIALOG";
export const OPEN_UPDATE_GIFT_DIALOG = "OPEN_UPDATE_GIFT_DIALOG";
export const OPEN_DEL_GIFT_DIALOG = "OPEN_DEL_GIFT_DIALOG"
export const ADD_GIFT = 'ADD_GIFT';


export const requestLogin = (login, password) => async dispatch => {
    try {
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({query: 'mutation { login( username: "' + login + '", password:"' + password + '"){ token user {username}}}'})
            }
        );
        const json = await res.json();
        const token = decodeJWT(json.data.login.token);
        const username = json.data.login.user.username;

        dispatch({
            type: LOGIN_SUCCESS,
            token: token,
            username: username,
        });
    } catch (e) {

    }
};

export const requestSignup = (login, password, name, surname, mail) => async dispatch => {
    try {
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({query: 'mutation { signup( username: "' + login + '", password:"' + password + '", name:"' + name + '", surname:"' + surname + '", mail:"' + mail + '"){ token, user {username} } }'})
            }
        );
        const json = await res.json();
        const token = decodeJWT(json.data.signup.token);
        const username = json.data.signup.user.username;

        dispatch({
            type: SIGNUP_SUCCESS,
            token: token,
            username: username
        });
    } catch (e) {

    }
};

export const requestResetPassword = (username) => async dispatch => {
    try {
        await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({query: 'mutation { resetPassword( username: "' + username + '")}'})
            }
        );

        dispatch({type: RESET_PASSWORD});
    } catch (e) {
        dispatch({type: ERROR, message: e})
    }
};

export const requestLogout = () => dispatch => {
    dispatch({type: LOGOUT_SUCCESS});
};

function decodeJWT(raw) {
    const parts = raw.split('.');

    return {
        rawToken: raw,
        headers: JSON.parse(atob(parts[0])),
        payload: JSON.parse(atob(parts[1])),
        signature: parts[2],
    };
}

export const openDialog = reverse => async dispatch => {
    try {
        dispatch({type: OPEN_DIALOG, payload: reverse})
    } catch (e) {
        console.log(e)
    }
};

export const loadUser = () => async (dispatch, state) => {
    try{
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'query{ user{username mail name surname  } }'})
            }
        );
        const json = await res.json();
        dispatch({
            type: LOAD_USER,
            username: json.data.user.username,
            user :  json.data.user
        });
    } catch(e) {
        console.log(e)
    }

}

export const saveUser = (query) => async (dispatch, state) => {
    try{
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'mutation{ updateUser('+query+'){username mail name surname  } }'})
            }
        );
        const json = await res.json();
        dispatch({
            type: LOAD_USER,
            username: json.data.updateUser.username,
            user :  json.data.updateUser
        });
    } catch(e) {
        console.log(e)
    }

}

export const requestDates = () => async (dispatch, state) => {
    try{
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'query{ dates{id date contacts{id name surname} gifts{id name price} budget description  } }'})
            }
        );
        const json = await res.json();
        dispatch({
            type: REQUEST_DATES,
            payload: json.data.dates,
        });
    } catch(e) {
        console.log(e)
    }

}

export const loadContacts = () => async (dispatch, state) => {
    try{
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'query{ contacts{id name surname birthday{date} link{username}}}'})
            }
        );
        const json = await res.json();
        dispatch({
            type: LOAD_CONTACTS,
            contacts: json.data.contacts,
        });
    } catch(e) {
        console.log(e)
    }

}

export const loadContact = (id) => async (dispatch, state) => {
    try{
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'query{ contact(id:"'+id+'"){name surname birthday{date} link{username} dates{id date} gifts{id name}}}'})
            }
        );
        const json = await res.json();
        dispatch({
            type: LOAD_CONTACT,
            contact: json.data.contact,
        });
        dispatch({
            type: MODAL_CONTACT,
            modal: true
        })
    } catch(e) {
        console.log(e)
    }

}

export const delContact = (id) => async (dispatch, state) => {
    try{
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'mutation{ deleteContact(id:"'+id+'"){id}}'})
            }
        );
        const json = await res.json();
        dispatch({ type: DEL_CONTACT, id: json.data.deleteContact.id})
    } catch(e) {
        console.log(e)
    }

}
export const addContact = (query) => async (dispatch, state) => {
    try{
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'mutation{ createContact('+query+'){ name, surname, id }}'})
            }
        );
        const json = await res.json();
        dispatch({ type: ADD_CONTACT, contact: json.data.createContact})
        dispatch({ type: MODAL_ADDCONTACT, modal: false})
    } catch(e) {
        console.log(e)
    }

}
/*
export const updateContact = (query) => async (dispatch, state) => {
    try{
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'mutation{ updateContact('+query+'){}'})
            }
        );
        const json = await res.json();

    } catch(e) {
        console.log(e)
    }

}*/

export const addDate = (query) => async (dispatch, state) => {
    try{
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'mutation{ createDate(date:"'+query+'"){id date contacts{id name surname} gifts{id name price} budget description }}'})
            }
        );
        const json = await res.json()
        dispatch({ type: ADD_DATE, payload: json.data.createDate})
    } catch(e) {
        dispatch({type: ERROR, e})
    }
}

export const delDate = (query) => async (dispatch, state) => {
    try{
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'mutation{ deleteDate(id:"'+query+'"){id}}'})
            }
        );
        const json = await res.json();
        dispatch({ type: DEL_DATE, payload: json.data.deleteDate.id})
    } catch(e) {
        dispatch({type: ERROR, e})
    }
}

export const modalAddContact = (bool) => dispatch => {dispatch({ type: MODAL_ADDCONTACT, modal: bool})}

export const openAddDateDialog = reverse => async dispatch => {dispatch({type: OPEN_ADD_DATE_DIALOG, payload: reverse})};
export const openDelDateDialog = reverse => async dispatch => {dispatch({type: OPEN_DEL_DATE_DIALOG, payload: reverse})};
export const openInfoDateDialog = reverse => async dispatch => {dispatch({type: OPEN_INFO_DATE_DIALOG, payload: reverse})};
export const openAddContactDialog = reverse => async dispatch => {dispatch({type: OPEN_ADD_CONTACT_DIALOG, payload: reverse})};
export const openDelContactDialog = reverse => async dispatch => {dispatch({type: OPEN_DEL_CONTACT_DIALOG, payload: reverse})}
export const openInfoEventDialog = (reverse, contact) => async dispatch => {dispatch({type: OPEN_INFO_EVENT_DIALOG, payload: reverse, contact:contact})};
export const openAddGiftDialog = reverse => async dispatch => {dispatch({type: OPEN_ADD_GIFT_DIALOG, payload: reverse})};
export const openUpdateGiftDialog = reverse => async dispatch => {dispatch({type: OPEN_UPDATE_GIFT_DIALOG, payload: reverse})};
export const openDelGiftDialog = reverse => async dispatch => {dispatch({type: OPEN_DEL_GIFT_DIALOG, payload: reverse})};


export const sendInfos = (query) => async (dispatch, state) => {
    try{
        console.log(query)
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'mutation{ updateDate('+query+'){id budget description }}'})
            }
        );
        const json = await res.json()
        dispatch({ type: SEND_INFOS, payload: json.data.updateDate})
    } catch(e) {
        console.log(e)
        dispatch({type: ERROR, e})
    }
}

export const addContactToDate = (idDate, idContact) => async (dispatch, state) => {
    try{
        console.log(idDate)
        console.log(idContact)
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'mutation{ createDateContact(idDate:"'+idDate+'" idContact:"'+ idContact +'"){id name surname}}'})
            }
        );
        const json = await res.json()
        dispatch({ type: ADD_CONTACT_TO_DATE, payload: json.data.createDateContact, idDate: idDate})
    } catch(e) {
        console.log(e)
        dispatch({type: ERROR, e})
    }
}

export const requestContactGifts = (idDate, idContact) => async (dispatch, state) => {
    try{
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'query{ gifts(idDate:"'+idDate+'" idContact:"'+idContact+'"){id} }'})
            }
        );
        const json = await res.json()
        console.log(json.data.gifts)
        //dispatch({ type: ADD_CONTACT_TO_DATE, payload: json.data.createDateContact, idDate: idDate})
    } catch(e) {
        console.log(e)
        dispatch({type: ERROR, e})
    }
}

export const loadGifts = () => async (dispatch, state) => {
    try{
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'query { gifts{ id price name date{id date} contact{id name surname}}}'})
            }
        );
        const json = await res.json();
        dispatch({
            type: LOAD_GIFTS,
            payload: json.data.gifts,
        });
    } catch(e) {
        console.log(e)
    }
}

export const loadGift = (id) => async (dispatch, state) => {
    try{
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'query { gift(id:"'+id+'"){ id price name date{id date} contact{id name surname}}}'})
            }
        );
        const json = await res.json();
        dispatch({
            type: LOAD_GIFT,
            payload: json.data.gift,
        });
    } catch(e) {
        console.log(e)
    }
}

export const delGift = (query) => async (dispatch, state) => {
    try{
        console.log("query")
        console.log(query)
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'mutation{ deleteGift(id:"'+query+'"){id name}}'})
            }
        );
        const json = await res.json();
        dispatch({ type: DEL_GIFT, payload: json.data.deleteGift.id})
    } catch(e) {
        console.log(e)
        dispatch({type: ERROR, e})
    }
}

export const addGift = (query) => async (dispatch, state) => {
    try{
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'mutation{ createGift(name:"'+query+'"){id price name date{id date} contact{id name surname} }}'})
            }
        );
        const json = await res.json()
        dispatch({ type: ADD_GIFT, payload: json.data.createGift})
    } catch(e) {
        dispatch({type: ERROR, e})
    }
}