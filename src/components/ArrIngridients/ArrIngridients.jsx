import IngridientsStyle from './ingridients.module.css';
import Ingridient from "../Ingridient/Ingridient";
import data from "../../utils/data";
import PropTypes from 'prop-types';


const ArrIngridients = ({ ingridientType, type, openModal }) => {

    return (
        <div className={IngridientsStyle.title}>
            <h2 className='text text_type_main-medium'>{type.text}</h2>
            <ul className={`${IngridientsStyle.ingredients} pl-4 pr-2`}>
                {ingridientType.map((item) => (
                    <li onClick={() => openModal(item)} key={item._id}>
                        <Ingridient ingridient={item} onClick={openModal} />
                    </li>
                )
                )}
            </ul>
        </div>
    )
}

ArrIngridients.propTypes = {
    ingridientType: PropTypes.array.isRequired,
    type: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired,
}

export default ArrIngridients