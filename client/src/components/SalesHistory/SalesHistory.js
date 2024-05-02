//
// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

// const SalesHistory = ({ sellerId }) => {
//     const [orders, setOrders] = useState([]);
//     const history = useHistory();
//
//     useEffect(() => {
//         const fetchSalesHistory = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/sales-history`, {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });
//                 if (response.ok) {
//                     const data = await response.json();
//                     const filteredOrders = data.map(order => {
//                         // Фильтруем товары в заказе, оставляем только те, которые принадлежат текущему продавцу
//                         const filteredProducts = order.products.filter(product => {
//                             return product.product && product.product.seller === sellerId;
//                         });
//                         return { ...order, products: filteredProducts };
//                     });
//                     setOrders(filteredOrders);
//                 } else {
//                     console.error('Error fetching sales history:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error fetching sales history:', error);
//             }
//         };
//
//         fetchSalesHistory();
//     }, [sellerId]);
//
//     const formatDate = (date) => {
//         return new Date(date).toLocaleDateString();
//     };
//
//     const handleGoBack = () => {
//         history.goBack();
//     };
//
//     return (
//         <div className="order">
//             <h2>История продаж</h2>
//             <span className="sellersListClose" type="button" onClick={handleGoBack}>
//                <span> &#10006;</span>
//             </span>
//             <table>
//                 <thead>
//                 <tr>
//                     <th>Дата</th>
//                     <th>Статус</th>
//                     <th>Товары</th>
//                     <th>Сумма</th>
//                     <th>Покупатель</th>
//                     <th>Адрес доставки</th>
//                     <th>Номер телефона</th>
//                     <th>Метод оплаты</th>
//                     <th>Комментарии</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {orders.slice().reverse().map((order) => (
//                     <tr key={order._id}>
//                         <td>{formatDate(order.date)}</td>
//                         <td>{order.status}</td>
//                         <td>
//                             {order.products.map((item, index) => (
//                                 <span key={item.product?._id}>
//                                     {item.product?.type} {item.product?.name}: {item.quantity}шт; <br />
//                                 </span>
//                             ))}
//                         </td>
//                         <td>{order.totalAmount}</td>
//                         <td>
//                             {order.user ? order.user.name : (order.guestInfo ? order.guestInfo.name : '-')}
//                             {/*{order.user ? order.user.name : (order.guestInfo ? order.guestInfo.name : '-')}*/}
//                         </td>
//                         <td>{order.address}</td>
//                         <td>{order.phoneNumber}</td>
//                         <td>{order.paymentMethod}</td>
//                         <td>{order.comments}</td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };
//
// export default SalesHistory;


import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const SalesHistory = ({ sellerId }) => {
    const [orders, setOrders] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchSalesHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/sales-history`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    const filteredOrders = data.map(order => {
                        // Фильтруем товары в заказе, оставляем только те, которые принадлежат текущему продавцу
                        const filteredProducts = order.products.filter(product => {
                            return product.product && product.product.seller === sellerId;
                        });
                        // Вычисляем сумму только для товаров текущего продавца
                        const totalAmount = filteredProducts.reduce((total, item) => {
                            return total + (item.product.price * item.quantity);
                        }, 0);
                        return { ...order, products: filteredProducts, totalAmount };
                    });
                    setOrders(filteredOrders);
                } else {
                    console.error('Error fetching sales history:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching sales history:', error);
            }
        };

        fetchSalesHistory();
    }, [sellerId]);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    const handleGoBack = () => {
        history.goBack();
    };

    return (
        <div className="order">
            <h2>История продаж</h2>
            <span className="sellersListClose" type="button" onClick={handleGoBack}>
               <span> &#10006;</span>
            </span>
            <table>
                <thead>
                <tr>
                    <th>Дата</th>
                    <th>Статус</th>
                    <th>Товары</th>
                    <th>Цена</th>
                    <th>Сумма</th>
                    {/*<th>Покупатель</th>*/}
                    {/*<th>Адрес доставки</th>*/}
                    {/*<th>Номер телефона</th>*/}
                    {/*<th>Метод оплаты</th>*/}
                    {/*<th>Комментарии</th>*/}
                </tr>
                </thead>
                <tbody>
                {orders.slice().reverse().map((order) => (
                    <tr key={order._id}>
                        <td>{formatDate(order.date)}</td>
                        <td>{order.status}</td>
                        <td>
                            {order.products.map((item, index) => (
                                <span key={item.product?._id}>
                                    {item.product?.type} {item.product?.name}: {item.quantity}шт; <br />
                                </span>
                            ))}
                        </td>
                        <td>
                            {order.products.map((item, index) => (
                                <span key={item.product?._id}>
                                    {item.product?.price} KGS <br />
                                </span>
                            ))}
                        </td>
                        <td>{order.totalAmount}</td>
                        {/*<td>*/}
                        {/*    {order.user ? order.user.name : (order.guestInfo ? order.guestInfo.name : '-')}*/}
                        {/*    /!*{order.user ? order.user.name : (order.guestInfo ? order.guestInfo.name : '-')}*!/*/}
                        {/*</td>*/}
                        {/*<td>{order.address}</td>*/}
                        {/*<td>{order.phoneNumber}</td>*/}
                        {/*<td>{order.paymentMethod}</td>*/}
                        {/*<td>{order.comments}</td>*/}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};


export default SalesHistory;




