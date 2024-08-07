

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './OrderDetailsPage.css';



const OrderDetailsPage = ({ orders = [], setOrders, setShowSidebar }) => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [editMode, setEditMode] = useState({});
    const [sellers, setSellers] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const [orderDeleteConfirmation, setOrderDeleteConfirmation] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`);
                const data = await response.json();
                setOrder(data);
                setTotalAmount(data.totalAmount);
            } catch (error) {
                console.error('Error fetching order:', error);
            }
        };

        if (Array.isArray(orders)) {
            const currentOrder = orders.find(order => order._id === orderId);
            if (currentOrder) {
                setOrder(currentOrder);
                setTotalAmount(currentOrder.totalAmount);
            } else {
                fetchOrder();
            }
        } else {
            fetchOrder();
        }
    }, [orders, orderId]);

    useEffect(() => {
        setShowSidebar(true);
        return () => {
            setShowSidebar(true);
        };
    }, [setShowSidebar]);

    const onClose = () => {
        history.goBack();
    };

    const calculateTotalAmountLocally = (products) => {
        return products.reduce((sum, item) =>
                item && item.price ? sum + item.price * item.quantity : sum
            , 0);
    };

    const updateQuantity = async (productIndex, newQuantity) => {
        if (newQuantity < 0) {
            console.log('Нельзя установить отрицательное количество товара');
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/update-product-quantity/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ productIndex, quantity: newQuantity }), // Передаем индекс вместо productId
            });
            const result = await response.json();
            if (response.ok) {
                const updatedOrder = { ...order };
                updatedOrder.products[productIndex].quantity = newQuantity;
                updatedOrder.totalAmount = calculateTotalAmountLocally(updatedOrder.products);
                setOrder(updatedOrder);
                setTotalAmount(updatedOrder.totalAmount); // Обновляем состояние totalAmount
                // Обеспечиваем, что orders - массив перед вызовом map
                if (Array.isArray(orders)) {
                    const updatedOrders = orders.map((order) =>
                        order._id === orderId ? updatedOrder : order
                    );
                    setOrders(updatedOrders);
                }
            } else {
                console.error('Failed to update quantity:', result);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const onDeleteItem = async (productIndex) => {
        if (productIndex === undefined || productIndex < 0) {
            console.log('Требуется индекс продукта');
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/remove-product/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ productIndex }), // Передаем индекс вместо productId
            });
            const result = await response.json();
            if (response.ok) {
                if (result.message === 'Заказ удален, так как в нем не осталось товаров') {
                    console.log('Заказ удален, так как в нем не осталось товаров');
                    setOrder(null);
                    setTotalAmount(0); // Обновляем состояние totalAmount
                    // Обеспечиваем, что orders - массив перед фильтрацией
                    if (Array.isArray(orders)) {
                        const updatedOrders = orders.filter((order) => order._id !== orderId);
                        setOrders(updatedOrders);
                    }
                    return;
                }
                const updatedOrder = { ...order };
                updatedOrder.products.splice(productIndex, 1);
                updatedOrder.totalAmount = calculateTotalAmountLocally(updatedOrder.products);
                setOrder(updatedOrder);
                setTotalAmount(updatedOrder.totalAmount); // Обновляем состояние totalAmount
                const updatedOrders = orders.map((order) =>
                    order._id === orderId ? updatedOrder : order
                );
                setOrders(updatedOrders);
                setDeleteConfirmation(null);
                setEditMode({});
            } else {
                console.error('Failed to delete item:', result);
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };


    const deleteOrder = async (orderId) => {
        if (!orderId) {
            console.error('Order ID is required');
            return;
        }
        try {
            const token = localStorage.getItem('token'); // Убедитесь, что токен сохранен в localStorage
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                console.log('Order deleted successfully');
                setOrder(null);
                setTotalAmount(0);
                // Ensure orders is an array before filtering
                if (Array.isArray(orders)) {
                    const updatedOrders = orders.filter((order) => order._id !== orderId);
                    setOrders(updatedOrders);
                } else {
                    console.error('Orders is not an array:', orders);
                }

                history.goBack();
                history.push('/order/');

            } else {
                const result = await response.json();
                console.error('Failed to delete order:', result);
            }
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };


    const fetchSellers = async () => {
        try {
            const token = localStorage.getItem('token'); // Или используйте другой метод получения токена
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 401) {
                console.error('Unauthorized');
                return;
            }
            const data = await response.json();
            setSellers(data);
        } catch (error) {
            console.error('Error fetching sellers:', error);
        }
    };

    const getSellerInfo = (product) => {
        if (!Array.isArray(sellers)) {
            console.error('sellers is not an array:', sellers);
            return { name: 'Неизвестный продавец', email: '-', phoneNumber: '-' };
        }
        const seller = sellers.find((seller) => seller.products.includes(product._id));
        return seller
            ? { name: seller.name, email: seller.email, phoneNumber: seller.phoneNumber }
            : { name: 'Неизвестный продавец', email: '-', phoneNumber: '-' };
    };

    const toggleEditMode = (productId) => {
        setEditMode(prevState => ({
            ...prevState,
            [productId]: !prevState[productId]
        }));
    };

    const confirmDeleteItem = (productId) => {
        setDeleteConfirmation(productId);
    };

    const cancelDeleteItem = () => {
        setDeleteConfirmation(null);
    };

    const confirmDeleteOrder = () => {
        setOrderDeleteConfirmation(true);
    };

    const cancelDeleteOrder = () => {
        setOrderDeleteConfirmation(false);
    };

    const incrementQuantity = (index) => {
        const newQuantity = order.products[index].quantity + 1;
        updateQuantity(index, newQuantity);
    };

    const decrementQuantity = (index) => {
        const newQuantity = order.products[index].quantity - 1;
        if (newQuantity >= 0) {
            updateQuantity(index, newQuantity);
        }
    };

    // return (
    //     <div className="order-details-page">
    //         {order && (
    //             <div className="order-details-modal">
    //                 <div className="modal-content">
    //                     <button className="order-details-page-close-button" onClick={onClose}>
    //                         &#10006;
    //                     </button>
    //                     <h2>Детали заказа</h2>
    //                     <div className="order-info">
    //                         <div className="client-order-info">
    //                             <div>
    //                                 <strong>ID заказа:</strong> {order._id}
    //                             </div>
    //                             <div>
    //                                 <strong>Имя:</strong> {order.user ? order.user.name : order.guestInfo.name}
    //                             </div>
    //                             <div>
    //                                 <strong>Клиент:</strong> {order.user ? order.user.role : 'Гость'}
    //                             </div>
    //                             <div>
    //                                 <strong>Адрес:</strong> {order.address ? order.address : 'Гость'}
    //                             </div>
    //                             <div>
    //                                 <strong>Email:</strong> {order.user ? order.user.email : order.guestInfo.email}
    //                             </div>
    //                             <div>
    //                                 <strong>Телефон №:</strong> {order.phoneNumber ? order.phoneNumber : 'Гость'}
    //                             </div>
    //                         </div>
    //
    //                         <div>
    //                             <hr />
    //                             <ul>
    //                                 <h4 style={{ textAlign: "center" }}> Товары</h4>
    //                                 {order && order.products && order.products.map((item, index) => (
    //                                     <li key={index}>
    //                                         <h3>Инф. о продавце заказа</h3>
    //                                         <div>
    //                                             <strong>Наз.Компании:</strong> {item.seller?.companyName || 'Неизвестный продавец'}
    //                                         </div>
    //                                         <div>
    //                                             <strong>Продавец:</strong> {item.seller?.name || 'Неизвестный продавец'}
    //                                         </div>
    //                                         <div>
    //                                             <strong>Моб. продавца:</strong> {item.seller?.phoneNumber || 'Неизвестный продавец'}
    //                                         </div>
    //                                         <div>
    //                                             <strong>Эл.адрес:</strong> {item.seller?.email || 'Неизвестный продавец'}
    //                                         </div>
    //                                         <div><h3>
    //                                             <strong><u>Товары</u></strong>
    //                                         </h3></div>
    //                                         <div className="order-product-info">
    //                                             {/*<div className="order-product-image">*/}
    //                                             {/*    <img src={item.imageUrl} alt={item.name} />*/}
    //                                             {/*</div>*/}
    //                                             <div className="order-product-details">
    //                                                 <div><strong>Тип товара:</strong> {item.type}</div>
    //                                                 <div><strong>Наименование:</strong> {item.name}</div>
    //                                                 <div><strong>Количество:</strong> {item.quantity}</div>
    //                                                 <div><strong>Цена:</strong> {item.price}</div>
    //                                                 <div>
    //                                                     <strong>Сумма:</strong> {item.price * item.quantity} сом
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //
    //                                         {deleteConfirmation === index ? (
    //                                             <div className="confirmation-dialog">
    //                                                 <p>Вы уверены, что хотите удалить этот товар?</p>
    //                                                 <button className="confirm-delete-button" onClick={() => onDeleteItem(index)}>Удалить</button>
    //                                                 <button className="cancel-delete-button" onClick={cancelDeleteItem}>Отмена</button>
    //                                             </div>
    //                                         ) : (
    //                                             <div className="edit-buttons">
    //                                                 <button className="edit-button" onClick={() => toggleEditMode(index)}>Редактировать</button>
    //                                                 {/*<button className="delete-button" onClick={() => confirmDeleteItem(index)}>Удалить</button>*/}
    //                                             </div>
    //                                         )}
    //
    //                                         {editMode[item._id] && (
    //                                             <div className="edit-quantity">
    //                                                 <div className="edit-quantity-buttons">
    //                                                     <label>
    //                                                         Количество:
    //                                                         <div className="quantity-input">
    //                                                             <button onClick={() => decrementQuantity(index)}>-</button>
    //                                                             <input
    //                                                                 type="number"
    //                                                                 value={item.quantity}
    //                                                                 onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
    //                                                                 min="0"
    //                                                             />
    //                                                             <button onClick={() => incrementQuantity(index)}>+</button>
    //                                                             <button className="delete-button" onClick={() => confirmDeleteItem(index)}>Удалить</button>
    //
    //                                                         </div>
    //                                                     </label>
    //                                                 </div>
    //
    //                                                <div className="edit-quantity-add-end-delete">
    //                                                    <button className="save-button" onClick={() => toggleEditMode(index)}>Сохранить</button>
    //
    //                                                </div>
    //                                             </div>
    //                                         )}
    //                                     </li>
    //                                 ))}
    //                             </ul>
    //                             <hr />
    //                             <h4>Итоговая сумма: {totalAmount}</h4>
    //                             <div>
    //                                 <strong>Дата заказа:</strong> {order.date}
    //                             </div>
    //                             <div>
    //                                 <strong>Статус заказа:</strong> {order.status}
    //                             </div>
    //                             {orderDeleteConfirmation ? (
    //                                 <div className="confirmation-buttons">
    //                                     <p>Вы уверены, что хотите удалить этот заказ?</p>
    //                                     <button onClick={() => deleteOrder(orderId)}>Да</button>
    //                                     <button onClick={cancelDeleteOrder}>Отмена</button>
    //                                 </div>
    //                             ) : (
    //                                 <button className="delete-button" onClick={confirmDeleteOrder}>
    //                                     Удалить заказ
    //                                 </button>
    //                             )}
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         )}
    //     </div>
    // );


    return (
        <div className="order-details-page">
            {order && (
                <div className="order-details-modal">
                    <div className="modal-content">
                        <button className="order-details-page-close-button" onClick={onClose}>
                            &#10006;
                        </button>
                        <h2>Детали заказа</h2>
                        <div className="order-info">
                            <div className="client-order-info">
                                <div>
                                    <strong>ID заказа:</strong> {order._id}
                                </div>
                                <div>
                                    <strong>Имя:</strong> {order.user ? order.user?.name : order.guestInfo?.name}
                                </div>
                                <div>
                                    <strong>Клиент:</strong> {order.user ? order.user.role : 'Гость'}
                                </div>
                                <div>
                                    <strong>Адрес:</strong> {order.address ? order.address : 'Гость'}
                                </div>
                                <div>
                                    <strong>Email:</strong> {order.user ? order.user?.email : order.guestInfo?.email}
                                </div>
                                <div>
                                    <strong>Телефон №:</strong> {order.phoneNumber ? order.phoneNumber : 'Гость'}
                                </div>
                            </div>

                            <div>
                                <hr />
                                <ul>
                                    <h4 style={{ textAlign: "center" }}> Товары</h4>
                                    {order && order.products && order.products.map((item, index) => (
                                        <li key={index}>
                                            <h3>Инф. о продавце заказа</h3>
                                            <div>
                                                <strong>Наз.Компании:</strong> {item.seller?.companyName || 'Неизвестный продавец'}
                                            </div>
                                            <div>
                                                <strong>Продавец:</strong> {item.seller?.name || 'Неизвестный продавец'}
                                            </div>
                                            <div>
                                                <strong>Моб. продавца:</strong> {item.seller?.phoneNumber || 'Неизвестный продавец'}
                                            </div>
                                            <div>
                                                <strong>Эл.адрес:</strong> {item.seller?.email || 'Неизвестный продавец'}
                                            </div>
                                            <div><h3>
                                                <strong><u>Информация о товаре</u></strong>
                                            </h3></div>
                                            <div className="order-product-info">
                                                <div className="order-product-details">
                                                    <div><strong>Тип товара:</strong> {item.type}</div>
                                                    <div><strong>Наименование:</strong> {item.name}</div>
                                                    <div><strong>Количество:</strong> {item.quantity}</div>
                                                    <div><strong>Цена:</strong> {item.price}</div>
                                                    <div>
                                                        <strong>Сумма:</strong> {item.price * item.quantity} сом
                                                    </div>
                                                </div>
                                            </div>

                                            {deleteConfirmation === index ? (
                                                <div className="confirmation-dialog">
                                                    <div>Вы уверены, что хотите удалить этот товар?</div>
                                                    <div className="confirmation-dialog-buttons">
                                                        <button className="confirm-delete-button" onClick={() => { onDeleteItem(index); cancelDeleteItem(); toggleEditMode(item._id); }}>Да</button>
                                                        <button className="cancel-delete-button" onClick={() => { cancelDeleteItem(); toggleEditMode(item._id); }}>Нет</button>

                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="edit-buttons">
                                                    <button className="edit-button" onClick={() => toggleEditMode(item._id)}>Редактировать</button>
                                                </div>
                                            )}

                                            {editMode[item._id] && (
                                                <div className="edit-quantity">
                                                    <div className="edit-quantity-buttons">
                                                        <label>
                                                            Количество:
                                                            <div className="quantity-input">
                                                                <button onClick={() => decrementQuantity(index)}>-</button>
                                                                <input
                                                                    className="edit-quantity-buttons-input"
                                                                    type="number"
                                                                    value={item.quantity}
                                                                    onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                                                                    min="0"
                                                                />
                                                                <button onClick={() => incrementQuantity(index)}>+</button>
                                                                <button className="edit-quantity-buttons-delete-button" onClick={() => confirmDeleteItem(index)}>Удалить</button>
                                                            </div>
                                                        </label>
                                                    </div>

                                                    <div className="edit-quantity-add-end-delete">
                                                        <button className="save-button" onClick={() => toggleEditMode(item._id)}>Сохранить</button>
                                                    </div>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <hr />
                                <h4>Итоговая сумма: {totalAmount}</h4>
                                <div>
                                    <strong>Дата заказа:</strong> {order.date}
                                </div>
                                <div>
                                    <strong>Статус заказа:</strong> {order.status}
                                </div>
                                {orderDeleteConfirmation ? (
                                    <div className="confirmation-buttons">
                                        <div>Вы уверены, что хотите удалить этот заказ?</div>

                                        <div className="confirmation-buttons-all-order">
                                            <button className="confirmation-buttons-all-order-left" onClick={() => deleteOrder(order._id)}>Да</button>
                                            <button className="confirmation-buttons-all-order-right" onClick={cancelDeleteOrder}>Отмена</button>
                                        </div>

                                    </div>
                                ) : (
                                    <div className="details-order-edit">
                                        <button className="ok-button" onClick={onClose}>
                                            Одобренно
                                        </button>
                                        <button className="delete-button" onClick={confirmDeleteOrder}>
                                            Удалить заказ
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );







};

export default OrderDetailsPage;




