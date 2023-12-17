import { v4 as uuidv4 } from 'uuid';
import { TIngredient } from '../../utils/types/data';
import { IOrderSuccessAction } from './order';

export const CHOOSE_INGRIDIENT: 'CHOOSE_INGRIDIENT' = 'CHOOSE_INGRIDIENT';
export const DELETE_INGRIDIENT: 'DELETE_INGRIDIENT' = 'DELETE_INGRIDIENT';
export const MOVE_INGRIDIENT: 'MOVE_INGRIDIENT' = 'MOVE_INGRIDIENT';

interface IChooseIngredientAction {
    readonly type: typeof CHOOSE_INGRIDIENT;
    readonly ingridient: TIngredient;
}

interface IDeleteIngredientAction {
    readonly type: typeof DELETE_INGRIDIENT;
    readonly ingridient: TIngredient;
}

interface IMoveIngredientAction {
    readonly type: typeof MOVE_INGRIDIENT;
    // readonly ingridient: TIngredient;
    // readonly uniqid: string;
    // readonly sort: number;
    dragIndex: number;
    hoverIndex: number;

}

export const addIngredient = (ingridient: TIngredient): IChooseIngredientAction => {
    return {
        type: CHOOSE_INGRIDIENT,
        ingridient: {
            ...ingridient,
            uId: uuidv4()
        }
    }
}

//Удаление ингредиента из выбранного списка
export const deleteItem = (ingridient: TIngredient): IDeleteIngredientAction => {
    return {
        type: DELETE_INGRIDIENT,
        ingridient,
    };
}
//Перетаскивание ингредиентов в конструктор
export const resetItem = (dragIndex: number, hoverIndex: number): IMoveIngredientAction => {
    return {
        type: MOVE_INGRIDIENT,
        dragIndex,
        hoverIndex
    };
}

export type TActualIngredientsActions = IChooseIngredientAction | IDeleteIngredientAction | IMoveIngredientAction | IOrderSuccessAction;