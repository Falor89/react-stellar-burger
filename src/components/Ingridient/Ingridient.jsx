import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingridientStyle from './Ingridient.module.css';
import PropTypes from 'prop-types';


const Ingridient = (props) => {
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

Ingridient.propTypes = {
    ingridient: PropTypes.shape({
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired
};


export default Ingridient;