import React from 'react';
import './ConfirmationModal.css'; // Создайте этот файл для стилизации модального окна

const ConfirmationModal = ({ show, onClose, onConfirm, seller }) => {
    if (!show) return null;


    // Отключаем скролл на фоне при открытии модального окна
    document.body.style.overflow = 'hidden';

    // Восстанавливаем скролл, когда модальное окно закрыто
    const handleClose = () => {
        document.body.style.overflow = 'auto';
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Подтвердите удаление</h2>
                <div>Вы уверены, что хотите удалить продавца <strong>{seller.name}</strong> из компании <strong>{seller.companyName}</strong>?</div>
                <div className="modal-buttons">
                    <button onClick={onClose}>Отмена</button>
                    <button onClick={() => onConfirm(seller._id)}>Удалить</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
