import React, { useEffect, FC } from 'react';
import { useDispatch, useSelector } from '../../utils/hooks';
import { useHistory } from 'react-router-dom';
import { TIngredient } from '../../utils/types/data';

import styles from './burgerConstructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import ConstructorDetails from '../ConstructorDetails/ConstructorDetails';
import { makeOrder } from "../../services/actions/order";
import { useDrop } from 'react-dnd';
import { addIngredient } from '../../services/actions/constructor';

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = useSelector(store => store.user.accessToken)

  const orderClick = (IDs: { 'ingredients': string[] }, token: string) => {
    authorized ?
      dispatch(makeOrder(IDs, token)) :
      history.replace({ pathname: '/login' });
  }
  const authorized = useSelector(store => store.user.authorization);
  const bun = useSelector(store => store.constructorBurger.bun);
  const innerIngridients = useSelector(store => store.constructorBurger.ingridients);
  const productsIds = useSelector(store => store.constructorBurger.productsIds);

  const [price, setPrice] = React.useState(0);

  const ingridientsID = innerIngridients.length > 0 ? [bun._id, ...innerIngridients.map((ingridient) => { return ingridient._id }), bun._id] : ['0'];

  const totalPrice = React.useMemo(
    (() => {
      const ingridients = innerIngridients.length > 0 ? [bun, bun, ...innerIngridients] : [bun, bun];
      return ingridients.reduce((prev, current) => { return prev + current.price }, 0);
    }), [bun, innerIngridients.length]
  )

  useEffect(() => {
    setPrice(totalPrice);
  }, [totalPrice])


  const [{ isHover }, drop] = useDrop({
    accept: 'ingredient',
    drop({ ingredient }: { ingredient: TIngredient; }) {
      dispatch(addIngredient(ingredient));
    },
    collect: (monitor) => ({
      isHover: monitor.canDrop(),
    }),
  });

  return (
    <section className={styles.section}>
      {isHover}
      <div className={styles.container} ref={drop}>
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
              <ConstructorDetails item={ingridient} key={ingridient.uId} index={index} />
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