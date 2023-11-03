import styles from './orderDetails.module.css'
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import loading from '../../images/loading.gif'


const OrderDetails = () => {

    const { orderNumber, hasError, isLoading } = useSelector(store => store.order)

    if (isLoading) {
        return (
            <>
                <div className={`${styles.container} pt-30 pb-30`}>
                    <p className={`text text_type_main-medium mt-4 ${styles.text}`}>Пожалуйста, подождите</p>
                    <p className={`text text_type_main-medium mt-2 ${styles.text}`}>Ваш заказ обрабатывается</p>
                    <img className={styles.loading} src={loading} alt='Loading...' />
                    <p className={`text text_type_main-small mb-8 ${styles.text}`}>Это займет 15-20 сеукнд</p>
                </div>
            </>
        )
    }

    return (
        <>
            {
                !hasError ?
                    <div className={`${styles.container} pt-30 pb-30`}>
                        <h2 className={`${styles.numbers} text text_type_digits-large`}>{orderNumber}</h2>
                        <p className='text text_type_main-medium pt-8'>Идентификатор заказа</p>
                        <img className={`${styles.image} pt-15 pb-15`} src={require('../../images/done.png')} alt="Сделано" />
                        <p className='text text_type_main-default pb-2'>Ваш заказ начали готовить</p>
                        <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
                    </div>
                    :
                    <p className='text text_type_main-default'>Произошла ошибка</p>
            }
        </>
    )
}

OrderDetails.propTypes = {
    orderNumber: PropTypes.number
}

export default OrderDetails;