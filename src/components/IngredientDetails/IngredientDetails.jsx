import React from "react";
import ingridientDetailsStyles from './ingredientDetails.module.css';
import ingredientPropType from "../../utils/prop-types";

const IngredientDetails = ({ ingridient }) => {
    return (
        <div className={`${ingridientDetailsStyles.container} pt-10 pl-10 pr-10 pb-15`}>
            <h2 className='text text_type_main-large'>Детали ингридиета</h2>
            <img className={ingridientDetailsStyles.image} src={ingridient.image_large} alt={ingridient.name} />
            <p style={{ margin: '0 auto' }} className={`text text_type_main-medium pt-4 pb-8`}>{ingridient.name}</p>
            <ul className={ingridientDetailsStyles.list}>
                <li className={ingridientDetailsStyles.listItem}>
                    <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                    <span className='text text_type_main-default text_color_inactive'>{ingridient.calories}</span>
                </li>
                <li className={ingridientDetailsStyles.listItem}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <span className='text text_type_main-default text_color_inactive'>{ingridient.proteins}</span>
                </li>
                <li className={ingridientDetailsStyles.listItem}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <span className='text text_type_main-default text_color_inactive'>{ingridient.fat}</span>
                </li>
                <li className={ingridientDetailsStyles.listItem}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <span className='text text_type_main-default text_color_inactive'>{ingridient.carbohydrates}</span>
                </li>
            </ul>
        </div>
    )
}

IngredientDetails.propTypes = {
    ingridient: ingredientPropType.isRequired
}

export default IngredientDetails;


