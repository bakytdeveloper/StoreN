
// // src/components/Header/Header.js
// import React, {useState} from 'react';
// import './Header.css';
// import {Link, useHistory} from 'react-router-dom';
//
//
// import ins from "./instagram.png";
// import tel from "./telegram.png";
// import what from "./whatsapp.png";
// import tik from "./tik-tok.png";
// import profileIcon from "./profileIcon.png";
// import cart from './trolley.png';
// import burger from './burger.png';
//
//
// const Header = ({ onSearch, cartItems, setShowSidebar, showSidebar, resetFilter }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
//     const history = useHistory();
//
//     const [showBurgerMenu, setShowBurgerMenu] = useState(false);
//
//     const toggleBurgerMenu = () => {
//
//         setShowSidebar(!showSidebar);
//         // setShowSidebar(prevState => !prevState);
//         setShowBurgerMenu(!showBurgerMenu);
//     };
//
//     const handleSearchChange = (e) => {
//         const value = e.target.value;
//         setSearchTerm(value);
//         onSearch(value);
//     };
//
//     const handleCartClick = () => {
//         if (totalItems > 0) {
//             history.push("/cart");
//         } else {
//             history.push("/");
//         }
//     };
//
//     const handleLogout = () => {
//         setIsLoggedIn(false);
//         window.location.reload();
//     };
//
//     const handleTitleClick = () => {
//         resetFilter(); // Вызов функции для сброса фильтрации
//         history.push("/");
//     };
//
//     return (
//         <div className="header">
//             <Link to="/" className="title" onClick={handleTitleClick}> {/* Добавлен обработчик события onClick */}
//                 <span className="burger" onClick={toggleBurgerMenu}>
//                     <img className="burger" src={burger} />
//                 </span>
//                 <h1 className="titleH"> kiosk<span className="titleN">.kg</span></h1>
//             </Link>
//             <div className="contact">
//                 <div className="phone">
//                     <a href="tel:+996508100777">0 (508) 100 777</a>
//                 </div>
//                 <div className="social-icons">
//                     <a href="https://www.tiktok.com/" >
//                         <img className="icon" src={tik} alt="Instagram Icon" />
//                     </a>
//                     <a href="https://api.whatsapp.com/send?phone=996508100777">
//                         <img className="icon" src={what} alt="WhatsApp Icon" />
//                     </a>
//
//                     <a  href="https://www.instagram.com/">
//                         <img className="icon ins" src={ins} alt="Instagram Icon" />
//                     </a>
//                     <a href="https://t.me/kanatasa?phone=+996508100777">
//                         <img className="icon" src={tel} alt="Telegram Icon" />
//                     </a>
//
//                 </div>
//             </div>
//             <div className="search">
//                 <input type="text"
//                        placeholder="Поиск...&#128269;"
//                        value={searchTerm}
//                        onChange={handleSearchChange} />
//             </div>
//             <div className="auth-buttons">
//                 <Link to="/cart" style={{display: "inline-flex"}} className="auth-button btn" onClick={handleCartClick}>
//                     <img src={cart} alt="Cart Icon" />
//                     <span className="totalItems">
//                         ({totalItems})
//                     </span>
//                 </Link>
//                 {isLoggedIn ? (
//                     <button className="auth-btn" onClick={handleLogout}>
//                         Logout
//                     </button>
//                 ) : (
//                     <Link to="/login" className="auth-btn" onClick={() => setIsLoggedIn(true)}>
//                         Login/Register
//                     </Link>
//                 )}
//                 <Link to="/profile" className="profileIcon">
//                     <img src={profileIcon} alt="profileIcon"/>
//                 </Link>
//             </div>
//         </div>
//     );
// };
//
// export default Header;





// src/components/Header/Header.js
import React, { useState } from 'react';
import './Header.css';
import { Link, useHistory } from 'react-router-dom';
import ins from "./instagram.png";
import tel from "./telegram.png";
import what from "./whatsapp.png";
import tik from "./tik-tok.png";
import profileIcon from "./profileIcon.png";
import cart from './trolley2.png';
import burger from './burger.png';
import ContactInfo from './ContactInfo';

const Header = ({ onSearch, cartItems, showSidebar,
                    setShowSidebar, selectedOption,
                    setSelectedOption, resetFilter }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const history = useHistory();
    const [isProfileOpen, setIsProfileOpen] = useState(false); // Добавляем состояние для открытой страницы профиля


    const isAuthenticated = localStorage.getItem('token'); // Проверка аутентификации


    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleCartClick = () => {
        if (totalItems > 0) {
            history.push("/cart");
        } else {
            history.push("/");
        }
    };

    const handleTitleClick = () => {
        resetFilter();
        history.push("/");
    };


    const handleContactClick = () => {
        setSelectedOption('contact');
        setShowSidebar(!showSidebar);
    };

    const handleCatalogClick = () => {
        setSelectedOption('catalog');
        setShowSidebar(!showSidebar);
    };

    // // Функция для перехода на страницу профиля или страницу логина
    // const handleProfileClick = () => {
    //     if (isAuthenticated) {
    //         history.push("/profile");
    //     } else {
    //         history.push("/login");
    //     }
    // };

    // Функция для перехода на страницу профиля или страницу логина и открытия/закрытия
    const handleProfileClick = () => {
        if (isAuthenticated) {
            if (!isProfileOpen) {
                history.push("/profile");
            } else {
                history.push("/");
            }
            setIsProfileOpen(!isProfileOpen);
        } else {
            history.push("/login");
        }
    };


    return (
        <div className="header">
            <Link to="/" className="title" onClick={handleTitleClick}>

                <h1 className="titleH"> kiosk<span className="titleN">.kg</span></h1>
            </Link>
            {/* Показывать контактную информацию только на больших экранах */}
            <div className="desktop-contact-info">
                <ContactInfo />
            </div>
            <div className="search">
                <input type="text"
                       placeholder="Поиск...&#128269;"
                       value={searchTerm}
                       onChange={handleSearchChange} />
            </div>
            <div className="auth-buttons">
                <Link to="/cart" style={{ display: "inline-flex" }} className="auth-button btn" onClick={handleCartClick}>
                    <img src={cart} alt="Cart Icon" />
                    <span className="totalItems">
                        ({totalItems})
                    </span>
                </Link>
                <div className="profileIcon" onClick={handleProfileClick}>
                    <img src={profileIcon} alt="profileIcon" />
                </div>
            </div>
            <div className="mobile-buttons">
                <div className="btn1"  onClick={() => { setShowSidebar(!showSidebar); setSelectedOption('catalog'); }}>
                    <Link to="/catalog" className="btn">Каталог товаров</Link>
                </div>
                <div className="btn2" onClick={() => { setShowSidebar(!showSidebar); setSelectedOption('contact'); }}>
                    <Link to="/contact" className="btn" >Связаться с нами</Link>
                </div>
            </div>

        </div>
    );
};

export default Header;


