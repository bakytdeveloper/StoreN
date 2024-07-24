

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './OrderDetailsPage.css';


const OrderDetailsPage = ({ orders = [], setOrders, setShowSidebar }) => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [editMode, setEditMode] = useState({});
    const [sellers, setSellers] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);

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

        // Ensure orders is an array before calling find
        if (Array.isArray(orders)) {
            const currentOrder = orders.find(order => order._id === orderId);
            if (currentOrder) {
                setOrder(currentOrder);
                setTotalAmount(currentOrder ? currentOrder.totalAmount : 0);
            } else {
                fetchOrder();
            }
        } else {
            fetchOrder();
        }
    }, [orders, orderId]);

    const history = useHistory();

    const onClose = () => {
        history.goBack();
    };


    const updateQuantity = async (productId, newQuantity) => {
        if (!productId || newQuantity < 0) {
            console.error('Нельзя установить отрицательное количество товара');
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/update-quantity/${orderId}/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Добавьте токен аутентификации
                },
                body: JSON.stringify({ quantity: newQuantity }),
            });
            const result = await response.json();
            if (response.ok) {
                const updatedOrder = { ...order };
                const updatedProducts = updatedOrder.products.map(item => {
                    if (item.product && item.product._id === productId) {
                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                });
                updatedOrder.products = updatedProducts;
                updatedOrder.totalAmount = calculateTotalAmountLocally(updatedProducts);
                setOrder(updatedOrder);
                const updatedOrders = Array.isArray(orders) ? orders.map((order) => {
                    if (order._id === orderId) {
                        return updatedOrder;
                    }
                    return order;
                }) : [];
                setOrders(updatedOrders);
            } else {
                console.error('Failed to update quantity:', result);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };


    const onDeleteItem = async (productId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/delete-item/${orderId}/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Добавьте токен аутентификации
                },
            });
            if (response.ok) {
                const updatedOrder = { ...order };
                updatedOrder.products = updatedOrder.products.filter((item) => item.product && item.product._id !== productId);
                updatedOrder.totalAmount = calculateTotalAmountLocally(updatedOrder.products);
                setOrder(updatedOrder);

                const updatedOrders = Array.isArray(orders) ? orders.map((order) => {
                    if (order._id === orderId) {
                        return updatedOrder;
                    }
                    return order;
                }) : [];
                setOrders(updatedOrders);

                if (updatedOrder.products.length === 0) {
                    await deleteOrder(orderId);
                }
            } else {
                const result = await response.json();
                console.error('Failed to delete item:', result);
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };


    const deleteOrder = async (orderId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                console.log('Order deleted successfully');
            } else {
                console.error('Failed to delete order');
            }
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const calculateTotalAmountLocally = (products) => {
        let sum = 0;
        for (const item of products) {
            if (item.product && item.product.price) {
                sum += item.product.price * item.quantity;
            }
        }
        return sum;
    };

    useEffect(() => {
        fetchSellers();
    }, []);



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

    const productsSeller = [];

    const getSellerInfo = (product) => {
        if (!Array.isArray(sellers)) {
            console.error('sellers is not an array:', sellers);
            return { name: 'Неизвестный продавец', email: '-', phoneNumber: '-' };
        }
        const seller = sellers.find((seller) => seller.products.includes(product._id));
        productsSeller.push(seller)

        console.log("SELLERS:",seller)

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

    useEffect(() => {
        setShowSidebar(true);
        return () => {
            setShowSidebar(true);
        };
    }, [setShowSidebar]);

    console.log("ORDER:", order)
    // console.log("order.products:", order.products)

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
                                        <li key={item.product ? item.product._id : index}>
                                            <h3>Инф. о продавце заказа</h3>
                                            <div>
                                                <strong>Продавец:</strong> {item.product ? getSellerInfo(item.product).name : item.seller.name}
                                            </div>
                                            <div>
                                                <strong>Email продавца:</strong> {item.product ? getSellerInfo(item.product).email : item.seller.email}
                                                {/*<strong>Email продавца:</strong> {item.product ? getSellerInfo(item.product).email : 'Не указано'}*/}
                                            </div>
                                            <div>
                                                <strong>Номер телефона продавца:</strong> {item.product ? getSellerInfo(item.product).phoneNumber : item.seller.phoneNumber}
                                            </div>
                                            <hr />
                                            <div>
                                                <strong>Тип товара:</strong> {item.type ? item.type : 'Не указано'}
                                            </div>
                                            <div>
                                                <strong>Бренд:</strong> {item.brand ? item.brand : 'Не указано'}
                                            </div>
                                            <div>
                                                <strong>Название товара:</strong> {item.name ? item.name : 'Не указано'}
                                            </div>
                                            <div>
                                                <strong>Цвет товара:</strong> {item.color ? item.color : 'Не указано'}
                                            </div>
                                            <div>
                                                <strong>Размер:</strong> {item.size ? item.size : 'Не указано'}
                                            </div>
                                            <div>
                                                <strong>Описание:</strong> {item.description ? item.description : 'Не указано'}
                                            </div>
                                            <div className="quantityItem">
                                                <strong>Количество:</strong> {item.quantity}
                                                {editMode[item.product ? item.product._id : index] ? (
                                                    <>
                                                        <div className="quantityButtons">
                                                            <button className="minusQuantityButton" onClick={() => updateQuantity(item.product ? item.product._id : '', item.quantity - 1)}>−</button>
                                                            <button className="plusQuantityButton" onClick={() => updateQuantity(item.product ? item.product._id : '', item.quantity + 1)}>+</button>
                                                        </div>
                                                        {deleteConfirmation === (item.product && item.product ? item.product._id : index) ? (
                                                            <>
                                                                <button className="cancelDeleteItemButton" onClick={cancelDeleteItem}>Отмена</button>
                                                                <button className="confirmDeleteItemButton" onClick={() => onDeleteItem(item.product._id)}>Подтвердить удаление</button>
                                                            </>
                                                        ) : (
                                                            <button className="deleteOneItemOrder" onClick={() => confirmDeleteItem(item.product && item.product._id)}>Удалить</button>
                                                        )}
                                                    </>
                                                ) : (
                                                    <button onClick={() => toggleEditMode(item.product ? item.product._id : index)}>Редактировать</button>
                                                )}
                                            </div>
                                            <div>
                                                <strong>Цена за единицу:</strong> {item.price ? item.price : 'Не указано'} KGS
                                            </div>
                                            <hr />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <strong>Общая сумма заказа: {totalAmount}</strong> KGS
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDetailsPage;

