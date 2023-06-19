import React from 'react';
import modalOverlayStyle from './modalOverlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ onClick }) => {
    return (
        <div className={modalOverlayStyle.overlay} onClick={onClick}></div>
    )
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;