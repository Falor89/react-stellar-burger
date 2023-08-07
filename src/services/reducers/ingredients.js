import { GET_INGRIDIENTS_REQUEST, GET_INGRIDIENTS_REQUEST_SUCCES, GET_INGRIDIENTS_REQUEST_FAIL} from '../actions/ingredients'

const initialState = {
  ingridients: {
    buns: [],
    sauces: [],
    main: []
  },
  isLoading: false,
  hasError: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGRIDIENTS_REQUEST: {
      return {...state, isLoading: true};
    };
    case GET_INGRIDIENTS_REQUEST_SUCCES: {
      return {...state, ingridients: action.ingridients, isLoading: false};
    };
    case GET_INGRIDIENTS_REQUEST_FAIL: {
      return {...state, isLoading: false, hasError: true}
    }
    default:{
      return state
    }
  }
}