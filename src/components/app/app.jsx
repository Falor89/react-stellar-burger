import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from '../appHeader/AppHeader'

const App = () => {
  return (
    <div className={styles.app}>
      <AppHeader/>
    </div>
  );
}

export default App;
