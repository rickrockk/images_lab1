import React, {useState} from 'react';
import classNames from "classnames";
import './Modal.css'

export const Modal = ({children, isActive, setIsActive}) => {
    const modalClass = classNames({
        modal: true,
        'modal_active': isActive
    })
    if (isActive) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            setIsActive(false);
        }
    });
    return (
        <div className={modalClass} onClick={() => setIsActive(false)}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};