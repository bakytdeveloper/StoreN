
// src/components/Admin/OrderList.js
import React, { useState, useEffect } from 'react';
import './OrderList.css';
import OrderItem from "./OrderItem"; // Подключение стилей
import OrderDetailsModal from './OrderDetailsModal'; // Создайте компонент для отображения деталей заказа
import './OrderList.css';
import {useHistory} from "react-router-dom";

// const OrderList = ({ setShowSidebar }) => {
//     const [orders, setOrders] = useState([]);
//     const [selectedOrder, setSelectedOrder] = useState(null);
//     const history = useHistory();
//
//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/`);
//                 const data = await response.json();
//                 setOrders(data);
//             } catch (error) {
//                 console.error('Fetch error:', error);
//             }
//         };
//
//         fetchOrders();
//     }, []);
//
//
//     const updateStatus = async (orderId, newStatus) => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/update-status/${orderId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ status: newStatus }),
//             });
//
//             if (response.ok) {
//                 const updatedOrders = orders.map((order) => {
//                     if (order._id === orderId) {
//                         return { ...order, status: newStatus, statusHistory: [...order.statusHistory, { status: newStatus, time: Date.now() }] };
//                     }
//                     return order;
//                 });
//
//                 setOrders(updatedOrders);
//             } else {
//                 console.error('Failed to update status');
//             }
//         } catch (error) {
//             console.error('Error updating status:', error);
//         }
//     };
//
//     const updateCommentsAdmin = async (orderId, commentsAdmin) => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/update-comments-admin/${orderId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ commentsAdmin }),
//             });
//
//             if (response.ok) {
//                 const updatedOrders = orders.map((order) => {
//                     if (order._id === orderId) {
//                         return { ...order, commentsAdmin };
//                     }
//                     return order;
//                 });
//
//                 setOrders(updatedOrders);
//             } else {
//                 console.error('Failed to update comments admin');
//             }
//         } catch (error) {
//             console.error('Error updating comments admin:', error);
//         }
//     };
//
//     const handleOrderClick = (orderId) => {
//         history.push(`/order/${orderId}`);
//     };
//
//
//     const handleCloseModal = () => {
//         setSelectedOrder(null);
//     };
//
//     // Обновление состояния showSidebar на странице логина и регистрации
//     useEffect(() => {
//         setShowSidebar(true);
//         // Возвращаем функцию для очистки (аналог componentWillUnmount)
//         return () => {
//             setShowSidebar(true); // Восстановим значение при размонтировании компонента
//         };
//     }, [setShowSidebar]);
//
//     const handleClose = () => {
//         // history.push('/');
//         history.goBack(); // Переход на предыдущую страницу
//     };
//
//
//     return (
//         <div className="order">
//             <h2>Список заказов</h2>
//             <span className="sellersListClose" type="button" onClick={handleClose}>
//                <span> &#10006;</span>
//             </span>
//             <table>
//                 <thead>
//                 <tr>
//                     <th>Номер заказа</th>
//                     <th>Клиент</th>
//                     <th>Имя</th>
//                     <th>Email</th>
//                     <th>Адрес</th>
//                     <th>№ Тел</th>
//                     <th>Способ опл</th>
//                     <th>Комментарии</th>
//                     <th>Товары</th>
//                     <th>Дата заказа</th>
//                     <th>Статус</th>
//                     <th>Время изменения статуса</th>
//                     <th>Сумма</th>
//                     <th>Комент админа</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {orders.slice().reverse().map((order, index) => (
//                     <React.Fragment key={order._id}>
//                         <tr>
//                             <td>{index + 1}</td>
//                             <td onClick={() => handleOrderClick(order._id)}>{order.user ? order.user.role : 'Гость'}</td>
//                             <td onClick={() => handleOrderClick(order._id)}>
//                                 {order.user ? order.user.name : (order.guestInfo ? order.guestInfo.name : '-')}
//                             </td>
//                             <td onClick={() => handleOrderClick(order._id)}>
//                                 {order.user ? order.user.email : (order.guestInfo ? order.guestInfo.email : '-')}
//                             </td>
//                             <td onClick={() => handleOrderClick(order._id)}>{order.address ? order.address : '-'}</td>
//                             <td onClick={() => handleOrderClick(order._id)}>{order.phoneNumber ? order.phoneNumber : '-'}</td>
//                             <td onClick={() => handleOrderClick(order._id)}>
//                                 {order.user ? order.paymentMethod : (order.paymentMethod ? order.paymentMethod : order.paymentMethod)}
//                             </td>
//                             <td>
//                                     <textarea
//                                         style={{ boxSizing: "border-box", fontSize: "12px" }}
//                                         defaultValue={order.comments ? order.comments : '-'}
//                                     ></textarea>
//                             </td>
//                             <td className="orderDetailOneClient" onClick={() => handleOrderClick(order._id)}>
//                                 {order.products.map((item) => (
//                                     <span key={item.product?._id}>
//                                             {item.product?.type}: {item.quantity}шт; <br />
//                                         </span>
//                                 ))}
//                             </td>
//                             <td onClick={() => handleOrderClick(order._id)}>{new Date(order.date).toLocaleString()}</td>
//                             <td>
//                                 <OrderItem key={order._id} order={order} onUpdateStatus={updateStatus} />
//                             </td>
//                             <td>
//                                 {order.statusHistory && order.statusHistory.length > 0
//                                     ? new Date(order.statusHistory[order.statusHistory.length - 1].time).toLocaleString()
//                                     : '-'}
//                             </td>
//                             <td onClick={() => handleOrderClick(order._id)}>{order.totalAmount.toFixed(2)} KGS</td>
//                             <td>
//                                     <textarea
//                                         style={{ boxSizing: "border-box", fontSize: "12px" }}
//                                         defaultValue={order.commentsAdmin ? order.commentsAdmin : ''}
//                                         onBlur={(e) => updateCommentsAdmin(order._id, e.target.value)}
//                                     ></textarea>
//                             </td>
//                         </tr>
//                     </React.Fragment>
//                 ))}
//                 </tbody>
//             </table>
//             {selectedOrder && (
//                 <OrderDetailsModal order={selectedOrder} onClose={handleCloseModal} />
//             )}
//         </div>
//     );
//
// };
//
// export default OrderList;



