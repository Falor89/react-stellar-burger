import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, GET_CURRENT_TAB } from '../actions/ingredients';

// Исходное состояние
const initialIngredients = {
    ingredients: [],
    currentTab: "bun",
    ingredientsRequest: false,
    ingredientsFailed: false,
};

export const burgerIngredientsReducer = (state = initialIngredients, action) => {
    switch (action.type) {
        //Переключатель на таб
        case GET_CURRENT_TAB: {
            return {
                ...state,
                currentTab: action.currentTab,
            };
        }
        //Запрос на получение ингредиентов
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
            };
        }
        //Успешный ответ на получение ингредиентов
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                ingredientsRequest: false,
                ingredientsFailed: false
            };
        }
        //Ответ не пришел
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: false,
            };
        }
        default:
            return state;
    }
};