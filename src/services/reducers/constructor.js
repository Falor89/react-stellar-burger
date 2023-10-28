import { ADD_BUN, RESET_INGREDIENT, DELETE_INGREDIENT } from '../actions/constructor';
import { ORDER_SUCCESS } from '../actions/order';
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
                ingridients: [...state.ingridients, action.ingridient],
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
        case RESET_INGREDIENT: {
            return {
                ...state,
                ingridients: update(state.ingridients, {
                    $splice: [
                        [action.dragIndex, 1],
                        [action.hoverIndex, 0, state.ingridients[action.dragIndex]],
                    ]
                })
            }
        }
        //Обновление контейнера после удачного ордера
        case ORDER_SUCCESS: {
            return initialState
        }
        default:
            return state;
    }
}