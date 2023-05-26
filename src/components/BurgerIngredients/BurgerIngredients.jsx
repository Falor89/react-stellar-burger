import { useState } from "react";
import { createPortal } from "react-dom";
import burgerIngridientsStyles from './burgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingridientType from '../../utils/ingridientType'
import ArrIngridients from '../ArrIngridients/ArrIngridients';
import PropTypes from 'prop-types';
import selectIngridients from '../../utils/selectIngridients'


const BurgerIngredients = ({ ingridients, openModal }) => {

    const bun = selectIngridients(ingridientType.Bun.type, ingridients)
    const sauce = selectIngridients(ingridientType.Sauce.type, ingridients)
    const main = selectIngridients(ingridientType.Main.type, ingridients)

    const [current, setCurrent] = useState('bun')

    return (
        <section className={burgerIngridientsStyles.section}>
            <h1 className='text text_type_main-large pt-10'>Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
                <a href="#bun">
                    <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                        Булки
                    </Tab>
                </a>
                <a href="#sauce">
                    <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                </a>
                <a href="#main">
                    <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </a>
            </div>
            <div className={burgerIngridientsStyles.container}>
                <a>
                    <ArrIngridients ingridientType={bun} type={ingridientType.Bun} openModal={openModal} />
                </a>
                <a>
                    <ArrIngridients ingridientType={sauce} type={ingridientType.Sauce} openModal={openModal} />
                </a>
                <a>
                    <ArrIngridients ingridientType={main} type={ingridientType.Main} openModal={openModal} />
                </a>
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    openModal: PropTypes.func.isRequired,
}

export default BurgerIngredients;