import React from 'react';
import './ConfirmationModal.css'; // Можно использовать те же стили, что и для `ConfirmationModal.js`

const ClientConfirmationModal = ({ show, onClose, onConfirm, client }) => {
    if (!show) return null;

    // Отключаем скролл на теле страницы
    document.body.style.overflow = 'hidden';

    // Обработчик закрытия модального окна
    const handleClose = () => {
        document.body.style.overflow = ''; // Восстанавливаем скролл
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Подтвердите удаление</h2>
                <div>Вы уверены, что хотите удалить клиента <strong>{client.name}</strong> с email <strong>{client.email}</strong>?</div>
                <div className="modal-buttons">
                    <button onClick={handleClose}>Отмена</button>
                    <button onClick={() => onConfirm(client._id)}>Удалить</button>
                </div>
            </div>
        </div>
    );
};

export default ClientConfirmationModal;
