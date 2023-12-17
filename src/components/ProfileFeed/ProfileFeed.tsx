import React, { useEffect, FC } from "react";

import styles from './profileFeed.module.css';
import { useDispatch, useSelector } from '../../utils/hooks';
import { WS_SOCKET_OPEN_PRIVAT, WS_SOCKET_CLOSE } from "../../services/actions/wsSocket";

import Feed from "../Feed/Feed";

const ProfileFeed = () => {
    const dispatch = useDispatch();

    const { error, wsConnection } = useSelector(store => store.socket);

    useEffect(() => {
        if (!wsConnection) {
            dispatch({ type: WS_SOCKET_OPEN_PRIVAT })
            return () => {
                dispatch({ type: WS_SOCKET_CLOSE })
            }
        }
    }, [])


    if (error || !wsConnection) { return null }

    return (
        <Feed />
    )
}

export default ProfileFeed;