import styles from './modal.module.css'
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useEffect } from "react";


const modalContainer = document.querySelector('#modal');

const Modal = (props) => {

  const close = props.close

  useEffect(() => {
    document.addEventListener('keydown', escClose)

    return (() => {
      document.removeEventListener('keydown', escClose)
    })
  }, [])

  const escClose = (e) => {
    if (e.key === 'Escape') {
      close()
    }
  }

  return createPortal(
    <>
      <div className={styles.container}>
        <button type="button" className={styles.closeButton} onClick={close}>
          <CloseIcon type='primary' />
        </button>
        {props.children}
      </div>
      <ModalOverlay close={close} />
    </>,
    modalContainer
  )
}


export default Modal;
