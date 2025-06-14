import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modals-overlay">
            <div className="modals-content">
                <h3>Подтверждение</h3>
                <div>{message}</div>
                <div className="modal-buttons">
                    <button className="modal-button cancel" onClick={onClose}>
                        Отмена
                    </button>
                    <button className="modal-button confirm" onClick={onConfirm}>
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;