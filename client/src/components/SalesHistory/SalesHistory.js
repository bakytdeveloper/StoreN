

import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';


// const SalesHistory = () => {
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
//                     setOrders(data);
//                 } else {
//                     console.error('Error fetching sales history:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error fetching sales history:', error);
//             }
//         };
//
//         fetchSalesHistory();
//     }, []);
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
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {orders.slice().reverse().map((order) => (
//                     <tr key={order._id}>
//                         <td>{formatDate(order.date)}</td>
//                         <td>{order.status}</td>
//                         <td>
//                             {order.products.map((item, index) => (
//                                 <span key={item.product._id}>
//                                     {item.product.type} {item.product.name}: {item.quantity}шт * {item.product.price} ; <br />
//                                 </span>
//                             ))}
//
//                         </td>
//                         <td>{order.totalAmount}</td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };
//
// export default SalesHistory;



const SalesHistory = () => {
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
                    setOrders(data);
                } else {
                    console.error('Error fetching sales history:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching sales history:', error);
            }
        };

        fetchSalesHistory();
    }, []);

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
                    <th>Тип товара</th>
                    <th>Название товара</th>
                    <th>Цвет товара</th>
                    <th>Размер</th>
                    <th>Цена товара</th>
                    <th>Сумма</th>
                </tr>
                </thead>
                <tbody>
                {orders.slice().reverse().map((order) => (
                    order.products.map((item, index) => (
                        <tr key={`${order._id}-${item.product._id}`}>
                            {index === 0 && (
                                <>
                                    <td rowSpan={order.products.length}>{formatDate(order.date)}</td>
                                    <td rowSpan={order.products.length}>{order.status}</td>
                                </>
                            )}
                            <td>{item.product.type}</td>
                            <td>{item.product.name}</td>
                            <td>{item.color}</td>
                            <td>{item.size}</td>
                            <td>{item.product.price}</td>
                            {index === 0 && <td rowSpan={order.products.length}>{order.totalAmount}</td>}
                        </tr>
                    ))
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesHistory;