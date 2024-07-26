

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './OrderDetailsPage.css';


// const OrderDetailsPage = ({ orders = [], setOrders, setShowSidebar }) => {
//     const { orderId } = useParams();
//     const [order, setOrder] = useState(null);
//     const [totalAmount, setTotalAmount] = useState(0);
//     const [editMode, setEditMode] = useState({});
//     const [sellers, setSellers] = useState([]);
//     const [deleteConfirmation, setDeleteConfirmation] = useState(null);
//
//     const history = useHistory();
//
//     useEffect(() => {
//         const fetchOrder = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`);
//                 const data = await response.json();
//                 setOrder(data);
//                 setTotalAmount(data.totalAmount);
//             } catch (error) {
//                 console.error('Error fetching order:', error);
//             }
//         };
//
//         if (Array.isArray(orders)) {
//             const currentOrder = orders.find(order => order._id === orderId);
//             if (currentOrder) {
//                 setOrder(currentOrder);
//                 setTotalAmount(currentOrder.totalAmount);
//             } else {
//                 fetchOrder();
//             }
//         } else {
//             fetchOrder();
//         }
//     }, [orders, orderId]);
//
//     useEffect(() => {
//         setShowSidebar(true);
//         return () => {
//             setShowSidebar(true);
//         };
//     }, [setShowSidebar]);
//
//     const onClose = () => {
//         history.goBack();
//     };
//
//     const calculateTotalAmountLocally = (products) => {
//         return products.reduce((sum, item) =>
//                 item.product && item.product.price ? sum + item.product.price * item.quantity : sum
//             , 0);
//     };
//
//     const updateQuantity = async (productIndex, newQuantity) => {
//         if (newQuantity < 0) {
//             console.log('Нельзя установить отрицательное количество товара');
//             return;
//         }
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/update-product-quantity/${orderId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                 },
//                 body: JSON.stringify({ productIndex, quantity: newQuantity }), // Передаем индекс вместо productId
//             });
//             const result = await response.json();
//             if (response.ok) {
//                 const updatedOrder = { ...order };
//                 updatedOrder.products[productIndex].quantity = newQuantity;
//                 updatedOrder.totalAmount = calculateTotalAmountLocally(updatedOrder.products);
//                 setOrder(updatedOrder);
//                 setTotalAmount(updatedOrder.totalAmount); // Обновляем состояние totalAmount
//                 const updatedOrders = orders.map((order) =>
//                     order._id === orderId ? updatedOrder : order
//                 );
//                 setOrders(updatedOrders);
//             } else {
//                 console.error('Failed to update quantity:', result);
//             }
//         } catch (error) {
//             console.error('Error updating quantity:', error);
//         }
//     };
//
//     const onDeleteItem = async (productIndex) => {
//         if (productIndex === undefined || productIndex < 0) {
//             console.log('Product index is required');
//             return;
//         }
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/remove-product/${orderId}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                 },
//                 body: JSON.stringify({ productIndex }), // Передаем индекс вместо productId
//             });
//             const result = await response.json();
//             if (response.ok) {
//                 if (result.message === 'Заказ удален, так как в нем не осталось товаров') {
//                     console.log('Заказ удален, так как в нем не осталось товаров');
//                     setOrder(null);
//                     setTotalAmount(0); // Обновляем состояние totalAmount
//                     const updatedOrders = orders.filter((order) => order._id !== orderId);
//                     setOrders(updatedOrders);
//                     return;
//                 }
//                 const updatedOrder = { ...order };
//                 updatedOrder.products.splice(productIndex, 1);
//                 updatedOrder.totalAmount = calculateTotalAmountLocally(updatedOrder.products);
//                 setOrder(updatedOrder);
//                 setTotalAmount(updatedOrder.totalAmount); // Обновляем состояние totalAmount
//                 const updatedOrders = orders.map((order) =>
//                     order._id === orderId ? updatedOrder : order
//                 );
//                 setOrders(updatedOrders);
//             } else {
//                 console.error('Failed to delete item:', result);
//             }
//         } catch (error) {
//             console.error('Error deleting item:', error);
//         }
//     };
//
//     const deleteOrder = async (orderId) => {
//         if (!orderId) {
//             console.error('Order ID is required');
//             return;
//         }
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`, {
//                 method: 'DELETE',
//             });
//             if (response.ok) {
//                 console.log('Order deleted successfully');
//             } else {
//                 console.error('Failed to delete order');
//             }
//         } catch (error) {
//             console.error('Error deleting order:', error);
//         }
//     };
//
//     const fetchSellers = async () => {
//         try {
//             const token = localStorage.getItem('token'); // Или используйте другой метод получения токена
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             if (response.status === 401) {
//                 console.error('Unauthorized');
//                 return;
//             }
//             const data = await response.json();
//             setSellers(data);
//         } catch (error) {
//             console.error('Error fetching sellers:', error);
//         }
//     };
//
//     const getSellerInfo = (product) => {
//         if (!Array.isArray(sellers)) {
//             console.error('sellers is not an array:', sellers);
//             return { name: 'Неизвестный продавец', email: '-', phoneNumber: '-' };
//         }
//         const seller = sellers.find((seller) => seller.products.includes(product._id));
//         return seller
//             ? { name: seller.name, email: seller.email, phoneNumber: seller.phoneNumber }
//             : { name: 'Неизвестный продавец', email: '-', phoneNumber: '-' };
//     };
//
//     const toggleEditMode = (productId) => {
//         setEditMode(prevState => ({
//             ...prevState,
//             [productId]: !prevState[productId]
//         }));
//     };
//
//     const confirmDeleteItem = (productId) => {
//         setDeleteConfirmation(productId);
//     };
//
//     const cancelDeleteItem = () => {
//         setDeleteConfirmation(null);
//     };
//
//     return (
//         <div className="order-details-page">
//             {order && (
//                 <div className="order-details-modal">
//                     <div className="modal-content">
//                         <button className="order-details-page-close-button" onClick={onClose}>
//                             &#10006;
//                         </button>
//                         <h2>Детали заказа</h2>
//                         <div className="order-info">
//                             <div className="client-order-info">
//                                 <div>
//                                     <strong>ID заказа:</strong> {order._id}
//                                 </div>
//                                 <div>
//                                     <strong>Имя:</strong> {order.user ? order.user.name : order.guestInfo.name}
//                                 </div>
//                                 <div>
//                                     <strong>Клиент:</strong> {order.user ? order.user.role : 'Гость'}
//                                 </div>
//                                 <div>
//                                     <strong>Адрес:</strong> {order.address ? order.address : 'Гость'}
//                                 </div>
//                                 <div>
//                                     <strong>Email:</strong> {order.user ? order.user.email : order.guestInfo.email}
//                                 </div>
//                                 <div>
//                                     <strong>Телефон №:</strong> {order.phoneNumber ? order.phoneNumber : 'Гость'}
//                                 </div>
//                             </div>
//
//                             <div>
//                                 <hr />
//                                 <ul>
//                                     <h4 style={{ textAlign: "center" }}> Товары</h4>
//                                     {order && order.products && order.products.map((item, index) => (
//                                         <li key={index}>
//                                             <h3>Инф. о продавце заказа</h3>
//                                             <div>
//                                                 <strong>Продавец:</strong> {item.seller?.name || 'Неизвестный продавец'}
//                                             </div>
//                                             <div>
//                                                 <strong>Email:</strong> {item.seller?.email || '-'}
//                                             </div>
//                                             <div>
//                                                 <strong>Телефон:</strong> {item.seller?.phoneNumber || '-'}
//                                             </div>
//                                             <div>
//                                                 <strong>Название товара:</strong> {item.name ? item.name : 'Неизвестный товар'}
//                                             </div>
//                                             <div>
//                                                 <strong>Цена:</strong> {item.price ? item.price : 'Неизвестная цена'}
//                                             </div>
//                                             <div>
//                                                 <strong>Количество:</strong>
//                                                 {item?._id && editMode[item?._id] ? (
//                                                     <input
//                                                         type="number"
//                                                         value={item.quantity}
//                                                         min="1"
//                                                         onChange={(e) => updateQuantity(index, parseInt(e.target.value, 10))}
//                                                     />
//                                                 ) : (
//                                                     item.quantity
//                                                 )}
//                                             </div>
//                                             {item && (
//                                                 <>
//                                                     <button onClick={() => toggleEditMode(item._id)}>
//                                                         {editMode[item._id] ? 'Сохранить' : 'Изменить'}
//                                                     </button>
//                                                     <button onClick={() => confirmDeleteItem(item._id)}>
//                                                         Удалить
//                                                     </button>
//                                                 </>
//                                             )}
//                                             {deleteConfirmation === item?._id && (
//                                                 <div>
//                                                     <p>Вы уверены, что хотите удалить этот товар?</p>
//                                                     <button onClick={() => onDeleteItem(index)}>Да</button>
//                                                     <button onClick={cancelDeleteItem}>Нет</button>
//                                                 </div>
//                                             )}
//                                             <hr />
//                                         </li>
//                                     ))}
//
//                                 </ul>
//                                 <hr />
//                                 <h3 style={{ textAlign: "center" }}>Итоговая сумма: {totalAmount} сом.</h3>
//                                 <hr />
//                                 <button className="delete-order-button" onClick={() => deleteOrder(orderId)}>
//                                     Удалить заказ
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };


// const OrderDetailsPage = ({ orders = [], setOrders, setShowSidebar }) => {
//     const { orderId } = useParams();
//     const [order, setOrder] = useState(null);
//     const [totalAmount, setTotalAmount] = useState(0);
//     const [editMode, setEditMode] = useState({});
//     const [sellers, setSellers] = useState([]);
//     const [deleteConfirmation, setDeleteConfirmation] = useState(null);
//
//     const history = useHistory();
//
//     useEffect(() => {
//         const fetchOrder = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`);
//                 const data = await response.json();
//                 setOrder(data);
//                 setTotalAmount(data.totalAmount);
//             } catch (error) {
//                 console.error('Error fetching order:', error);
//             }
//         };
//
//         if (Array.isArray(orders)) {
//             const currentOrder = orders.find(order => order._id === orderId);
//             if (currentOrder) {
//                 setOrder(currentOrder);
//                 setTotalAmount(currentOrder.totalAmount);
//             } else {
//                 fetchOrder();
//             }
//         } else {
//             fetchOrder();
//         }
//     }, [orders, orderId]);
//
//     useEffect(() => {
//         setShowSidebar(true);
//         return () => {
//             setShowSidebar(true);
//         };
//     }, [setShowSidebar]);
//
//     const onClose = () => {
//         history.goBack();
//     };
//
//     const calculateTotalAmountLocally = (products) => {
//         return products.reduce((sum, item) =>
//                 item && item.price ? sum + item.price * item.quantity : sum
//             , 0);
//     };
//
//     const updateQuantity = async (productIndex, newQuantity) => {
//         if (newQuantity < 0) {
//             console.log('Нельзя установить отрицательное количество товара');
//             return;
//         }
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/update-product-quantity/${orderId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                 },
//                 body: JSON.stringify({ productIndex, quantity: newQuantity }), // Передаем индекс вместо productId
//             });
//             const result = await response.json();
//             if (response.ok) {
//                 const updatedOrder = { ...order };
//                 updatedOrder.products[productIndex].quantity = newQuantity;
//                 updatedOrder.totalAmount = calculateTotalAmountLocally(updatedOrder.products);
//                 setOrder(updatedOrder);
//                 setTotalAmount(updatedOrder.totalAmount); // Обновляем состояние totalAmount
//                 const updatedOrders = orders.map((order) =>
//                     order._id === orderId ? updatedOrder : order
//                 );
//                 setOrders(updatedOrders);
//             } else {
//                 console.error('Failed to update quantity:', result);
//             }
//         } catch (error) {
//             console.error('Error updating quantity:', error);
//         }
//     };
//
//     const onDeleteItem = async (productIndex) => {
//         if (productIndex === undefined || productIndex < 0) {
//             console.log('Product index is required');
//             return;
//         }
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/remove-product/${orderId}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                 },
//                 body: JSON.stringify({ productIndex }), // Передаем индекс вместо productId
//             });
//             const result = await response.json();
//             if (response.ok) {
//                 if (result.message === 'Заказ удален, так как в нем не осталось товаров') {
//                     console.log('Заказ удален, так как в нем не осталось товаров');
//                     setOrder(null);
//                     setTotalAmount(0); // Обновляем состояние totalAmount
//                     const updatedOrders = orders.filter((order) => order._id !== orderId);
//                     setOrders(updatedOrders);
//                     return;
//                 }
//                 const updatedOrder = { ...order };
//                 updatedOrder.products.splice(productIndex, 1);
//                 updatedOrder.totalAmount = calculateTotalAmountLocally(updatedOrder.products);
//                 setOrder(updatedOrder);
//                 setTotalAmount(updatedOrder.totalAmount); // Обновляем состояние totalAmount
//                 const updatedOrders = orders.map((order) =>
//                     order._id === orderId ? updatedOrder : order
//                 );
//                 setOrders(updatedOrders);
//             } else {
//                 console.error('Failed to delete item:', result);
//             }
//         } catch (error) {
//             console.error('Error deleting item:', error);
//         }
//     };
//
//     const deleteOrder = async (orderId) => {
//         if (!orderId) {
//             console.error('Order ID is required');
//             return;
//         }
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`, {
//                 method: 'DELETE',
//             });
//             if (response.ok) {
//                 console.log('Order deleted successfully');
//                 setOrder(null);
//                 setTotalAmount(0); // Сбросить общую сумму
//                 const updatedOrders = orders.filter((order) => order._id !== orderId);
//                 setOrders(updatedOrders);
//                 history.goBack(); // Возврат на предыдущую страницу
//             } else {
//                 console.error('Failed to delete order');
//             }
//         } catch (error) {
//             console.error('Error deleting order:', error);
//         }
//     };
//
//     const fetchSellers = async () => {
//         try {
//             const token = localStorage.getItem('token'); // Или используйте другой метод получения токена
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             if (response.status === 401) {
//                 console.error('Unauthorized');
//                 return;
//             }
//             const data = await response.json();
//             setSellers(data);
//         } catch (error) {
//             console.error('Error fetching sellers:', error);
//         }
//     };
//
//     const getSellerInfo = (product) => {
//         if (!Array.isArray(sellers)) {
//             console.error('sellers is not an array:', sellers);
//             return { name: 'Неизвестный продавец', email: '-', phoneNumber: '-' };
//         }
//         const seller = sellers.find((seller) => seller.products.includes(product._id));
//         return seller
//             ? { name: seller.name, email: seller.email, phoneNumber: seller.phoneNumber }
//             : { name: 'Неизвестный продавец', email: '-', phoneNumber: '-' };
//     };
//
//     const toggleEditMode = (productId) => {
//         setEditMode(prevState => ({
//             ...prevState,
//             [productId]: !prevState[productId]
//         }));
//     };
//
//     const confirmDeleteItem = (productId) => {
//         setDeleteConfirmation(productId);
//     };
//
//     const cancelDeleteItem = () => {
//         setDeleteConfirmation(null);
//     };
//
//     return (
//         <div className="order-details-page">
//             {order && (
//                 <div className="order-details-modal">
//                     <div className="modal-content">
//                         <button className="order-details-page-close-button" onClick={onClose}>
//                             &#10006;
//                         </button>
//                         <h2>Детали заказа</h2>
//                         <div className="order-info">
//                             <div className="client-order-info">
//                                 <div>
//                                     <strong>ID заказа:</strong> {order._id}
//                                 </div>
//                                 <div>
//                                     <strong>Имя:</strong> {order.user ? order.user.name : order.guestInfo.name}
//                                 </div>
//                                 <div>
//                                     <strong>Клиент:</strong> {order.user ? order.user.role : 'Гость'}
//                                 </div>
//                                 <div>
//                                     <strong>Адрес:</strong> {order.address ? order.address : 'Гость'}
//                                 </div>
//                                 <div>
//                                     <strong>Email:</strong> {order.user ? order.user.email : order.guestInfo.email}
//                                 </div>
//                                 <div>
//                                     <strong>Телефон №:</strong> {order.phoneNumber ? order.phoneNumber : 'Гость'}
//                                 </div>
//                             </div>
//
//                             <div>
//                                 <hr />
//                                 <ul>
//                                     <h4 style={{ textAlign: "center" }}> Товары</h4>
//                                     {order && order.products && order.products.map((item, index) => (
//                                         <li key={index}>
//                                             <h3>Инф. о продавце заказа</h3>
//                                             <div>
//                                                 <strong>Продавец:</strong> {item.seller?.name || 'Неизвестный продавец'}
//                                             </div>
//                                             <div>
//                                                 <strong>Телефон продавца:</strong> {item.seller?.phoneNumber || 'Неизвестный номер'}
//                                             </div>
//                                             <div>
//                                                 <strong>Email продавца:</strong> {item.seller?.email || 'Неизвестный email'}
//                                             </div>
//                                             <h3>Инф. о товаре</h3>
//                                             <div>
//                                                 <strong>Название товара:</strong> {item.name || 'Неизвестный товар'}
//                                             </div>
//                                             <div>
//                                                 <strong>Цена за единицу:</strong> {item.price ? `${item.price} ₸` : 'Неизвестная цена'}
//                                             </div>
//                                             <div>
//                                                 <strong>Количество:</strong> {item.quantity}
//                                                 <button onClick={() => toggleEditMode(item._id)}>
//                                                     {editMode[item._id] ? 'Сохранить' : 'Изменить'}
//                                                 </button>
//                                                 {editMode[item._id] && (
//                                                     <input
//                                                         type="number"
//                                                         value={item.quantity}
//                                                         onChange={(e) => updateQuantity(index, parseInt(e.target.value, 10))}
//                                                         min="1"
//                                                         step="1"
//                                                     />
//                                                 )}
//                                             </div>
//                                             <div>
//                                                 <strong>Итого:</strong> {item ? item.price * item.quantity : '0 ₸'}
//                                             </div>
//                                             <button onClick={() => confirmDeleteItem(index)}>Удалить товар</button>
//                                             {deleteConfirmation === index && (
//                                                 <div>
//                                                     <p>Вы уверены, что хотите удалить этот товар?</p>
//                                                     <button onClick={() => onDeleteItem(index)}>Да</button>
//                                                     <button onClick={cancelDeleteItem}>Отмена</button>
//                                                 </div>
//                                             )}
//                                         </li>
//                                     ))}
//                                 </ul>
//                                 <hr />
//                                 <div>
//                                     <h4>Итого:</h4>
//                                     <p>{totalAmount} ₸</p>
//                                 </div>
//                                 <button onClick={() => deleteOrder(orderId)}>Удалить весь заказ</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
//
//
// export default OrderDetailsPage;





const OrderDetailsPage = ({ orders = [], setOrders, setShowSidebar }) => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [editMode, setEditMode] = useState({});
    const [sellers, setSellers] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);

    const history = useHistory();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`);
                const data = await response.json();
                setOrder(data);
                setTotalAmount(data.totalAmount);
            } catch (error) {
                console.error('Error fetching order:', error);
            }
        };

        if (Array.isArray(orders)) {
            const currentOrder = orders.find(order => order._id === orderId);
            if (currentOrder) {
                setOrder(currentOrder);
                setTotalAmount(currentOrder.totalAmount);
            } else {
                fetchOrder();
            }
        } else {
            fetchOrder();
        }
    }, [orders, orderId]);

    useEffect(() => {
        setShowSidebar(true);
        return () => {
            setShowSidebar(true);
        };
    }, [setShowSidebar]);

    const onClose = () => {
        history.goBack();
    };

    const calculateTotalAmountLocally = (products) => {
        return products.reduce((sum, item) =>
                item && item.price ? sum + item.price * item.quantity : sum
            , 0);
    };

    const updateQuantity = async (productIndex, newQuantity) => {
        if (newQuantity < 0) {
            console.log('Нельзя установить отрицательное количество товара');
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/update-product-quantity/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ productIndex, quantity: newQuantity }), // Передаем индекс вместо productId
            });
            const result = await response.json();
            if (response.ok) {
                const updatedOrder = { ...order };
                updatedOrder.products[productIndex].quantity = newQuantity;
                updatedOrder.totalAmount = calculateTotalAmountLocally(updatedOrder.products);
                setOrder(updatedOrder);
                setTotalAmount(updatedOrder.totalAmount); // Обновляем состояние totalAmount
                // Обеспечиваем, что orders - массив перед вызовом map
                if (Array.isArray(orders)) {
                    const updatedOrders = orders.map((order) =>
                        order._id === orderId ? updatedOrder : order
                    );
                    setOrders(updatedOrders);
                }
            } else {
                console.error('Failed to update quantity:', result);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const onDeleteItem = async (productIndex) => {
        if (productIndex === undefined || productIndex < 0) {
            console.log('Требуется индекс продукта');
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/remove-product/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ productIndex }), // Передаем индекс вместо productId
            });
            const result = await response.json();
            if (response.ok) {
                if (result.message === 'Заказ удален, так как в нем не осталось товаров') {
                    console.log('Заказ удален, так как в нем не осталось товаров');
                    setOrder(null);
                    setTotalAmount(0); // Обновляем состояние totalAmount
                    // Обеспечиваем, что orders - массив перед фильтрацией
                    if (Array.isArray(orders)) {
                        const updatedOrders = orders.filter((order) => order._id !== orderId);
                        setOrders(updatedOrders);
                    }
                    return;
                }
                const updatedOrder = { ...order };
                updatedOrder.products.splice(productIndex, 1);
                updatedOrder.totalAmount = calculateTotalAmountLocally(updatedOrder.products);
                setOrder(updatedOrder);
                setTotalAmount(updatedOrder.totalAmount); // Обновляем состояние totalAmount
                const updatedOrders = orders.map((order) =>
                    order._id === orderId ? updatedOrder : order
                );
                setOrders(updatedOrders);
            } else {
                console.error('Failed to delete item:', result);
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const deleteOrder = async (orderId) => {
        if (!orderId) {
            console.error('Order ID is required');
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                console.log('Order deleted successfully');
                setOrder(null);
                setTotalAmount(0); // Сбросить общую сумму
                const updatedOrders = orders.filter((order) => order._id !== orderId);
                setOrders(updatedOrders);
                history.goBack(); // Возврат на предыдущую страницу
            } else {
                console.error('Failed to delete order');
            }
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const fetchSellers = async () => {
        try {
            const token = localStorage.getItem('token'); // Или используйте другой метод получения токена
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 401) {
                console.error('Unauthorized');
                return;
            }
            const data = await response.json();
            setSellers(data);
        } catch (error) {
            console.error('Error fetching sellers:', error);
        }
    };

    const getSellerInfo = (product) => {
        if (!Array.isArray(sellers)) {
            console.error('sellers is not an array:', sellers);
            return { name: 'Неизвестный продавец', email: '-', phoneNumber: '-' };
        }
        const seller = sellers.find((seller) => seller.products.includes(product._id));
        return seller
            ? { name: seller.name, email: seller.email, phoneNumber: seller.phoneNumber }
            : { name: 'Неизвестный продавец', email: '-', phoneNumber: '-' };
    };

    const toggleEditMode = (productId) => {
        setEditMode(prevState => ({
            ...prevState,
            [productId]: !prevState[productId]
        }));
    };

    const confirmDeleteItem = (productId) => {
        setDeleteConfirmation(productId);
    };

    const cancelDeleteItem = () => {
        setDeleteConfirmation(null);
    };

    return (
        <div className="order-details-page">
            {order && (
                <div className="order-details-modal">
                    <div className="modal-content">
                        <button className="order-details-page-close-button" onClick={onClose}>
                            &#10006;
                        </button>
                        <h2>Детали заказа</h2>
                        <div className="order-info">
                            <div className="client-order-info">
                                <div>
                                    <strong>ID заказа:</strong> {order._id}
                                </div>
                                <div>
                                    <strong>Имя:</strong> {order.user ? order.user.name : order.guestInfo.name}
                                </div>
                                <div>
                                    <strong>Клиент:</strong> {order.user ? order.user.role : 'Гость'}
                                </div>
                                <div>
                                    <strong>Адрес:</strong> {order.address ? order.address : 'Гость'}
                                </div>
                                <div>
                                    <strong>Email:</strong> {order.user ? order.user.email : order.guestInfo.email}
                                </div>
                                <div>
                                    <strong>Телефон №:</strong> {order.phoneNumber ? order.phoneNumber : 'Гость'}
                                </div>
                            </div>

                            <div>
                                <hr />
                                <ul>
                                    <h4 style={{ textAlign: "center" }}> Товары</h4>
                                    {order && order.products && order.products.map((item, index) => (
                                        <li key={index}>
                                            <h3>Инф. о продавце заказа</h3>
                                            <div>
                                                <strong>Продавец:</strong> {item.seller?.name || 'Неизвестный продавец'}
                                            </div>
                                            <div>
                                                <strong>Телефон продавца:</strong> {item.seller?.phoneNumber || 'Неизвестный номер'}
                                            </div>
                                            <div>
                                                <strong>Email продавца:</strong> {item.seller?.email || 'Неизвестный email'}
                                            </div>
                                            <h3>Инф. о товаре</h3>
                                            <div>
                                                <strong>Название товара:</strong> {item.name || 'Неизвестный товар'}
                                            </div>
                                            <div>
                                                <strong>Цена за единицу:</strong> {item.price ? `${item.price} ₸` : 'Неизвестная цена'}
                                            </div>
                                            <div>
                                                <strong>Количество:</strong> {item.quantity}
                                                <button onClick={() => toggleEditMode(item._id)}>
                                                    {editMode[item._id] ? 'Сохранить' : 'Изменить'}
                                                </button>
                                                {editMode[item._id] && (
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => updateQuantity(index, parseInt(e.target.value, 10))}
                                                        min="1"
                                                        step="1"
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <strong>Итого:</strong> {item ? item.price * item.quantity : '0 ₸'}
                                            </div>
                                            <button onClick={() => confirmDeleteItem(index)}>Удалить товар</button>
                                            {deleteConfirmation === index && (
                                                <div>
                                                    <p>Вы уверены, что хотите удалить этот товар?</p>
                                                    <button onClick={() => onDeleteItem(index)}>Да</button>
                                                    <button onClick={cancelDeleteItem}>Отмена</button>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <hr />
                                <div>
                                    <h4>Итого:</h4>
                                    <p>{totalAmount} ₸</p>
                                </div>
                                <button onClick={() => deleteOrder(orderId)}>Удалить весь заказ</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default OrderDetailsPage;





