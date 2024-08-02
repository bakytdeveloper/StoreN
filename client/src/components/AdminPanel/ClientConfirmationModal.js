import React, {useEffect} from 'react';
import './ConfirmationModal.css'; // Можно использовать те же стили, что и для `ConfirmationModal.js`

const ClientConfirmationModal = ({ show, onClose, onConfirm, client }) => {
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
            <div className="modal-content-module">
                <h2>Подтвердите удаление</h2>
                <div>Вы уверены, что хотите удалить клиента <strong>{client.name}</strong> с email <strong>{client.email}</strong>?</div>
                <div className="modal-buttons">
                    <button  className="modal-buttons-left" onClick={handleClose}>Отмена</button>
                    <button className="modal-buttons-right" onClick={() => onConfirm(client._id)}>Удалить</button>
                </div>
            </div>
        </div>
    );
};

export default ClientConfirmationModal;
