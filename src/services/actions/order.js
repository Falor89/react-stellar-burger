import { setData } from '../../utils/api.js';
import { OPEN_ORDER_MODAL } from './modal.js';

export const ORDER_ERROR = 'ORDER_HAS_ERROR';
export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCES = 'ORDER_SUCCES';

export function makeOrder(ingridientsID) {
  return function (dispatch) {
    dispatch({
      type: ORDER_REQUEST
    })
    setData(ingridientsID)
      .then((data) => {
        dispatch({
          type: ORDER_SUCCES,
          orderNumber: data.order.number,
          orderName: data.name
        })
        dispatch({
          type: OPEN_ORDER_MODAL
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