import styles from "./app.module.css";
import AppHeader from '../appHeader/AppHeader'
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { api, parseResponse } from "../Api/Api";
import React from 'react';
import Modal from "../Modal/Modal";
import OrderDetails from "../../OrderDetails/OrderDetails";
import ingridientType from "../../utils/ingridientType";


const App = () => {


  function getData() {
    fetch(`${api.url}`)
      .then(parseResponse)
      .then((res) => {
        setIngridients(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  React.useEffect(() => {
    getData();
  }, []);


  const [ingridients, setIngridients] = React.useState([])

  const [orderDetails, setOrderDetails] = React.useState(false);
  const [ingredientDetails, setIngredientDetails] = React.useState(false)
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = React.useState(false);
  const [ingredientInModal, setIngredientInModal] = React.useState({});

  const openModal = (item) => {
    setIngredientInModal(item)
    setIsIngredientDetailsOpened(true);
  }


  const closeModal = () => {
    setOrderDetails(false)
    setIngredientDetails(false)
  }


  return (
    <div className={styles.app}>
      <AppHeader />
      <main style={{ display: 'flex', margin: '0 auto', gap: '40px' }}>
        <BurgerIngredients ingridients={ingridients} openModal={openModal} />
        {/* <BurgerConstructor data={data} /> */}
      </main>

      {orderDetails && (
        <Modal title='Детали ингридиетов' onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;
