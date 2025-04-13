import React from 'react';

const CartSummary = ({ totalPrice }) => {
    return (
        <div className="checkList">
            <div className="total-price">Общая сумма: <strong>{totalPrice}</strong> сом</div>
        </div>
    );
};

export default CartSummary;
