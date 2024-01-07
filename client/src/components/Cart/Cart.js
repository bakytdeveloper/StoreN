//
//
//
// // src/components/Cart/Cart.js
//
// import React, { useState } from 'react';
// import './Cart.css';
//
// const Cart = ({ cartItems, setCartItems }) => {
//     const [totalPrice, setTotalPrice] = useState(0);
//
//     // Функция для изменения количества товара в корзине
//     const handleQuantityChange = (productId, operation) => {
//         const updatedCart = cartItems.map((item) => {
//             if (item.productId === productId) {
//                 const newQuantity = operation === 'increase' ? item.quantity + 1 : item.quantity - 1;
//                 return { ...item, quantity: newQuantity < 0 ? 0 : newQuantity };
//             }
//             return item;
//         });
//         setCartItems(updatedCart);
//         calculateTotalPrice(updatedCart);
//     };
//
//     // Функция для удаления товара из корзины
//     const handleRemoveItem = (productId) => {
//         const updatedCart = cartItems.filter((item) => item.productId !== productId);
//         setCartItems(updatedCart);
//         calculateTotalPrice(updatedCart);
//     };
//
//     // Функция для расчета общей стоимости товаров в корзине
//     const calculateTotalPrice = (updatedCart) => {
//         const total = updatedCart.reduce((acc, item) => +acc + item.price * item.quantity, 0);
//         setTotalPrice(total);
//     };
//
//     return (
//         <div className="cart">
//             <h2>Cart</h2>
//             {cartItems.length === 0 ? (
//                 <p>Your cart is empty</p>
//             ) : (
//                 <div>
//                     {cartItems.map((item) => (
//                         <div className="cart-item" key={item.productId}>
//                             <div className="item-info">
//                                 <img src={item.image} alt={item.name} />
//                                 <div className="item-details">
//                                     <div>{item.type}</div>
//                                     <div>{item.brand}</div>
//                                     <div>{item.name}</div>
//                                     <div>
//                                         <span>KGS</span> {item.price}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="item-quantity">
//                                 <button onClick={() => handleQuantityChange(item.productId, 'decrease')}>-</button>
//                                 <span>{item.quantity}</span>
//                                 <button onClick={() => handleQuantityChange(item.productId, 'increase')}>+</button>
//                                 <div>
//                                     <span>Total: </span>
//                                     <span>{item.price * item.quantity}</span>
//                                 </div>
//                                 <button onClick={() => handleRemoveItem(item.productId)}>Remove</button>
//                             </div>
//                         </div>
//                     ))}
//                     <div className="cart-summary">
//                         <div>
//                             <span>Total Price: </span>
//                             <span>{totalPrice}</span>
//                         </div>
//                         <button>Order</button>
//                         <button onClick={() => setCartItems([])}>Clear Cart</button>
//                         <button>Back to Shopping</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default Cart;





// src/components/Cart/Cart.js

import React, { useState, useEffect } from 'react';
import './Cart.css';
import {useHistory} from "react-router-dom";

const Cart = ({ cartItems, setCartItems }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const history = useHistory();


    // Функция для изменения количества товара в корзине
    const handleQuantityChange = (productId, operation) => {
        const updatedCart = cartItems.map((item) => {
            if (item.productId === productId) {
                const newQuantity = operation === 'increase' ? item.quantity + 1 : item.quantity - 1;
                return { ...item, quantity: newQuantity < 0 ? 0 : newQuantity };
            }
            return item;
        });
        setCartItems(updatedCart);
    };

    // Функция для удаления товара из корзины
    const handleRemoveItem = (productId) => {
        const updatedCart = cartItems.filter((item) => item.productId !== productId);
        setCartItems(updatedCart);
        if (updatedCart.length === 0) {
            history.push('/products'); // Замените на нужный URL вашей страницы с товарами
        }
    };

    // Функция для расчета общей стоимости товаров в корзине
    useEffect(() => {
        const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
        if (cartItems.length === 0) {
            history.push('/products'); // Замените на нужный URL вашей страницы с товарами
        }
    }, [cartItems, history]);

    const handleBackToShopping = () => {
        history.push('/products'); // Замените на нужный URL вашей страницы с товарами
    };

    return (
        <div className="cart">
            <h2>Корзина</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div className="cart-item" key={item.productId}>
                            <div className="item-info">
                                <img src={item.image} alt={item.name} />
                                <div className="item-details">
                                    <div>{item.type}</div>
                                    <div>{item.brand}</div>
                                    <div>{item.name}</div>
                                    <div>
                                        <span>KGS</span> {item.price}
                                    </div>
                                </div>
                            </div>
                            <div className="item-quantity">
                                <button onClick={() => handleQuantityChange(item.productId, 'decrease')}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleQuantityChange(item.productId, 'increase')}>+</button>
                                <div>
                                    <span>Сумма: </span>
                                    <span>{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                                <button onClick={() => handleRemoveItem(item.productId)}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <div className="cart-summary">
                        <div>
                            <span>Общая сумма: </span>
                            <span>{totalPrice.toFixed(2)}</span>
                        </div>
                        <button>Order</button>
                        <button onClick={() => setCartItems([])}>Clear Cart</button>
                        <button onClick={handleBackToShopping}>Back to Shopping</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
