import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient.module.css'
import { useMemo, FC } from "react";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from '../../utils/hooks';
import { Link, useLocation } from "react-router-dom";

import { TIngredient } from "../../utils/types/data";


const Ingredient: FC<{ ingredient: TIngredient }> = ({ ingredient }) => {

  const location = useLocation();
  const { bun, ingridients } = useSelector(store => store.constructorBurger)

  const getIngredients = useSelector(store => store.constructorBurger);

  const setCount = useMemo(() => {
    const ingredientsList = [getIngredients.bun, ...getIngredients.ingridients];
    const selectIngredients = ingredientsList.filter((current) => current._id === ingredient._id);
    return selectIngredients.length
  }, [getIngredients])



  const [{ isDrag }, dragRef] = useDrag(
    {
      type: 'ingredient',
      item: { ingredient },
      collect: (monitor) => ({
        isDrag: monitor.isDragging(),
      }),
    },
    [bun, ingridients],
  );

  return (
    <li className={styles.container} ref={dragRef}>
      <Link className={styles.link} to={{ pathname: `/ingredients/${ingredient._id}`, state: { background: location } }} >
        <img className={styles.image} src={ingredient.image} alt={ingredient.name} />
        <div className={styles.price}>
          <span className={`text text_type_digits-default ${styles.price}`}>{ingredient.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${styles.text}`}>{ingredient.name}</p>
        {setCount > 0 && <Counter count={setCount} size="default" />}
      </Link>
    </li>
  )
}

export default Ingredient;