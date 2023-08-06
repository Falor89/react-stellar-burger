import { v4 as uuidv4 } from 'uuid';

export const ADD_BUN = 'ADD_BUN';
export const RESET_INGREDIENT = 'RESET_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export function addBun(ingridient) {
    return {
        type: ADD_BUN,
        ingridient: {
            ...ingridient,
            uId: uuidv4(),
        }
    }
}

export function resetItem (dragIndex, hoverIndex) {
    return {
        type: RESET_INGREDIENT,
        dragIndex,
        hoverIndex
    };
}