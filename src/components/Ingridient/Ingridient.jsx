import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingridientStyle from './Ingridient.module.css'

const Ingridient = (props) => {
    // randomCount = (max) => {
    //     return Math.floor(Math.random() * max);
    // }
    return (
        <div className={ingridientStyle.container}>
            <img style={{ margin: '0 , 4px' }} src={props.ingridient.image} alt={props.ingridient.name} />
            <div className={ingridientStyle.price}>
                <span className="text text_type_digits-default">{props.ingridient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`text text_type_main-default ${ingridientStyle.text}`} style={{ textAlign: 'center' }}>{props.ingridient.name}</p>
            <Counter count={Math.floor(Math.random() * 99)} size="default" />
        </div>
    )
}


export default Ingridient;