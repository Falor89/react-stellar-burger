import styles from './modalOverlay.module.css'
import PropTypes from 'prop-types';
import React, { useRef } from 'react';

const ModalOverlay = (props) => {
    const overlayRef = useRef(null)

    const close = (e) => {
        if (e.target === overlayRef.current) {
            props.close()
        }
    }

    return (
        <div className={styles.overlay}
            onClick={close}
            ref={overlayRef}>
        </div>
    )
}

ModalOverlay.propTypes = {
    close: PropTypes.func.isRequired
}


export default ModalOverlay;