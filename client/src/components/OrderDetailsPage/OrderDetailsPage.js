

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const OrderDetailsPage = ({ orders, setOrders }) => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const currentOrder = orders.find(order => order._id === orderId);
        setOrder(currentOrder);
        setTotalAmount(currentOrder ? currentOrder.totalAmount : 0);
    }, [orders, orderId]);

    const history = useHistory();

    const onClose = () => {
        history.goBack();
    };

    const updateQuantity = async (productId, newQuantity) => {
        // Проверяем, что новое количество не меньше 0
        if (newQuantity < 0) {
            console.error('Нельзя установить отрицательное количество товара');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/update-quantity/${orderId}/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: newQuantity }),
            });
            if (response.ok) {
                const updatedOrder = { ...order };
                const updatedProducts = updatedOrder.products.map(item => {
                    if (item.product._id === productId) {
                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                });
                updatedOrder.products = updatedProducts;
                updatedOrder.totalAmount = calculateTotalAmountLocally(updatedProducts);
                setOrder(updatedOrder);

                const updatedOrders = orders.map((order) => {
                    if (order._id === orderId) {
                        return updatedOrder;
                    }
                    return order;
                });
                setOrders(updatedOrders);
            } else {
                console.error('Failed to update quantity');
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const onDeleteItem = async (productId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/delete-item/${orderId}/${productId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const updatedOrder = { ...order };
                updatedOrder.products = updatedOrder.products.filter((item) => item.product._id !== productId);
                updatedOrder.totalAmount = calculateTotalAmountLocally(updatedOrder.products);
                setOrder(updatedOrder);


                const updatedOrders = orders.map((order) => {
                    if (order._id === orderId) {
                        return updatedOrder;
                    }
                    return order;
                });
                setOrders(updatedOrders);

                // Проверяем, остались ли еще товары в заказе
                if (updatedOrder.products.length === 0) {
                    // Если нет, то удаляем заказ из базы данных
                    await deleteOrder(orderId);
                }

                // Проверяем, остались ли еще товары в заказе
                if (updatedOrder.products.length === 0) {
                    // Если нет, то удаляем заказ из базы данных
                    await deleteOrder(orderId);
                    // Переходим на предыдущую страницу
                    history.goBack();
                }
            } else {
                console.error('Failed to delete item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // Успешно удалено
                console.log('Order deleted successfully');
            } else {
                console.error('Failed to delete order');
            }
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };


    const calculateTotalAmountLocally = (products) => {
        let sum = 0;
        for (const item of products) {
            sum += item.product.price * item.quantity;
        }
        return sum;
    };

    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        fetchSellers();
    }, []);

    const fetchSellers = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers`);
            const data = await response.json();
            setSellers(data);
        } catch (error) {
            console.error('Error fetching sellers:', error);
        }
    };


    const getSellerInfo = (product) => {
        const seller = sellers.find((seller) => seller.products.includes(product._id));
        return seller
            ? { name: seller.name, email: seller.email, phoneNumber: seller.phoneNumber }
            : { name: 'Неизвестный продавец', email: '-', phoneNumber: '-' };
    };


    return (
        <div className="order-details-page">
            {order && (
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

                                           <h3> <span>{index + 1})</span> Инф. о продавце заказа</h3>

                                            {/* Другие детали товара */}
                                            <div>
                                                <strong>Продавец:</strong> {getSellerInfo(item.product).name}
                                            </div>
                                            <div>
                                                <strong>Email продавца:</strong> {getSellerInfo(item.product).email}
                                            </div>
                                            <div>
                                                <strong>Номер телефона продавца:</strong> {getSellerInfo(item.product).phoneNumber}
                                            </div>
                                            <hr />
                                            {item.product && (

                                                <div>
                                                    <strong>
                                                        Тип товара:
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
                                            <div className="quantityItem">
                                                <strong>Количество:</strong> {item.quantity}
                                                <div className="quantityButtons">
                                                    <button className="minusQuantityButton" onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>-</button>
                                                    <button className="plusQuantityButton"  onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>+</button>
                                                </div>
                                                <button className="deleteOneItemOrder" onClick={() => onDeleteItem(item.product._id)}>Удалить</button>
                                            </div>
                                            {item.product && (
                                                <div>
                                                    <strong>Цена за единицу: {item.product.price}</strong> KGS
                                                </div>
                                            )}
                                            <hr />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <strong>Общая сумма заказа: {totalAmount}</strong> KGS
                                {/*<strong>Общая сумма заказа:</strong> {totalAmount.toFixed(2)} KGS*/}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDetailsPage;
