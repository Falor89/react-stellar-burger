import styles from './app.module.css'
import AppHeader from '../appHeader/AppHeader'
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { loadIngridients } from '../../services/actions/ingredients';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

const App = () => {
  
  const dispatch = useDispatch();

  const {isLoading, hasError, ingridients} = useSelector(store => store.ingredients);
  const {actualModal, isModalOpen} = useSelector(store => store.modal);

  useEffect(() => {
    dispatch(loadIngridients())
  },[dispatch])

  return (
    <div className={styles.container}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
          {!isLoading && !hasError && ingridients.buns.length !== 0 &&
            <main className={styles.main}>
              <BurgerIngredients />
              <BurgerConstructor />
            </main>
          }
        </DndProvider>

        {isModalOpen && 
          <Modal>
            {actualModal === 'ingridient' && <IngredientDetails />}
            {actualModal === 'order' && <OrderDetails />}
          </Modal>
        }
    </div>
  );
}

export default App;