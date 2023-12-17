import React, { useCallback, FC } from "react";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from '../../utils/hooks';
import { useParams } from "react-router-dom";
import OrderIngredients from "../OrderIngredients/OrderIngredients";

import styles from './orderInfo.module.css'
import OrderIngredient from "../OrderIngredient/OrderIngredient";

import { getIngridients } from "../../utils/order";
import { TOrder, TIngredient } from "../../utils/types/data";

interface IAboutOrder {
    isPrivat: boolean
}

interface IParams {
    id: string
}

const OrderInfo: FC<IAboutOrder> = ({ isPrivat }) => {
    const params: IParams = useParams();

    const { orders: commonOrders, ordersPrivat } = useSelector(store => store.socket)
    const { buns, sauces, main } = useSelector(store => store.ingredients.ingridients)
    const ingredientsData = [...buns, ...sauces, ...main]

    // const commonOrders = useSelector(store => store.socket.orders)
    // const privatOrders = useSelector(store => store.socket.ordersPrivat)

    const orders = isPrivat ? ordersPrivat : commonOrders;
    const order = orders.find((item: TOrder) => item._id === params.id);

    let sum: number | undefined, ingredientsSortedList: TIngredient[] | undefined, ingredientsList: TIngredient[]


    const getIngridientsCallback = useCallback((order: TOrder, allIngredients: TIngredient[]) => {
        let { sum, ingredientsList } = getIngridients(order, allIngredients)
        const ingredientsSortedList = [...new Set(ingredientsList)];
        if (ingredientsList[0].type === 'bun') {
            ingredientsList.push(ingredientsList[0])
        }
        return {
            sum: sum,
            ingredientsSortedList: ingredientsSortedList,
            ingredientsList: ingredientsList
        }
    }, [order?.ingredients, ingredientsData])


    if (order && ingredientsData) {
        ({ sum, ingredientsSortedList, ingredientsList } = getIngridientsCallback(order, ingredientsData));
    }

    if (!order || !ingredientsSortedList || orders.length === 0 || ingredientsData.length === 0) {
        return null
    }

    const checkStatus = (type: string) => {
        switch (type) {
            case 'done':
                return 'Выполено'
            case 'pending':
                return 'Выполняется'
            default:
                return 'Выполяется'
        }
    }

    return (
        <section className={styles.section}>
            <p className={`${styles.number} text text_type_digits-medium`}>{`#${order.number}`}</p>
            <p className={`${styles.title} text text_type_main-medium`}>{order.name}</p>
            <p className={`${styles.status} text text_type_main-small`}>{checkStatus(order.status)}</p>
            <p className={`${styles.compound} text text_type_main-medium`}>Состав:</p>
            <div className={`${styles.container} custom-scroll`}>
                {ingredientsSortedList.map(ingredient => {
                    const selected = ingredientsList.filter((current) => current._id === ingredient._id)
                    const counter = selected.length
                    return <OrderIngredient key={ingredient._id} ingredient={ingredient} counter={counter} />
                })}
            </div>
            <div className={styles.footer}>
                <span className="text text_type_main-default text_color_inactive"><FormattedDate date={new Date(order.updatedAt)} /></span>
                <span className="text text_type_digits-medium">
                    {sum} &nbsp;
                    <CurrencyIcon type="primary" />
                </span>
            </div>
        </section >
    )
}

export default OrderInfo;