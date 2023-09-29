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

const getData = (data, setData) => {
    fetch(`${api.url}ingredients`)
        .then(parseResponse)
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => {
            setData(err);
            console.log(err);
            alert(err)
        })
}


export { api, parseResponse, getData }