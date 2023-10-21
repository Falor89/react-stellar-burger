import styles from './typesOfIngredients.module.css'
import Ingredient from "../Ingredient/Ingredient";
import PropTypes from 'prop-types';
import { forwardRef } from 'react'

const TypesOfIngredients = forwardRef((props, ref) => {

  return (
    <div className={styles.container} ref={ref}>
      <h2 className='text text_type_main-medium'>{props.name}</h2>
      <ul className={`${styles.ingredients} pl-4 pr-2`}>
        {props.menu.map((item) => (
          <Ingredient ingridient={item} key={item._id} />
        )
        )}
      </ul>
    </div>
  )
})

TypesOfIngredients.propTypes = {
  menu: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
}

export default TypesOfIngredients