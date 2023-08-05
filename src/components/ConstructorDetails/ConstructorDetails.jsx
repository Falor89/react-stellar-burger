import React, {useContext, useRef } from "react";
import styles from './constructorDetails.module.css'
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import uniqid from 'uniqid';
import { RESET_INGREDIENT, DELETE_INGREDIENT } from "../../services/actions/constructor";



const ConstructorDetails = ( {ingridient} ) => {

    const dispatch = useDispatch();
  
    const [ ,dragRef] = useDrag({
      type: 'replacingIngridient',
      item: ingridient
    })
  
    const ref = useRef(null);
  
    const [ ,dropRef] = useDrop({
      accept: 'replacingIngridient',
      
      drop(item, monitor) {
        if (item.uniqid === ingridient.uniqid) {
          return
        }
        const elementMiddle = (ref.current.getBoundingClientRect().bottom + ref.current.getBoundingClientRect().top) / 2
        const itemOffset = monitor.getClientOffset().y;
        
        if (elementMiddle - itemOffset < 0) {
          const id = uniqid()
          dispatch({
            type: RESET_INGREDIENT,
            sort: ingridient.sort,
            ingridient: item,
            uniqid: id
          })
        }
        if (elementMiddle - itemOffset > 0) {
          const id = uniqid()
          dispatch({
            type: RESET_INGREDIENT,
            sort: ingridient.sort - 1,
            ingridient: item,
            uniqid: id
          })
        }
      }
    })
    dragRef(dropRef(ref))

    return (
        <ul className={styles.list} ref={ref}>
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

export default ConstructorDetails;