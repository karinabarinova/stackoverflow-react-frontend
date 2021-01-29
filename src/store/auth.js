import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (jwtToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        jwtToken: jwtToken,
        id: userId //add login
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (login, password, repeat_password, email, fullName, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        let authData = {};
        if (isSignup) {
            authData = {
                login: login,
                password: password,
                repeat_password: repeat_password,
                email: email,
                fullName: fullName
            }
        } else {
            authData = {
                login: login,
                password: password,
                email: email
            }
        }
        
        let url = 'auth/register';
        if (!isSignup)
            url = 'auth/login';
        
        axios.post(url, authData)
            .then(res => {
                console.log(res);
                dispatch(authSuccess(res.data.token, res.data.id))
            })
            .catch(e => {
                // console.log("FROM ERROR", e.response.data.message);
                dispatch(authFail(e.response.data.message));
            })
    };
};
