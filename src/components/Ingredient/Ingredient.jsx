import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import './Ingredient.css';
import ingredientPropType from '../../utils/prop-types'

const Ingredient = ({ ingredient }) => {
    return (
        <div className='Ingredient-container'>
            <img style={{ margin: '0 , 4px' }} src={ingredient.image} alt={ingredient.name} />
            <div className='Ingredient-price'>
                <span className="text text_type_digits-default">{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`text text_type_main-default Ingredient-text`} style={{ textAlign: 'center' }}>{ingredient.name}</p>
            <Counter count={1} size="default" />
        </div>
    )
}

Ingredient.propTypes = {
    ingredient: ingredientPropType.isRequired
};


export default Ingredient;