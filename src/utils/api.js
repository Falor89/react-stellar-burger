export const url = 'https://norma.nomoreparties.space/api/';


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

const http = (url, method = 'GET', body) => fetch(`${url}/${url}`, { method, headers: { 'Content-Type': "application/json;charset=utf-8" }, body }).then((res) => { if (res.ok) return res.json() })

const getData = () => {
    return fetch(`${url}ingredients`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
    })
        .then(res => parseResponse(res))
};

function setData(ingridientsID) {
    return fetch(`${url}orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ingridientsID)
    })
        .then(res => parseResponse(res))
  }

export { http, parseResponse, getData, setData }