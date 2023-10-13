import { setData } from "../../utils/api";
import { OPEN_ORDER_MODAL } from "./modal";


export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_ERROR = 'ORDER_FAIL'

export function makeOrder(ingredientID) {
  return function (dispatch) {
    dispatch({
      type: ORDER_REQUEST
    })
    setData(ingredientID)
      .then((data) => {
        dispatch({
          type: ORDER_SUCCESS,
          orderName: data.name,
          orderNumber: data.order.number
        })
        dispatch({
          type: OPEN_ORDER_MODAL
        })
      })
      .catch((err) => {
        dispatch({
          type: ORDER_ERROR
        })
        alert(`Ошибка в получении заказа! Ошибка: ${err}`)
      })
  }
}

// export function makeOrder(ingridientsID) {
//   return function (dispatch) {
//     dispatch({
//       type: ORDER_REQUEST
//     })
//     setData(ingridientsID)
//       .then((data) => {
//         dispatch({
//           type: ORDER_SUCCES,
//           orderNumber: data.order.number,
//           orderName: data.name
//         })
//         dispatch({
//           type: OPEN_ORDER_MODAL
//         })
//       })
//       .catch((err) => {
//         dispatch({
//           type: ORDER_ERROR
//         })
//         console.log(`${err} Ошибка в получении заказа`)
//       })
//   }
// }