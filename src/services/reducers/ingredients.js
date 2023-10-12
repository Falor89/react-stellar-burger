import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAIL } from "../actions/ingredients"

const initialState = {
    ingredients: {
        buns: [],
        sauces: [],
        main: []
    },
    isLoading: false,
    hasError: false,
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return { ...state, isLoading: true, hasError: false }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return { ...state, ingredients: action.ingredients, isLoading: false, hasError: false }
        }
        case GET_INGREDIENTS_FAIL: {
            return { ...state, isLoading: false, hasError: true }
        }
        default: {
            return state
        }
    }
}