import { getCookie, setCookie } from "./cookie";


export const url = 'https://norma.nomoreparties.space/api/';


const parseResponse = (res, message = '') => {
  return res.ok ? res.json() : Promise.reject({
    error: res.status,
    message: message
  })
}

/** @function
 * @name http - Обработка http запросов
 * @param {string/number/data} url - Адрес запроса
 * @param {string} method - Метод запроса
 * @param {object} body - Тело запроса
 * @returns Объект ответа */

const http = (url, method = 'GET', body) => fetch(`${url}/${url}`, { method, headers: { 'Content-Type': "application/json;charset=utf-8" }, body }).then((res) => { if (res.ok) return res.json() })

const getData = () => {
  return fetch(`${url}ingredients`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then(parseResponse)
};

function setData(ingridientsID, token) {
  return fetch(`${url}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(ingridientsID)
  })
    .then(res => parseResponse(res))
    .catch(err => console.log(`${err} ошибка`))
}
function sendPost(secondaryURL, bodyInner) {
  return fetch(url + secondaryURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyInner)
  })
    .then(parseResponse)
}

function passResetRequest(email) {
  return sendPost('password-reset', { "email": email })
}

function resetPassword(password, token) {
  return sendPost('password-reset/reset', {
    "password": password,
    "token": token
  })
}

function register(email, password, userName) {
  return sendPost('auth/register', {
    "email": email,
    "password": password,
    "name": userName
  })
}

function loginRequest(email, password) {
  return sendPost('auth/login', {
    "email": email,
    "password": password
  })
}
function getUser(authToken) {
  return fetch(url + 'auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken
    },
  })
    .then((res) => parseResponse(res, 'getUser'))
}

function refreshRequest(token) {
  return fetchWithRefresh('auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: token })
  })
}

function logoutRequest(token) {
  return sendPost('auth/logout', { token: token })
}

function setUserRequest(authToken, bodyInner) {
  return fetch(url + 'auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken
    },
    body: JSON.stringify(bodyInner)
  })
    .then(parseResponse)
}

const fetchWithRefresh = async (secondaryURL, options) => {
  try {
    const res = await fetch(url + secondaryURL, options)
    return await parseResponse(res)
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken();

      options.headers.Authorization = refreshData.accessToken
      setCookie('token', refreshData.refreshToken)
      setCookie('tokenToRefresh', refreshData.refreshToken)

      const res = await fetch(url + secondaryURL, options)
      return await parseResponse(res)
    } else {
      return Promise.reject(err);
    }
  }
}

export const refreshToken = () => {
  return fetch(`${url}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: setCookie('tokenToRefresh'),
    }),
  }).then(parseResponse);
};



export { http, parseResponse, getData, setData, sendPost, passResetRequest, resetPassword, loginRequest, getUser, logoutRequest, refreshRequest, setUserRequest, register }


