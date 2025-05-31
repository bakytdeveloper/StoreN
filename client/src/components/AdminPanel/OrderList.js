import React, { useState, useEffect } from 'react';
import './OrderList.css';
import OrderItem from "./OrderItem"; // Подключение стилей
import {useHistory} from "react-router-dom";

const OrderList = ({ setShowSidebar }) => {
    const [orders, setOrders] = useState([]);
    // eslint-disable-next-line
    const [selectedOrder, setSelectedOrder] = useState(null);
    const history = useHistory();
    const [page, setPage] = useState(1);
    // eslint-disable-next-line
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

    const getUserRole = (order) => {
        if (order.seller) {
            return 'Продавец';
        }
        if (order.user) {
            switch(order.user.role) {
                case 'customer': return 'Клиент';
                case 'guest': return 'Гость';
                case 'admin': return 'Админ';
                default: return order.user.role || 'Клиент';
            }
        }
        return 'Гость';
    };


    useEffect(() => {
        fetchOrders();
        // eslint-disable-next-line
    }, [page, perPage]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token || role !== 'admin') {
            history.push('/');
            return;
        }

        fetchOrders(token);
        // eslint-disable-next-line
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
        <div className="order-list-container">
            <div className="order-list-header">
                <h2 className="order-list-title">Список заказов</h2>
                <button
                    className="order-list-close"
                    type="button"
                    onClick={handleClose}
                    aria-label="Закрыть"
                >
                    &#10006;
                </button>
            </div>

            <div className="table-responsive">
                <table className="order-list-table">
                    <thead>
                    <tr>
                        <th className="col-number">№</th>
                        <th className="col-role">Клиент</th>
                        <th className="col-name">Имя</th>
                        <th className="col-email">Email</th>
                        <th className="col-address">Адрес</th>
                        <th className="col-phone">№Тел</th>
                        <th className="col-payment">Способ опл</th>
                        <th className="col-comments">Комментарии</th>
                        <th className="col-products">Товары</th>
                        <th className="col-date">Дата заказа</th>
                        <th className="col-status">Статус</th>
                        <th className="col-status-time">Время изменения статуса</th>
                        <th className="col-amount">Сумма</th>
                        <th className="col-admin-comments">Комент админа</th>
                    </tr>
                    </thead>

                    <tbody>
                    {sortedOrders.reverse().map((order, index) => (
                        <tr key={order._id} className="order-row">
                            <td className="col-number">{getOrderNumber(index)}</td>
                            <td className="col-role" onClick={() => handleOrderClick(order._id)}>
                                {getUserRole(order)}
                            </td>
                            <td className="col-name" onClick={() => handleOrderClick(order._id)}>
                                {order.user ? order.user.name : (order.sellerData ? order.sellerData.name : (order.guestInfo ? order.guestInfo.name : '-'))}
                            </td>
                            <td className="col-email" onClick={() => handleOrderClick(order._id)}>
                                {order.user ? order.user.email : (order.sellerData ? order.sellerData.email : (order.guestInfo ? order.guestInfo.email : '-'))}
                            </td>
                            <td className="col-address" onClick={() => handleOrderClick(order._id)}>{order.address ? order.address : '-'}</td>
                            <td className="col-phone" onClick={() => handleOrderClick(order._id)}>{order.phoneNumber ? order.phoneNumber : '-'}</td>
                            <td className="col-payment" onClick={() => handleOrderClick(order._id)}>
                                {order.paymentMethod ? order.paymentMethod : '-'}
                            </td>
                            <td className="col-comments">
                            <textarea
                                className="order-comment-textarea"
                                defaultValue={order.comments ? order.comments : '-'}
                            ></textarea>
                            </td>
                            <td className="col-products order-detail" onClick={() => handleOrderClick(order._id)}>
                                {order.products.map((item, itemIndex) => (
                                    <span key={itemIndex}>
                                    {item.product?.type || item.type}: {item.quantity}шт; <br />
                                </span>
                                ))}
                            </td>
                            <td className="col-date" onClick={() => handleOrderClick(order._id)}>{new Date(order.date).toLocaleString()}</td>
                            <td className="col-status">
                                <OrderItem key={order._id} order={order} onUpdateStatus={updateStatus} />
                            </td>
                            <td className="col-status-time">
                                {order.statusHistory && order.statusHistory.length > 0
                                    ? new Date(order.statusHistory[order.statusHistory.length - 1].time).toLocaleString()
                                    : '-'}
                            </td>
                            <td className="col-amount" onClick={() => handleOrderClick(order._id)}>{order.totalAmount.toFixed(2)} KGS</td>
                            <td className="col-admin-comments">
                            <textarea
                                className="admin-comment-textarea"
                                defaultValue={order.commentsAdmin ? order.commentsAdmin : ''}
                                onBlur={(e) => updateCommentsAdmin(order._id, e.target.value)}
                            ></textarea>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination-order-admin">
                <button
                    className="pagination-button"
                    onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
                    disabled={page === 1}
                >
                    Назад
                </button>
                <span className="pagination-page">Страница {page}</span>
                <button
                    className="pagination-button"
                    onClick={() => setPage(prevPage => prevPage + 1)}
                    disabled={orders.length < perPage}
                >
                    Вперёд
                </button>
            </div>
        </div>
    );
};

export default OrderList;






