// src/components/Header/Header.js
import React, {useEffect, useRef, useState} from 'react';
import './Header.css';
import {Link, useHistory, useLocation} from 'react-router-dom';
import SellerRegistrationForm from "./SellerRegistrationForm/SellerRegistrationForm";
import './SellerRegistrationForm/SellerRegistrationForm.css'
import search_header from './search.png';
import cross from "./../Footer/cross.png";
import './Header.css';
import {jwtDecode} from "jwt-decode";
import {FaRegHeart, FaShoppingCart, FaUser} from "react-icons/fa";

const Header = ({ onSearch, searchTerm, setSearchTerm, setIsFooterCatalog, cartItems = [], showSidebar, setShowSidebar, setSelectedOption, resetFilter, setCurrentPage }) => {
    const [catalogButtonColor, setCatalogButtonColor] = useState('initial');
    const [contactButtonColor, setContactButtonColor] = useState('initial');
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [userStatus, setUserStatus] = useState(null);
    const isAuthenticated = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    const history = useHistory();
    const profileRef = useRef(null);
    const [showSellerRegistration, setShowSellerRegistration] = useState(false);
    const location = useLocation();
    const [activePage, setActivePage] = useState('');
    const [lastPath, setLastPath] = useState(location.pathname);
    const [searchResultMessage, setSearchResultMessage] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5506';
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserStatus = async () => {
            const token = localStorage.getItem('token');
            const sellerId = token ? jwtDecode(token).sellerId : null;
            if (sellerId) {
                try {
                    const response = await fetch(`${apiUrl}/api/sellers/seller-status/${sellerId}`);
                    const data = await response.json();
                    setUserStatus(data.status);
                } catch (error) {
                    console.error('Error fetching seller status:', error);
                }
            }
        };

        fetchUserStatus();
    }, []);


    useEffect(() => {
        const path = location.pathname;
        if (path === '/') {
            setActivePage('home');
        } else if (path === '/catalog') {
            setActivePage('catalog');
        } else if (path === '/contact') {
            setActivePage('contact');
        } else if (path === '/cart') {
            setActivePage('cart');
        }  else if (path === '/favorites') {
            setActivePage('favorites');
        } else if (path === '/login' || path === '/profile') {
            setActivePage('login');
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

    useEffect(() => {
        if (isAuthenticated && userRole === 'admin') {
            history.push("/admin");
        }
    }, [isAuthenticated, userRole, history]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
        setSearchResultMessage(searchTerm);
        // Добавляем searchTerm в URL как параметр
        history.push(`/catalog?search=${encodeURIComponent(searchTerm)}`);
        setIsFooterCatalog(true);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        onSearch('');
        // Удаляем параметр search из URL
        const params = new URLSearchParams(location.search);
        params.delete('search');
        history.push({ search: params.toString() });
    };

    const handleCartClick = () => {
        if (cartItems.length > 0) {
            setActivePage('cart');
            history.push("/cart");
        } else {
            setActivePage('home');
            history.push("/");
        }
    };

    const handleTitleClick = () => {
        setActivePage('home');
        setSearchTerm("");
        resetFilter();
        history.push("/");
    };

    const handleContactClick = () => {
        setActivePage('contact');
        setSelectedOption('contact');
        setShowSidebar(!showSidebar);
        setContactButtonColor('lightblue');
        setCatalogButtonColor('initial');
    };

    const handleCatalogClick = () => {
        setActivePage('catalog');
        setSelectedOption('catalog');
        setShowSidebar(true); // Всегда показывать сайдбар при клике на каталог
        setCatalogButtonColor('lightblue');
        setContactButtonColor('initial');
    };

    const handleProfileClick = () => {
        console.log("Profile button clicked");
        setIsProfileOpen(!isProfileOpen);
    };


    const handleLoginClick = () => {
        setActivePage('login');
        if (isAuthenticated) {
            if (userStatus === 'suspend') {
                history.push("/login");
            } else if (userRole === 'admin') {
                history.push("/admin");
            } else {
                history.push("/profile");
            }
        } else {
            history.push("/login");
        }
        setIsProfileOpen(false);
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('status');

        setActivePage('home');
        history.push("/");
        setIsProfileOpen(false);

        // Перезагрузка страницы
        setTimeout(() => {
            window.location.reload();
        }, 300); // Короткая пауза для плавного обновления
    };

    const handlePartnerClick = () => {
        setIsProfileOpen(false);
        history.push("/sellers/register");
    };

    const dropdownMenuClose = () => {
        setIsProfileOpen(false);
    }

    const totalItemsCount = cartItems.length > 0 ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

    useEffect(() => {
        if (searchTerm === '') {
            setLastPath(location.pathname);
        }
    }, [searchTerm, location.pathname]);

    const [favoritesCount, setFavoritesCount] = useState(0);


    const fetchFavoritesCount = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const userId = jwtDecode(token)?.userId;
                if (userId) {
                    const response = await fetch(`${apiUrl}/api/users/${userId}/favorites`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    const favorites = await response.json();
                    setFavoritesCount(favorites.length);
                } else {

                    console.error('Invalid token: userId not found');
                }
            } catch (error) {

                console.error('Error fetching favorites:', error);
            }
        } else {
            setFavoritesCount(0);
        }
    };


    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        // Если токен есть и пользователь не админ
        if (token && role !== 'admin' && role !== 'seller') {
            fetchFavoritesCount(); // Первый вызов
            const intervalId = setInterval(fetchFavoritesCount, 2000); // Увеличил интервал до 5 сек

            return () => clearInterval(intervalId);
        } else {
            // Если токена нет или пользователь админ
            setFavoritesCount([]); // Сброс счетчика
        }
    }, [localStorage.getItem('token'), localStorage.getItem('role')]); // Зависимости


    const handleFavoritesClick = () => {
        if (favoritesCount > 0) {
            history.push('/favorites');
        } else {
            history.push('/');
            alert('У вас нет избранных товаров.');
        }
    };

    return (
        <div className="header-container">
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
                        <span className={`profileIcon-text ${activePage === 'login' ? 'active-title' : ''}`} onClick={handleProfileClick}>
                            <FaUser color="grey" className="icon" /> {/* Иконка пользователя */}
                            <span className={`button-label ${activePage === 'login' ? 'active-title' : ''}`}>{!!token ? 'Войти' : 'Логин'}</span>
                        </span>
                            {isProfileOpen && (
                                <div className={`dropdown-menu ${isProfileOpen ? 'show' : ''}`}>
                                    <span className="dropdown-menu-close" onClick={dropdownMenuClose}>&#10006;</span>
                                    {userStatus === 'suspend' ? (
                                        <>
                                            <button onClick={handleLoginClick}>Логин</button>
                                            <button className="dropdown-menu-partner" onClick={handlePartnerClick}>Партнёр</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>
                                            {isAuthenticated && <button className="dropdown-menu-logout" onClick={handleLogoutClick}>Выход</button>}
                                            {!isAuthenticated && <button className="dropdown-menu-partner" onClick={handlePartnerClick}>Партнёр</button>}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                        {showSellerRegistration && <SellerRegistrationForm />}
                    </div>
                    <div className="favorites" onClick={handleFavoritesClick}>
                        <span className="cartIcon">
                            <FaRegHeart color={favoritesCount > 0 ? "red" : "grey"} className="icon" />

                            {favoritesCount > 0 && <span className="totalItems favorites-count-check">{favoritesCount}</span>}

                             <span className={`button-label ${activePage === 'favorites' ? 'active-title' : ''}`}>Избранные</span>
                        </span>
                    </div>
                    <Link to="/cart" className="auth-button btn" onClick={handleCartClick}>
                    <span className="cartIcon cartOnly">
                        <FaShoppingCart color="grey" className="icon" /> {/* Иконка корзины */}
                        {totalItemsCount > 0 && <span className="totalItems">{totalItemsCount}</span>}
                        <span className={`button-label ${activePage === 'cart' ? 'active-title' : ''}`}>Корзина</span>
                    </span>
                    </Link>
                    <div className="search">
                        <form className="form-search" onSubmit={handleSearchSubmit}>
                            <input className="search-input" type="text" placeholder="Поиск..." value={searchTerm} onChange={handleSearchChange} />
                            <button className="search-cross" type="button" onClick={handleClearSearch}>
                                <img src={cross} alt="Clear search" />
                            </button>
                            <button className="search-button" type="submit">
                                <img className="search-button-img" src={search_header} alt="Search" />
                            </button>
                        </form>
                    </div>
                </div>
                <div className="mobile-buttons">
                    <div className={`btn1 ${catalogButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleCatalogClick} style={{ backgroundColor: catalogButtonColor }}>
                        <Link style={{ color: "white" }} to="/catalog" className="btn">Каталог товаров</Link>
                    </div>
                    <div className={`btn2 ${contactButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleContactClick} style={{ backgroundColor: contactButtonColor }}>
                        <Link style={{ color: "white" }} to="/contact" className="btn">Контакты</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
