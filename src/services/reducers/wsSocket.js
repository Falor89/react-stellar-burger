import {
    WS_SOCKET_OPEN, WS_SOCKET_OPEN_PRIVAT, WS_OPEN_SUCCESS, WS_SOCKET_CLOSE,
    WS_SOCKET_ERROR, WS_SOCKET_ONMESSAGE, WS_SOCKET_ONMESSAGE_PRIVAT
} from "../actions/wsSocket";

const initialState = {
    wsConnection: false,
    error: false,
    privat: false,
    total: 0,
    today: 0,
    orders: [],
    ordersPrivat: []
}

export const webSocketReducer = (state = initialState, action) => {
    switch (action.type) {
        case WS_SOCKET_OPEN:
            return { ...state, privat: false, }
        case WS_SOCKET_OPEN_PRIVAT:
            return { ...state, privat: true, }
        case WS_OPEN_SUCCESS:
            return { ...state, wsConnection: true, error: false }
        case WS_SOCKET_CLOSE:
            return { ...initialState }
        case WS_SOCKET_ERROR:
            return { ...state, error: true }
        case WS_SOCKET_ONMESSAGE:
            return { ...state, total: action.total, today: action.today, orders: action.orders }
        case WS_SOCKET_ONMESSAGE_PRIVAT:
            return { ...state, ordersPrivat: action.orders }
        default:
            return state
    }
}