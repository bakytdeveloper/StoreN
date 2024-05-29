

// src/components/Header/Header.js
import React, {useEffect, useRef, useState} from 'react';
import './Header.css';
import {Link, useHistory, useLocation} from 'react-router-dom';
import SellerRegistrationForm from "./SellerRegistrationForm/SellerRegistrationForm";
import './SellerRegistrationForm/SellerRegistrationForm.css'
import menuIcon from './menu-icon.png';
import './Header.css';


const Header = ({ onSearch, cartItems = [], showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter, setCurrentPage }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [catalogButtonColor, setCatalogButtonColor] = useState('initial');
    const [contactButtonColor, setContactButtonColor] = useState('initial');
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const isAuthenticated = localStorage.getItem('token');
    const history = useHistory();
    const profileRef = useRef(null);
    const [showSellerRegistration, setShowSellerRegistration] = useState(false);
    const location = useLocation();
    const [activePage, setActivePage] = useState('');

    useEffect(() => {
        const path = location.pathname;
        if (path === '/') {
            setActivePage('home');
        } else if (path === '/catalog') {
            setActivePage('catalog');
        } else if (path === '/contact') {
            setActivePage('contact');
        }
    }, [location.pathname]);

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
        setCurrentPage(1);
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
        history.push("/");
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
        const role = localStorage.getItem('role');
        if (isAuthenticated) {
            if (role === 'customer') {
                history.push("/profile");
            } else if (role === 'seller') {
                history.push("/sellerProfile");
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
    };

    // const handleCloseSidebar = () => {
    //     setShowSidebar(false);
    // };
    //
    // const handleSidebarToggle = () => {
    //     setShowSidebar(!showSidebar);
    // };

    const dropdownMenuClose = () => {
        setIsProfileOpen(false); // Закрываем меню
    }


    const totalItemsCount = cartItems.length > 0 ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

    return (
        <div className="header">
            <div className="header-left">
                <div className="title" onClick={handleTitleClick}>
                    <h1 className="titleH">kiosk<span className="titleN">.kg</span></h1>
                </div>
                <nav className="nav-links">
                    <Link to="/" className={`nav-link ${activePage === 'home' ? 'active-title' : ''}`}>Главная</Link>
                    <Link to="/catalog" className={`nav-link ${activePage === 'catalog' ? 'active-title' : ''}`}>Каталог</Link>
                </nav>
            </div>
            <div className="header-right">
                <div className="auth-buttons">
                    <div className="profileIcon" ref={profileRef}>
                        {!isProfileOpen && (
                            <span className="profileIcon-text" onClick={handleProfileClick}>Войти</span>
                        )}
                        {isProfileOpen && (
                            <div className="dropdown-menu">

                                <button onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>
                                {!isAuthenticated && <button className="dropdown-menu-partner" onClick={handlePartnerClick}>Партнёр</button>}
                                {isAuthenticated && <button className="dropdown-menu-logout" onClick={handleLogoutClick}>Выход</button>}
                                <span className="dropdown-menu-close" onClick={dropdownMenuClose} > &#10006;</span>
                            </div>
                        )}
                    </div>

                    {showSellerRegistration && (
                        <SellerRegistrationForm />
                    )}
                </div>
                <Link to="/cart" className="auth-button btn" onClick={handleCartClick}>
                    <span className="totalItems">Корзина ({totalItemsCount})</span>
                </Link>
                <div className="search">
                    <input type="text" placeholder="Поиск...&#128269;" value={searchTerm} onChange={handleSearchChange} />

                    {/*<Link to="/catalog">*/}
                    {/*    <img className="header-menu-icon" src={menuIcon} onClick={handleSidebarToggle} alt="Menu Icon" />*/}
                    {/*</Link>*/}

                </div>
            </div>
            <div className="mobile-buttons">
                <div className={`btn1 ${catalogButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleCatalogClick} style={{ backgroundColor: catalogButtonColor }}>
                    <Link style={{color:"white"}} to="/catalog" className="btn">Каталог товаров</Link>
                </div>
                <div className={`btn2 ${contactButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleContactClick} style={{ backgroundColor: contactButtonColor }}>
                    <Link  style={{color:"white"}} to="/contact" className="btn">Связаться с нами</Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