const OrderList = ({ setShowSidebar }) => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const history = useHistory();


    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20); // Установите количество заказов на странице

    useEffect(() => {
        const token = localStorage.getItem('token');
        const isAdmin = localStorage.getItem('role') === 'admin';
        if (!token || token !== "adminToken" || !isAdmin) {
            history.push('/login'); // Перенаправление на страницу входа, если нет токена или пользователь не администратор
        }
    }, [history]);

    // useEffect(() => {

        const fetchOrders = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/?page=${page}&perPage=${perPage}`);
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

    //     fetchOrders();
    // }, []);



    useEffect(() => {
        fetchOrders();
    }, [page, perPage]);

    const getOrderNumber = (index) => {
        return (page - 1) * perPage + index + 1;
    };

    // const sortedOrders = orders.slice().sort((a, b) => new Date(b.date) - new Date(a.date));



    const updateStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/update-status/${orderId}`, {
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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/update-comments-admin/${orderId}`, {
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

    const handleOrderClick = (orderId) => {
        history.push(`/order/${orderId}`);
        window.location.reload(); // Перезагрузка страницы

    };


    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    // Обновление состояния showSidebar на странице логина и регистрации
    useEffect(() => {
        setShowSidebar(true);
        // Возвращаем функцию для очистки (аналог componentWillUnmount)
        return () => {
            setShowSidebar(true); // Восстановим значение при размонтировании компонента
        };
    }, [setShowSidebar]);

    const handleClose = () => {
        // history.push('/');
        history.goBack(); // Переход на предыдущую страницу
    };

    const sortedOrders = orders.slice().sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className="order">
            <h2>Список заказов</h2>
            <span className="sellersListClose" type="button" onClick={handleClose}>
               <span> &#10006;</span>
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

                {orders.map((order, index) => (
                // {orders.slice().reverse().map((order, index) => (
                    <tr key={order._id}>
                        <td>{getOrderNumber(index)}</td>
                        <td onClick={() => handleOrderClick(order._id)}>{order.user ? order.user.role : 'Гость'}</td>
                        <td onClick={() => handleOrderClick(order._id)}>
                            {order.user ? order.user.name : (order.guestInfo ? order.guestInfo.name : '-')}
                        </td>
                        <td onClick={() => handleOrderClick(order._id)}>
                            {order.user ? order.user.email : (order.guestInfo ? order.guestInfo.email : '-')}
                        </td>
                        <td onClick={() => handleOrderClick(order._id)}>{order.address ? order.address : '-'}</td>
                        <td onClick={() => handleOrderClick(order._id)}>{order.phoneNumber ? order.phoneNumber : '-'}</td>
                        <td onClick={() => handleOrderClick(order._id)}>
                            {order.user ? order.paymentMethod : (order.paymentMethod ? order.paymentMethod : order.paymentMethod)}
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
                                        {item.product?.type}: {item.quantity}шт; <br />
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
            {selectedOrder && (
                <OrderDetailsModal order={selectedOrder} onClose={handleCloseModal} />
            )}

            <div  className="pagination-order-admin">
                <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))} disabled={page === 1}>Prev</button>
                <span>Страница {page}</span>
                <button onClick={() => setPage(prevPage => prevPage + 1)} disabled={orders.length < perPage}>Next</button>
            </div>
        </div>
    );

};

export default OrderList;
