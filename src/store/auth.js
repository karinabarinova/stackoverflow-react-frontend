import axios from 'axios';
import * as actionTypes from './actionTypes';

export const search = (text) => {
    return dispatch => {
        dispatch(searchFinish(text))
    }
}

export const searchFinish = (text) => {
    return {
        type: actionTypes.SEARCH_DATA,
        search: text
    }
}

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
        login: login
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    localStorage.removeItem('username');
    localStorage.removeItem('avatar');
    localStorage.removeItem('role');

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000); 
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
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.jwtToken);
                localStorage.setItem('expirationDate', expirationDate );
                localStorage.setItem('userId', res.data.id);
                localStorage.setItem('username', res.data.login);
                localStorage.setItem('avatar', res.data.avatar);
                localStorage.setItem('role', res.data.role);
                dispatch(authSuccess(res.data.jwtToken, res.data.id, res.data.login))
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(e => {
                dispatch(authFail(e.response.data.message));
            })
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token)
            dispatch(logout());
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId))
                dispatch((checkAuthTimeout(expirationDate.getTime() - new Date().getTime() / 1000)));
            }
            else
                dispatch(logout())
        }
    }
}