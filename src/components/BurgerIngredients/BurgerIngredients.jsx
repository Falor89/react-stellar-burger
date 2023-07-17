import React, { useState, useContext } from "react";
import './BurgerIngredients.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../utils/ingredientType'
import TypesOfIngredients from '../TypesOfIngredients/TypesOfIngredients';
import PropTypes from 'prop-types';
import ingredientPropType from '../../utils/prop-types';
import BurgerIngredientContext from "../../services/BurgerIngredientsContext";
import { selectIngredients } from "../../utils/selectIngredients";

const BurgerIngredients = () => {

    const data = useContext(BurgerIngredientContext)

    const bun = selectIngredients(ingredientType.bun.type, data)
    const sauce = selectIngredients(ingredientType.sauce.type, data)
    const main = selectIngredients(ingredientType.main.type, data)

    const [current, setCurrent] = useState('bun')

    return (
        <section className='Ingredients-section'>
            <h1 className='text text_type_main-large pt-10'>Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
                    <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                        Начинки
                    </Tab>
            </div>
            <div className='Ingredients-container'>
                <a name='bun'>
                    <TypesOfIngredients ingridientType={bun} type={ingredientType.bun} />
                </a>
                <a name='sauce'>
                    <TypesOfIngredients ingridientType={sauce} type={ingredientType.sauce} />
                </a>
                <a name='main'>
                    <TypesOfIngredients ingridientType={main} type={ingredientType.main} />
                </a>
            </div>
        </section>
    )
}

export default BurgerIngredients;