import { CombinedState, combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { modalReducer } from "./modal";
import { orderReducer } from "./order";
import { constructorReducer } from "./constructor";


export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorBurger: constructorReducer,
    modal: modalReducer,
    order: orderReducer
})