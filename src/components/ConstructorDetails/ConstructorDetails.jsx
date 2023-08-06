import React, {useContext, useRef } from "react";
import styles from './constructorDetails.module.css'
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { RESET_INGREDIENT, DELETE_INGREDIENT } from "../../services/actions/constructor";
import { resetItem } from "../../services/actions/constructor";
import PropTypes from 'prop-types';
import ingredientPropType from "../../utils/prop-types";




const ConstructorDetails = ( {ingridient, index} ) => {

  const dispatch = useDispatch();

  const id = ingridient.uId;

  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
      accept: 'replacingIngridient',
      collect(monitor) {
          return {
            handlerId: monitor.getHandlerId(), 
          };
      },
      hover(ingridient, monitor) {
          if (!ref.current) {
              return;
          }
          const dragIndex = ingridient.index;
          const hoverIndex = index;

          if (dragIndex === hoverIndex) {
              return;
          }
          const hoverBoundingRect = ref.current?.getBoundingClientRect();
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          const clientOffset = monitor.getClientOffset();
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;

          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
              return;
          }
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
              return;
          }
          dispatch(resetItem(dragIndex, hoverIndex));
          ingridient.index = hoverIndex;
      },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'replacingIngridient',
    item: () => {
        return { id, index };
    },
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
});

const opacity = isDragging ? 0 : 1;

drag(drop(ref));

    return (
        <ul className={styles.list} ref={ref} style={{opacity}} data-handler-id={handlerId}>
        <li className={`${styles.listItem} mb-4`}>
            <span >
                <DragIcon type="primary" />
            </span>
            <ConstructorElement
        text={ingridient.name}
        price={ingridient.price}
        thumbnail={ingridient.image}
        handleClose={() => {dispatch({
          type: DELETE_INGREDIENT,
          ingridient: ingridient
        })}}
        />
        </li>
        </ul>
    );
}

ConstructorDetails.propTypes = {
  ingridient: ingredientPropType.isRequired,
  index: PropTypes.number.isRequired,
};

export default ConstructorDetails;