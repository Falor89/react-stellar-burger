import React from 'react';
import './ModalOverlay.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ onClick }) => {
    return (
        <div className='ModalOverlay-overlay' onClick={onClick}></div>
    )
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;