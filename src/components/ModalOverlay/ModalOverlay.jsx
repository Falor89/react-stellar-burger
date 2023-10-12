import React from 'react';
import styles from './modalOverlay.module.css';

const ModalOverlay = ({ onClick }) => {
    // const overlayRef = React.useRef(null)

    // const close = (e) => {
    //     if (e.target === overlayRef.current) {
    //         props.close
    //     }
    // }

    return (
        <div
            className={styles.overlay}
            onClick={onClick}
        ></div>
    )
}

export default ModalOverlay;