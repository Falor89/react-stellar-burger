const api = {
    url: 'https://norma.nomoreparties.space/api/',
    headers: {
        'Content-Type': 'application.json'
    }
}

const parseResponse = (res) => {
    if (res.ok) {
        return res.json()
    }

    return Promise.reject(new Error(`Ошибка со статус-кодом ${res.status}`))
}

const letData = () => {
    return fetch(`${api.url}ingredients`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET',
    })
        .then(res => parseResponse(res))
};

const getData = () => {
    return fetch(`${api.url}ingredients`, {
        method: 'GET',
        headers: api.headers
    })
        .then(res => parseResponse(res))
}

const setData = (ingredientID) => {
    return fetch(`${api.url}orders`, {
        method: 'POST',
        headers: api.headers,
        body: JSON.stringify(ingredientID)
    })
        .then(res => parseResponse(res))
}


const http = (url, method = 'GET', body) => fetch(`${api.url}${url}`, { method, headers: { 'Content-Type': "application/json;charset=utf-8" }, body }).then((res) => { if (res.ok) return res.json() })


export { api, parseResponse, getData, setData, http }