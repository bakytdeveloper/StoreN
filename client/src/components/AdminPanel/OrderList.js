
// src/components/Admin/OrderList.js
import React, { useState, useEffect } from 'react';
import './OrderList.css';
import OrderItem from "./OrderItem"; // Подключение стилей
// import OrderDetailsModal from './OrderDetailsModal'; // Создайте компонент для отображения деталей заказа
import {useHistory} from "react-router-dom";

const OrderList = ({ setShowSidebar }) => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const history = useHistory();
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20);

    const fetchOrders = async (token) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/?page=${page}&perPage=${perPage}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (Array.isArray(data)) {
                // Получаем данные о продавцах для заказов, где есть продавец
                const ordersWithSellers = await Promise.all(data.map(async (order) => {
                    if (order.seller) {
                        const sellerData = await fetchSellerData(order.seller, token);
                        return { ...order, sellerData };
                    }
                    return order;
                }));
                setOrders(ordersWithSellers);
            } else {
                console.error('Expected an array but received:', data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };


    useEffect(() => {
        fetchOrders();
    }, [page, perPage]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token || role !== 'admin') {
            history.push('/');
            return;
        }

        fetchOrders(token);
    }, [history, page, perPage]);

    const getOrderNumber = (index) => {
        return (page - 1) * perPage + index + 1;
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/update-status/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/update-comments-admin/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
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


    const handleOrderClick = (orderId) => {
        history.push(`/order/${orderId}`);
        // window.location.reload();
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    useEffect(() => {
        setShowSidebar(true);
        return () => {
            setShowSidebar(true);
        };
    }, [setShowSidebar]);

    const handleClose = () => {
        history.goBack();
    };

    const fetchSellerData = async (sellerId, token) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/${sellerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const sellerData = await response.json();
            return sellerData;
        } catch (error) {
            console.error('Error fetching seller data:', error);
            return null;
        }
    };


    const sortedOrders = Array.isArray(orders) ? orders.slice().sort((a, b) => new Date(a.date) - new Date(b.date)) : [];

    return (
        <div className="order">
            <h2>Список заказов</h2>
            <span
                className="sellersListClose"
                type="button" onClick={handleClose}>
                &#10006;
            </span>
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
                {sortedOrders.reverse().map((order, index) => (
                    <tr key={order._id}>
                        <td style={{ textAlign: 'center' }}>{getOrderNumber(index)}</td>
                        <td onClick={() => handleOrderClick(order._id)}>
                            {order.user ? order.user.role : order.sellerData ? 'Продавец' : 'Гость'}
                        </td>
                        <td onClick={() => handleOrderClick(order._id)}>
                            {order.user ? order.user.name : (order.sellerData ? order.sellerData.name : (order.guestInfo ? order.guestInfo.name : '-'))}
                        </td>
                        <td onClick={() => handleOrderClick(order._id)}>
                            {order.user ? order.user.email : (order.sellerData ? order.sellerData.email : (order.guestInfo ? order.guestInfo.email : '-'))}
                        </td>
                        <td onClick={() => handleOrderClick(order._id)}>{order.address ? order.address : '-'}</td>
                        <td onClick={() => handleOrderClick(order._id)}>{order.phoneNumber ? order.phoneNumber : '-'}</td>
                        <td onClick={() => handleOrderClick(order._id)}>
                            {order.paymentMethod ? order.paymentMethod : '-'}
                        </td>
                        <td>
                <textarea
                    style={{ boxSizing: "border-box", fontSize: "12px" }}
                    defaultValue={order.comments ? order.comments : '-'}
                ></textarea>
                        </td>
                        <td className="orderDetailOneClient" onClick={() => handleOrderClick(order._id)}>
                            {order.products.map((item, itemIndex) => (
                                <span key={itemIndex}>
                        {item.product?.type || item.type}: {item.quantity}шт; <br />
                    </span>
                            ))}
                        </td>
                        <td onClick={() => handleOrderClick(order._id)}>{new Date(order.date).toLocaleString()}</td>
                        <td>
                            <OrderItem key={order._id} order={order} onUpdateStatus={updateStatus} />
                        </td>
                        <td>
                            {order.statusHistory && order.statusHistory.length > 0
                                ? new Date(order.statusHistory[order.statusHistory.length - 1].time).toLocaleString()
                                : '-'}
                        </td>
                        <td onClick={() => handleOrderClick(order._id)}>{order.totalAmount.toFixed(2)} KGS</td>
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
            <div className="pagination-order-admin">
                <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))} disabled={page === 1}>Prev</button>
                <span>Страница {page}</span>
                <button onClick={() => setPage(prevPage => prevPage + 1)} disabled={orders.length < perPage}>Next</button>
            </div>
        </div>
    );
};

export default OrderList;






