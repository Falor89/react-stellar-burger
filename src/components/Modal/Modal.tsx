import styles from './modal.module.css'
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useEffect, FC } from "react";


const modalContainer = document.querySelector('#modal');

interface IModal {
  close: () => void;
  title?: string;
}

const Modal: FC<IModal> = ({ close, title = '', children }) => {


  useEffect(() => {
    document.addEventListener('keydown', escClose)

    return (() => {
      document.removeEventListener('keydown', escClose)
    })
  }, [])

  const escClose = (e: KeyboardEvent) => {
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
        {children}
      </div>
      <ModalOverlay close={close} />
    </>,
    modalContainer as Element
  )
}


export default Modal;
