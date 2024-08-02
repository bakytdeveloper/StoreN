import React, {useEffect} from 'react';
import './ConfirmationModal.css'; // Создайте этот файл для стилизации модального окна


const ConfirmationModal = ({ show, onClose, onConfirm, seller }) => {
    useEffect(() => {
        // Отключаем скролл на фоне при открытии модального окна
        if (show) {
            document.body.style.overflow = 'hidden';
        }

        // Восстанавливаем скролл, когда модальное окно закрыто
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [show]);

    if (!show) return null;

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="modal-overlay-module" onClick={handleClose}>
            <div
                className="modal-content-module"
                onClick={e => e.stopPropagation()} // Prevents click events from closing the modal when clicking inside it
            >
                <h2>Подтвердите удаление</h2>
                <div>Вы уверены, что хотите удалить продавца <strong>{seller.name}</strong> из компании <strong>{seller.companyName}</strong>?</div>
                <div className="modal-buttons">
                    <button className="modal-buttons-left" onClick={handleClose}>Отмена</button>
                    <button className="modal-buttons-right" onClick={() => onConfirm(seller._id)}>Удалить</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;