

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Header.css';
import { toast } from 'react-toastify'; // Импортируем библиотеку react-toastify
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SellerRegistrationForm = ({ onSubmit }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        companyName: '',
        companyDescription: '',
        password: '',
        address: ''
    });
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5505';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const checkEmailUrl = `${apiUrl}/api/users/checkEmail?email=${formData.email}`;
            const emailResponse = await fetch(checkEmailUrl);
            const emailData = await emailResponse.json();

            if (!emailResponse.ok) {
                toast.error(emailData.message || 'Произошла ошибка при проверке email');
                return;
            }

            if (!emailData.unique) {
                toast.error('Такой email уже зарегистрирован как клиент');
                return;
            }

            await axios.post(`${apiUrl}/api/sellers/register`, formData);
            toast.success('Ваш запрос на позицию продавца принят👍! Ожидайте одобрения.');
            history.push('/');
        } catch (error) {
            console.error('Error registering seller:', error);
            toast.error('Произошла ошибка при регистрации');
        }
    };

    const handleClose = () => {
        history.push('/');
    };

    return (
        <div className="sellerRegistration">
            <h2>Станьте продавцом</h2>
            <p className="SellerRegistrationClose" type="button" onClick={handleClose}>
                &#10006;
            </p>
            <form className="sellerAddForm" onSubmit={handleSubmit}>
                <input type="text" name="companyName" placeholder="Название компании" value={formData.companyName} onChange={handleChange} required />
                <input type="text" name="firstName" placeholder="Имя" value={formData.firstName} onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Фамилия" value={formData.lastName} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <div className="password-input-container" style={{ position: 'relative' }}>
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange} required
                    />
                    <span
                        style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ?  <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <input type="tel" name="phone" placeholder="Телефон" value={formData.phone} onChange={handleChange} required />
                <input type="text" name="address" placeholder="Адрес" value={formData.address} onChange={handleChange} required />
                <textarea name="companyDescription" placeholder="Описание компании" value={formData.companyDescription} onChange={handleChange} required />
                <button className="sellerForm" type="submit">Отправить</button>
            </form>
        </div>
    );
};

export default SellerRegistrationForm;

