import styles from './burgerConstructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


import ConstructorDetails from '../ConstructorDetails/ConstructorDetails';
import { makeOrder } from "../../services/actions/order";
import { useDrop } from 'react-dnd';
import { addBun } from '../../services/actions/constructor';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = useSelector(store => store.user.accessToken)

  const orderClick = (IDs, token) => {
    authorized ?
      dispatch(makeOrder(IDs, token)) :
      history.replace({ pathname: '/login' });
  }
  const authorized = useSelector(store => store.user.authorization);
  const bun = useSelector(store => store.constructorBurger.bun);
  const innerIngridients = useSelector(store => store.constructorBurger.ingridients);
  const [price, setPrice] = React.useState(0);

  const ingridientsID = innerIngridients.length > 0 ? [bun._id, ...innerIngridients.map((ingridient) => { return ingridient._id }), bun._id] : 0;

  const totalPrice = React.useMemo(
    (() => {
      const ingridients = innerIngridients.length > 0 ? [bun, bun, ...innerIngridients] : [bun, bun];
      return ingridients.reduce((prev, current) => { return prev + current.price }, 0);
    }), [bun, innerIngridients.length]
  )

  useEffect(() => {
    setPrice(totalPrice);
  }, [totalPrice])

  const [, dropRef] = useDrop({
    accept: 'ingridient',
    drop(ingridient) {
      dispatch(addBun(ingridient))
    },
  })

  return (
    <section className={styles.section}>
      <div className={styles.container} ref={dropRef}>
        <div className="mr-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <ul className={styles.container__list}>
          {innerIngridients.length > 0 ?
            innerIngridients.map((ingridient, index) => (
              <ConstructorDetails ingridient={ingridient} key={ingridient.uId} index={index} />
            )) : <p className="text text_type_main-medium mr-10">Перетащите сюда ингридиенты</p>}
        </ul>
        <div className="mr-4">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      </div>
      <div className={`${styles.order} p-5`}>
        <div className={styles.order__price}>
          <p className="text text_type_digits-medium">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        {bun._id !== 'none' && innerIngridients.length !== 0 &&
          <Button htmlType='button' type="primary" size="large" onClick={() => { orderClick({ "ingredients": ingridientsID }, accessToken) }}>
            Оформить заказ
          </Button>
        }
      </div>
    </section>
  )
}

export default BurgerConstructor;