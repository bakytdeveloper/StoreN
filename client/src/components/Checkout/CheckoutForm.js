// src/components/Checkout/CheckoutForm.js
import React, { useState } from 'react';

const CheckoutForm = ({ onSubmit }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [comments, setComments] = useState('');

    const handleSubmit = () => {
        // Проверьте, что введены все необходимые данные
        if (!firstName || !lastName || !email || !address || !phoneNumber || !paymentMethod) {
            alert('Пожалуйста, введите всю необходимую информацию');
            return;
        }

        // Вызовите функцию onSubmit с введенными данными
        onSubmit({
            firstName,
            email,
            address,
            phoneNumber,
            paymentMethod,
            comments,
        });
    };

    return (
        <div>
            <h2>Оформите заказ</h2>
            <label>Имя:</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            {/*<label>Фамилия:</label>*/}
            {/*<input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />*/}
            <label>Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Адрес доставки:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            <label>Номер телефона:</label>
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <label>Способ оплаты:</label>
            <input type="text" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />
            <label>Комментарии:</label>
            <textarea value={comments} onChange={(e) => setComments(e.target.value)} />

            <button onClick={handleSubmit}>Place Order</button>
        </div>
    );
};

export default CheckoutForm;
