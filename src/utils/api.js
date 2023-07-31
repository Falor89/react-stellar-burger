const api = {
    url: 'https://norma.nomoreparties.space/api',
    headers: {
        'Content-Type': 'aplication.json'
    }
};

const parseResponse = (res) => {
    if (res.ok) {
        return res.json()
    }

    return Promise.reject(new Error(`Ошибка со статус-кодом ${res.status}`))
}
/** @function
 * @name http - Обработка http запросов
 * @param {string/number/data} url - Адрес запроса
 * @param {string} method - Метод запроса
 * @param {object} body - Тело запроса
 * @returns Объект ответа */

const http = (url, method = 'GET', body) => fetch(`${api.url}/${url}`, { method, headers: { 'Content-Type': "application/json;charset=utf-8" }, body }).then((res) => { if (res.ok) return res.json() })

const getData = () => {
    return fetch(`${api.url}/ingredients`, {
        headers: api.headers,
        method: 'GET',
    })
        .then(res => parseResponse(res))
};

const setData = (productsIds) => {
    return fetch(`${api.url}/orders`, {
        headers: api.headers,
        method: 'POST',
        body: JSON.stringify({ ingredients: productsIds })
    })
        .then(res => parseResponse(res))
};

export { http, parseResponse, getData, setData }