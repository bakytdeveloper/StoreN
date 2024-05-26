import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import SellerRegistrationForm from '../Header/SellerRegistrationForm/SellerRegistrationForm';
import './Footer.css';
import homeIcon from './home-icon.png';
import catalogPageIcon from './bucklet-icon.png';
import cartIcon from './cart-icon.png';
import profileIcon from './priffile-icon.png';
import contactIcon from './contact.png'

const Footer = ({ onSearch, cartItems = [], showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter, setCurrentPage }) => {
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

    const handleCloseSidebar = () => {
        setShowSidebar(false);
    };

    const totalItemsCount = cartItems.length > 0 ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

    return (
        <div className="footer-page">


                   <div className="home-icon">
                       <img className="home-icon-img" src={homeIcon} />
                            <div>
                                <Link className="home-icon-link" to="/" className={`footer-nav-link ${activePage === 'home' ? 'active-title' : ''}`}>Главная</Link>

                            </div>
                       {/*<Link className="home-icon-link" to="/" className={`footer-nav-link ${activePage === 'home' ? 'active-title' : ''}`}>Главная</Link>*/}
                   </div>

                   <div className="catalog-icon">
                       <img className="catalog-icon-img" src={catalogPageIcon} />
                        <div>
                            <Link className="catalog-icon-link" to="/catalog" >Каталог</Link>

                        </div>
                       {/*<Link to="/catalog" className={`footer-nav-link ${activePage === 'catalog' ? 'active-title' : ''}`}>Каталог</Link>*/}
                   </div>




                <div className="profile-icon">
                    <img className="profile-icon-img" src={profileIcon} />
                    <div className="footer-profileIcon" ref={profileRef}>
                        {!isProfileOpen && (


                            <span className="profile-icon-link" onClick={handleProfileClick}>Войти</span>
                        )}
                        {isProfileOpen && (
                            <div className="footer-dropdown-menu">
                                <button onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>
                                {!isAuthenticated && <button className="footer-dropdown-menu-partner" onClick={handlePartnerClick}>Партнёр</button>}
                                {isAuthenticated && <button className="footer-dropdown-menu-logout" onClick={handleLogoutClick}>Выход</button>}
                            </div>
                        )}
                    </div>

                    {showSellerRegistration && (
                        <SellerRegistrationForm />
                    )}
                </div>

            <div className="cart-icon">
                <img className="cart-icon-img" src={cartIcon}/>
                <span>({totalItemsCount})</span>
               <div>
                   <Link to="/cart" className="footer-auth-button btn" onClick={handleCartClick}>
                       <span className="footer-totalItems">Корзина</span>
                       {/*<span className="footer-totalItems">Корзина ({totalItemsCount})</span>*/}
                   </Link>
               </div>
            </div>


            <div className="contact-icon">
                <img className="contact-icon-img" src={contactIcon}/>
                <div>
                    <Link to="/cart" className="footer-auth-button btn" onClick={handleCartClick}>
                        <Link  style={{color:"black"}} to="/contact" className="footer-btn">Контакты</Link>
                    </Link>
                </div>
            </div>




        </div>
    );
};

export default Footer;
