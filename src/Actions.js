export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const CONNECTING_SUCCESS = 'CONNECTING_SUCCESS';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const ERROR = 'ERROR';
export const OPEN_DIALOG = "OPEN_DIALOG";
export const OPEN_DIALOG_ERROR = "OPEN_DIALOG_ERROR";

export const requestLogin = (login, password) => async dispatch => {
    try {
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({query: 'mutation { login( username: "' + login + '", password:"' + password + '"){ token user { id, username}}}'})
            }
        );
        const json = await res.json();
        const token = decodeJWT(json.data.login.token);
        const user = json.data.login.user;

        dispatch({
            type: LOGIN_SUCCESS,
            token: token,
            user: user,
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
                body: JSON.stringify({query: 'mutation { signup( username: "' + login + '", password:"' + password + '", name:"' + name + '", surname:"' + surname + '", mail:"' + mail + '"){ token, user {id, username} } }'})
            }
        );
        const json = await res.json();
        const token = decodeJWT(json.data.signup.token);
        const user = json.data.signup.user;

        dispatch({
            type: SIGNUP_SUCCESS,
            token: token,
            user: user
        });
    } catch (e) {

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
    }
    catch (e) {
        console.log(e)
    }
};
