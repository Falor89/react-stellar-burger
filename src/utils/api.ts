import { getCookie, setCookie } from "./cookie";
import { TIngredient, TOrderResponse, TUser, TTokenResponse, TAuthResponse, TSetUserRequest } from './types/data'



export const url = 'https://norma.nomoreparties.space/api/';


const parseResponse = <T>(res: Response, message: string = ''): Promise<T> => {
  return res.ok ? res.json() : Promise.reject({
    error: res.status,
    message: message
  })
}
const checkResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json()
  }

  return res.json().then((res: Response) => Promise.reject(res));
}

const getData = () => {
  return fetch(`${url}ingredients`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then(res => parseResponse<IIngredientsResponse>(res))
};

interface IOrderResponse {
  readonly name: string;
  readonly success: boolean;
  readonly order: TOrderResponse;
}

function setData(ingridientsID: { 'ingredients': string[] }, token: string) {
  return fetch(`${url}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(ingridientsID)
  })
    .then(res => parseResponse<IOrderResponse>(res))
}
const sendPost = <RES, REQ>(secondaryURL: string, bodyInner: REQ) => {
  return fetch(url + secondaryURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyInner)
  })
    .then(res => parseResponse<RES>(res))
}

interface IIngredientsResponse {
  readonly data: TIngredient[];
  readonly success: boolean;
}

interface IResetResponse {
  readonly success: boolean;
  readonly message: string;
}

interface IResetRequest {
  readonly "email": string;
}

function passResetRequest(email: string) {
  return sendPost<IResetResponse, IResetRequest>('password-reset', { "email": email })
}

interface IPasswordReset {
  readonly "password": string;
  readonly "token": string;
}

function resetPassword(password: string, token: string) {
  return sendPost<IResetResponse, IPasswordReset>('password-reset/reset', {
    "password": password,
    "token": token
  })
}

interface ILoginRequest {
  readonly "password": string;
  readonly "email": string;
}

interface IRegRequest extends ILoginRequest {
  readonly "name": string;
}

function register(email: string, password: string, userName: string) {
  return sendPost<TAuthResponse, IRegRequest>('auth/register', {
    "email": email,
    "password": password,
    "name": userName
  })
}

function loginRequest(email: string, password: string) {
  return sendPost<TAuthResponse, ILoginRequest>('auth/login', {
    "email": email,
    "password": password
  })
}

interface IGetUserResponse {
  readonly user: TUser;
  readonly success: boolean;
}

function getUser(authToken: string) {
  return fetch(url + 'auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken
    },
  })
    .then((res) => parseResponse<IGetUserResponse>(res, 'getUser'))
}

function refreshRequest(token: string) {
  return fetchWithRefresh<TTokenResponse>('auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: token })
  })
}

interface ILogoutResponse extends IResetResponse { }

function logoutRequest(token: string) {
  return sendPost<TTokenResponse, { token: string }>('auth/token', { token: token })
}

interface ISetUserResponse {
  readonly success: boolean;
  readonly user: TUser;
}

function setUserRequest(authToken: string, bodyInner: TSetUserRequest) {
  return fetch(url + 'auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken
    },
    body: JSON.stringify(bodyInner)
  })
    .then(res => parseResponse<ISetUserResponse>(res))
}

const fetchWithRefresh = async <T>(secondaryURL: RequestInfo, options: RequestInit): Promise<T> => {
  try {
    const res = await fetch(url + secondaryURL, options);
    return await checkResponse(res);
  } catch (err) {
    if ((err as { message: string }).message === 'jwt expired') {
      const refreshData: TTokenResponse = await refreshToken() as TTokenResponse;

      (options.headers as { Authorization: string }).Authorization = refreshData.accessToken;
      setCookie('token', refreshData.refreshToken);
      setCookie('tokenToRefresh', refreshData.refreshToken);

      const res = await fetch(url + secondaryURL, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const refreshToken = async () => {
  const res = await fetch(`${url}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: setCookie('tokenToRefresh', null),
    }),
  });
  return parseResponse(res);
};


export { parseResponse, getData, setData, sendPost, passResetRequest, resetPassword, loginRequest, getUser, logoutRequest, setUserRequest, register, refreshRequest }


