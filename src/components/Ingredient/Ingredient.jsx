import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient.module.css'
import { useMemo } from "react";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_INGRIDIENT_MODAL } from '../../services/actions/modal.js';


const Ingredient = ({ingridient}) => {
    const dispatch = useDispatch();
  
    const getIngredients = useSelector(store => store.constructorBurger);
    
    const setCount = useMemo(() => {
      const ingredientsList = [getIngredients.bun, ...getIngredients.ingridients];
      const selectIngredients = ingredientsList.filter((current) => current._id === ingridient._id);
      return selectIngredients.length
    },[getIngredients])
  
    const openIngredient = (ingridient) => {
      dispatch({
        type: OPEN_INGRIDIENT_MODAL,
        ingridient: ingridient
      })
    }
  
    const [ ,dragref] = useDrag({
      type: 'ingridient',
      item: ingridient
    })  
  
    return (
      <li className={styles.container} onClick={() => openIngredient(ingridient)} ref={dragref}>
        <img className={styles.image} src={ingridient.image} alt={ingridient.name} />
        <div className={styles.price}>
          <span className="text text_type_digits-default">{ingridient.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${styles.text}`}>{ingridient.name}</p>
        {setCount > 0 && <Counter count={setCount} size="default"/>}
      </li>
    )
  }

export default Ingredient;