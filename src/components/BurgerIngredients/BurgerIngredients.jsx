import React from 'react';
import styles from './burgerIngredients.module.css';
import selectType from '../../utils/utils';
import ingredientsType from '../../utils/ingredientsType';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import TypeOfIngredients from '../TypesOfIngredients/TypesOfIngredients'

const BurgerIngredients = ({ data }) => {
    const [current, setCurrent] = React.useState('bun')

    const bun = selectType(ingredientsType.bun.type, data)
    const sauce = selectType(ingredientsType.sauce.type, data)
    const main = selectType(ingredientsType.main.type, data)

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
            setCurrent('sauce')
        } else {
            setCurrent('bun')
        }
    }

    const scrollTo = (value) => {
        setCurrent(value)
        let section
        switch (value) {
            case 'bun':
                section = menuBuns.current;
                break;
            case 'sauce':
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
                <Tab value="bun" active={current === 'bun'} onClick={scrollTo}>Булки</Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={scrollTo}>Соусы</Tab>
                <Tab value="main" active={current === 'main'} onClick={scrollTo}>Начинки</Tab>
            </div>
            <div className={styles.container} ref={menu} onScroll={onScroll}>
                <TypeOfIngredients ingredientType={bun} type={ingredientsType.bun} ref={menuBuns} />
                <TypeOfIngredients ingredientType={sauce} type={ingredientsType.sauce} ref={menuSauces} />
                <TypeOfIngredients ingredientType={main} type={ingredientsType.main} ref={menuMain} />
            </div>
        </section>
    )
}

export default BurgerIngredients;