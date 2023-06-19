import burgerConstructorStyle from './burgerConstructor.module.css';
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientPropType from '../../utils/prop-types';
import React from 'react';

const BurgerConstructor = ({data, openModal}) => {

    const arr = data.filter((item) => item.type === 'bun').map((item, index) => {
        return (
            <div className='pl-10' key={item._id}>
                <ConstructorElement
                    key={item._id}
                    type={index === 0 ? 'top' : 'bottom'}
                    isLocked={true}
                    text={`${item.name} ${index === 0 ? '(верх)' : '(низ)'}`}
                    price={item.price}
                    thumbnail={item.image}
                />
            </div>
        )
    });

    const arrOthers = data.filter((item) => item.type !== 'bun').map((item, index) => {
        return (
            <React.Fragment key={item._id}>
                <div className={burgerConstructorStyle.constructor__element}>
                    <span className='pr-4'>
                        <DragIcon type='primary' />
                    </span>
                    <div className={burgerConstructorStyle.item}>
                        <ConstructorElement
                            key={item._id}
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    })



    return (
        < section className={burgerConstructorStyle.section} style={{ paddingTop: '100px' }} key={data._id}>
            <div className={burgerConstructorStyle.section}>
                {arr[0]}
            </div>
            <div className={burgerConstructorStyle.container}>
                <ul className={burgerConstructorStyle.container__ingredients}>
                    {arrOthers}
                </ul>
            </div>
            <div className={burgerConstructorStyle.section}>
                {arr[1]}
            </div>
            <div className={burgerConstructorStyle.price}>
                <p className='text text_type_digits-medium pr-10'>610<CurrencyIcon /></p>
                <Button htmlType="button" type='primary' size='large' onClick={() => openModal()} >
                    Оформить заказ
                </Button>
            </div>
        </section >
    )
}



BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType).isRequired,
    openModal: PropTypes.func.isRequired,
}


export default BurgerConstructor;