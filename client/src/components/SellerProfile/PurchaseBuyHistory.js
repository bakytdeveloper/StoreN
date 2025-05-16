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

    const handleGoBack = () => history.goBack();


    return (
        <div className="purchase-history">
        <div className="purchase-history-container">

            <h2>История покупок</h2>
            <span className="sellers-list-close" type="button" onClick={handleGoBack}>
                <span> &#10006;</span>
            </span>
            {orders.length === 0 ? (
                <p>Нет покупок.</p>
            ) : (
                <table className="order-history-table">
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
                            <tr key={`${order._id}-${item._id || index}`}>
                                {index === 0 && (
                                    <>
                                        <td rowSpan={order.products.length}>
                                            {new Date(order.date).toLocaleDateString()}
                                        </td>
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
        </div>
    );
};

export default PurchaseBuyHistory;
