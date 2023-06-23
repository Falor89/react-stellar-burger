import styles from "./app.module.css";
import AppHeader from '../appHeader/AppHeader'
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { Api, parseResponse } from "../Api/Api";
import React from 'react';
import Modal from "../Modal/Modal";
import OrderDetails from '../OrderDetails/OrderDetails'
import IngridientDetails from "../IngridientDetails/IngridientDetails";
import BurgerIngridientContext from "../../services/BurgerIngridientsContext";


const App = () => {

  const [data, setData] = React.useState([])

  function getData() {
    fetch(`${Api.url}/ingredients`)
      .then(parseResponse)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        setData(err);
        console.log(err)
      })
  }

  function makeOrder() {
    return fetch(`${Api.url}/orders`, {
      method: 'POST',
      headers: {
          'Content-Type': "application/json;charset=utf-8",
      },
      body: JSON.stringify({"ingredients": ["643d69a5c3f7b9001cfa093c"]})
    })
    .catch((err) => alert(`${(`Ошибка: ${err}`)}  + ${setOrderNumber(null)}`))
    .then(parseResponse)
    .then((orderNumber) => {
      setOrderNumber(orderNumber)
    })
  }

  React.useEffect(() => {
    getData();
  }, []);

  const [orderDetails, setOrderDetails] = React.useState(false);
  const [ingredientDetails, setIngredientDetails] = React.useState(false);
  const [ingredientModal, setIngredientModal] = React.useState({});

  const [ orderNumber = {
    name: '',
    order: {
      number: ''
    },
    success: false
  }, setOrderNumber] = React.useState(); 


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
    makeOrder(orderNumber)
  }


  return (
    <div className={styles.app}>
      <AppHeader />
      <main style={{ display: 'flex', margin: '0 auto', gap: '40px' }}>
        <BurgerIngridientContext.Provider value={data}>
          <BurgerIngredients openModal={openModal} />
          <BurgerConstructor openModal={openModalOrder}/>
        </BurgerIngridientContext.Provider>
      </main>

      {orderDetails && (
        <Modal title='Детали заказа' onClose={closeModal}>
          <OrderDetails orderNumber={orderNumber}/>
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
