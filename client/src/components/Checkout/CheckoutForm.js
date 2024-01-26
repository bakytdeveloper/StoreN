// // src/components/Checkout/CheckoutForm.js
// import React, { useState } from 'react';
//
// const CheckoutForm = ({ onSubmit }) => {
//     const [firstName, setFirstName] = useState('');
//     // const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [address, setAddress] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [paymentMethod, setPaymentMethod] = useState('');
//     const [comments, setComments] = useState('');
//
//     const handleSubmit = () => {
//         // Проверьте, что введены все необходимые данные
//         if (!firstName || !email || !address || !phoneNumber || !paymentMethod) {
//             alert('Пожалуйста, введите всю необходимую информацию');
//             return;
//         }
//
//         // Вызовите функцию onSubmit с введенными данными
//         onSubmit({
//             firstName,
//             email,
//             address,
//             phoneNumber,
//             paymentMethod,
//             comments,
//         });
//     };
//
//     return (
//         <div>
//             <h2>Оформите заказ</h2>
//             <label>Имя:</label>
//             <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//             {/*<label>Фамилия:</label>*/}
//             {/*<input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />*/}
//             <label>Email:</label>
//             <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
//             <label>Адрес доставки:</label>
//             <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
//             <label>Номер телефона:</label>
//             <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//             <label>Способ оплаты:</label>
//             <input type="text" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />
//             <label>Комментарии:</label>
//             <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
//
//             <button onClick={handleSubmit}>Place Order</button>
//         </div>
//     );
// };
//
// export default CheckoutForm;







// src/components/Checkout/CheckoutForm.js
import React, { useState, useEffect } from 'react';

const CheckoutForm = ({ onSubmit, user }) => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [comments, setComments] = useState('');


    console.log("U S E R :", user)

    // Используем useEffect, чтобы обновить значения полей при изменении пользователя
    useEffect(() => {
        if (user) {
            setFirstName(user.name);
            setEmail(user.email);
            setAddress(user.profile?.address || ''); // используем значение из профиля пользователя
            setPhoneNumber(user.profile?.phoneNumber || ''); // используем значение из профиля пользователя
        }
    }, [user]);

    const handleSubmit = () => {
        // Проверьте, что введены все необходимые данные
        if (!firstName || !email || !address || !phoneNumber || !paymentMethod) {
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
