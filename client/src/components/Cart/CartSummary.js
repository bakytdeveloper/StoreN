import React from 'react';
import "./CartSummary.css"

const CartSummary = ({ totalPrice, handleCheckout, handleClearCart }) => {
    return (
        <div>
            <div className="total-price">Общая сумма: {totalPrice.toFixed(2)}</div>
            <button className="checkout-btn" onClick={handleCheckout}>Оформить заказ</button>
            <button className="clear-cart-btn" onClick={handleClearCart}>Очистить корзину</button>
        </div>
    );
};

export default CartSummary;

