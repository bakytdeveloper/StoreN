// src/components/PurchaseHistory.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const PurchaseBuyHistory = () => {
    const [orders, setOrders] = useState([]);
    const history = useHistory();

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

    return (
        <div className="purchase-history-container">
            <h3 style={{marginTop:"200px"}}>История покупок</h3>
            {orders.length === 0 ? (
                <p>Нет покупок.</p>
            ) : (
                <ul>
                    {orders.map(order => (
                        <li key={order._id}>
                            <h4>Заказ №{order._id}</h4>
                            <p>Дата: {new Date(order.date).toLocaleDateString()}</p>
                            <p>Сумма: ${order.totalAmount}</p>
                            <ul>
                                {order.products.map(product => (
                                    <li key={product.product._id}>
                                        <p>Продукт: {product.name}</p>
                                        <p>Цена: ${product.price}</p>
                                        <p>Количество: {product.quantity}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PurchaseBuyHistory;
