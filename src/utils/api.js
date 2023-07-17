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

const http = (url, method = 'GET', body) => fetch(`${api.url}/${url}`, { method, headers: { 'Content-Type': "application/json;charset=utf-8" }, body }).then((res) => { if (res.ok) return res.json() })

const getData = (data, setData) => http('ingredients')
.then(({ data }) => setData(data))
.catch((err) => alert(`Произошла ошибка! + ${setData(err)}`))

export { http, parseResponse, getData }