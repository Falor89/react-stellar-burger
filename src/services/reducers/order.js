import { ORDER_REQUEST, ORDER_SUCCESS, ORDER_ERROR } from "../actions/order";

const initialState = {
    orderName: '',
    orderNumber: 0,
    isLoading: false,
    hasError: false
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_REQUEST: {
            return { ...state, orderName: '', orderNumber: 0, isLoading: true, hasError: false }
        }
        case ORDER_SUCCESS: {
            return { ...state, orderName: action.orderName, orderNumber: action.orderNumber, isLoading: false, hasError: false }
        }
        case ORDER_ERROR: {
            return { ...state, orderName: '', orderNumber: 0, isLoading: false, hasError: true }
        }
        default: {
            return state
        }
    }
}