import React, { FC } from 'react';

import BurgerIngridients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import Modal from '../../components/Modal/Modal';
import OrderDetails from '../../components/OrderDetails/OrderDetails';

import styles from './home.module.css';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useDispatch, useSelector } from '../../utils/hooks';

import { CLOSE_MODAL } from '../../services/actions/modal';

export const HomePage: FC = () => {
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