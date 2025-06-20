import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './OrderDetailsPage.css';



const OrderDetailsPage = ({ orders = [], setOrders, setShowSidebar }) => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [editMode, setEditMode] = useState({});
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const [orderDeleteConfirmation, setOrderDeleteConfirmation] = useState(false);
    const [sellerInfo, setSellerInfo] = useState(null);

    const history = useHistory();

    useEffect(() => {
        const fetchSellerInfo = async (sellerId) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/${sellerId}`);
                if (response.ok) {
                    const data = await response.json();
                    setSellerInfo(data);
                } else {
                    console.error('Failed to fetch seller info');
                }
            } catch (error) {
                console.error('Error fetching seller info:', error);
            }
        };

        const fetchOrder = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`);
                const data = await response.json();
                setOrder(data);
                setTotalAmount(data.totalAmount);

                // Проверяем, является ли клиент продавцом
                if (data.seller) {
                    fetchSellerInfo(data.seller);
                } else {
                    setSellerInfo(null);
                }
            } catch (error) {
                console.error('Error fetching order:', error);
            }
        };

        if (Array.isArray(orders)) {
            const currentOrder = orders.find(order => order._id === orderId);
            if (currentOrder) {
                setOrder(currentOrder);
                setTotalAmount(currentOrder.totalAmount);
                if (currentOrder.seller) {
                    fetchSellerInfo(currentOrder.seller);
                } else {
                    setSellerInfo(null);
                }
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

// Обновим функцию updateQuantity для обработки ошибок недостатка товаров
    const updateQuantity = async (productIndex, newQuantity) => {
        if (newQuantity < 0) {
            alert('Нельзя установить отрицательное количество товара');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/update-product-quantity/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ productIndex, quantity: newQuantity }),
            });

            if (!response.ok) {
                const result = await response.json();
                if (result.message === 'Insufficient product quantity') {
                    alert(`Недостаточно товара на складе. Доступно: ${result.available}`);
                    return;
                }
                throw new Error(result.message || 'Failed to update quantity');
            }

            const updatedOrder = await response.json();
            setOrder(updatedOrder);
            setTotalAmount(calculateTotalAmountLocally(updatedOrder.products));

            if (Array.isArray(orders)) {
                const updatedOrders = orders.map((order) =>
                    order._id === orderId ? updatedOrder : order
                );
                setOrders(updatedOrders);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
            alert(`Ошибка при обновлении количества: ${error.message}`);
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
                body: JSON.stringify({ productIndex }),
            });

            const result = await response.json();

            if (response.ok) {
                if (result.message === 'Order deleted as it has no products left') {
                    // Обработка удаления всего заказа
                    setOrder(null);
                    setTotalAmount(0);
                    if (Array.isArray(orders)) {
                        const updatedOrders = orders.filter((order) => order._id !== orderId);
                        setOrders(updatedOrders);
                    }
                    alert('Заказ удалён, так как в нём не осталось товаров');
                    history.goBack();
                    return;
                }

                // Обновляем локальное состояние
                const updatedOrder = { ...order };
                const removedProduct = updatedOrder.products[productIndex];
                updatedOrder.products.splice(productIndex, 1);
                updatedOrder.totalAmount = calculateTotalAmountLocally(updatedOrder.products);

                setOrder(updatedOrder);
                setTotalAmount(updatedOrder.totalAmount);

                if (Array.isArray(orders)) {
                    const updatedOrders = orders.map((order) =>
                        order._id === orderId ? updatedOrder : order
                    );
                    setOrders(updatedOrders);
                }

                setDeleteConfirmation(null);
                setEditMode({});

                // Показываем уведомление о возврате товара
                alert(`Товар "${removedProduct.name}" (${removedProduct.quantity} шт.) возвращён на склад`);
            } else {
                console.error('Failed to delete item:', result);
                alert('Ошибка при удалении товара: ' + (result.message || 'Неизвестная ошибка'));
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Ошибка при удалении товара: ' + error.message);
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

    console.log("sellerInfo", sellerInfo)

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
                                    <strong>Имя:{" "} </strong>
                                    {order.user ? order.user.name : order.guestInfo ? order.guestInfo.name : sellerInfo?.name || 'Неизвестно'}
                                </div>
                                <div>
                                    <strong>Клиент:{" "} </strong>
                                    {order.user ? order.user.role : sellerInfo?.role || 'Гость'}
                                </div>
                                <div>
                                    <strong>Адрес:{" "}</strong>
                                    {order.address || 'Не указан'}
                                </div>
                                <div>
                                    <strong>Email:{" "}</strong>
                                    {order.user ? order.user.email : order.guestInfo ? order.guestInfo.email : sellerInfo?.email || 'Неизвестно'}
                                </div>
                                <div>
                                    <strong>Телефон:{" "}</strong>
                                    {order.phoneNumber || 'Не указан'}
                                </div>
                            </div>


                            <div>
                                <hr />
                                <ul className="ul-order-details-page">
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

                                            <div className="confirmation-dialog-edit-buttons">
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
                                            </div>

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
                               <div className="footer-output">

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
                </div>
            )}
        </div>
    );

};

export default OrderDetailsPage;




