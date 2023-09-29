import React from 'react';
import styles from './app.module.css';
// import data from '../../utils/data';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConctructor/BurgerConstructor';
import { getData } from '../../utils/api';


const App = () => {
    const [data, setData] = React.useState([])

    React.useEffect(
        () => {
            getData(data, setData)
        }
    )

    return (
        <div className={styles.root}>
            <AppHeader />
            <main className={styles.main}>
                <BurgerIngredients data={data} />
                <BurgerConstructor data={data} />
            </main>
        </div>
    )
}

export default App;