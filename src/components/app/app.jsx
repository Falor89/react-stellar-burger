import styles from "./app.module.css";
import data from "../../utils/data";
import AppHeader from '../appHeader/AppHeader'
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

const App = () => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main style={{ display: 'flex', margin: '0 auto', gap: '40px' }}>
        <BurgerIngredients />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;
