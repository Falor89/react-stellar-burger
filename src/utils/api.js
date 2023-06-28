import { Api } from "../components/Api/Api"

const http = (url, method = 'GET', body) => fetch(`${Api.url}/${url}`, { method, headers: { 'Content-Type': "application/json;charset=utf-8" }, body }).then((res) => { if (res.ok) return res.json() })

export { http }
