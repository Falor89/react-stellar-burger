import React, {useContext} from "react";
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import './ConstructorDetails.css';
import BurgerIngredientContext from "../../services/BurgerIngredientsContext";

const ConstructorDetails = () => {
    const data = useContext(BurgerIngredientContext);

    const ingredients = data.filter((item) => item.type !== 'bun');

    return(
        <ul className={`ConstructorDetails-list pr-2`}>
            {ingredients.map((item) => (
                            <li className='ConstructorDetails-listItem' key={item._id}>
                            <DragIcon type='primary' />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </li>
            ))}
        </ul>
    )
}

export default ConstructorDetails;