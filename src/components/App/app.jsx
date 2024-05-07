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
import { routes } from '../../utils/path';


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
        <Route path={routes.main} exact={true}>
          <HomePage />
        </Route>
        <Route path={routes.ingredient} exact={true}>
          <IngredientDetails />
        </Route>
        <Route path={routes.login} exact={true}>
          <LoginPage />
        </Route>
        <Route path={routes.register} exact={true}>
          <RegisterPage />
        </Route>
        <Route path={routes.forgotPassword} exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path={routes.resetPassword} exact={true}>
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute requires={authorization} path={routes.userOrder} exact={true}>
          <OrderInfoPrivat />
        </ProtectedRoute>
        <ProtectedRoute requires={authorization} path={routes.profile}>
          <ProfilePage />
        </ProtectedRoute>
        <Route path={routes.feed} exact={true}>
          <FeedPage />
        </Route>
        <Route path={routes.order} exact={true}>
          <OrderInfoCommon />
        </Route>
        <Route>
          <h1 className={styles.nf}>404 Page not found</h1>
        </Route>
      </Switch>
      {background &&
        <Switch>
          <Route path={routes.ingredient} exact={true}>
            <Modal close={closeModal}>
              <IngredientDetails />
            </Modal>
          </Route>
          <Route path={routes.order} exact={true}>
            <Modal close={closeModal}>
              <OrderInfoCommon background={background} />
            </Modal>
          </Route>
          <Route path={routes.userOrder} exact={true}>
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