import React from 'react';
import './OrderDetails.css';
import PropTypes from 'prop-types';

const OrderDetails = ({ orderNumber }) => {
    return (
        <div className={`OrderDetails-container pt-30 pb-30`}>
            <h2 className={`OrderDetails-numbers text text_type_digits-large`}>{orderNumber.order.number}</h2>
            <p className='text text_type_main-medium pt-8'>Идентификатор заказа</p>
            <img className={`OrderDetails-image pt-15 pb-15`} src={require('../../images/done.png')} alt="Сделано" />
            <p className='text text_type_main-default pb-2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    orderNumber: PropTypes.object.isRequired,
}

export default OrderDetails;