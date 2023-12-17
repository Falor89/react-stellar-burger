import { getData } from '../../utils/api';
import sort from '../../utils/sort';
import { TIngredients } from '../../utils/types/data';
import { AppThunk } from '../../utils/types/index';

export const GET_INGRIDIENTS_REQUEST = 'GET_INGRIDIENTS_REQUEST';
export const GET_INGRIDIENTS_REQUEST_SUCCESS = 'GET_INGRIDIENTS_REQUEST_SUCCESS';
export const GET_INGRIDIENTS_REQUEST_FAIL = 'GET_INGRIDIENTS_REQUEST_FAIL';

interface IGetRequestAction {
  readonly type: typeof GET_INGRIDIENTS_REQUEST;
}

interface IGetRequestSuccessAction {
  readonly type: typeof GET_INGRIDIENTS_REQUEST_SUCCESS;
  readonly ingridients: TIngredients;
}

interface IGetRequestFailAction {
  readonly type: typeof GET_INGRIDIENTS_REQUEST_FAIL;
}

export type TLoadingActions = IGetRequestAction | IGetRequestSuccessAction | IGetRequestFailAction;

export const loadIngridients = (): AppThunk<Promise<unknown>> => {
  return function (dispatch) {
    dispatch({
      type: GET_INGRIDIENTS_REQUEST
    });
    return getData()
      .then((ingridients) => sort(ingridients.data))
      .then((list) => {
        const { buns, sauces, main } = list;
        dispatch({
          type: GET_INGRIDIENTS_REQUEST_SUCCESS,
          ingridients: {
            buns: buns,
            sauces: sauces,
            main: main
          }
        })
      })
      .catch(() => {
        dispatch({
          type: GET_INGRIDIENTS_REQUEST_FAIL
        })
      })
  }
}

