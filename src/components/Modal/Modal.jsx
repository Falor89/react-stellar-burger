import styles from './modal.module.css'
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from '../../services/actions/modal.js';


const modalContainer = document.querySelector('#modal');

const Modal = (props) => {

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch({
      type: CLOSE_MODAL
    })
  }

  useEffect(() => {
    document.addEventListener('keydown', escClose)

    return(() => {
    document.removeEventListener('keydown', escClose)
    })
  },[])

  const escClose = (e) => {
    if (e.key === 'Escape') {
        onClose()
    }
  }

    return createPortal(
        <>
            <div className={styles.container}>
                <button type="button" className={styles.closeButton}>
                    <CloseIcon type='primary' onClick={onClose} />
                </button>
                {props.children}
            </div>
            <ModalOverlay onClick={onClose} />
        </>,
        modalContainer
    )
}


export default Modal;
