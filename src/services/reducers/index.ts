import { combineReducers } from "redux";
import { modalReducer } from './modal';
import { constructorReducer } from './constructor';
import { orderReducer } from './order';
import { ingredientsReducer } from "./ingredients";
import { userReducer } from "./user";
import { webSocketReducer } from "./wsSocket";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: constructorReducer,
  modal: modalReducer,
  order: orderReducer,
  user: userReducer,
  socket: webSocketReducer,
})