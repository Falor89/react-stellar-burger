import React, { FC } from "react";

import styles from './feed.module.css';
import { useDispatch, useSelector } from '../../utils/hooks';
import FeedOrders from "../FeedOrders/FeedOrders";

const Feed: FC = () => {
    const isPrivat = useSelector(store => store.socket.privat)
    const orders = useSelector(store => store.socket.orders)
    const privatOrders = useSelector(store => store.socket.ordersPrivat)
    const { buns, sauces, main } = useSelector(store => store.ingredients.ingridients)

    const checkPrivat = isPrivat ? privatOrders : orders;

    if (checkPrivat.length === 0) {
        return null
    }

    return (
        <ul className={`${styles.main}`} style={{ width: isPrivat ? '844px' : '600px' }}>
            {
                checkPrivat.map(order => (
                    <FeedOrders key={order._id} order={order} ingredientsData={[...buns, ...sauces, ...main]} />
                ))
            }
        </ul>
    )
}

export default Feed;