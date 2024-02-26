
// src/components/Header/Header.js
import React, {useState} from 'react';
import './Header.css';
import {Link, useHistory} from 'react-router-dom';


import ins from "./instagram.png";
import tel from "./telegram.png";
import what from "./whatsapp.png";
import tik from "./tik-tok.png";
import profileIcon from "./profileIcon.png";
import cart from './trolley.png';
import burger from './menu.png';

const Header = ({ onSearch, cartItems, setShowSidebar, showSidebar }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Добавлен стейт для отслеживания статуса аутентификации
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const history = useHistory();

    const [showBurgerMenu, setShowBurgerMenu] = useState(false);

    const toggleBurgerMenu = () => {
        setShowBurgerMenu(!showBurgerMenu);
        setShowSidebar(!showSidebar);
    };


    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleCartClick = () => {
        // Проверка наличия товаров в корзине
        if (totalItems > 0) {
            // Перейти на страницу корзины
            history.push("/cart");
        } else {
            // Перейти на главную страницу, если корзина пуста
            history.push("/");
        }
    };

    const handleLogout = () => {
        // Дополнительные действия при выходе, если необходимо
        // ...

        // Сброс статуса аутентификации
        setIsLoggedIn(false);

        // Перезагрузка страницы
        window.location.reload();
    };

    return (
        <div className="header">
            <Link to="/" className="title" >
                 <span className="burger" onClick={toggleBurgerMenu}>
                      <img className="burger" src={burger} />
                 </span>
                <h1 className="titleH"> kiosk<span className="titleN">.kg</span></h1>
            </Link>
            <div className="contact">

                <div className="phone">
                    <a style={{color:"white"}} href="tel:+996703524643">+0(123) 777 777</a>
                </div>
                <div className="social-icons">
                    <a href="https://www.tiktok.com/" >
                        <img className="icon" src={tik} alt="Instagram Icon" />
                    </a>

                    <a href="https://web.whatsapp.com/">
                        <img className="icon" src={what} alt="Instagram Icon" />
                    </a>
                    <a  href="https://www.instagram.com/">
                        <img className="icon ins" src={ins} alt="Instagram Icon" />
                    </a>
                    <a  href="https://web.telegram.org/">
                        <img className="icon" src={tel} alt="Instagram Icon" />
                    </a>
                </div>
            </div>
            <div className="search">
                <input type="text"
                       placeholder="Поиск...&#128269;"
                       value={searchTerm}
                       onChange={handleSearchChange} />
            </div>
            {/*<Link to="/cart" className="auth-button btn" onClick={handleCartClick}> <img src={trol} alt="Cart Icon" /> ({totalItems})</Link>*/}
            <div className="auth-buttons">
                <Link to="/cart" style={{display: "inline-flex"}} className="auth-button btn" onClick={handleCartClick}>
                    <img src={cart} alt="Cart Icon" />
                    <span className="totalItems">
                    {/*<span className="totalItems" style={{color: "white" , marginTop: "17px", marginLeft: "-25px"}}>*/}
                        ({totalItems})
                    </span>
                </Link>

                {isLoggedIn ? (
                    // Если пользователь аутентифицирован, показываем кнопку Logout
                    <button className="auth-btn" onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    // Если пользователь не аутентифицирован, показываем кнопку Login/Register
                    <Link to="/login" className="auth-btn" onClick={() => setIsLoggedIn(true)}>
                        Login/Register
                    </Link>
                )}
                <Link to="/profile" className="profileIcon">
                    <img src={profileIcon} alt="profileIcon"/>
                </Link>
            </div>
        </div>
    );
};

export default Header;



// sudo tail -f /var/log/nginx/error.log


// server {
//     listen 80;
//     listen [::]:80;
//
//     root /var/www/kiosk.kg/html;
//     index index.html index.htm index.nginx-debian.html;
//
//     server_name kiosk.kg;
//
//     location / {
//         try_files $uri $uri/ =404;
// }
// }