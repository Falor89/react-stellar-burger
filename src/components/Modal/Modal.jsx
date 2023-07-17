import React from "react";
import './Modal.css';
import PropTypes from 'prop-types';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";


const modalContainer = document.querySelector('#modal');

const Modal = ({ onClose, children }) => {

    const handleEscKeydown = (e) => {
        e.key === 'Escape' && onClose();
    }

    React.useEffect(() => {
        document.addEventListener('keydown', handleEscKeydown);
        return () => {
            document.removeEventListener('keydown', handleEscKeydown)
        }
    },)

    return createPortal(
        <>
            <div className='Modal-container'>
                <button type="button" className='Modal-closeButton'>
                    <CloseIcon type='primary' onClick={onClose} />
                </button>
                {children}
            </div>
            <ModalOverlay onClick={onClose} />
        </>,
        modalContainer
    )
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired
};

export default Modal;
