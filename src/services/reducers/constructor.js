import { ADD_BUN, RESET_INGREDIENT, DELETE_INGREDIENT } from '../actions/constructor';
import plug from '../../images/burg4.png'

const initialState = {
  bun: {
    image: plug,
    image_large: plug,
    image_mobile: plug,
    name: "Перетащите булку",
    price: 0,
    type: "bun",
    __v: 0,
    _id: "none"
  },
  ingridients: []
}

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      if (action.ingridient.type === 'bun') {
        return {
          ...state,
          bun: action.ingridient
        }
      } else {
        const ingridient = {...action.ingridient};
        ingridient.uniqid = action.uniqid;
        ingridient.sort = state.ingridients.length + 1;
        return {
          ...state,
          ingridients: [...state.ingridients, ingridient]
        }
      }
    }
    case RESET_INGREDIENT: {
      const ingridient = {...action.ingridient};
      ingridient.uniqid = action.uniqid
      let ingridients = [...state.ingridients];
      ingridients.splice(action.sort, 0, ingridient);
      ingridients = ingridients.filter((item) => item.uniqid !== action.ingridient.uniqid);
      ingridients.map((ingridient, index) => ingridient.sort = index + 1);
      return {
        ...state,
        ingridients: ingridients
      }
    }
    case DELETE_INGREDIENT: {
      const ingridients = [...state.ingridients.filter((item) => item.uniqid !== action.ingridient.uniqid)];
      ingridients.map((ingridient, index) => ingridient.sort = index + 1)
      return {
        ...state,
        ingridients: ingridients
      }
    }
    default: {
      return {...state}
    }
  }
}