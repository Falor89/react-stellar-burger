import { Component } from "react";
import burgerIngridientsStyles from './burgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingridientType from '../../utils/ingridientType'
import Ingridients from '../Ingridients/Ingridients';

export default class BurgerIngredients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'one',
        }
    }

    SetCurrent(e) {
        this.setState(({ current: e }))
    }

    render() {
        return (
            <section className={burgerIngridientsStyles.section}>
                <h1 className='text text_type_main-large pt-10'>Соберите бургер</h1>
                <div style={{ display: 'flex' }}>
                    <a href="#bun">
                        <Tab value="bun" active={this.state.current === 'bun'} onClick={this.setCurrent}>
                            Булки
                        </Tab>
                    </a>
                    <a href="#sauce">
                        <Tab value="sauce" active={this.state.current === 'sauce'} onClick={this.setCurrent}>
                            Соусы
                        </Tab>
                    </a>
                    <a href="#main">
                        <Tab value="main" active={this.state.current === 'main'} onClick={this.setCurrent}>
                            Начинки
                        </Tab>
                    </a>
                </div>
                <div className={burgerIngridientsStyles.container}>
                    {ingridientType.map((item) => (<Ingridients key={item._id} type={item.type} text={item.text} />))}
                </div>
            </section>
        )
    }
}