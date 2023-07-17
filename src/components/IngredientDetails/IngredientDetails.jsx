import React from "react";
import './IngredientDetails.css';
import ingredientPropType from "../../utils/prop-types";

const IngredientDetails = ({ ingredient }) => {
    return (
        <div className={`IngredientDetails-container pt-10 pl-10 pr-10 pb-15`}>
            <h2 className='text text_type_main-large'>Детали ингридиета</h2>
            <img className='IngredientDetails-image' src={ingredient.image_large} alt={ingredient.name} />
            <p style={{ margin: '0 auto' }} className={`text text_type_main-medium pt-4 pb-8`}>{ingredient.name}</p>
            <ul className='IngredientDetails-list'>
                <li className='IngredientDetails-listItem'>
                    <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                    <span className='text text_type_main-default text_color_inactive'>{ingredient.calories}</span>
                </li>
                <li className='IngredientDetails-listItem'>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <span className='text text_type_main-default text_color_inactive'>{ingredient.proteins}</span>
                </li>
                <li className='IngredientDetails-listItem'>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <span className='text text_type_main-default text_color_inactive'>{ingredient.fat}</span>
                </li>
                <li className='IngredientDetails-listItem'>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <span className='text text_type_main-default text_color_inactive'>{ingredient.carbohydrates}</span>
                </li>
            </ul>
        </div>
    )
}

IngredientDetails.propTypes = {
    ingredient: ingredientPropType.isRequired
}

export default IngredientDetails;


