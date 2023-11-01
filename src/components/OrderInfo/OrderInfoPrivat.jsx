import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import OrderInfo from "./OrderInfo";
import { WS_SOCKET_OPEN_PRIVAT, WS_SOCKET_CLOSE } from "../../services/actions/wsSocket";
import { getUserInfo } from "../../services/actions/user";


const OrderInfoPrivat = ({ background }) => {
    const location = useLocation().pathname

    const dispatch = useDispatch();
    const { wsConnected } = useSelector(store => store.socket)


    useEffect(() => {
        if (!wsConnected) {
            dispatch({ type: WS_SOCKET_OPEN_PRIVAT })
        }
        return (() => {
            if (!background) {
                dispatch({ type: WS_SOCKET_CLOSE })
            }
        })
    }, [])

    return (
        <OrderInfo isPrivat={true} />
    )
}

export default OrderInfoPrivat;