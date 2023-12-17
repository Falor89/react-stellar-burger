import React, { useEffect, FC } from "react";
import { useDispatch, useSelector } from '../../utils/hooks';

import OrderInfo from "./OrderInfo";
import { WS_SOCKET_OPEN, WS_SOCKET_CLOSE } from "../../services/actions/wsSocket";
import { IAboutOrderProps } from "../../utils/types";

const OrderInfoCommon: FC<IAboutOrderProps> = ({ background }) => {
    const dispatch = useDispatch();
    const { wsConnection } = useSelector(store => store.socket)

    useEffect(() => {
        if (!wsConnection) {
            dispatch({ type: WS_SOCKET_OPEN })
        }
        return (() => {
            if (!background) {
                dispatch({ type: WS_SOCKET_CLOSE })
            }
        })
    }, [])

    return (
        <OrderInfo isPrivat={false} />
    )
}

export default OrderInfoCommon;