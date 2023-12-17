import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './components/App/app';
import { compose, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { rootReducer } from './services/reducers/index';
import { configureStore } from '@reduxjs/toolkit'
import { legacy_createStore as createStore } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom';
import { socketMiddleware } from './services/middleware/wsSocket';
import {
  WS_SOCKET_OPEN, WS_SOCKET_OPEN_PRIVAT, WS_OPEN_SUCCESS, WS_SOCKET_CLOSE, WS_CLOSE_SUCCESS,
  WS_SOCKET_ERROR, WS_SOCKET_ONMESSAGE, WS_SOCKET_ONMESSAGE_PRIVAT, IWsActions
} from './services/actions/wsSocket';

const wsActions: IWsActions = {
  open: WS_SOCKET_OPEN,
  close: WS_SOCKET_CLOSE,
  onOpen: WS_OPEN_SUCCESS,
  onClose: WS_CLOSE_SUCCESS,
  error: WS_SOCKET_ERROR,
  onMessage: WS_SOCKET_ONMESSAGE,
  openPrivate: WS_SOCKET_OPEN_PRIVAT,
  onMessagePrivate: WS_SOCKET_ONMESSAGE_PRIVAT
}

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsPrivateURL = 'wss://norma.nomoreparties.space/orders';


const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions, wsUrl, wsPrivateURL)));

// Инициализируем хранилище с помощью корневого редьюсера

const store = createStore(rootReducer, enhancer);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);

reportWebVitals(); 