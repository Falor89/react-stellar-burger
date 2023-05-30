import React from "react";
import ingridientDetailsStyles from './ingridientDetails.module.css';
import ingridientType from "../../utils/ingridientType";

const IngridientDetails = ({ ingridient }) => {
    return (
        <div>
            <h2>Детали ингридиета</h2>
            {console.log(ingridient)}
            <img src={ingridient.image_large} alt={ingridient.name} />
            <p>{ingridient.name}</p>
            <ul>
                <li>
                    <p>Калории, ккал</p>
                    <span>{ingridient.calories}</span>
                </li>
            </ul>
        </div>
    )
}

    IngridientDetails.propTypes = {
        ingridient: ingridientType.isRequired
    }

export default IngridientDetails;


