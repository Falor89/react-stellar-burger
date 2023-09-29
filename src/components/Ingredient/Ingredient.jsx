import React from 'react';
import styles from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const Ingredient = ({ ingredient }) => {
    return (
        <div className={styles.container}>
            <img src={ingredient.image} alt={ingredient.name} />
            <div>
                <CurrencyIcon type='primary' />
                <span className="text text_type_digits-default">{ingredient.price}</span>
            </div>
            <p className={`text text_type_main-default ${styles.text}`}>{ingredient.name}</p>
            <Counter count={1} size='default' />
        </div>
    )
}



export default Ingredient