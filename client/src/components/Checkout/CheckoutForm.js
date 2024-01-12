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
            alert('Please enter all required information');
            return;
        }

        // Вызовите функцию onSubmit с введенными данными
        onSubmit({
            firstName,
            lastName,
            email,
            address,
            phoneNumber,
            paymentMethod,
            comments,
        });
    };

    return (
        <div>
            <h2>Checkout</h2>
            <label>First Name:</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <label>Last Name:</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <label>Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Address:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            <label>Phone Number:</label>
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <label>Payment Method:</label>
            <input type="text" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />
            <label>Comments:</label>
            <textarea value={comments} onChange={(e) => setComments(e.target.value)} />

            <button onClick={handleSubmit}>Place Order</button>
        </div>
    );
};

export default CheckoutForm;
