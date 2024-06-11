

import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../Header.css';
import { toast } from 'react-toastify'; // Импортируем библиотеку react-toastify
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import './SellerRegistrationForm.css';

const SellerRegistrationForm = ({ onSubmit, setShowSidebar }) => {
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

    useEffect(() => {
        setShowSidebar(true);
        return () => setShowSidebar(true);
    }, [setShowSidebar]);


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
            toast.success('Ваш запрос на позицию продавца принят! Ожидайте одобрения.');
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
        <div className="seller-registration">
            <h2 className="seller-registration-title" >СТАТЬ ПАРТНЕРОМ</h2>
            <div className="seller-registration-close" type="button" onClick={handleClose}>
                &#10006;
            </div>
            <form className="seller-add-form" onSubmit={handleSubmit}>
                <label>Электронная почта:</label>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <label>Имя:</label>
                <input type="text" name="firstName" placeholder="введите свое имя" value={formData.firstName} onChange={handleChange} required />
                <label>Фамилия:</label>
                <input type="text" name="lastName" placeholder="введите свое имя фамилия" value={formData.lastName} onChange={handleChange} required />
                <label>Название компании:</label>
                <input type="text" name="companyName" placeholder="введите название своей компании" value={formData.companyName} onChange={handleChange} required />
                <label>Телефонный №:</label>
                <input type="tel" name="phone" placeholder="введите свой номер телефона" value={formData.phone} onChange={handleChange} required />
                <label>Фактический адрес компании:</label>
                <input type="text" name="address" placeholder="введите адрес компании" value={formData.address} onChange={handleChange} required />
                <label>О Компании:</label>
                <textarea name="companyDescription" placeholder="Расскажите о своих товарах" value={formData.companyDescription} onChange={handleChange} required />

                <label>Пароль:</label>
                <div className="password-input-container" style={{ position: 'relative' }}>
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="придумайте надежный пароль"
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

                <button className="seller-form-button" type="submit">Отправить</button>
            </form>
        </div>
    );
};

export default SellerRegistrationForm;

