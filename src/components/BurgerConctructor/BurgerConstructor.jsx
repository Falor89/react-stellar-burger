import React, { useMemo, useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burgerConstructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../OrderDetails/OrderDetails'
import Modal from '../Modal/Modal';
import ConstructorDetails from '../ConstructorDetails/ConstructorDetails';
import { setData, http } from '../../utils/api';
import { useDrop } from 'react-dnd';
import { addBun } from '../../services/actions/constructor';
import { makeOrder } from '../../services/actions/order';


const BurgerConstructor = () => {

    const dispatch = useDispatch();

    const { actualModal, isModalOpen } = useSelector(store => store.modal)

    const bun = useSelector(store => store.constructorBurger.bun)
    const innerIngredients = useSelector(store => store.constructorBurger.ingredients)
    const ingredientsID = innerIngredients.length > 0 ? [bun._id, ...innerIngredients.map((ingredient) => { return ingredient._id }), bun._id] : 0;

    const orderClick = (IDs) => {
        dispatch(makeOrder(IDs))
    }

    const [, dropRef] = useDrop({
        accept: 'ingridient',
        drop(ingredient) {
            dispatch(addBun(ingredient))
        },
    })


    return (
        <section className={styles.section}>
            <div className={styles.section} ref={dropRef}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>
            <div className={styles.container}>
                <ul className={styles.list}>
                    {innerIngredients.length > 0 ?
                        innerIngredients.map((ingredient, index) => (
                            <ConstructorDetails ingredient={ingredient} key={ingredient.uId} index={index} />
                        )) : <p className="text text_type_main-medium mr-10">Перетащите сюда ингридиенты</p>}
                </ul>
            </div>
            <div>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>
            <div className={styles.price}>
                <p className='text text_type_digits-medium'>
                    <CurrencyIcon type="primary" />
                </p>
                <Button htmlType="button" type="primary" size="large" onClick={() => orderClick({ "ingredients": ingredientsID })}>
                    Оформить заказ
                </Button>
            </div>
            {/* {isModalOpen &&
                <Modal>
                    {actualModal === 'ingredient' && <OrderDetails />}
                </Modal>
            } */}
        </section>
    )
}

export default BurgerConstructor;