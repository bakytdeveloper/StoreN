

// src/components/Header/Header.js
import React, {useEffect, useRef, useState} from 'react';
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
import SellerRegistrationForm from "./SellerRegistrationForm";




const Header = ({ onSearch, cartItems=[], showSidebar,
                    setShowSidebar, selectedOption, setSelectedOption,
                    resetFilter, setCurrentPage }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [catalogButtonColor, setCatalogButtonColor] = useState('initial');
    const [contactButtonColor, setContactButtonColor] = useState('initial');
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const isAuthenticated = localStorage.getItem('token');
    const history = useHistory();
    const profileRef = useRef(null);
    const [showSellerRegistration, setShowSellerRegistration] = useState(false); // Добавляем состояние для отображения формы регистрации продавца


    useEffect(() => {
        if (showSidebar) {
            setCatalogButtonColor('initial');
            setContactButtonColor('initial');
        }
    }, [showSidebar]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setCurrentPage(1); // Перемещаемся на первую страницу при изменении поискового запроса
        onSearch(value);
    };


    const handleCartClick = () => {
        if (cartItems.length > 0) {
            history.push("/cart");
        } else {
            history.push("/");
        }
    };

    const handleTitleClick = () => {
        resetFilter();
        history.push("/catalog");
    };

    const homePage = () => {
        resetFilter();
        history.push("/");
    };

    const handleContactClick = () => {
        setSelectedOption('contact');
        setShowSidebar(!showSidebar);
        setContactButtonColor('lightblue');
        setCatalogButtonColor('initial');
    };

    const handleCatalogClick = () => {
        setSelectedOption('catalog');
        setShowSidebar(!showSidebar);
        setCatalogButtonColor('lightblue');
        setContactButtonColor('initial');
    };

    const handleProfileClick = () => {
        setIsProfileOpen(!isProfileOpen);
        const role = localStorage.getItem('role'); // Получаем роль пользователя или администратора
        if (isAuthenticated) {
            if (role === 'customer') {
                history.push("/profile"); // Перенаправляем на страницу профиля клиента при клике на профиль, если пользователь аутентифицирован
            } else if (role === 'seller') {
                history.push("/sellerProfile"); // Перенаправляем на страницу профиля продавца при клике на профиль, если пользователь аутентифицирован как продавец
            }
        }
    };


    const handleLoginClick = () => {
        if (isAuthenticated) {
            history.push("/profile");
        } else {
            history.push("/login");
        }
        setIsProfileOpen(false);
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        history.push("/");
        setIsProfileOpen(false);
    };

    const handlePartnerClick = () => {
        setIsProfileOpen(false);
        history.push("/sellers/register");
        // setShowSellerRegistration(true); // Показать форму регистрации продавца при клике на "Партнёр"
    };


    const handleCloseSidebar = () => {
        setShowSidebar(false);
    };

    const totalItemsCount = cartItems.length > 0 ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;



    return (
        <div className="header">
            <div className="title"  onClick={handleTitleClick}>
                <h1 className="titleH"> kiosk<span className="titleN">.kg</span></h1>
            </div>
            <div className="desktop-contact-info" onClick={homePage}>
                <ContactInfo />
                {/* Контактная информация */}
            </div>
            <div className="search">
                <input type="text" placeholder="Поиск...&#128269;" value={searchTerm} onChange={handleSearchChange} />
            </div>
            <div className="auth-buttons">
                <Link to="/cart" style={{ display: "inline-flex" }} className="auth-button btn" onClick={handleCartClick}>
                    <img src={cart} alt="Cart Icon" />
                    <span className="totalItems">({totalItemsCount})</span>


                </Link>
                <div className="profileIcon" ref={profileRef}>
                    <img src={profileIcon} alt="profileIcon" onClick={handleProfileClick} />
                    {isProfileOpen && (
                        <div className="dropdown-menu">
                            <button onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>
                            {!isAuthenticated && <button onClick={handlePartnerClick}>Партнёр</button>}
                            {isAuthenticated && <button onClick={handleLogoutClick}>Выход</button>}
                        </div>
                    )}
                </div>
                {showSellerRegistration && (
                    <SellerRegistrationForm /> // Отображаем форму регистрации продавца
                )}
            </div>
            <div className="mobile-buttons">
                <div className={`btn1 ${catalogButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleCatalogClick} style={{ backgroundColor: catalogButtonColor }}>
                    <Link to="/catalog" className="btn">Каталог товаров</Link>
                </div>
                <div className={`btn2 ${contactButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleContactClick} style={{ backgroundColor: contactButtonColor }}>
                    <Link to="/contact" className="btn">Связаться с нами</Link>
                </div>
            </div>
        </div>
    );
};

export default Header;