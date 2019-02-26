import { OPEN_DIALOG } from "./Actions";

const initialState = {
    openDialog: false,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case OPEN_DIALOG:
            return {...state, openDialog: action.payload}
        default:
    }
    return state
}

export default reducer;