import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Footer.css';
import homeIcon from './home-icon.png';
import catalogPageIcon from './bucklet-icon.png';
import cartIcon from './cart-icon.png';
import profileIcon from './priffile-icon.png';
import ContactInfoFooter from "./ContactInfoFooter";
import cross from './cross.png';
import {jwtDecode} from "jwt-decode";
import {FaRegHeart} from "react-icons/fa";

const Footer = ({
                    onSearch,
                    cartItems = [],
                    showSidebar,
                    setShowSidebar,
                    setSelectedOption,
                    resetFilter,
                    setCurrentPage,
                    setActiveComponent,
                    activeComponent,
                    setIsFooterCatalog
                }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const history = useHistory();
    const profileRef = useRef(null);
    const location = useLocation();
    const [activeButton, setActiveButton] = useState(null);
    const [prevPath, setPrevPath] = useState(null);
    const [buttonClick, setButtonClick] = useState(null);

    const isAuthenticated = !!localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5505';
    const [favoritesCount, setFavoritesCount] = useState(0);

    useEffect(() => {
        // Перенаправление на страницу админа, если администратор
        if (isAuthenticated && userRole === 'admin') {
            history.push("/admin");
        }
    }, [isAuthenticated, userRole, history]);


    useEffect(() => {
        if (!showSidebar) {
            setActiveButton(null);
        }
    }, [showSidebar]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setActiveComponent(null);
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (buttonClick === 'login') {
            if (isAuthenticated) {
                if (userRole === 'admin') {
                    history.push("/admin");
                } else {
                    history.push("/profile");
                }
            } else {
                history.push("/login");
            }
            setIsProfileOpen(false);
        } else if (buttonClick === 'logout') {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            history.push("/");
            setIsProfileOpen(false);
        } else if (buttonClick === 'partner') {
            setIsProfileOpen(false);
            history.push("/sellers/register");
        }
        setActiveComponent(null);
        setButtonClick(null);
    }, [buttonClick, isAuthenticated, userRole, history]);



    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setCurrentPage(1);
        onSearch(value);
    };

    const handleButtonClick = (buttonName, component) => {
        if (buttonName === 'cart' || buttonName === 'contact') {
            if (!prevPath) {
                setPrevPath(location.pathname);
            }
        }
        setActiveComponent((prevComponent) => {
            if (prevComponent === component) {
                return null;
            } else {
                return component;
            }
        });
    };

    const handleCartClick = () => {
        if (activeComponent === 'cart') {
            setActiveComponent(null);
            setShowSidebar(false);
            history.push(prevPath || "/");
        } else {
            if (cartItems.length > 0) {
                history.push("/cart");
            } else {
                setShowSidebar(true);
            }
            handleButtonClick('cart', 'cart');
        }
    };

    const handleContactClick = () => {
        if (isContactModalOpen) {
            setActiveComponent(null);
            setIsContactModalOpen(false);
            setButtonClick(null);
            history.push(prevPath || "/");
        } else {
            setIsContactModalOpen(true);
            handleButtonClick('contact', 'contact');
        }
    };

    const handleCatalogClick = () => {
        // Сброс фильтров и текущей страницы
        resetFilter(); // вызов функции сброса фильтров
        setCurrentPage(1); // сброс страницы на первую

        // Обновление состояния и переход на страницу каталога
        history.push('/catalog?page=1');
        setSelectedOption('catalog');
        setShowSidebar(prevState => !prevState);
        setIsFooterCatalog(prevState => !prevState);
        handleButtonClick('catalog', 'catalog');
    };

    const handleProfileClick = () => {
        if (activeComponent === 'profile') {
            setActiveComponent(null);
            setIsProfileOpen(false);
        } else {
            setIsProfileOpen(true);
            handleButtonClick('profile', 'profile');
        }
    };

    const handleLoginClick = () => {
        setButtonClick('login');
    };

    const handleLogoutClick = () => {
        setButtonClick('logout');
    };

    const handlePartnerClick = () => {
        setButtonClick('partner');
    };

    const closeDropoutLogin = () => {
        setActiveComponent(null);
        setIsProfileOpen(false);
    };

    // const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalItemsCount = cartItems.length > 0 ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

    console.log("totalItemsCount", totalItemsCount)

    const closeContactModal = () => {
        setIsContactModalOpen(false);
        setActiveComponent(null);
    };

    const fetchFavoritesCount = async () => {
        const token = localStorage.getItem('token');

        if (token) {  // Убедитесь, что токен существует
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

            // Если токен отсутствует, вы можете установить счетчик в 0 или выполнить другие действия
            setFavoritesCount(0);
        }
    };


    useEffect(() => {
        fetchFavoritesCount(); // Initial fetch
        const intervalId = setInterval(fetchFavoritesCount, 1000); // Fetch every 5 seconds

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, []);


    const handleFavoritesClick = () => {
        if (favoritesCount > 0) {
            history.push('/favorites');
        } else {
            // Можно либо перенаправить пользователя на другую страницу, либо показать сообщение
            history.push('/');
            alert('У вас нет избранных товаров.');
        }
    };

    console.log("favoritesCount:", favoritesCount)
    const token = localStorage.getItem('token');

    return (
        <div className="footer-page">
            <div className={`home-icon ${activeComponent === 'home' ? 'active' : ''}`} onClick={() => handleButtonClick('home', 'home')}>
                <Link to="/" >
                    <img className="home-icon-img" src={homeIcon} />
                    <div>
                        <span className="home-icon-link">Главная</span>
                    </div>
                </Link>
            </div>

            <div className={`catalog-icon ${!showSidebar ? 'active' : ''}`} onClick={handleCatalogClick}>
                <img className="catalog-icon-img" src={catalogPageIcon} />
                <div>
                    <span className="catalog-icon-link catalog-header">Каталог</span>
                </div>
            </div>

            <div className={`cart-icon ${activeComponent === 'cart' ? 'active' : ''}`} onClick={handleCartClick}>
                <Link to="/cart" className="footer-auth-button btn">
                    <img className="cart-icon-img" src={cartIcon} />
                    {totalItemsCount > 0 && (
                        <div className="total-items-count"><span>{totalItemsCount}</span></div>
                    )}
                    <div className="footer-totalItems">
                        <span className="footer-totalItems">Корзина</span>
                    </div>
                </Link>
            </div>

            <div className={`contact-icon ${activeComponent === 'contact' ? 'active' : ''}`} onClick={handleFavoritesClick}>
                        {/*<span className="cartIcon">*/}
                            <FaRegHeart className="contact-icon-img footer-favorites"  color={favoritesCount > 0 ? "red" : "grey"} />

                            {favoritesCount > 0 && <div className="total-items-count footer-total">{favoritesCount}</div>}

                            <span className="footer-btn">Избранные</span>

            </div>


            <div className={`profile-icon ${activeComponent === 'profile' ? 'active' : ''}`} onClick={handleProfileClick}>
                <img className="profile-icon-img" src={profileIcon} />
                <div className="footer-profileIcon" ref={profileRef}>

                    {!isProfileOpen && (
                        <span className="profile-icon-link">
                            {isAuthenticated ? 'Войти' : "Логин"}
                        </span>
                    )}

                    {isProfileOpen && (
                        <div className="footer-dropdown-menu">
                            <span className="footer-dropdown-menu-close" onClick={closeDropoutLogin}>
                                 <img className="profile-footer-dropdown-menu" src={cross}/>
                            </span>
                            {!isAuthenticated && <div className="footer-dropdown-menu-text">
                                При регистрации и логине ты сможешь стать нашим Клиентом или Партнёром
                            </div>}
                            {isAuthenticated && <div className="footer-dropdown-menu-text">
                                Вам доступен ваш профиль. Вы можете войти в него
                            </div>}
                            {!isAuthenticated && <button className="profile-login" onClick={handleLoginClick}>Логин</button>}
                            {isAuthenticated && userRole === 'customer' && (
                                <button className="profile-login" onClick={() => history.push("/profile")}>Профиль</button>
                            )}
                            {isAuthenticated && userRole === 'seller' && (
                                <button className="profile-login" onClick={() => history.push("/profile")}>Профиль</button>
                            )}
                            {isAuthenticated && userRole === 'admin' && (
                                <button className="profile-login" onClick={() => history.push("/admin")}>Админ панель</button>
                            )}
                            {!isAuthenticated && <button className="footer-dropdown-menu-partner" onClick={handlePartnerClick}>Партнёр</button>}
                            {isAuthenticated && <button className="footer-dropdown-menu-logout" onClick={handleLogoutClick}>Выход</button>}
                        </div>
                    )}
                </div>
            </div>


            {isContactModalOpen && (
                <div className="modal-overlay" onClick={closeContactModal}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <ContactInfoFooter setShowSidebar={setShowSidebar} onClose={closeContactModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Footer;
