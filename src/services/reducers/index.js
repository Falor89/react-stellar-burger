import { combineReducers } from "redux";
import { modalReducer } from './modal.js';
import { constructorReducer } from './constructor.js';
import { orderReducer } from './order.js';
import { ingredientsReducer } from "./ingredients.js";
import { userReducer } from "./user.js";
import { webSocketReducer } from "./wsSocket.js";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: constructorReducer,
  modal: modalReducer,
  order: orderReducer,
  user: userReducer,
  socket: webSocketReducer,
})