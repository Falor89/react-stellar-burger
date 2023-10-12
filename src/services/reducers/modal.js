import { OPEN_INGREDIENT_MODAL, OPEN_ORDER_MODAL, CLOSE_MODAL, MODAL_HAS_ERROR } from "../actions/modal";


const initialState = {
    isModalOpen: false,
    actualModal: '',
    actualIngredient: '',
    modalHasError: false
}

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_INGREDIENT_MODAL: {
            return { ...state, isModalOpen: true, actualModal: 'ingredient', actualIngredient: action.ingredient }
        }
        case OPEN_ORDER_MODAL: {
            return { ...state, isModalOpen: true, actualModal: 'order', }
        }
        case CLOSE_MODAL: {
            return { ...state, isModalOpen: false, actualModal: '', actualIngredient: '' }
        }
        case MODAL_HAS_ERROR: {
            return { ...state, modalHasError: true, actualModal: '', actualIngredient: '' }
                + alert(`Ошибка в модальном окне`)
        }
        default: {
            return state
        }
    }
}