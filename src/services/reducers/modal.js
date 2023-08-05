import { OPEN_ORDER_MODAL, OPEN_INGRIDIENT_MODAL, CLOSE_MODAL, ORDER_HAS_ERROR} from '../actions/modal.js';

const initialState = {
  isModalOpen: false,
  actualModal: '',
  actualIngridient: {}
}

export const modalReducer = (state = initialState, action) => {
  switch(action.type) {
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        isModalOpen: true,
        actualModal: 'order',
      }
    }
    case OPEN_INGRIDIENT_MODAL: {
      return {
        ...state,
        isModalOpen: true,
        actualModal: 'ingridient',
        actualIngridient: action.ingridient
      }
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        isModalOpen: false,
        actualModal: '',
        actualIngridient: {}
      }
    }
    case ORDER_HAS_ERROR: {
      return { 
        ...state,
        isModalOpen: false,
        actualModal: '',
        actualIngridient: {},
      } + console.log('Ошибка в получении запроса модалки')
    }
    default: {
      return {...state}
    }
  }
}