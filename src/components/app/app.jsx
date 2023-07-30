import styles from './app.module.css'
import AppHeader from '../appHeader/AppHeader'
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { getData } from "../../utils/api";
import React from 'react';
import BurgerIngredientContext from "../../services/BurgerIngredientsContext";

const App = () => {

  const [data, setData] = React.useState([])

  React.useEffect(() => {
    getData(data, setData);
  }, []);

  return (
    <div className={styles.container}>
      <AppHeader />
      <main style={{ display: 'flex', margin: '0 auto', gap: '40px' }}>
        <BurgerIngredientContext.Provider value={data}>
          <BurgerIngredients />
          <BurgerConstructor />
        </BurgerIngredientContext.Provider>
      </main>
    </div>
  );
}

export default App;
