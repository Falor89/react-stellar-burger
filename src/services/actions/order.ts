import { setData } from '../../utils/api';
import { OPEN_ORDER_MODAL } from './modal';
import { AppThunk } from '../../utils/types/index';

export const ORDER_REQUEST: 'ORDER_REQUEST' = 'ORDER_REQUEST';
export const ORDER_SUCCESS: 'ORDER_SUCCESS' = 'ORDER_SUCCESS';
export const ORDER_ERROR: 'ORDER_ERROR' = 'ORDER_ERROR';

interface IOrderRequestAction {
  readonly type: typeof ORDER_REQUEST;
}

export interface IOrderSuccessAction {
  readonly type: typeof ORDER_SUCCESS;
  readonly orderName: string;
  readonly orderNumber: number;
}

interface IOrderErrorAction {
  readonly type: typeof ORDER_ERROR;
}

export type TOrderActions = IOrderRequestAction | IOrderSuccessAction | IOrderErrorAction


export const makeOrder = (ingridientsID: { 'ingredients': string[] }, token: string): AppThunk<Promise<unknown>> => {
  return function (dispatch) {
    dispatch({
      type: ORDER_REQUEST
    })
    dispatch({
      type: OPEN_ORDER_MODAL
    })
    return setData(ingridientsID, token)
      .then((data) => {
        dispatch({
          type: ORDER_SUCCESS,
          orderNumber: data.order.number,
          orderName: data.name
        })
      })
      .catch(() => {
        dispatch({
          type: ORDER_ERROR
        })
      })
  }
}