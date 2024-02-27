


// src/components/Admin/OrderList.js
import React, { useState, useEffect } from 'react';
import './OrderList.css';
import OrderItem from "./OrderItem"; // Подключение стилей
import OrderDetailsModal from './OrderDetailsModal'; // Создайте компонент для отображения деталей заказа
import './OrderList.css';

const OrderList = ({ setShowSidebar }) => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5005/api/orders/orders');
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchOrders();
    }, []);

    const updateStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5005/api/orders/update-status/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                const updatedOrders = orders.map((order) => {
                    if (order._id === orderId) {
                        return { ...order, status: newStatus, statusHistory: [...order.statusHistory, { status: newStatus, time: Date.now() }] };
                    }
                    return order;
                });

                setOrders(updatedOrders);
            } else {
                console.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const updateCommentsAdmin = async (orderId, commentsAdmin) => {
        try {
            const response = await fetch(`http://localhost:5005/api/orders/update-comments-admin/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ commentsAdmin }),
            });

            if (response.ok) {
                const updatedOrders = orders.map((order) => {
                    if (order._id === orderId) {
                        return { ...order, commentsAdmin };
                    }
                    return order;
                });

                setOrders(updatedOrders);
            } else {
                console.error('Failed to update comments admin');
            }
        } catch (error) {
            console.error('Error updating comments admin:', error);
        }
    };

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    // Обновление состояния showSidebar на странице логина и регистрации
    useEffect(() => {
        setShowSidebar(true);
        // Возвращаем функцию для очистки (аналог componentWillUnmount)
        return () => {
            setShowSidebar(false); // Восстановим значение при размонтировании компонента
        };
    }, [setShowSidebar]);


    return (
        <div className="order">
            <h2>Список заказов</h2>
            <table>
                <thead>
                <tr>
                    <th>Номер заказа</th>
                    <th>Клиент</th>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Адрес</th>
                    <th>№ Тел</th>
                    <th>Способ опл</th>
                    <th>Комментарии</th>
                    <th>Товары</th>
                    <th>Дата заказа</th>

                    <th>Статус</th>
                    <th>Время изменения статуса</th>
                    <th>Сумма</th>
                    <th>Комент админа</th>
                </tr>
                </thead>
                <tbody>
                {orders.slice().reverse().map((order, index) => (
                    <tr key={order._id} >
                        <td  onClick={() => handleOrderClick(order)}>{index + 1}</td>
                        <td onClick={() => handleOrderClick(order)}>{order.user ? order.user.role : 'Гость'}</td>
                        <td onClick={() => handleOrderClick(order)}>
                            {order.user ? order.user.name : (order.guestInfo ? order.guestInfo.name : '-')}
                        </td>
                        <td onClick={() => handleOrderClick(order)}>
                            {order.user ? order.user.email : (order.guestInfo ? order.guestInfo.email : '-')}
                        </td>
                        <td  onClick={() => handleOrderClick(order)}>{order.address ? order.address : '-'}</td>
                        <td  onClick={() => handleOrderClick(order)}>{order.phoneNumber ? order.phoneNumber : '-'}</td>
                        <td onClick={() => handleOrderClick(order)}> order.paymentMethod
                            {/*{order.user ? order.paymentMethod : (order.paymentMethod ? order.paymentMethod : order.paymentMethod)}*/}
                        </td>
                        <td>
                                <textarea
                                    style={{ boxSizing: "border-box", fontSize: "12px" }}
                                    defaultValue={order.comments ? order.comments : '-'}
                                ></textarea>
                        </td>
                        <td>
                            {order.products.map((item) => (
                                <span key={item.product?._id}>
                                    {item.product?.type}: {item.quantity}шт; <br />
                                </span>
                            ))}


                            {/*{order.products.map((item) => (*/}
                            {/*    <span key={item.product._id}>*/}
                            {/*            {item.product.type}: {item.quantity}шт; <br />*/}
                            {/*        </span>*/}
                            {/*))}*/}
                        </td>
                        <td>{new Date(order.date).toLocaleString()}</td>
                       <OrderItem key={order._id} order={order} onUpdateStatus={updateStatus} />

                        <td>
                            {order.statusHistory && order.statusHistory.length > 0
                                ? new Date(order.statusHistory[order.statusHistory.length - 1].time).toLocaleString()
                                : '-'}
                        </td>

                        <td  onClick={() => handleOrderClick(order)}>{order.totalAmount.toFixed(2)} KGS</td>


                        <td>
                                <textarea
                                    style={{ boxSizing: "border-box", fontSize: "12px" }}
                                    defaultValue={order.commentsAdmin ? order.commentsAdmin : ''}
                                    onBlur={(e) => updateCommentsAdmin(order._id, e.target.value)}
                                ></textarea>
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
            {selectedOrder && (
                <OrderDetailsModal order={selectedOrder} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default OrderList;
