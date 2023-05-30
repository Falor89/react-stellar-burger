import React from 'react';
import orderDetailsStyles from './orderDetails.module.css';

const OrderDetails = () => {
    return (
        <div className={`${orderDetailsStyles.container} pt-30 pb-30`}>
            <h2 className={`${orderDetailsStyles.numbers} text text_type_digits-large`}>034536</h2>
            <p className='text text_type_main-medium pt-8'>Идентификатор заказа</p>
            <img className={`${orderDetailsStyles.image} pt-15 pb-15`} src={require('../../images/done.png')} alt="Сделано" />
            <p className='text text_type_main-default pb-2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;