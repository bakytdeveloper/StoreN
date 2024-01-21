// src/components/Header/Header.js

import React, {useState} from 'react';
import './Header.css';
import {Link, useHistory} from 'react-router-dom';

import ins from "./instagram.png";
import tel from "./telegram.png";
import what from "./whatsapp.png";
import tik from "./tik-tok.png";

import trol from './trolley.png'

const Header = ({ onSearch, cartItems }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const history = useHistory();


    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleCartClick = () => {
        // Проверка наличия товаров в корзине
        if (totalItems > 0) {
            // Перейти на страницу корзины
            // Можете изменить "/cart" на ваш путь к корзине
            // В данном примере я использовал "/"
            window.location.href = "/cart";
        } else {
            // Перейти на главную страницу, если корзина пуста
            // Можете изменить "/" на ваш путь к главной странице
            window.location.href = "/";
        }
    };

    return (
        <div className="header">
            <Link to="/" className="title">
                <h1 style={{fontSize: "35px"}} className="title"> Store <span className="sp">N</span></h1>
            </Link>
            <div className="contact">
                <div className="phone">XXX-XX-XX-XX</div>
                <div className="social-icons">
                    <a className="icon"  href="https://www.tiktok.com/" >
                        <img src={tik} alt="Instagram Icon" />
                    </a>

                    <a href="https://web.whatsapp.com/">
                        <img className="icon" src={what} alt="Instagram Icon" />
                    </a>
                    <a   href="https://www.instagram.com/">
                        <img className="icon" src={ins} alt="Instagram Icon" />
                    </a>
                    <a className="icon"  href="https://web.telegram.org/">
                        <img src={tel} alt="Instagram Icon" />
                    </a>
                </div>
            </div>
            <div className="auth-buttons">
                <Link to="/login" className="auth-button">Login/Register</Link>
                <Link to="/profile" className="auth-button">Profile</Link>
                {/*<Link to="/cart" className="auth-button btn"> <img src={trol} alt="Instagram Icon" /> ({totalItems})</Link>*/}
            </div>
            
            <Link to="/cart" className="auth-button btn" onClick={handleCartClick}> <img src={trol} alt="Cart Icon" /> ({totalItems})</Link>
            {/*<Link to="/cart" className="auth-button btn"> <img src={trol} alt="Cart Icon" /> ({totalItems})</Link>*/}

            <div className="search">
                <input type="text"

                    placeholder="Поиск..."
                    value={searchTerm}
                    onChange={handleSearchChange} />
            </div>
        </div>
    );
};

export default Header;

// <div className="cart">
//     <Link to="/cart" className="cart-icon">
//         🛒
//     </Link>
//     <span className="cart-count">{cartItems.length}</span>
// </div>