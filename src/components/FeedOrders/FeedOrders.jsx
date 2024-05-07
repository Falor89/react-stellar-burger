import React, { useCallback } from "react";

import styles from './feedOrders.module.css'
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";



const FeedOrders = ({ order, ingredientsData }) => {
    const isPrivat = useSelector(store => store.socket.privat)

    const { name, number, ingredients, updatedAt } = order;

    const location = useLocation()


    const total = ingredients && ingredientsData && ingredients.reduce((a, b) => {
        ingredientsData && ingredientsData.forEach(item => {
            if (item._id === b) {
                a += item.price
            }
        })
        return a
    }, 0)

    let images = []

    ingredients && ingredientsData && ingredientsData.forEach(item => {
        ingredients.forEach(id => {
            if (item._id === id) {
                images.push({ images: item.image_mobile, name: item.name })
            }
        })
    })

    const checkLenght = () => {
        if (images.length > 5) {
            return images.length - 5
        }
        return null
    }

    return (
        <Link to={{
            pathname: isPrivat ? `/react-stellar-burger/profile/orders/${order._id}` : `/feed/${order._id}`,
            state: { background: location }
        }} className={`${styles.link}`}>
            <div className={`${styles.order}`} style={{ width: isPrivat ? '830px' : '600px' }}>
                <div className={`${styles.title}`}>
                    <p className="text text_type_digits-default">{`#${number}`}</p>
                    <p className="text text_type_main-default text_color_inactive"><FormattedDate date={new Date(updatedAt)} /></p>
                </div>
                <p className="text text_type_main-medium">{name}</p>
                <div className={`${styles.ingredients}`}>
                    <div className={`${styles.images}`}>
                        {images && images.slice(0, 5).map((item, i) => <img className={`${styles.image}`} key={i} src={item.images} alt={item.name} />)}
                        {checkLenght() ? <div className={styles.itemImgCounter} style={{ backgroundImage: `url(${images[1].images})` }} ><p className={styles.par}>{`+${checkLenght()}`}</p></div> : null}
                    </div>
                </div>
                <div className={`${styles.price}`}>
                    <p className="text text_type_digits-default">{total}</p>
                    <CurrencyIcon type='primary' />
                </div>
            </div>
        </Link>
    )
}

export default FeedOrders