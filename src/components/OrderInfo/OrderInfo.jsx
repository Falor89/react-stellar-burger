import React, { useEffect, useCallback } from "react";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OrderIngredients from "../OrderIngredients/OrderIngredients";

import styles from './orderInfo.module.css'
import OrderIngredient from "../OrderIngredient/OrderIngredient";

const OrderInfo = ({ isPrivat }) => {

    const params = useParams();

    const { buns, sauces, main } = useSelector(store => store.ingredients.ingridients)
    const ingredientsData = [...buns, ...sauces, ...main]
    const commonOrders = useSelector(store => store.socket.orders)
    const privatOrders = useSelector(store => store.socket.ordersPrivat)

    const orders = isPrivat ? privatOrders : commonOrders;
    const order = orders.find((item) => item._id === params.id);

    const orderIngredients = order.ingredients

    const total = orderIngredients && ingredientsData && orderIngredients.reduce((a, b) => {
        ingredientsData && ingredientsData.forEach(item => {
            if (item._id === b) {
                a += item.price
            }
        })
        return a
    }, 0)

    const checkStatus = (type) => {
        switch (type) {
            case 'done':
                return 'Выполнен'
            default:
                return 'В обработке'
        }
    }

    const checkIngredients = (ingredients, order) => {
        const duplicates = order.ingredients.filter((number, index, numbers) => {
            return numbers.indexOf(number) !== index;
        });

        const counter = order.ingredients.filter(item => item === duplicates[0]).length

        const notDuplicates = order.ingredients.filter(item => item !== duplicates[0]).map(item => ({ item, total: 1 }))

        const newIngredients = [{ item: duplicates[0], total: counter }]

        return [...notDuplicates, ...newIngredients]
    }

    return (
        <section className={styles.section}>
            <p className={`${styles.number} text text_type_digits-default`}>{`#${order.number}`}</p>
            <p className={`${styles.title} text text_type_main-medium`}>{order.name}</p>
            <p className={`${styles.status} text text_type_main-small`} style={{ color: checkStatus(order.status) === 'Выполнено' ? 'red' : '#00CCCC' }}>{checkStatus(order.status)}</p>
            <p className={`text text_type_main-medium`}>Состав:</p>
            <div className={`${styles.container} custom-scroll`}>
                {
                    ingredientsData && order && checkIngredients(ingredientsData, order).map((item, i) =>
                        <OrderIngredients key={i} item={item} />
                    )}
            </div>
            <div className={`${styles.containerPirce}`}>
                <p className={`text text_type_main-default text_color_inactive`}>
                    <FormattedDate date={new Date(order.updatedAt)} />
                </p>
                <div className={`${styles.price}`}>
                    <p className={`text text_type_digits-default`}>{total}</p>
                    <CurrencyIcon type='primary' />
                </div>
            </div>
        </section >
    )
}

export default OrderInfo;