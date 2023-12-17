import { CHOOSE_INGRIDIENT, DELETE_INGRIDIENT, MOVE_INGRIDIENT, TActualIngredientsActions } from '../actions/constructor';
import { ORDER_SUCCESS } from '../actions/order';
import update from 'immutability-helper';
import { TIngredient } from '../../utils/types/data'
import burg4 from '../../images/burg4.png';

interface IState {
    bun: TIngredient;
    ingridients: TIngredient[] | [];
    productsIds: string[]
}

const initialState: IState = {
    bun: {
        calories: 0,
        carbohydrates: 0,
        fat: 0,
        image: burg4,
        image_large: burg4,
        image_mobile: burg4,
        name: "Перетащите булку",
        price: 0,
        type: "bun",
        __v: 0,
        _id: "none",
        proteins: 0
    },
    ingridients: [],
    productsIds: [],
}

export const constructorReducer = (state = initialState, action: TActualIngredientsActions): IState => {
    switch (action.type) {
        case CHOOSE_INGRIDIENT:
            //если только булка
            if (action.ingridient.type === 'bun') {
                if (state.bun) {
                    return {
                        ...state,
                        bun: action.ingridient,
                        productsIds: state.productsIds.filter(id => id !== state?.bun?._id)    //id
                            .concat(action.ingridient._id),
                    };
                } else {
                    return {
                        ...state,
                        bun: action.ingridient,
                        productsIds: [...state.productsIds, action.ingridient._id],                //id
                    };
                }
            }
            return {
                ...state,
                ingridients: [...state.ingridients, action.ingridient],
                productsIds: [...state.productsIds, action.ingridient._id],                        //id
            };
        //Удаление ингредиента из выбранного списка
        case DELETE_INGRIDIENT:
            return {
                ...state,
                ingridients: [...state.ingridients].filter(item => item.uId !== action.ingridient.uId),
                productsIds: [...state.productsIds].filter(id => id !== action.ingridient._id),      //id
            }
        //Перетаскивание ингредиентов в конструктор
        case MOVE_INGRIDIENT:
            return {
                ...state,
                ingridients: update(state.ingridients, {
                    $splice: [
                        [action.dragIndex, 1],
                        [action.hoverIndex, 0, state.ingridients[action.dragIndex]],
                    ]
                })
            }
        case ORDER_SUCCESS: {
            return initialState
        }
        default: {
            return state
        }
    }
}