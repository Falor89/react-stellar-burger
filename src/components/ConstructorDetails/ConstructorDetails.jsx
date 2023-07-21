import React, {useContext} from "react";
import styles from './constructorDetails.module.css'
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientContext from "../../services/BurgerIngredientsContext";

const ConstructorDetails = () => {
    const data = useContext(BurgerIngredientContext);

    const ingredients = data.filter((item) => item.type !== 'bun');

    return(
        <ul className={`${styles.list} pr-2`}>
            {ingredients.map((item) => (
                            <li className={styles.listItem} key={item._id}>
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