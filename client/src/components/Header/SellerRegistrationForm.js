import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SellerRegistrationForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        companyName: '',
        companyDescription: '',
        password: '' // Добавлено поле пароля
    });
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleClose = () => {
        history.push('/');
    };

    

    return (
        <div style={{ marginTop: "181px" }}>
            <h2>Станьте продавцом</h2>
            <form onSubmit={handleSubmit}>
                <span className="formCloseLogin" type="button" onClick={handleClose}>
                    &#10006;
                </span>
                <input type="text" name="companyName" placeholder="Название компании" value={formData.companyName} onChange={handleChange} required />
                <input type="text" name="firstName" placeholder="Имя" value={formData.firstName} onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Фамилия" value={formData.lastName} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleChange} required /> {/* Поле пароля */}
                <input type="tel" name="phone" placeholder="Телефон" value={formData.phone} onChange={handleChange} required />
                <textarea name="companyDescription" placeholder="Описание компании" value={formData.companyDescription} onChange={handleChange} required />
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
};

export default SellerRegistrationForm;
