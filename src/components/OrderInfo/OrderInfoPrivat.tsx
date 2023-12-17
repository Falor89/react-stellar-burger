import React, { useEffect, FC } from "react";
import { useDispatch, useSelector } from '../../utils/hooks';
import { useLocation } from "react-router-dom";

import OrderInfo from "./OrderInfo";
import { WS_SOCKET_OPEN_PRIVAT, WS_SOCKET_CLOSE } from "../../services/actions/wsSocket";
import { getUserInfo } from "../../services/actions/user";
import { IAboutOrderProps } from "../../utils/types";


const OrderInfoPrivat: FC<IAboutOrderProps> = ({ background }) => {
    const location = useLocation().pathname

    const dispatch = useDispatch();
    const { wsConnection } = useSelector(store => store.socket)


    useEffect(() => {
        if (!wsConnection) {
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