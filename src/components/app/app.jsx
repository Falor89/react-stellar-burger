import styles from "./app.module.css";
import AppHeader from '../appHeader/AppHeader'
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { Api, parseResponse } from "../Api/Api";
import { http } from "../../utils/api";
import React from 'react';
import Modal from "../Modal/Modal";
import OrderDetails from '../OrderDetails/OrderDetails'
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import BurgerIngridientContext from "../../services/BurgerIngridientsContext";

const App = () => {

  const [data, setData] = React.useState([])

  const getData = () => http('ingredients')
    .then(({ data }) => setData(data))
    .catch((err) => setData(err))


  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main style={{ display: 'flex', margin: '0 auto', gap: '40px' }}>
        <BurgerIngridientContext.Provider value={data}>
          <BurgerIngredients />
          <BurgerConstructor />
        </BurgerIngridientContext.Provider>
      </main>
    </div>
  );
}

export default App;
