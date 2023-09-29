import React, { forwardRef } from 'react'
import styles from './typesOfIngredients.module.css'
import Ingredient from '../Ingredient/Ingredient';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails'


const TypesOfIngredients = forwardRef(({ ingredientType, type }, ref) => {
    const [ingredientDetails, setIngredientDetails] = React.useState(false);
    const [ingredientModal, setIngredientModal] = React.useState({});

    const openModal = (item) => {
        setIngredientModal(item);
        setIngredientDetails(true)
    }

    const closeModal = () => {
        setIngredientDetails(false)
    }

    return (
        <div className={styles.ingredientContainer} ref={ref}>
            <h1 className="text text_type_main-medium">{type.text}</h1>
            <ul className={styles.ingredients}>
                {ingredientType.map((item) => (
                    <li key={item._id} onClick={() => openModal(item)} >
                        <Ingredient ingredient={item} onClick={openModal} />
                    </li>
                ))}
            </ul>
            {ingredientDetails &&
                <Modal onClose={closeModal}>
                    <IngredientDetails ingredient={ingredientModal} />
                </Modal>
            }
        </div>
    )
})

export default TypesOfIngredients