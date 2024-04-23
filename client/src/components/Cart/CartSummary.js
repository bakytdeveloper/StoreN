

// src/components/Cart/CartSummary.js

import React from 'react';
import "./CartSummary.css"

const CartSummary = ({ totalPrice, totalItems }) => {
    return (
        <div className="checkList">
            <div className="total-price">Общая сумма: {totalPrice.toFixed(2)} сом</div>
            {/*<div className="total-items">Общее количество товара: {totalItems}</div>*/}
        </div>
    );
};

export default CartSummary;
