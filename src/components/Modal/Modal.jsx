import React from 'react';
import styles from './modal.module.css';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

const modalContainer = document.querySelector('#modal');

const Modal = (props) => {
    const close = props.close;

    const escClose = (e) => {
        if (e.key === 'Escape') {
            close()
        }
    }

    React.useEffect(
        () => {
            document.addEventListener('keydown', escClose)

            return (
                () => {
                    document.removeEventListener('keydown', escClose)
                }
            )
        }, []
    )

    return createPortal(
        <>
            <div className={styles.container}>
                <button className={styles.closeButton} type='button' onClick={close} >
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