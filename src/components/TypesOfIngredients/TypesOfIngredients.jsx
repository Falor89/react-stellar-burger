import React, { forwardRef } from 'react'
import styles from './typesOfIngredients.module.css'
import Ingredient from '../Ingredient/Ingredient';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails'


const TypesOfIngredients = forwardRef((props, ref) => {
    return (
        <div className={styles.ingredientContainer} ref={ref}>
            <h1 className="text text_type_main-medium"></h1>
            <ul className={styles.ingredients}>
                {props.menu.map((item) => (
                    <li key={item._id}>
                        <Ingredient ingredient={item} />
                    </li>
                ))}
            </ul>
        </div>
    )
})

export default TypesOfIngredients