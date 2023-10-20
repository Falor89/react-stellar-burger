import { config, sendPost, fetchWithRefresh, parseResponse } from '../../utils/api'

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';

export const USER_REGISTER = 'USER_REGISTER';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_ERROR = 'USER_REGISTER_ERROR';
export const REGISTER_CLEAN_STATE = 'REGISTER_CLEAN_STATE';

export const GET_USER_INFO = "GET_USER_INFO";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_DELETE = "GET_USER_INFO_DELETE";
export const CLEAN_USER_INFO = "CLEAN_USER_INFO";

export const REFRESH_USER_INFO = "REFRESH_USER_INFO";
export const REFRESH_USER_INFO_SUCCESS = "REFRESH_USER_INFO_SUCCESS";
export const REFRESH_USER_INFO_FAILED = "REFRESH_USER_INFO_FAILED";

export const GET_TOKEN = "GET_TOKEN_CODE";
export const GET_TOKEN_SUCCESS = "GET_TOKEN_SUCCESS";
export const GET_TOKEN_FAILED = "GET_TOKEN_FAILED";
export const GET_TOKEN_CLEAN_STATE = "GET_TOKEN_CLEAN_STATE"

export const PASSWORD_RESET = "PASSWORD_RESET";
export const PASSWORD_RESET_SUCCESS = "PASSWORD_RESET_SUCCESS";
export const PASSWORD_RESET_FAILED = "PASSWORD_RESET_FAILED";
export const PASSWORD_RESET_CLEAN_STATE = "PASSWORD_RESET_CLEAN_STATE";

export const LOG_OUT = "LOG_OUT";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILED = "LOG_OUT_FAILED";
export const CLEAN_LOG_OUT_INFO = "CLEAN_LOG_OUT_INFO";



export const loginRequest = (email, password) => {
    return function (dispatch) {
        dispatch({
            type: USER_LOGIN
        })
        sendPost(`${config.url}/auth/login`, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify({
                'email': `${email}`,
                'password': `${password}`
            })
        })
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: USER_LOGIN_SUCCESS
                    })
                }
            })
            .catch(err => {
                alert(`Ошибка ${err}`)
                dispatch({
                    type: USER_LOGIN_ERROR
                })
            })
    }
}

export const registerRequest = (userName, email, password) => {
    return function (dispatch) {
        dispatch({
            type: USER_REGISTER
        })
        sendPost(`${config.url}/auth/register`, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify({
                'name': `${userName}`,
                'email': `${email}`,
                'password': `${password}`,
            })
        })
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: USER_REGISTER_SUCCESS,
                        res: res
                    })
                }
            })
        then(() => {
            dispatch({
                type: REGISTER_CLEAN_STATE
            })
        })
            .catch(err => {
                alert(`Ошибка ${err}`)
                dispatch({
                    type: USER_REGISTER_ERROR
                })
            })
    }
}

export const getUserInfo = (token) => {
    return function (dispatch) {
        dispatch({
            type: GET_USER_INFO
        })
        fetchWithRefresh(`${config.baseUrl}/auth/user`, {
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + `${token}`
            },
        })
            .then(res => {
                if (res) {
                    dispatch({
                        type: GET_USER_INFO_SUCCESS,
                        res: res
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: GET_USER_INFO_DELETE
                })
            }
            )
    }
}

export const cleanUserInfo = () => {
    return {
        type: CLEAN_USER_INFO
    }
}

export const refreshUserInfo = (userName, email, pass, token) => {
    return function (dispatch) {
        fetchWithRefresh(`${config.baseUrl}/auth/user`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + `${token}`
            },
            body: JSON.stringify({
                "email": `${email}`,
                "password": `${pass}`,
                "name": `${userName}`
            })
        })
            .then(res => {
                if (res) {
                    dispatch({
                        type: REFRESH_USER_INFO_SUCCESS,
                        res: res
                    })
                }
            })
            .catch(err => {
                console.log(err)
                dispatch({
                    type: REFRESH_USER_INFO_FAILED
                })
            })
    }
}

export const getToken = (email) => {
    return function (dispatch) {
        dispatch({
            type: GET_TOKEN
        })
        request(`${config.baseUrl}/password-reset`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                "email": `${email}`,
            })
        })
            .then(res => {
                if (res) {
                    dispatch({
                        type: GET_TOKEN_SUCCESS,
                        res: res
                    })
                }
            })
            .then(() => {
                dispatch({
                    type: GET_TOKEN_CLEAN_STATE
                })
            })
            .catch(err => {
                alert(err)
                dispatch({
                    type: GET_TOKEN_FAILED
                })
            })
    }
}

export const passwordReset = (pass, token) => {
    return function (dispatch) {
        dispatch({
            type: PASSWORD_RESET
        })
        request(`${config.baseUrl}/password-reset/reset`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                "password": `${pass}`,
                "token": `${token}`
            })
        })
            .then(res => {
                if (res) {
                    dispatch({
                        type: PASSWORD_RESET_SUCCESS,
                        res: res
                    })
                }
            })
            .then(() => {
                dispatch({
                    type: PASSWORD_RESET_CLEAN_STATE
                })
            })
            .catch(err => {
                alert(err)
                dispatch({
                    type: PASSWORD_RESET_FAILED
                })
            })
    }
}

export const logOut = (token) => {
    return function (dispatch) {
        dispatch({
            type: LOG_OUT
        })
        request(`${config.baseUrl}/auth/logout`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                "token": `${token}`,
            })
        })
            .then(res => {
                if (res) {
                    dispatch({
                        type: LOG_OUT_SUCCESS,
                    })
                }
            })
            .then(() => {
                dispatch({
                    type: CLEAN_USER_INFO
                })
            })
            .catch(err => {
                alert(err)
                dispatch({
                    type: LOG_OUT_FAILED,
                    type: CLEAN_USER_INFO
                })
            })
    }
}