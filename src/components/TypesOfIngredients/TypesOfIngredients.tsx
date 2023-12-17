import styles from './typesOfIngredients.module.css'
import Ingredient from "../Ingredient/Ingredient";
import { forwardRef } from 'react'

import { TIngredient } from '../../utils/types/data';

interface IBurgerMenu {
  menu: TIngredient[];
  name: string;
}

const TypesOfIngredients = forwardRef<HTMLUListElement, IBurgerMenu>(({ menu, name }, ref) => {

  return (
    <ul className={`pl-4 pr-2 ${styles.container}`} ref={ref}>
      <h2 className={`text text_type_main-medium ${styles.name}`}>{name}</h2>
      {menu.map((item) => (
        <Ingredient ingredient={item} key={item._id} />
      )
      )}
    </ul>
  )
})


export default TypesOfIngredients