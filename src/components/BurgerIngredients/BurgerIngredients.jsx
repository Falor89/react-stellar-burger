import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burgerIngredients.module.css';
import selectType from '../../utils/utils';
import ingredientsType from '../../utils/ingredientsType';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import TypeOfIngredients from '../TypesOfIngredients/TypesOfIngredients'
import { BurgerIngredientContext } from '../../services/burgerIngredientContext';

const BurgerIngredients = () => {
    const dispatch = useDispatch();

    const { buns, sauces, main } = useSelector(store => store.ingredients.ingredients)



    const [current, setCurrent] = React.useState('bun')


    const menu = React.useRef(null);
    const menuBuns = React.useRef(null);
    const menuSauces = React.useRef(null);
    const menuMain = React.useRef(null);

    const onScroll = () => {
        const saucesX = menuBuns.current.offsetHeight;
        const mainX = menuSauces.current.offsetHeight + saucesX;
        const menuScroll = menu.current.scrollTop;

        if (menuScroll >= mainX) {
            setCurrent('main')
        } else if (menuScroll >= saucesX) {
            setCurrent('sauces')
        } else {
            setCurrent('buns')
        }
    }

    const scrollTo = (value) => {
        setCurrent(value)
        let section
        switch (value) {
            case 'buns':
                section = menuBuns.current;
                break;
            case 'sauces':
                section = menuSauces.current;
                break;
            case 'main':
                section = menuMain.current;
                break;
        }
        const scrolloption = { behavior: 'smooth' }
        section.scrollIntoView(scrolloption)
    }


    return (
        <section className={styles.section}>
            <h1 className={`text text_type_main-large ${styles.title}`}>Соберите бургер</h1>
            <div className={styles.tab}>
                <Tab value="buns" active={current === 'buns'} onClick={scrollTo}>Булки</Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={scrollTo}>Соусы</Tab>
                <Tab value="main" active={current === 'main'} onClick={scrollTo}>Начинки</Tab>
            </div>
            <div className={styles.container} ref={menu} onScroll={onScroll}>
                <TypeOfIngredients name='Булки' menu={buns} ref={menuBuns} />
                <TypeOfIngredients name='Соусы' menu={sauces} ref={menuSauces} />
                <TypeOfIngredients name='Начинки' menu={main} ref={menuMain} />
            </div>
        </section>
    )
}

export default BurgerIngredients;