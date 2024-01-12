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
import './OrderList.css'; // Подключение стилей

const OrderList = () => {
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        // Функция для получения списка заказов с бэкенда
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5500/api/orders/orders');
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        // Вызываем функцию для получения списка заказов
        fetchOrders();
    }, []);

    return (
        <div className="order">
            <h2>Список заказов</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Пользователь</th>
                    <th>Имя Фамилия</th>
                    {/*<th>Фамилия Фамилия</th>*/}
                    <th>Email</th>
                    <th>Адрес доставки</th>
                    <th>Номер телефона</th>
                    <th>Способ оплаты</th>
                    <th>Комментарии</th>
                    <th>Продукты</th>
                    <th>Сумма</th>
                    <th>Статус</th>
                    <th>Дата</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user ? order.user.name : 'Гость'}</td>
                        <td>{order.guestInfo ? order.guestInfo.name : '-'}</td>
                        {/*<td>{order.guestInfo ? order.guestInfo.lastName : '-'}</td>*/}
                        <td>{order.guestInfo ? order.guestInfo.email : '-'}</td>
                        <td>{order.guestInfo ? order.guestInfo.address : '-'}</td>
                        <td>{order.guestInfo ? order.guestInfo.phoneNumber : '-'}</td>
                        <td>{order.guestInfo ? order.guestInfo.paymentMethod : '-'}</td>
                        <td>{order.guestInfo ? order.guestInfo.comments : '-'}</td>
                        <td>
                            {order.cart.map((item) => (
                                <p key={item.product._id}>
                                    {item.product.name} (Количество: {item.quantity})
                                </p>
                            ))}
                        </td>
                        <td>{order.totalAmount.toFixed(2)} KGS</td>
                        <td>{order.status}</td>
                        <td>{new Date(order.date).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
