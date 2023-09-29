import React from 'react';
import styles from './burgerConstructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../OrderDetails/OrderDetails'
import Modal from '../Modal/Modal';

const BurgerConstructor = ({ data }) => {

    const bun = React.useMemo(
        () =>
            data.find(item => item.name === 'Краторная булка N-200i'),
        [data],)

    const ingredients = React.useMemo(
        () => data.filter(item => item.type !== 'bun'),
        [data]
    )

    const price = React.useMemo(() => {
        return (
            (data.bun ? data.bun.price * 2 : 0) + data.reduce((a, b) => a + b.price, 0)
        );
    }, [data]);

    const [orderDetails, setOrderDetails] = React.useState(false);

    const openModalOrder = () => {
        setOrderDetails(true)
    }

    const closeModal = () => {
        setOrderDetails(false)
    }

    return (
        <section className={styles.section}>
            <div className={styles.section}>
                {bun &&
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name + " (верх)"}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />
                }
            </div>
            <div className={styles.container}>
                <ul className={styles.list}>
                    {ingredients.map((item, index) =>
                        <li className={styles.listItem} key={item._id}>
                            <DragIcon type='primary' />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </li>
                    )
                    }
                </ul>
            </div>
            <div>
                {bun &&
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun.name + " (низ)"}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />
                }
            </div>
            <div className={styles.price}>
                <p className='text text_type_digits-medium'>{price}
                    <CurrencyIcon type="primary" />
                </p>
                <Button htmlType="button" type="primary" size="large" onClick={() => openModalOrder()}>
                    Оформить заказ
                </Button>
            </div>
            {orderDetails && (
                <Modal title='Детали заказа' onClose={closeModal}>
                    <OrderDetails />
                </Modal>
            )}
        </section>
    )
}

export default BurgerConstructor;