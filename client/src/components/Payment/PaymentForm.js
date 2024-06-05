import React from 'react';

const PaymentForm = () => {
    return (
        <div className="payment-form" style={{textAlign:"center"}}>
            <h1 className="payment-form-h1">Спасибо, ваш заказ принят</h1>
            <h2 className="payment-form-h2-1">Вам перезвонить оператор через несколько минут</h2>
            <h2 className="payment-form-h2-2" style={{color:"blue"}}>Ожидайте звонка</h2>
        </div>
    );
};

export default PaymentForm;