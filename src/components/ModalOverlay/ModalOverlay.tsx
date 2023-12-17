import styles from './modalOverlay.module.css'
import PropTypes from 'prop-types';
import React, { FC, SyntheticEvent, useRef } from 'react';

const ModalOverlay: FC<{ close: () => void }> = ({ close }) => {
    const overlayRef = useRef(null)

    const onClose = (e: SyntheticEvent) => {
        if (e.target === overlayRef.current) {
            close()
        }
    }

    return (
        <div className={styles.overlay}
            onClick={onClose}
            ref={overlayRef}>
        </div>
    )
}


export default ModalOverlay;