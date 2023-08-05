import { combineReducers } from "redux";
import { modalReducer } from './modal.js';
import { constructorReducer } from './constructor.js';
import { orderReducer } from './order.js';
import { ingredientsReducer } from "./ingredients.js";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: constructorReducer,
  modal: modalReducer,
  order: orderReducer
})