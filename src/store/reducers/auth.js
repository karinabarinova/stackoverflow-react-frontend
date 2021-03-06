import * as actionTypes from '../actionTypes';
import { updateObject } from '../utility';

const initialState = {
    jwtToken: null,
    id: null,
    error: null,
    loading: false,
    login: null,
    role: null,
    search: ''
}

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
}

const search = (state, action) => {
    return updateObject(state, {
        search: action.search,
    })
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        jwtToken: action.jwtToken,
        userId: action.id,
        error: null,
        loading: false,
        login: action.login,
        role: action.role
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        jwtToken: null,
        id: null,
        login: null,
        role: null
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SEARCH_DATA: return search(state, action);
        default:
            return state;
    }
}

export default reducer;
