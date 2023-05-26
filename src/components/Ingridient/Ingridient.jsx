import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingridientStyle from './Ingridient.module.css';
import PropTypes from 'prop-types';
import ingridientType from "../../utils/ingridientType";


const Ingridient = ({ ingridient }) => {
    return (
        <div className={ingridientStyle.container}>
            <img style={{ margin: '0 , 4px' }} src={ingridient.image} alt={ingridient.name} />
            <div className={ingridientStyle.price}>
                <span className="text text_type_digits-default">{ingridient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`text text_type_main-default ${ingridientStyle.text}`} style={{ textAlign: 'center' }}>{ingridient.name}</p>
            <Counter count={1} size="default" />
        </div>
    )
}

Ingridient.propTypes = {
    ingridient: ingridientType.isRequired
};


export default Ingridient;