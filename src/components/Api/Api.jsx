export const api = {
    url: 'https://norma.nomoreparties.space/api/ingredients ',
    headers: {
        'Content-Type': 'aplication.json'
    }
};

export const parseResponse = (res) => {
    if (res.ok) {
        return res.json()
    }

    return Promise.reject(new Error(`Ошибка со статус-кодом ${res.status}`))
}