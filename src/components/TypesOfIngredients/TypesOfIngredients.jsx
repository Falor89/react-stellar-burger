import styles from './typesOfIngredients.module.css'
import Ingredient from "../Ingredient/Ingredient";
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react'
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

const TypesOfIngredients = forwardRef(({ categories, type }, ref) => {

    const [ingredientDetails, setIngredientDetails] = React.useState(false);
    const [ingredientModal, setIngredientModal] = React.useState({});

    const openModal = (item) => {
        setIngredientModal(item)
        setIngredientDetails(true);
    }

    const closeModal = () => {
        setIngredientDetails(false)
    }

    return (
        <div className={styles.title} ref={ref}>
            <h2 className='text text_type_main-medium'>{type.text}</h2>
            <ul className={`${styles.ingredients} pl-4 pr-2`}>
                {categories.map((item) => (
                    <li onClick={() => openModal(item)} key={item._id}>
                        <Ingredient ingredient={item} onClick={openModal} />
                    </li>
                )
                )}
            </ul>
            {ingredientDetails && (
                <Modal title='Детали ингридиентов' onClose={closeModal}>
                    <IngredientDetails ingredient={ingredientModal} />
                </Modal>
            )}
        </div>
    )
})

TypesOfIngredients.propTypes = {
    ingridientType: PropTypes.array.isRequired,
    type: PropTypes.object.isRequired,
}

export default TypesOfIngredients