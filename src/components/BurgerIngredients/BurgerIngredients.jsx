import React, { useState, useContext, useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import { useSelector } from "react-redux";
import styles from './burgerIngredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../utils/ingredientType'
import TypesOfIngredients from '../TypesOfIngredients/TypesOfIngredients';
import PropTypes from 'prop-types';
import ingredientPropType from '../../utils/prop-types';
import { selectIngredients } from "../../utils/selectIngredients";

const BurgerIngredients = () => {
    // Используем хук для получения данных из хранилища
    const ingredients = useSelector(store => store.burgerIngredients.ingredients);

    // Пройдемся и вытащим булки, соусы и начинки
    const buns = ingredients.filter((el) => el.type === Product.Bun.type);
    const sauces = ingredients.filter((el) => el.type === Product.Sauce.type);
    const mains = ingredients.filter((el) => el.type === Product.Main.type);

    const [current, setCurrent] = React.useState('bun')

    const [bunRef, inViewBun] = useInView({ threshold: 1 });
    const [sauceRef, inViewSauce] = useInView({ threshold: 0.5 });
    const [mainRef, inViewMain] = useInView({ threshold: 0.5 });

    useEffect(() => {
        if (inViewBun) {
            setCurrent('bun');
        } else if (inViewSauce) {
            setCurrent('sauce');
        } else if (inViewMain) {
            setCurrent('main');
        }
    }, [inViewBun, inViewSauce, inViewMain]);

    //Скролл к разделу при клике на tab
    const onTabClick = (tab) => {
        setCurrent(tab);
        const element = document.getElementById(tab);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className={styles.section}>
            <h1 className='text text_type_main-large pt-10'>Соберите бургер</h1>
            <div className={styles.tab}>
                <Tab value="bun" active={current === 'bun'} onClick={onTabClick} inViewBun={inViewBun}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={onTabClick} inViewSauce={inViewSauce}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={onTabClick} inViewMain={inViewMain}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.container}>
                <a name='bun'>
                    <TypesOfIngredients categories={buns} type={ingredientType.bun} ref={bunRef} />
                </a>
                <a name='sauce'>
                    <TypesOfIngredients categories={sauces} type={ingredientType.sauce} ref={sauceRef} />
                </a>
                <a name='main'>
                    <TypesOfIngredients categories={mains} type={ingredientType.main} ref={mainRef} />
                </a>
            </div>
        </section>
    )
}

export default BurgerIngredients;