import styles from "./app.module.css";
import AppHeader from '../appHeader/AppHeader'
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { api, parseResponse } from "../Api/Api";
import React from 'react';
import Modal from "../Modal/Modal";
import OrderDetails from '../OrderDetails/OrderDetails'
import IngridientDetails from "../IngridientDetails/IngridientDetails";


const App = () => {

  const [data, setData] = React.useState([])

  function getData() {
    fetch(`${api.url}`)
      .then(parseResponse)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        setData(err);
        console.log(err)
      })
  }

  React.useEffect(() => {
    getData();
  }, []);

  const [orderDetails, setOrderDetails] = React.useState(false);
  const [ingredientDetails, setIngredientDetails] = React.useState(false)
  const [ingredientModal, setIngredientModal] = React.useState({});


  const openModal = (item) => {
    setIngredientModal(item)
    setIngredientDetails(true);
  }

  const closeModal = () => {
    setOrderDetails(false)
    setIngredientDetails(false)
  }

  const openModalOrder = () => {
    setOrderDetails(true)
  }


  return (
    <div className={styles.app}>
      <AppHeader />
      <main style={{ display: 'flex', margin: '0 auto', gap: '40px' }}>
        <BurgerIngredients data={data} openModal={openModal} />
        <BurgerConstructor data={data} openModal={openModalOrder}/>
      </main>

      {orderDetails && (
        <Modal title='Детали заказа' onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}

      {ingredientDetails && (
        <Modal title='Детали ингридиентов' onClose={closeModal}>
          <IngridientDetails ingridient={ingredientModal} />
        </Modal>
      )}
      
    </div>
  );
}

export default App;
