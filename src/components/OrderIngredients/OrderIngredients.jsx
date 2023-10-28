import React from "react";
import { useSelector } from "react-redux";

import style from './orderIngredients.module.css';

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderIngredients = (props) => {

    const { buns, sauces, main } = useSelector(store => store.ingredients.ingridients)
    const ingredientsData = [...buns, ...sauces, ...main];

    let ingredient

    if (props.item.item) {
        ingredient = ingredientsData && props.item && ingredientsData.find(item => item._id === props.item.item)
    } else {
        ingredient = ingredientsData && props.item && ingredientsData.find(item => item._id === props.item)
    }

    return (
        <div className={style.container}>
            <img className={style.image} src={ingredient && ingredient.image} alt={props && ingredient && ingredient.name} />
            <p className="text text_type_main-default">{ingredient && ingredient.name}</p>
            <div className={style.price}>
                <p className="text text_type_digits-default"><span>{props && props.item.total}</span>   x   <span>{ingredient && ingredient.price}</span></p>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    )
}

export default OrderIngredients