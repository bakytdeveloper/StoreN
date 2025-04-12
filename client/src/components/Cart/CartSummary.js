

// src/components/Cart/CartSummary.js

import React from 'react';

const CartSummary = ({ totalPrice, totalItems }) => {
    return (
        <div className="checkList">
            <div className="total-price">Общая сумма: <strong>{totalPrice}</strong> сом</div>
            {/*<div className="total-items">Общее количество товара: {totalItems}</div>*/}
        </div>
    );
};

export default CartSummary;
