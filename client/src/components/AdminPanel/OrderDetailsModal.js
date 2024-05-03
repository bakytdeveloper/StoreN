import React, {useEffect, useState} from 'react';
import './OrderDetailsModal.css';
import {useHistory} from "react-router-dom";



// const OrderDetailsModal = ({ order, onUpdateQuantity, onDeleteItem }) => {
//     const history = useHistory();
//
//     const onClose = () => {
//         history.goBack(); // Переход на предыдущую страницу
//     };
//
//     return (
//         <div className="order-details-modal">
//             <div className="modal-content">
//                 <button className="close-button" onClick={onClose}>
//                     &#10006;
//                 </button>
//                 <h2>Детали заказа</h2>
//                 <div className="order-info">
//                     <div>
//                         <strong>ID заказа:</strong> {order._id}
//                     </div>
//                     <div>
//                         <strong>Клиент:</strong> {order.user ? order.user.name : 'Гость'}
//                     </div>
//                     <div>
//                         <strong>Email:</strong> {order.user ? order.user.email : '-'}
//                     </div>
//                     <div>
//                         <strong>Адрес:</strong> {order.address ? order.address : '-'}
//                     </div>
//                     <div>
//                         <strong>Телефон:</strong> {order.phoneNumber ? order.phoneNumber : '-'}
//                     </div>
//                     <div>
//                         <strong>Способ оплаты:</strong> {order.user ? order.paymentMethod : '-'}
//                     </div>
//                     <div>
//                         <strong>Комментарии:</strong> {order.comments ? order.comments : '-'}
//                     </div>
//                     <div>
//                         <strong>Статус:</strong> {order.status}
//                     </div>
//                     <div>
//                         <strong>Дата изменения статуса:</strong>{' '}
//                         {order.statusHistory && order.statusHistory.length > 0
//                             ? new Date(order.statusHistory[order.statusHistory.length - 1].time).toLocaleString()
//                             : '-'}
//                     </div>
//                     <div>
//                         <strong>Дата создания заказа:</strong> {new Date(order.date).toLocaleString()}
//                     </div>
//                     <div>
//                         <strong>Товары:</strong>
//                         <hr />
//                         <ul>
//                             {order.products.map((item, index) => (
//                                 <li key={item.product._id}>
//                                     {item.product && (
//                                         <div>
//                                             <strong>
//                                                 {' '}
//                                                 <span>{index + 1})</span> Тип товара:
//                                             </strong>{' '}
//                                             {item.product.type}
//                                         </div>
//                                     )}
//                                     {item.product && (
//                                         <div>
//                                             <strong>Бренд:</strong> {item.product.brand}
//                                         </div>
//                                     )}
//                                     {item.product && (
//                                         <div>
//                                             <strong>Название товара:</strong> {item.product.name}
//                                         </div>
//                                     )}
//                                     {item.product && (
//                                         <div>
//                                             <strong>Описание:</strong> {item.product.description}
//                                         </div>
//                                     )}
//                                     <div>
//                                         <strong>Количество:</strong> {item.quantity}
//                                         <button onClick={() => onUpdateQuantity(order._id, item.product._id, item.quantity - 1)}>-</button>
//                                         <button onClick={() => onUpdateQuantity(order._id, item.product._id, item.quantity + 1)}>+</button>
//                                         <button onClick={() => onDeleteItem(order._id, item.product._id)}>Удалить</button>
//
//
//                                     </div>
//                                     {item.product && (
//                                         <div>
//                                             <strong>Цена за единицу:</strong> {item.product.price} KGS
//                                         </div>
//                                     )}
//                                     <hr />
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                     <div>
//                         <strong>Общая сумма заказа:</strong> {order.totalAmount.toFixed(2)} KGS
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default OrderDetailsModal;



const OrderDetailsModal = ({ order, onUpdateQuantity, onDeleteItem }) => {
    const [totalAmount, setTotalAmount] = useState(order.totalAmount);

    useEffect(() => {
        setTotalAmount(order.totalAmount);
    }, [order.totalAmount]);

    const history = useHistory();

    const onClose = () => {
        history.goBack(); // Переход на предыдущую страницу
    };

    return (
        <div className="order-details-modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    &#10006;
                </button>
                <h2>Детали заказа</h2>
                <div className="order-info">
                    <div>
                        <strong>ID заказа:</strong> {order._id}
                    </div>
                    <div>
                        <strong>Клиент:</strong> {order.user ? order.user.name : 'Гость'}
                    </div>
                    <div>
                        <strong>Email:</strong> {order.user ? order.user.email : '-'}
                    </div>
                    <div>
                        <strong>Адрес:</strong> {order.address ? order.address : '-'}
                    </div>
                    <div>
                        <strong>Телефон:</strong> {order.phoneNumber ? order.phoneNumber : '-'}
                    </div>
                    <div>
                        <strong>Способ оплаты:</strong> {order.user ? order.paymentMethod : '-'}
                    </div>
                    <div>
                        <strong>Комментарии:</strong> {order.comments ? order.comments : '-'}
                    </div>
                    <div>
                        <strong>Статус:</strong> {order.status}
                    </div>
                    <div>
                        <strong>Дата изменения статуса:</strong>{' '}
                        {order.statusHistory && order.statusHistory.length > 0
                            ? new Date(order.statusHistory[order.statusHistory.length - 1].time).toLocaleString()
                            : '-'}
                    </div>
                    <div>
                        <strong>Дата создания заказа:</strong> {new Date(order.date).toLocaleString()}
                    </div>
                    <div>
                        <strong>Товары:</strong>
                        <hr />
                        <ul>
                            {order.products.map((item, index) => (
                                <li key={item.product._id}>
                                    {item.product && (
                                        <div>
                                            <strong>
                                                {' '}
                                                <span>{index + 1})</span> Тип товара:
                                            </strong>{' '}
                                            {item.product.type}
                                        </div>
                                    )}
                                    {item.product && (
                                        <div>
                                            <strong>Бренд:</strong> {item.product.brand}
                                        </div>
                                    )}
                                    {item.product && (
                                        <div>
                                            <strong>Название товара:</strong> {item.product.name}
                                        </div>
                                    )}
                                    {item.product && (
                                        <div>
                                            <strong>Описание:</strong> {item.product.description}
                                        </div>
                                    )}
                                    <div>
                                        <strong>Количество:</strong> {item.quantity}
                                        <button onClick={() => onUpdateQuantity(order._id, item.product._id, item.quantity - 1)}>-</button>
                                        <button onClick={() => onUpdateQuantity(order._id, item.product._id, item.quantity + 1)}>+</button>
                                        <button onClick={() => onDeleteItem(order._id, item.product._id)}>Удалить</button>
                                    </div>
                                    {item.product && (
                                        <div>
                                            <strong>Цена за единицу:</strong> {item.product.price} KGS
                                        </div>
                                    )}
                                    <hr />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <strong>Общая сумма заказа:</strong> {totalAmount} KGS
                        {/*<strong>Общая сумма заказа:</strong> {totalAmount.toFixed(2)} KGS*/}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default OrderDetailsModal;