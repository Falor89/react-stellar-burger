import React, { useContext, useRef, FC } from "react";
import styles from './constructorDetails.module.css'
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from '../../utils/hooks';
import { useDrag, useDrop } from "react-dnd";
import { MOVE_INGRIDIENT, DELETE_INGRIDIENT, resetItem, deleteItem } from "../../services/actions/constructor";

import uniqid from 'uniqid';
import { TIngredient } from "../../utils/types/data";

interface IBurgerConstructorCard {
    item: TIngredient;
    index: number;
}


const ConstructorDetails: FC<IBurgerConstructorCard> = ({ item, index }) => {

    const dispatch = useDispatch();

    const id = item.uId;

    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: 'ingridient',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(), ///
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }
            dispatch(resetItem(dragIndex, hoverIndex));
            index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'ingridient',
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
        <ul className={styles.list} >
            <li className={`${styles.listItem} mb-4`} data-handler-id={handlerId} ref={ref} style={{ opacity }}>
                <span >
                    <DragIcon type="primary" />
                </span>
                <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={() => {
                        dispatch(deleteItem(item))
                    }}
                />
            </li>
        </ul>
    );
}


export default ConstructorDetails;