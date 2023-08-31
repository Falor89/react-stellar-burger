import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from './ingredientDetails.module.css'

const IngredientDetails = () => {
    const { isLoading, hasError, ingridients } = useSelector(store => store.ingredients);
    const [actualIngridient, setActualIngridient] = useState(false);
    const params = useParams();

    useEffect(() => {
        const ingridientsList = [...ingridients.buns, ...ingridients.sauces, ...ingridients.main];
        const selectedIngridient = ingridientsList.find((ingridient) => ingridient._id === params.id);
        setActualIngridient(selectedIngridient);
    }, [params, ingridients])


    return (
        <div className={`${styles.container} pt-10 pl-10 pr-10 pb-15`}>
            {!isLoading && !hasError && actualIngridient &&
                <>
                    <h2 className='text text_type_main-large'>Детали ингридиета</h2>
                    <img className={styles.image} src={actualIngridient.image_large} alt={actualIngridient.name} />
                    <p className={`${styles.text} text text_type_main-medium pt-4 pb-8`}>{actualIngridient.name}</p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                            <span className='text text_type_main-default text_color_inactive'>{actualIngridient.calories}</span>
                        </li>
                        <li className={styles.listItem}>
                            <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                            <span className='text text_type_main-default text_color_inactive'>{actualIngridient.proteins}</span>
                        </li>
                        <li className={styles.listItem}>
                            <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                            <span className='text text_type_main-default text_color_inactive'>{actualIngridient.fat}</span>
                        </li>
                        <li className={styles.listItem}>
                            <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                            <span className='text text_type_main-default text_color_inactive'>{actualIngridient.carbohydrates}</span>
                        </li>
                    </ul>
                </>
            }
        </div>
    )
}


export default IngredientDetails;


