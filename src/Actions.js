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
export const MODAL_UPDATECONTACT = 'MODAL_UPDATECONTACT';
export const LOAD_CONTACT = 'LOAD_CONTACT';
export const ADD_CONTACT = 'ADD_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const DEL_CONTACT = 'DEL_CONTACT';
export const MODAL_LINKCONTACT = 'MODAL_LINKCONTACT';
export const DEL_REQUEST ='DEL_REQUEST';
export const WAIT = 'WAIT';

export const requestLogin = (login, password) => async dispatch => {
    dispatch({type: WAIT, wait: true});
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
    dispatch({type: WAIT, wait: false});
};

export const requestSignup = (login, password, name, surname, mail) => async dispatch => {
    dispatch({type: WAIT, wait: true});
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
    dispatch({type: WAIT, wait: false});
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
    dispatch({type: WAIT, wait: true});
    try{
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'query{ user{username mail name surname request{id user{username} }   } }'})
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
    dispatch({type: WAIT, wait: false});
}

export const saveUser = (query) => async (dispatch, state) => {
    dispatch({type: WAIT, wait: true});
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
    dispatch({type: WAIT, wait: false});
}

export const requestDates = () => async (dispatch, state) => {
    try{
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'query{ dates{date contacts{name surname} gifts{name price} budget description  } }'})
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
    dispatch({type: WAIT, wait: true});
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
    dispatch({type: WAIT, wait: false});
}


export const openAddDateDialog = reverse => async dispatch => {
    try {
        dispatch({type: OPEN_ADD_DATE_DIALOG, payload: reverse})
    } catch (e) {
        console.log(e)
    }
};


export const loadContact = (id, noModal) => async (dispatch, state) => {
    dispatch({type: WAIT, wait: true});
    try{
        console.log(id,state().contact.id )
        if(state().contact.id !== id) {
            const res = await fetch(
                'https://www.nokxs.com/api/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + state().token.rawToken
                    },
                    body: JSON.stringify({query: 'query{ contact(id:"' + id + '"){id name surname birthday{date} link{username} dates{id date} gifts{id name}}}'})
                }
            );

            const json = await res.json();
            dispatch({
                type: LOAD_CONTACT,
                contact: json.data.contact,
            });
        }
        if(!noModal) dispatch({
                        type: MODAL_CONTACT,
                        modal: true
                    })
        else dispatch({
                type: MODAL_UPDATECONTACT,
                modal: true
            })
    } catch(e) {
        console.log(e)
    }
    dispatch({type: WAIT, wait: false});
}

export const delContact = (id) => async (dispatch, state) => {
    dispatch({type: WAIT, wait: true});
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
    dispatch({type: WAIT, wait: false});
}
export const addContact = (query) => async (dispatch, state) => {
    dispatch({type: WAIT, wait: true});
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
    dispatch({type: WAIT, wait: false});
}

export const updateContact = (query) => async (dispatch, state) => {
    dispatch({type: WAIT, wait: true});
    try{
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'mutation{ updateContact('+query+'){id name surname birthday{date}}}'})
            }
        );
        const json = await res.json();
        dispatch({ type: UPDATE_CONTACT, contact: json.data.updateContact});
        dispatch({ type: MODAL_UPDATECONTACT, modal: false})
    } catch(e) {
        console.log(e)
    }
    dispatch({type: WAIT, wait: false});
}

export const modalAddContact = (bool) => dispatch => {dispatch({ type: MODAL_ADDCONTACT, modal: bool})}

export const createRequest = (query) => async (dispatch, state) => {
    try{
        await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'mutation{ createRequest('+query+')}'})
            }
        );
        dispatch({ type: MODAL_LINKCONTACT, modal: false})
    } catch(e) {
        console.log(e)
    }
    dispatch({type: WAIT, wait: false});
}

export const loadRequest = () => async (dispatch, state) => {
    try{
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'query{ user{username request{id user{username} }  } }'})
            }
        );
        const json = await res.json();
        dispatch({
            type: LOAD_USER,
            user :  json.data.user
        });
    } catch(e) {
        console.log(e)
    }

}

export const accepteRequest = (id) => async (dispatch, state) => {
    try{
        await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'mutation{accepteRequest(id:"'+id+'")  }'})
            }
        );
        dispatch({
            type: DEL_REQUEST,
            id :  id
        });
    } catch(e) {
        console.log(e)
    }
}

export const deleteRequest = (id) => async (dispatch, state) => {
    try{
        await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+state().token.rawToken},
                body: JSON.stringify({query: 'mutation{deleteRequest(id:"'+id+'")  }'})
            }
        );
        dispatch({
            type: DEL_REQUEST,
            id :  id
        });
    } catch(e) {
        console.log(e)
    }
}