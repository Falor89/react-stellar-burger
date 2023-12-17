import { GET_INGRIDIENTS_REQUEST, GET_INGRIDIENTS_REQUEST_SUCCESS, GET_INGRIDIENTS_REQUEST_FAIL, TLoadingActions } from '../actions/ingredients'
import { TIngredients } from '../../utils/types/data';


interface IState {
  ingridients: TIngredients;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: IState = {
  ingridients: {
    buns: [],
    sauces: [],
    main: []
  },
  isLoading: false,
  hasError: false,
};

export const ingredientsReducer = (state = initialState, action: TLoadingActions): IState => {
  switch (action.type) {
    case GET_INGRIDIENTS_REQUEST: {
      return { ...state, isLoading: true };
    };
    case GET_INGRIDIENTS_REQUEST_SUCCESS: {
      return { ...state, ingridients: action.ingridients, isLoading: false };
    };
    case GET_INGRIDIENTS_REQUEST_FAIL: {
      return { ...state, isLoading: false, hasError: true }
    }
    default: {
      return state
    }
  }
}