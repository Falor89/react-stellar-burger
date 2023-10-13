import React from 'react';
import { useSelector } from 'react-redux';
import styles from './orderDetails.module.css'

const OrderDetails = () => {
    const { hasError, orderNumber } = useSelector(state => state.order)

    return (
        <>
            {!hasError
                ?
                <div className={`${styles.container} pt-30 pb-30`}>
                    {console.log(orderNumber)}
                    <h2 className={`${styles.numbers} text text_type_digits-large`}>{orderNumber.order.number}</h2>
                    <p className='text text_type_main-medium pt-8'>Идентификатор заказа</p>
                    <img className={`${styles.image} pt-15 pb-15`} src={require('../../images/done.png')} alt="Сделано" />
                    <p className='text text_type_main-default pb-2'>Ваш заказ начали готовить</p>
                    <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
                </div>
                : <p className='text text_type_main-default'>Произошла ошибка</p>
            }
        </>
    )
}


export default OrderDetails