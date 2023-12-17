import { IWsActions } from "../actions/wsSocket"
import { AppDispatch, RootState, TApplicationActions } from "../../utils/types"
import { ISocketResponse } from "../../utils/types/data"
import { Middleware, MiddlewareAPI } from "@reduxjs/toolkit"


export const socketMiddleware = (wsActions: IWsActions, wsUrl: string, wsPrivateURL: string): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket;

        return next => (action: TApplicationActions) => {
            const { dispatch, getState } = store;
            const { type } = action;
            const { open, close, onOpen, onClose, error, onMessage, openPrivate, onMessagePrivate } = wsActions;
            const { accessToken } = getState().user;
            const isPrivat = getState().socket.privat;
            const token = accessToken.split(' ')[1];


            if (type === open) {
                socket = new WebSocket(wsUrl)
            }

            if (type === openPrivate) {
                socket = new WebSocket(wsPrivateURL + `?token=${token}`)
            }

            if (type === close) {
                socket.close(1000, "работа закончена");
            }

            if (socket) {
                socket.onopen = e => {
                    dispatch({ type: onOpen });
                }

                socket.onmessage = e => {
                    const { data } = e;
                    const parsed: ISocketResponse = JSON.parse(data);
                    if (parsed.success) {
                        isPrivat ?
                            dispatch({
                                type: onMessagePrivate,
                                orders: parsed.orders
                            }) :
                            dispatch({
                                type: onMessage,
                                total: parsed.total,
                                today: parsed.today,
                                orders: parsed.orders
                            })
                    }
                }

                socket.onclose = e => {
                    dispatch({ type: onClose });
                }

                socket.onerror = e => {
                    dispatch({ type: error })
                }
            }

            next(action)
        }
    }
}