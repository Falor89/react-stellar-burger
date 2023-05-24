import { Component } from 'react';
import burgerConstructorStyle from './burgerConstructor.module.css';
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/prop-types';

export default class BurgerConstructor extends Component {
    render() {
        const arr = this.props.data.filter((item) => item.type === 'bun').map((item) => {
            return (
                <div className='pl-10'>
                    <ConstructorElement
                        key={item._id}
                        isLocked={true}
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                    />
                </div>
            )
        });

        const arrOthers = this.props.data.filter((item) => item.type !== 'bun').map((item) => {
            return (
                <>
                    <div className={burgerConstructorStyle.constructor__element} key={item._id}>
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
                </>
            )
        })

        const costs = this.props.data.map((item) => item.price).reduce((a, b) => a + b)

        return (
            < section className={burgerConstructorStyle.section} style={{ paddingTop: '100px' }}>
                <div className={burgerConstructorStyle.section}>
                    {arr[0]}
                </div>
                <div className={burgerConstructorStyle.container}>
                    <ul className={burgerConstructorStyle.container__ingredients}>
                        {arrOthers}
                    </ul>
                    <div className={burgerConstructorStyle.section}>
                        {arr[1]}
                    </div>
                </div>

                <div className={burgerConstructorStyle.price}>
                    <p className='text text_type_digits-medium pr-10'>{costs}<CurrencyIcon /></p>
                    <Button htmlType="button" type='primary'>
                        Оформить заказ
                    </Button>
                </div>
            </section >
        )
    }
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType)
}