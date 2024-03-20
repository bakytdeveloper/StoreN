import React from 'react';
import "./CartSummary.css"

const CartSummary = ({ totalPrice, handleCheckout, handleClearCart }) => {
    return (
        <div className="checkList">
            <div className="total-price">Общая сумма: {totalPrice.toFixed(2)}</div>
            {/*<div className="checkBtn">*/}
            {/*    <button className="checkout-btn" onClick={handleCheckout}>Оформить заказ</button>*/}
            {/*    <button className="clear-cart-btn" onClick={handleClearCart}>Очистить корзину</button>*/}
            {/*</div>*/}
         </div>
    );
};

export default CartSummary;

