import React, { useEffect } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWithRefresh } from '../../utils/api';
import { getUser, refreshRequest } from '../../utils/api';
import { getCookie } from '../../utils/cookie';
import { getUserInfo } from '../../services/actions/user';

import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { ProfilePage } from '../../pages/profile/profile';
import { IngredientPageModal } from '../../pages/ingredient/ingredient';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { FeedPage } from '../../pages/feed-page/feed-page';


import styles from './app.module.css'
import AppHeader from '../AppHeader/AppHeader'
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import OrderInfoCommon from '../OrderInfo/OrderInfoCommon';
import OrderInfoPrivat from '../OrderInfo/OrderInfoPrivat';

import { CHANGE_PAGE, refreshToken } from '../../services/actions/user';
import { loadIngridients } from '../../services/actions/ingredients';

import ProtectedRoute from '../Protected/ProtectedRoute';
import ProfileFeed from '../ProfileFeed/ProfileFeed';


const App = () => {
  const dispatch = useDispatch();
  const { authorization } = useSelector(store => store.user);
  const location = useLocation();
  const history = useHistory();
  const isPrivat = useSelector(store => store.socket)

  const background = location.state?.background;
  const path = location.pathname;

  const closeModal = () => {
    history.goBack();
  }

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
      <Switch location={background || location}>
        <Route path="/react-stellar-burger" exact={true}>
          <HomePage />
        </Route>
        <Route path='/react-stellar-burger/ingredients/:id' exact={true}>
          <IngredientDetails />
        </Route>
        <Route path="/react-stellar-burger/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/react-stellar-burger/register" exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/react-stellar-burger/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path="/react-stellar-burger/reset-password" exact={true}>
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute requires={authorization} path="/react-stellar-burger/profile/orders/:id" exact={true}>
          <OrderInfoPrivat />
        </ProtectedRoute>
        <ProtectedRoute requires={authorization} path="/react-stellar-burger/profile">
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/react-stellar-burger/feed" exact={true}>
          <FeedPage />
        </Route>
        <Route path="/react-stellar-burger/feed/:id" exact={true}>
          <OrderInfoCommon />
        </Route>
        <Route>
          <h1 className={styles.nf}>404 Page not found</h1>
        </Route>
      </Switch>
      {background &&
        <Switch>
          <Route path="/react-stellar-burger/ingredients/:id" exact={true}>
            <Modal close={closeModal}>
              <IngredientDetails />
            </Modal>
          </Route>
          <Route path="/react-stellar-burger/feed/:id" exact={true}>
            <Modal close={closeModal}>
              <OrderInfoCommon background={background} />
            </Modal>
          </Route>
          <Route path="/react-stellar-burger/profile/orders/:id" exact={true}>
            <Modal close={closeModal}>
              <OrderInfoPrivat background={background} />
            </Modal>
          </Route>
        </Switch>
      }
    </div>
  )
}

export default App;