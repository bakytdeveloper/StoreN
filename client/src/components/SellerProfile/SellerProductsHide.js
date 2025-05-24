// src/components/Modal.js
import React, {useEffect} from 'react';
import './SellerProductsHide.css';

const SellerProductsHide = ({ show, actionText, onConfirm, onCancel }) => {

    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
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

    return (
        <div className="modal-overlay-module">
            <div className="modal-content-module">
                <h3>Подтверждение</h3>
                <div>Вы уверены, что хотите {actionText}?</div>
                <div className="modal-buttons">
                    <button className="modal-buttons-right" onClick={onCancel}>Отмена</button>
                    <button className="modal-buttons-left" onClick={onConfirm}>Подтвердить</button>
                </div>
            </div>
        </div>
    );
};

export default SellerProductsHide;
