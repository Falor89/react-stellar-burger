import styles from './app.module.css'
import AppHeader from '../appHeader/AppHeader'
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { getData } from "../../utils/api";
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients'
import { closeModalIngredient } from "../../services/actions/ingredient";
import { closeOrderModal } from "../../services/actions/order";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const App = () => {

  const { ingredientsRequest, ingredientsFailed } = useSelector(store => store.burgerIngredients);
  // const orderNumber = useSelector(store => store.order.orderNumber);

  const dispatch = useDispatch();
  React.useEffect(() => {
    // Отправляем экшен при монтировании компонента
    dispatch(getIngredients());
  }, [dispatch]);

  // //Стор для открытия модального окна
  // const openDetailsModal = useSelector(store => store.ingredient.openDetailsModal);

  // // Закрываем модальные окна
  // const handleCloseOrder = useCallback(() => {
  //   dispatch(closeOrderModal());
  // }, [dispatch]);

  // const handleDetailsModal = useCallback(() => {
  //   dispatch(closeModalIngredient());
  // }, [dispatch]);


  return (
    <div className={styles.container}>
      <AppHeader />
      {!ingredientsFailed && !ingredientsRequest && (
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            {/* <BurgerIngredients /> */}
            <BurgerConstructor />
          </DndProvider>
        </main>
      )}
    </div>
  );
}

export default App;
