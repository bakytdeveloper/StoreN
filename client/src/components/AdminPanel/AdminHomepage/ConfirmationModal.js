import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="confirmation-modal">
            <div className="confirmation-modal-content">
                <h2>Confirm Action</h2>
                <p>{message}</p>
                <button onClick={onConfirm}>Подтвердить</button>
                <button onClick={onClose}>Отменить</button>
            </div>
        </div>
    );
};

export default ConfirmationModal;
