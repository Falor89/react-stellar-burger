import { ADD_BUN, RESET_INGREDIENT, DELETE_INGREDIENT } from '../actions/constructor';
import plug from '../../images/burg4.png'
import update from 'immutability-helper';


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
  ingridients: [],
  productIds: [],
}

// export const constructorReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_BUN: {
//       if (action.ingridient.type === 'bun') {
//         return {
//           ...state,
//           bun: action.ingridient,
//           productIds: state.productIds.filter(id => id !== state.bun._id).concat(action.ingridient._id)
//         }
//       } else {
//         const ingridient = {...action.ingridient};
//         ingridient.uniqid = action.uniqid;
//         ingridient.sort = state.ingridients.length + 1;
//         return {
//           ...state,
//           ingridients: [...state.ingridients, ingridient],
//           productIds: [...state.productIds, action.ingridient._id]
//         }
//       }
//     }
//     case RESET_INGREDIENT: {
//       const ingridient = {...action.ingridient};
//       ingridient.uniqid = action.uniqid
//       let ingridients = [...state.ingridients];
//       ingridients.splice(action.sort, 0, ingridient);
//       ingridients = ingridients.filter((item) => item.uniqid !== action.ingridient.uniqid);
//       ingridients.map((ingridient, index) => ingridient.sort = index + 1);
//       return {
//         ...state,
//         ingridients: ingridients
//       }
//     }
//     case DELETE_INGREDIENT: {
//       const ingridients = [...state.ingridients.filter((item) => item.uniqid !== action.ingridient.uniqid)];
//       ingridients.map((ingridient, index) => ingridient.sort = index + 1)
//       return {
//         ...state,
//         ingridients: ingridients,
//         productIds: [...state.productIds].filter(id => id !== action.ingridient._id)
//       }
//     }
//     default: {
//       return state
//     }
//   }
// }

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
      case ADD_BUN:
          if (action.ingridient.type === 'bun') {
              if (state.bun) {
                  return {
                      ...state,
                      bun: action.ingridient,
                      productIds: state.productIds.filter(id => id !== state.bun._id)    //id
                          .concat(action.ingridient._id),
                  };
              } else {
                  return {
                      ...state,
                      bun: action.ingridient,
                      productIds: [...state.productIds, action.ingridient._id],                //id
                  };
              }
          }
          return {
              ...state,
              ingridients: [...state.ingridients, action.ingridient ],
              productIds: [...state.productIds, action.ingridient._id],                        //id
          };
      //Удаление ингредиента из выбранного списка
      case DELETE_INGREDIENT:
          return {
              ...state,
              ingridients: [...state.ingridients].filter(item => item.uId !== action.ingridient.uId),
              productIds: [...state.productIds].filter(id => id !== action.ingridient._id),      //id
          }
      //Перетаскивание ингредиентов в конструктор
      case RESET_INGREDIENT:
          return {
              ...state,
              ingridients: update(state.ingridients, {
                  $splice: [
                      [action.dragIndex, 1],
                      [action.hoverIndex, 0, state.ingridients[action.dragIndex]],
                  ]
              })
          }
      default:
          return state;
  }
}