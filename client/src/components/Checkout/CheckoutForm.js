//
//
// // src/components/Checkout/CheckoutForm.js
// import React, { useState, useEffect } from 'react';
//
// const CheckoutForm = ({ onSubmit, user }) => {
//     const [firstName, setFirstName] = useState('');
//     const [email, setEmail] = useState('');
//     const [address, setAddress] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [paymentMethod, setPaymentMethod] = useState('');
//     const [comments, setComments] = useState('');
//
//
//     // Используем useEffect, чтобы обновить значения полей при изменении пользователя
//     useEffect(() => {
//         if (user) {
//             setFirstName(user.name);
//             setEmail(user.email);
//             setAddress(user.profile?.address || ''); // используем значение из профиля пользователя
//             setPhoneNumber(user.profile?.phoneNumber || ''); // используем значение из профиля пользователя
//         }
//     }, [user]);
//
//     const handleSubmit = () => {
//         // Проверьте, что введены все необходимые данные
//         if (!firstName || !email || !address || !phoneNumber) {
//             alert('Пожалуйста, заполните Обязательные поля для заполнениня');
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
//
//     return (
//         <div>
//             <h2>Оформите заказ</h2>
//             <div style={{fontSize: "10px", fontWeight: "bold"}}>Обязательные поля для заполнениня- "<span style={{fontWeight: "bold", color: "red", fontSize: "20px"}}>*</span>"</div>
//             <label><span style={{fontWeight: "bold", color: "red", fontSize: "20px"}}>*</span> Имя:</label>
//             <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//             <label><span style={{fontWeight: "bold", color: "red", fontSize: "20px"}}>*</span> Email:</label>
//             <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
//             <label><span style={{fontWeight: "bold", color: "red", fontSize: "20px"}}>*</span>  Адрес доставки:</label>
//             <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
//             <label><span style={{fontWeight: "bold", color: "red", fontSize: "20px"}}>*</span> Номер телефона:</label>
//             <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//             <label> Способ оплаты:</label>
//             <input type="text" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />
//             <label>Комментарии:</label>
//             <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
//             <button onClick={handleSubmit}>Подтвердить заказ</button>
//         </div>
//     );
// };
//
// export default CheckoutForm;





import React, { useState, useEffect } from 'react';

const CheckoutForm = ({ onSubmit, user, onClose }) => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [comments, setComments] = useState('');

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
        if (!firstName || !email || !address || !phoneNumber) {
            alert('Пожалуйста, заполните Обязательные поля для заполнения');
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

    const handleCancel = () => {
        // Сбросить значения полей и закрыть форму
        setFirstName('');
        setEmail('');
        setAddress('');
        setPhoneNumber('');
        setPaymentMethod('');
        setComments('');
        onClose();
    };

    return (
        <div>
            <h2>Оформите заказ</h2>
            <div style={{ fontSize: "10px", fontWeight: "bold" }}>Обязательные поля для заполнения - "<span style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}>*</span>"</div>
            <label><span style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}>*</span> Имя:</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <label><span style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}>*</span> Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label><span style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}>*</span>  Адрес доставки:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            <label><span style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}>*</span> Номер телефона:</label>
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <label> Способ оплаты:</label>
            <input type="text" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />
            <label>Комментарии:</label>
            <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
            <div>
                <button onClick={handleSubmit}>Подтвердить заказ</button>
                <button onClick={handleCancel}>Отмена</button>
            </div>
        </div>
    );
};

export default CheckoutForm;
