import IngridientsStyle from './ingridients.module.css';
import Ingridient from "../Ingridient/Ingridient";
import data from "../../utils/data";
import PropTypes from 'prop-types';


const Ingridients = (props) => {
    const arr = data.filter((item) => item.type === props.type)

    return (
        <div className={IngridientsStyle.title} id={props.type}>
            <h2 className='text text_type_main-medium'>{props.text}</h2>
            <ul className={`${IngridientsStyle.ingredients} pl-4 pr-2`}>
                {arr.map((item) => (
                    <Ingridient key={item._id} ingridient={item} />
                ))}
            </ul>
        </div>
    )
}

Ingridients.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
}

export default Ingridients