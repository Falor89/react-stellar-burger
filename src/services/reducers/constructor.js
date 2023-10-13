import { ADD_BUN, DELETE_INGREDIENT, RESET_INGREDIENT } from "../actions/constructor";
import plug from '../../images/burg4.png';
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
    ingredients: [],
    productIds: [],
}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BUN:
            if (action.ingredients.type === 'bun') {
                if (state.bun) {
                    return { ...state, bun: action.ingredient, productIds: state.productIds.filter(id => id !== state.bun._id).concat(action.ingredient._id) }
                }
                else {
                    return {
                        ...state, bun: action.ingredient, productIds: [...state.productIds, action.ingredient._id]
                    }
                }
            }
            return {
                ...state,
                ingredients: [...state.ingredients, action.ingredient],
                productIds: [...state.productIds, action.ingredient._id],                        //id
            };
        //Удаление ингредиента из выбранного списка
        case DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients].filter(item => item.uId !== action.ingredient.uId),
                productIds: [...state.productIds].filter(id => id !== action.ingredient._id),      //id
            }
        //Перетаскивание ингредиентов в конструктор
        case RESET_INGREDIENT: {
            return {
                ...state,
                ingredients: update(state.ingredients, {
                    $splice: [
                        [action.dragIndex, 1],
                        [action.hoverIndex, 0, state.ingredients[action.dragIndex]],
                    ]
                })
            }
        }
        default: {
            return state
        }
    }
}