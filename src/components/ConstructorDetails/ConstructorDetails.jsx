import React, { useContext, useRef } from "react";
import styles from './constructorDetails.module.css'
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { RESET_INGREDIENT, DELETE_INGREDIENT } from "../../services/actions/constructor";
import { resetItem } from "../../services/actions/constructor";
import PropTypes from 'prop-types';




const ConstructorDetails = ({ ingredient, index }) => {

    const dispatch = useDispatch();

    const id = ingredient.uId;

    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: 'replacingIngredient',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(ingredient, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = ingredient.index;
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
            ingredient.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'replacingIngredient',
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
        <ul className={styles.list} ref={ref} style={{ opacity }} data-handler-id={handlerId}>
            <li className={`${styles.listItem} mb-4`}>
                <span >
                    <DragIcon type="primary" />
                </span>
                <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={() => {
                        dispatch({
                            type: DELETE_INGREDIENT,
                            ingredient: ingredient
                        })
                    }}
                />
            </li>
        </ul>
    );
}


export default ConstructorDetails;