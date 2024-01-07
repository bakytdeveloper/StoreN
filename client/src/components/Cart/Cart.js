// src/components/Cart/Cart.js

import React from 'react';
import './Cart.css';

const Cart = ({ cartItems }) => {
    return (
        <div className="cart">
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.productId}>
                            <div>{item.name}</div>
                            <div>Quantity: {item.quantity}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;
