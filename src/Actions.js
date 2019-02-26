export const LOGIN = 'LOGIN';

export const requestLogin = (login, password) => async dispatch => {
    try {
        const res = await fetch(
            'https://www.nokxs.com/api/',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({query: 'mutation { login( username: "' + login + '", password:"' + password + '"){ token}}'})
            }
        );
        let json = await res.json();
        let data = json.data;
        dispatch({
            type: LOGIN,
            token: data.login.token
        });
    } catch (e) {

    }
};
