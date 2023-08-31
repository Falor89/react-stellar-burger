import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { ProfilePage } from '../../pages/profile/profile';
import { IngredientPageModal } from '../../pages/ingredient/ingredient';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';


import styles from './app.module.css'
import AppHeader from '../appHeader/AppHeader'
import IngredientDetails from '../IngredientDetails/IngredientDetails';

import { CHANGE_PAGE, refreshToken } from '../../services/actions/user';
import { loadIngridients } from '../../services/actions/ingredients';

import ProtectedRoute from '../Protected/ProtectedRoute';


const App = () => {
  const dispatch = useDispatch();
  const { authorization } = useSelector(store => store.user);
  const location = useLocation();

  const background = location.state?.background;
  const path = location.pathname;

  useEffect(() => {
    if (path !== '/login') {
      dispatch({ type: CHANGE_PAGE })
    }
  }, [path])

  useEffect(() => {
    dispatch(refreshToken());
    dispatch(loadIngridients());
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <Switch>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path='/ingredients/:id' exact={true}>
          {background ?
            <IngredientPageModal /> :
            <IngredientDetails />}
        </Route>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/register" exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute requires={authorization} path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <Route>
          <h1>Ooooops</h1>
        </Route>
      </Switch>
    </div>
  )
}

export default App;