import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { OPEN_INGREDIENT_MODAL } from '../../services/actions/modal';
import { useDrag } from "react-dnd";



const Ingredient = ({ ingredient }) => {

    const dispatch = useDispatch();
    const { actualModal, isModalOpen } = useSelector(store => store.modal)


    const openModal = (ingredient) => {
        dispatch({
            type: OPEN_INGREDIENT_MODAL,
            item: ingredient
        })
    }

    const [, dragref] = useDrag({
        type: 'ingredient',
        item: ingredient
    })


    return (
        <div className={styles.container} onClick={() => openModal(ingredient)} ref={dragref}>
            <img src={ingredient.image} alt={ingredient.name} />
            <div>
                <CurrencyIcon type='primary' />
                <span className="text text_type_digits-default">{ingredient.price}</span>
            </div>
            <p className={`text text_type_main-default ${styles.text}`}>{ingredient.name}</p>
            <Counter count={1} size='default' />
            {isModalOpen &&
                <Modal>
                    {actualModal === 'ingredient' && <IngredientDetails />}
                </Modal>
            }
        </div>
    )
}



export default Ingredient