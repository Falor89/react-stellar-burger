import React, {useContext} from "react";
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorDetailsStyles from './constructorDetails.module.css';
import BurgerIngridientContext from "../../services/BurgerIngridientsContext";

const ConstructorDetails = () => {
    const data = useContext(BurgerIngridientContext);

    const ingridients = data.filter((item) => item.type !== 'bun');

    return(
        <ul className={`${constructorDetailsStyles.list} pr-2`}>
            {ingridients.map((item) => (
                            <li className={`${constructorDetailsStyles.listItem}`} key={item._id}>
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