import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (login, password, repeat_password, email, fullName) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            login: login,
            password: password,
            repeat_password: repeat_password,
            email: email,
            fullName: fullName
        }
        axios.post('auth/register', authData)
            .then(res => {
                console.log(res);
                dispatch(authSuccess(res.data))
            })
            .catch(e => {
                console.log(e);
                dispatch(authFail(e));
            })
    };
};
