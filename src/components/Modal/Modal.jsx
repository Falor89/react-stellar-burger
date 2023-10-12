import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './modal.module.css';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CLOSE_MODAL } from '../../services/actions/modal';

const modalContainer = document.querySelector('#modal');

const Modal = (props) => {
    const dispatch = useDispatch();

    const onClose = () => {
        dispatch({
            type: CLOSE_MODAL
        })
    }

    const escClose = (e) => {
        e.key === 'Escape' && onClose()
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
                <button className={styles.closeButton} type='button' onClick={onClose} >
                    <CloseIcon type='primary' />
                </button>
                {console.log(props)}
                {props.children}
            </div>
            <ModalOverlay close={onClose} />
        </>,
        modalContainer
    )
}

export default Modal;