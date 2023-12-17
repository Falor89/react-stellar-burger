import React, { useEffect } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from '../../utils/hooks';
import { getUser } from '../../utils/api';
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

import { CHANGE_PAGE } from '../../services/actions/user';
import { loadIngridients } from '../../services/actions/ingredients';

import ProtectedRoute from '../Protected/ProtectedRoute';
import ProfileFeed from '../ProfileFeed/ProfileFeed';
import { refreshToken } from '../../services/actions/user';


const App = () => {

  interface ILocation {
    background?: {
      hash: string;
      key: string;
      pathname: string;
      search: string;
      state: any
    }
  }
  const dispatch = useDispatch();
  const { authorization } = useSelector(store => store.user);
  const location = useLocation<ILocation>();
  const history = useHistory();

  const background = location.state?.background;
  const path = location.pathname;


  const isPrivat = useSelector(store => store.socket)


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
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path='/ingredients/:id' exact={true}>
          <IngredientDetails />
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
        <ProtectedRoute requires={authorization} path="/profile/orders/:id" exact={true}>
          <OrderInfoPrivat />
        </ProtectedRoute>
        <ProtectedRoute requires={authorization} path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/feed" exact={true}>
          <FeedPage />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <OrderInfoCommon />
        </Route>
        <Route>
          <h1 className={styles.nf}>404 Page not found</h1>
        </Route>
      </Switch>
      {background &&
        <Switch>
          <Route path="/ingredients/:id" exact={true}>
            <Modal close={closeModal}>
              <IngredientDetails />
            </Modal>
          </Route>
          <Route path="/feed/:id" exact={true}>
            <Modal close={closeModal}>
              <OrderInfoCommon background={background} />
            </Modal>
          </Route>
          <Route path="/profile/orders/:id" exact={true}>
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