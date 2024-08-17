import React from 'react';
import './ConfirmationModal.css'; // Можно создать файл CSS для стилизации модального окна

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="confirmation-modal">
            <div className="confirmation-modal-content">
                <h2>Confirm Action</h2>
                <p>{message}</p>
                <button onClick={onConfirm}>Confirm</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default ConfirmationModal;
