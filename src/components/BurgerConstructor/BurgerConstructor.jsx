import './BurgerConstructor.css';
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientPropType from '../../utils/prop-types';
import React from 'react';
import ConstructorDetails from '../ConstructorDetails/ConstructorDetails';
import BurgerIngredientContext from '../../services/BurgerIngredientsContext';
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { http } from '../../utils/api';



const BurgerConstructor = () => {

    const makeOrder = () => http('orders', 'POST', JSON.stringify({ "ingredients": ["643d69a5c3f7b9001cfa093c"] }))
        .then((orderNumber) => setOrderNumber(orderNumber))
        .catch((err) => alert(`${(`Ошибка: ${err}`)}  + ${setOrderNumber(null)}`))

    const [orderNumber = {
        name: '',
        order: {
            number: ''
        },
        success: false
    }, setOrderNumber] = React.useState();

    const [orderDetails, setOrderDetails] = React.useState(false);

    const openModalOrder = () => {
        setOrderDetails(true)
        makeOrder(orderNumber)
    }

    const closeModal = () => {
        setOrderDetails(false)
    }
    const data = React.useContext(BurgerIngredientContext);

    const bun = React.useMemo(
        () => data.find((item) => item.name === 'Краторная булка N-200i'),
        [data],
    )

    const price = React.useMemo(() => {
        return (
            (data.bun ? data.bun.price * 2 : 0) + data.reduce((a, b) => a + b.price, 0)
        );
    }, [data]);


    return (
        < section className='Constructor-section' style={{ paddingTop: '100px' }}>
            <div className='Constructor-section'>
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
            <div className='Constructor-container'>
                <ConstructorDetails />
            </div>
            <div className='Constructor-section'>
                {bun &&
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />
                }
            </div>
            <div className='Constructor-price'>
                <p className='text text_type_digits-medium pr-10'>
                    {price}
                    <CurrencyIcon /></p>
                <Button htmlType="button" type='primary' size='large' onClick={() => openModalOrder()} >
                    Оформить заказ
                </Button>
            </div>
            {orderDetails && (
                <Modal title='Детали заказа' onClose={closeModal}>
                    <OrderDetails orderNumber={orderNumber} />
                </Modal>
            )}
        </section >
    )
}

export default BurgerConstructor;

