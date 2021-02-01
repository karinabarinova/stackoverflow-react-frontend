import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (jwtToken, userId, login) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        jwtToken: jwtToken,
        id: userId,
        login: login //add login
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000); //seconds or miliseconds?
    }
}

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
                dispatch(authSuccess(res.data.jwtToken, res.data.id, res.data.login))
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(e => {
                dispatch(authFail(e.response.data.message));
            })
    };
};
