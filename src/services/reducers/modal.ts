import { OPEN_ORDER_MODAL, OPEN_INGREDIENT_MODAL, CLOSE_MODAL, ORDER_HAS_ERROR, TActualModalActions } from '../actions/modal';

interface IState {
  isModalOpen: boolean;
  actualModal: string;
  actualIngredient: object
}


const initialState = {
  isModalOpen: false,
  actualModal: '',
  actualIngredient: {}
}

export const modalReducer = (state = initialState, action: TActualModalActions): IState => {
  switch (action.type) {
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        isModalOpen: true,
        actualModal: 'order',
      }
    }
    case OPEN_INGREDIENT_MODAL: {
      return {
        ...state,
        isModalOpen: true,
        actualModal: 'ingridient',
        actualIngredient: action.ingridient
      }
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        isModalOpen: false,
        actualModal: '',
        actualIngredient: {}
      }
    }
    case ORDER_HAS_ERROR: {
      return {
        ...state,
        isModalOpen: false,
        actualModal: '',
        actualIngredient: {},
      }
    }
    default: {
      return state
    }
  }
}