import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './app.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConctructor/BurgerConstructor';
import { getData } from '../../utils/api';
import { loadIngredients } from '../../services/actions/ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const App = () => {
    const dispatch = useDispatch();

    const { isLoading, hasError, ingredients } = useSelector(store => store.ingredients)

    useEffect(() => {
        dispatch(loadIngredients())
    }, [dispatch])

    return (
        <div className={styles.root}>
            <AppHeader />
            <DndProvider backend={HTML5Backend} >
                {
                    !isLoading && !hasError && ingredients.buns.length !== 0 &&
                    <main className={styles.main}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </main>
                }
            </DndProvider>
        </div>
    )
}

export default App;