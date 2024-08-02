import React, {useEffect} from 'react';
import './ConfirmationModal.css'; // Можно использовать те же стили, что и для `ConfirmationModal.js`

const ClientConfirmationModal = ({ show, onClose, onConfirm, client }) => {
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
            // Убедитесь, что прокрутка отключена только для фонового контента
            document.body.style.position = 'fixed';
            document.body.style.width = '100%'; // Чтобы предотвратить изменения ширины из-за отключения скролла
        } else {
            // Восстанавливаем исходное состояние скролла и позиции
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }

        return () => {
            // Восстанавливаем скролл и другие стили, если модальное окно было закрыто
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
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
