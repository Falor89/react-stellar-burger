import React from 'react';
import styles from './orderDetails.module.css'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const OrderDetails = () => {
    const { orderFailed, orderNumber } = useSelector(store => store.order);
    return (
        <div className={`${styles.container} pt-30 pb-30`}>
            {orderFailed
                ?
                <p className='text text_type_main-default'>Произошла ошибка</p>
                :
                <>
                    <h2 className={`${styles.numbers} text text_type_digits-large`}>{orderNumber}</h2>
                    <p className='text text_type_main-medium pt-8'>Идентификатор заказа</p>
                    <img className={`${styles.image} pt-15 pb-15`} src={require('../../images/done.png')} alt="Сделано" />
                    <p className='text text_type_main-default pb-2'>Ваш заказ начали готовить</p>
                    <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
                </>
            }
        </div>
    )
}

OrderDetails.propTypes = {
    orderNumber: PropTypes.object.isRequired,
}

export default OrderDetails;