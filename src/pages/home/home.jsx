import React from 'react';

import BurgerIngridients from '../../components/BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor.jsx';
import Modal from '../../components/Modal/Modal.jsx';
import OrderDetails from '../../components/OrderDetails/OrderDetails.jsx';
import styles from './home.module.css';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useSelector, useDispatch } from 'react-redux';

import { CLOSE_MODAL } from '../../services/actions/modal.js';

export const HomePage = () => {
    const dispatch = useDispatch();


    const { isLoading, hasError, ingridients } = useSelector(store => store.ingredients);
    const { actualModal, isModalOpen } = useSelector(store => store.modal);

    const closeModal = () => {
        dispatch({
            type: CLOSE_MODAL
        })
    }

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                {!isLoading && !hasError && ingridients.buns.length !== 0 &&
                    <main className={styles.main}>
                        <BurgerIngridients />
                        <BurgerConstructor />
                    </main>
                }
            </DndProvider>

            {isModalOpen &&
                actualModal === 'order' &&
                <Modal title='' close={closeModal}>
                    <OrderDetails />
                </Modal>
            }
        </>
    )
}