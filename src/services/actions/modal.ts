export const OPEN_ORDER_MODAL: 'OPEN_ORDER_MODAL' = 'OPEN_ORDER_MODAL';
export const OPEN_INGREDIENT_MODAL: 'OPEN_INGREDIENT_MODAL' = 'OPEN_INGREDIENT_MODAL';
export const CLOSE_MODAL: 'CLOSE_MODAL' = 'CLOSE_MODAL';
export const ORDER_HAS_ERROR: 'ORDER_HAS_ERROR' = 'ORDER_HAS_ERROR'


interface IOpenOrderModalAction {
    readonly type: typeof OPEN_ORDER_MODAL;
}

interface IOpenIngredientModalAction {
    readonly type: typeof OPEN_INGREDIENT_MODAL;
    readonly ingridient: object
}

interface ICloseModalAction {
    readonly type: typeof CLOSE_MODAL
}

interface IOrderHasError {
    readonly type: typeof ORDER_HAS_ERROR
}

export type TActualModalActions = IOpenOrderModalAction | IOpenIngredientModalAction | ICloseModalAction | IOrderHasError