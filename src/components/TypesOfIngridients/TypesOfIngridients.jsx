import typesOfIngridientsStyle from './typesOfIngridients.module.css';
import Ingridient from "../Ingridient/Ingridient";
import PropTypes from 'prop-types';


const TypesOfIngridients = ({ ingridientType, type, openModal }) => {

    return (
        <div className={typesOfIngridientsStyle.title}>
            <h2 className='text text_type_main-medium'>{type.text}</h2>
            <ul className={`${typesOfIngridientsStyle.ingredients} pl-4 pr-2`}>
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

TypesOfIngridients.propTypes = {
    ingridientType: PropTypes.array.isRequired,
    type: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired,
}

export default TypesOfIngridients