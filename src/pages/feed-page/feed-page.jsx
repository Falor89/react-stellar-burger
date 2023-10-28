import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './feed-page.module.css';
import Feed from '../../components/Feed/Feed';
import OrdersInfo from '../../components/OrdersInfo/OrdersInfo';

import { WS_SOCKET_OPEN, WS_SOCKET_CLOSE } from '../../services/actions/wsSocket';

export const FeedPage = () => {
    const dispatch = useDispatch();
    const { error, wsConnection } = useSelector(store => store.socket);

    useEffect(() => {
        if (!wsConnection) {
            dispatch({
                type: WS_SOCKET_OPEN
            })
            return () => {
                dispatch({
                    type: WS_SOCKET_CLOSE
                })
            }
        }
    }, [])

    return (
        <section className={`${styles.main}`}>
            <h2 className={`text text_type_main-large ${styles.title}`}>Лента заказов</h2>
            {!error && wsConnection && (
                <>
                    <Feed />
                    <OrdersInfo />
                </>
            )}
        </section>
    )

}