import { setData } from '../../utils/api.js';
import { OPEN_ORDER_MODAL } from './modal.js';

export const ORDER_ERROR = 'ORDER_HAS_ERROR';
export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCES';

export function makeOrder(ingridientsID, token) {
  return function (dispatch) {
    dispatch({
      type: ORDER_REQUEST
    })
    dispatch({
      type: OPEN_ORDER_MODAL
    })
    setData(ingridientsID, token)
      .then((data) => {
        dispatch({
          type: ORDER_SUCCESS,
          orderNumber: data.order.number,
          orderName: data.name
        })
      })
      .catch((err) => {
        dispatch({
          type: ORDER_ERROR
        })
        console.log(`${err.message} Ошибка в получении заказа`)
      })
  }
}