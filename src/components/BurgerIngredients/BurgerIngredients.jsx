import React, { useRef } from "react";
import { useSelector } from "react-redux";
import styles from './burgerIngredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import TypesOfIngredients from '../TypesOfIngredients/TypesOfIngredients';


const BurgerIngridients = () => {
    const [current, setCurrent] = React.useState('buns');
    const {buns, sauces, main } = useSelector(store => store.ingredients.ingridients);
  
    const menu = useRef(null);
    const menuBuns = useRef(null);
    const menuSauces = useRef(null);
    const menuMain = useRef(null);
  
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
      const scrolloption = { behavior: 'smooth'}
      section.scrollIntoView(scrolloption)
    }
  
    return (
      <section className={styles.section}>
        <h2 className={`text text_type_main-large ${styles.title}`}>Соберите бургер</h2>
        <div className={styles.tab}>
        <Tab value="buns" active={current === 'buns'} onClick={scrollTo}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={scrollTo}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={scrollTo}>
          Начинки
        </Tab>
      </div>
      <div className={styles.container} ref={menu} onScroll={onScroll}>
        <TypesOfIngredients name = "Булки" menu = {buns} ref={menuBuns} />
        <TypesOfIngredients name = "Соусы" menu = {sauces} ref={menuSauces} />
        <TypesOfIngredients name = "Начинки" menu = {main} ref={menuMain} />
      </div>
      </section>
    )
  }
  
  export default BurgerIngridients;