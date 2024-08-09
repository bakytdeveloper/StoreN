// src/components/PurchaseHistory.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./PurchaseBuyHistory.css";

const PurchaseBuyHistory = ({ setShowSidebar }) => {
    const [orders, setOrders] = useState([]);
    const history = useHistory();

    useEffect(() => {
        setShowSidebar(true);
        return () => setShowSidebar(true);
    }, [setShowSidebar]);

    useEffect(() => {
        const fetchPurchaseHistory = async () => {
            try {
                const token = localStorage.getItem('token');

                

                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/seller/purchase-history`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                    toast.error('Ошибка при загрузке истории покупок');
                }
            } catch (error) {
                console.error('Error fetching purchase history:', error);
                toast.error('Ошибка при загрузке истории покупок');
            }
        };

        fetchPurchaseHistory();
    }, []);

    // return (
    //     <div className="purchase-history-container">
    //         <h3 style={{marginTop:"200px"}}>История покупок</h3>
    //         {orders.length === 0 ? (
    //             <p>Нет покупок.</p>
    //         ) : (
    //             <ul>
    //                 {orders.map(order => (
    //                     <li key={order._id}>
    //                         <h4>Заказ №{order._id}</h4>
    //                         <p>Дата: {new Date(order.date).toLocaleDateString()}</p>
    //                         <p>Сумма: ${order.totalAmount}</p>
    //                         <ul>
    //                             {order.products.map(product => (
    //                                 <li key={product.product._id}>
    //                                     <p>Продукт: {product.name}</p>
    //                                     <p>Цена: ${product.price}</p>
    //                                     <p>Количество: {product.quantity}</p>
    //                                 </li>
    //                             ))}
    //                         </ul>
    //                     </li>
    //                 ))}
    //             </ul>
    //         )}
    //     </div>
    // );

    return (
        <div className="purchase-history-container">
            <h2>История покупок</h2>
            {orders.length === 0 ? (
                <p>Нет покупок.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Статус</th>
                        <th>Брэнд товара</th>
                        <th>Тип товара</th>
                        <th>Название товара</th>
                        <th>Цвет</th>
                        <th>Размер</th>
                        <th>Кол.</th>
                        <th>Цена</th>
                        <th>Сумма</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        order.products.map((item, index) => (
                            <tr key={`${order._id}-${item.product ? item.product._id : index}`}>
                                {index === 0 && (
                                    <>
                                        <td rowSpan={order.products.length}>{new Date(order.date).toLocaleDateString()}</td>
                                        <td rowSpan={order.products.length}>{order.status}</td>
                                    </>
                                )}
                                <td>{item.brand}</td>
                                <td>{item.type}</td>
                                <td>{item.name}</td>
                                <td>{item.color}</td>
                                <td>{item.size}</td>
                                <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                                <td>{item.price}</td>
                                {index === 0 && <td rowSpan={order.products.length}>{order.totalAmount}</td>}
                            </tr>
                        ))
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PurchaseBuyHistory;
