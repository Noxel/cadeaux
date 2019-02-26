import {LOGIN} from "./Actions";

const initialState = {
    token: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: action.token
            };
        default:
            return state
    }
};

export default reducer;
