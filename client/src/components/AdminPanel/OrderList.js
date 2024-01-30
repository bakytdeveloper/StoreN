// // src/components/Admin/OrderList.js
// import React, { useState, useEffect } from 'react';
//
// const OrderList = () => {
//     const [orders, setOrders] = useState([]);
//
//     useEffect(() => {
//         // Функция для получения списка заказов с бэкенда
//         const fetchOrders = async () => {
//             try {
//                 const response = await fetch('http://localhost:5500/api/orders/orders');
//                 const data = await response.json();
//                 setOrders(data);
//             } catch (error) {
//                 console.error('Fetch error:', error);
//             }
//         };
//
//         // Вызываем функцию для получения списка заказов
//         fetchOrders();
//     }, []);
//
//     return (
//         <div>
//             <h2>Список заказов</h2>
//             <table>
//                 <thead>
//                 <tr>
//                     <th>ID</th>
//                     <th>Пользователь</th>
//                     <th>Продукты</th>
//                     <th>Сумма</th>
//                     <th>Статус</th>
//                     <th>Дата</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {orders.map((order) => (
//                     <tr key={order._id}>
//                         <td>{order._id}</td>
//                         <td>{order.user ? order.user.name : 'Гость'}</td>
//                         <td>
//                             {order.cart.map((item) => (
//                                 <p key={item.product._id}>
//                                     {item.product.name} (Количество: {item.quantity})
//                                 </p>
//                             ))}
//                         </td>
//                         <td>{order.totalAmount.toFixed(2)} KGS</td>
//                         <td>{order.status}</td>
//                         <td>{new Date(order.date).toLocaleString()}</td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };
//
// export default OrderList;








// src/components/Admin/OrderList.js
import React, { useState, useEffect } from 'react';
import './OrderList.css';
import OrderItem from "./OrderItem"; // Подключение стилей

// const OrderList = () => {
//     const [orders, setOrders] = useState([]);
//
//
//     useEffect(() => {
//         // Функция для получения списка заказов с бэкенда
//         const fetchOrders = async () => {
//             try {
//                 const response = await fetch('http://localhost:5500/api/orders/orders');
//                 const data = await response.json();
//                 setOrders(data);
//             } catch (error) {
//                 console.error('Fetch error:', error);
//             }
//         };
//
//         // Вызываем функцию для получения списка заказов
//         fetchOrders();
//     }, []);
//
//
//     const updateStatus = async (orderId, newStatus) => {
//         try {
//             const response = await fetch(`http://localhost:5500/api/orders/update-status/${orderId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     status: newStatus,
//                 }),
//             });
//
//             if (response.ok) {
//                 // Обновляем локальный список заказов после успешного обновления на сервере
//                 const updatedOrders = orders.map((order) =>
//                     order._id === orderId ? { ...order, status: newStatus } : order
//                 );
//                 setOrders(updatedOrders);
//             } else {
//                 console.error('Error updating status:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error updating status:', error);
//         }
//     };
//
//
//     return (
//         <div className="order">
//             <h2>Список заказов</h2>
//             <table>
//                 <thead>
//                 <tr>
//                     <th>ID</th>
//                     <th>Клиент</th>
//                     <th>Имя</th>
//                     {/*<th>Фамилия Фамилия</th>*/}
//                     <th>Email</th>
//                     <th>Адрес</th>
//                     <th>№ Тел</th>
//                     <th>Способ опл</th>
//                     <th>Комментарии</th>
//                     <th>Товары</th>
//                     <th>Сумма</th>
//                     <th>Статус</th>
//                     <th>Дата</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {orders.map((order) => (
//                     <tr key={order._id}>
//                         <td>{order._id}</td>
//                         <td>{order.user ? order.user.role : 'Гость'}</td>
//                         <td>{order.user ? order.user.name : '-'}</td>
//                         {/*<td>{order.guestInfo ? order.guestInfo.lastName : '-'}</td>*/}
//                         <td>{order.user ? order.user.email : '-'}</td>
//                         <td>{order.address ? order.address : '-'}</td>
//                         <td>{order.phoneNumber ? order.phoneNumber : '-'}</td>
//                         <td>{order.user ? order.paymentMethod : '-'}</td>
//                         <td>
//                             <textarea style={{boxSizing: "border-box", fontSize: "12px"}}
//                                       defaultValue={order.comments ? order.comments : '-'}>
//
//                             </textarea>
//                         </td>
//
//                         {/*<td><textarea>{order.comments ? order.comments : '-'}</textarea></td>*/}
//                         <td>
//                             {order.products.map((item) => (
//                                 <span key={item.product._id}>
//                                     {item.product.type}: {item.quantity}шт; <br/>
//                                 </span>
//                             ))}
//                         </td>
//                         <td>{order.totalAmount.toFixed(2)} KGS</td>
//                         <td>
//                             <OrderItem key={order._id} order={order} onUpdateStatus={updateStatus} />
//                         </td>
//                         <td>{new Date(order.date).toLocaleString()}</td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };
//
// export default OrderList;





const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5500/api/orders/orders');
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
            const response = await fetch(`http://localhost:5500/api/orders/update-status/${orderId}`, {
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
                    <th>Сумма</th>
                    <th>Статус</th>
                    <th>Дата изменения статуса</th>
                    <th>Дата создания заказа</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) => (
                    <tr key={order._id}>
                        <td>{index + 1}</td>
                        <td>{order.user ? order.user.role : 'Гость'}</td>
                        <td>{order.user ? order.user.name : '-'}</td>
                        <td>{order.user ? order.user.email : '-'}</td>
                        <td>{order.address ? order.address : '-'}</td>
                        <td>{order.phoneNumber ? order.phoneNumber : '-'}</td>
                        <td>{order.user ? order.paymentMethod : '-'}</td>
                        <td>
                                <textarea
                                    style={{ boxSizing: "border-box", fontSize: "12px" }}
                                    defaultValue={order.comments ? order.comments : '-'}
                                ></textarea>
                        </td>
                        <td>
                            {order.products.map((item) => (
                                <span key={item.product._id}>
                                        {item.product.type}: {item.quantity}шт; <br />
                                    </span>
                            ))}
                        </td>
                        <td>{order.totalAmount.toFixed(2)} KGS</td>
                        <OrderItem key={order._id} order={order} onUpdateStatus={updateStatus} />
                        <td>
                            {order.statusHistory && order.statusHistory.length > 0
                                ? new Date(order.statusHistory[order.statusHistory.length - 1].time).toLocaleString()
                                : '-'}
                        </td>
                        <td>{new Date(order.date).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;