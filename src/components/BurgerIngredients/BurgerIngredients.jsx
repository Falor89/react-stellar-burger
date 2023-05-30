import { useState } from "react";
import burgerIngridientsStyles from './burgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingridientType from '../../utils/ingridientType'
import TypesOfIngridients from '../TypesOfIngridients/TypesOfIngridients';
import PropTypes from 'prop-types';
import ingredientPropType from '../../utils/prop-types';

const BurgerIngredients = ({ data, openModal }) => {

    const selectIngridients = (type, arr) => {
        return arr.reduce((a, b) => {
            if (b.type === type) {
                a.push(b);
            }
            return a;
        }, 
            []
        );
    };

    const bun = selectIngridients(ingridientType.Bun.type, data)
    const sauce = selectIngridients(ingridientType.Sauce.type, data)
    const main = selectIngridients(ingridientType.Main.type, data)

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
                <a name='bun'>
                    <TypesOfIngridients ingridientType={bun} type={ingridientType.Bun} openModal={openModal} />
                </a>
                <a name='sauce'>
                    <TypesOfIngridients ingridientType={sauce} type={ingridientType.Sauce} openModal={openModal} />
                </a>
                <a name='main'>
                    <TypesOfIngridients ingridientType={main} type={ingridientType.Main} openModal={openModal} />
                </a>
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    openModal: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
}

export default BurgerIngredients;