import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient.module.css'
import ingredientPropType from '../../utils/prop-types'

const Ingredient = ({ ingredient }) => {
    return (
        <div className={styles.container}>
            <img className={styles.image} src={ingredient.image} alt={ingredient.name} />
            <div className={styles.price}>
                <span className="text text_type_digits-default">{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${styles.text}text text_type_main-default`}>{ingredient.name}</p>
            <Counter count={1} size="default" />
        </div>
    )
}

Ingredient.propTypes = {
    ingredient: ingredientPropType.isRequired
};


export default Ingredient;