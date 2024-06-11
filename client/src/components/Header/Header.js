

// src/components/Header/Header.js
import React, {useEffect, useRef, useState} from 'react';
import './Header.css';
import {Link, useHistory, useLocation} from 'react-router-dom';
import SellerRegistrationForm from "./SellerRegistrationForm/SellerRegistrationForm";
import './SellerRegistrationForm/SellerRegistrationForm.css'
import menuIcon from './menu-icon.png';
import './Header.css';




// const Header = ({ onSearch, cartItems = [], showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter, setCurrentPage }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [catalogButtonColor, setCatalogButtonColor] = useState('initial');
//     const [contactButtonColor, setContactButtonColor] = useState('initial');
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
//     const isAuthenticated = localStorage.getItem('token');
//     const history = useHistory();
//     const profileRef = useRef(null);
//     const [showSellerRegistration, setShowSellerRegistration] = useState(false);
//     const location = useLocation();
//     const [activePage, setActivePage] = useState('');
//
//     useEffect(() => {
//         const path = location.pathname;
//         if (path === '/') {
//             setActivePage('home');
//         } else if (path === '/catalog') {
//             setActivePage('catalog');
//         } else if (path === '/contact') {
//             setActivePage('contact');
//         }
//     }, [location.pathname]);
//
//     useEffect(() => {
//         if (showSidebar) {
//             setCatalogButtonColor('initial');
//             setContactButtonColor('initial');
//         }
//     }, [showSidebar]);
//
//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (profileRef.current && !profileRef.current.contains(event.target)) {
//                 setIsProfileOpen(false);
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);
//
//     const handleSearchChange = (e) => {
//         const value = e.target.value;
//         setSearchTerm(value);
//         setCurrentPage(1);
//         onSearch(value);
//         history.push('/catalog'); // Добавляем переход на страницу каталога
//
//     };
//
//     const handleCartClick = () => {
//         if (cartItems.length > 0) {
//             history.push("/cart");
//         } else {
//             history.push("/");
//         }
//     };
//
//     const handleTitleClick = () => {
//         resetFilter();
//         history.push("/");
//     };
//
//     const homePage = () => {
//         resetFilter();
//         history.push("/");
//     };
//
//     const handleContactClick = () => {
//         setSelectedOption('contact');
//         setShowSidebar(!showSidebar);
//         setContactButtonColor('lightblue');
//         setCatalogButtonColor('initial');
//     };
//
//     const handleCatalogClick = () => {
//         setSelectedOption('catalog');
//         setShowSidebar(!showSidebar);
//         setCatalogButtonColor('lightblue');
//         setContactButtonColor('initial');
//     };
//
//     const handleProfileClick = () => {
//         setIsProfileOpen(!isProfileOpen);
//     };
//
//     const handleLoginClick = () => {
//         if (isAuthenticated) {
//             history.push("/profile");
//         } else {
//             history.push("/login");
//         }
//         setIsProfileOpen(false);
//     };
//
//     const handleLogoutClick = () => {
//         localStorage.removeItem('token');
//         history.push("/");
//         setIsProfileOpen(false);
//     };
//
//     const handlePartnerClick = () => {
//         setIsProfileOpen(false);
//         history.push("/sellers/register");
//     };
//
//     const dropdownMenuClose = () => {
//         setIsProfileOpen(false); // Закрываем меню
//     }
//
//     const totalItemsCount = cartItems.length > 0 ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
//
//     return (
//         <div className="header">
//             <div className="header-left">
//                 <div className="title" onClick={handleTitleClick}>
//                     <h1 className="titleH">kiosk<span className="titleN">.kg</span></h1>
//                 </div>
//                 <nav className="nav-links">
//                     <Link to="/" className={`nav-link ${activePage === 'home' ? 'active-title' : ''}`}>Главная</Link>
//                     <Link to="/catalog" className={`nav-link ${activePage === 'catalog' ? 'active-title' : ''}`}>Каталог</Link>
//                 </nav>
//             </div>
//             <div className="header-right">
//                 <div className="auth-buttons">
//                     <div className="profileIcon" ref={profileRef}>
//                         <span className="profileIcon-text" onClick={handleProfileClick}>Войти</span>
//                         {isProfileOpen && (
//                             <div className="dropdown-menu">
//                                 <span className="dropdown-menu-close" onClick={dropdownMenuClose} > &#10006;</span>
//                                 <button onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>
//                                 {!isAuthenticated && <button className="dropdown-menu-partner" onClick={handlePartnerClick}>Партнёр</button>}
//                                 {isAuthenticated && <button className="dropdown-menu-logout" onClick={handleLogoutClick}>Выход</button>}
//                             </div>
//                         )}
//                     </div>
//                     {showSellerRegistration && (
//                         <SellerRegistrationForm />
//                     )}
//                 </div>
//                 <Link to="/cart" className="auth-button btn" onClick={handleCartClick}>
//                 <span className="cartIcon">
//                    {totalItemsCount > 0 && (
//                        <span className="totalItems">{totalItemsCount}</span>
//                    )}
//                     <span className="total-items-title">Корзина</span>
//                 </span>
//                 </Link>
//
//                 <div className="search">
//                     <input type="text" placeholder="Поиск...&#128269;" value={searchTerm} onChange={handleSearchChange} />
//                 </div>
//             </div>
//             <div className="mobile-buttons">
//                 <div className={`btn1 ${catalogButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleCatalogClick} style={{ backgroundColor: catalogButtonColor }}>
//                     <Link style={{color:"white"}} to="/catalog" className="btn">Каталог товаров</Link>
//                 </div>
//                 <div className={`btn2 ${contactButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleContactClick} style={{ backgroundColor: contactButtonColor }}>
//                     <Link style={{color:"white"}} to="/contact" className="btn">Связаться с нами</Link>
//                 </div>
//             </div>
//         </div>
//     );
//
// };
//
// export default Header;








// const Header = ({ onSearch, cartItems = [], showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter, setCurrentPage }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [catalogButtonColor, setCatalogButtonColor] = useState('initial');
//     const [contactButtonColor, setContactButtonColor] = useState('initial');
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
//     const isAuthenticated = localStorage.getItem('token');
//     const history = useHistory();
//     const profileRef = useRef(null);
//     const [showSellerRegistration, setShowSellerRegistration] = useState(false);
//     const location = useLocation();
//     const [activePage, setActivePage] = useState('');
//
//     useEffect(() => {
//         const path = location.pathname;
//         if (path === '/') {
//             setActivePage('home');
//         } else if (path === '/catalog') {
//             setActivePage('catalog');
//         } else if (path === '/contact') {
//             setActivePage('contact');
//         } else if (path === '/cart') {
//             setActivePage('cart');
//         } else if (path === '/login' || path === '/profile') {
//             setActivePage('login');
//         }
//     }, [location.pathname]);
//
//     useEffect(() => {
//         if (showSidebar) {
//             setCatalogButtonColor('initial');
//             setContactButtonColor('initial');
//         }
//     }, [showSidebar]);
//
//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (profileRef.current && !profileRef.current.contains(event.target)) {
//                 setIsProfileOpen(false);
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);
//
//
//     // New useEffect to clear search term when navigating to home page
//     useEffect(() => {
//         if (location.pathname === '/') {
//             setSearchTerm('');
//             resetFilter();
//         }
//     }, [location.pathname, resetFilter]);
//
//     const handleSearchChange = (e) => {
//         const value = e.target.value;
//         setSearchTerm(value);
//         setCurrentPage(1);
//         onSearch(value);
//         history.push('/catalog');
//     };
//
//     const handleCartClick = () => {
//         if (cartItems.length > 0) {
//             setActivePage('cart');
//             history.push("/cart");
//         } else {
//             setActivePage('home');
//             history.push("/");
//         }
//     };
//
//     const handleTitleClick = () => {
//         setActivePage('home');
//         setSearchTerm("");
//         resetFilter();
//         history.push("/");
//     };
//
//     const handleContactClick = () => {
//         setActivePage('contact');
//         setSelectedOption('contact');
//         setShowSidebar(!showSidebar);
//         setContactButtonColor('lightblue');
//         setCatalogButtonColor('initial');
//     };
//
//     const handleCatalogClick = () => {
//         setActivePage('catalog');
//         setSelectedOption('catalog');
//         setShowSidebar(!showSidebar);
//         setCatalogButtonColor('lightblue');
//         setContactButtonColor('initial');
//     };
//
//     const handleProfileClick = () => {
//         setIsProfileOpen(!isProfileOpen);
//     };
//
//     const handleLoginClick = () => {
//         setActivePage('login');
//         if (isAuthenticated) {
//             history.push("/profile");
//         } else {
//             history.push("/login");
//         }
//         setIsProfileOpen(false);
//     };
//
//     const handleLogoutClick = () => {
//         localStorage.removeItem('token');
//         setActivePage('home');
//         history.push("/");
//         setIsProfileOpen(false);
//     };
//
//     const handlePartnerClick = () => {
//         setIsProfileOpen(false);
//         history.push("/sellers/register");
//     };
//
//     const dropdownMenuClose = () => {
//         setIsProfileOpen(false);
//     }
//
//     const totalItemsCount = cartItems.length > 0 ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
//
//     return (
//         <div className="header">
//             <div className="header-left">
//                 <div className="title" onClick={handleTitleClick}>
//                     <h1 className="titleH">kiosk<span className="titleN">.kg</span></h1>
//                 </div>
//                 <nav className="nav-links">
//                     <Link to="/" className={`nav-link ${activePage === 'home' ? 'active-title' : ''}`}>Главная</Link>
//                     <Link to="/catalog" className={`nav-link ${activePage === 'catalog' ? 'active-title' : ''}`}>Каталог</Link>
//                 </nav>
//             </div>
//             <div className="header-right">
//                 <div className="auth-buttons">
//                     <div className="profileIcon" ref={profileRef}>
//                         <span className={`profileIcon-text ${activePage === 'login' ? 'active-title' : ''}`} onClick={handleProfileClick}>Войти</span>
//                         {isProfileOpen && (
//                             <div className="dropdown-menu">
//                                 <span className="dropdown-menu-close" onClick={dropdownMenuClose}>&#10006;</span>
//                                 <button onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>
//                                 {!isAuthenticated && <button className="dropdown-menu-partner" onClick={handlePartnerClick}>Партнёр</button>}
//                                 {isAuthenticated && <button className="dropdown-menu-logout" onClick={handleLogoutClick}>Выход</button>}
//                             </div>
//                         )}
//                     </div>
//                     {showSellerRegistration && (
//                         <SellerRegistrationForm />
//                     )}
//                 </div>
//                 <Link to="/cart" className={`auth-button btn ${activePage === 'cart' ? 'active-title' : ''}`} onClick={handleCartClick}>
//                     <span className="cartIcon">
//                         {totalItemsCount > 0 && (
//                             <span className="totalItems">{totalItemsCount}</span>
//                         )}
//                         <span className="total-items-title">Корзина</span>
//                     </span>
//                 </Link>
//                 <div className="search">
//                     <input type="text" placeholder="Поиск...&#128269;" value={searchTerm} onChange={handleSearchChange} />
//                 </div>
//             </div>
//             <div className="mobile-buttons">
//                 <div className={`btn1 ${catalogButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleCatalogClick} style={{ backgroundColor: catalogButtonColor }}>
//                     <Link style={{color:"white"}} to="/catalog" className="btn">Каталог товаров</Link>
//                 </div>
//                 <div className={`btn2 ${contactButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleContactClick} style={{ backgroundColor: contactButtonColor }}>
//                     <Link style={{color:"white"}} to="/contact" className="btn">Связаться с нами</Link>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Header;



// const Header = ({ onSearch, cartItems = [], showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter, setCurrentPage }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [catalogButtonColor, setCatalogButtonColor] = useState('initial');
//     const [contactButtonColor, setContactButtonColor] = useState('initial');
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
//     const isAuthenticated = localStorage.getItem('token');
//     const history = useHistory();
//     const profileRef = useRef(null);
//     const [showSellerRegistration, setShowSellerRegistration] = useState(false);
//     const location = useLocation();
//     const [activePage, setActivePage] = useState('');
//
//     useEffect(() => {
//         const path = location.pathname;
//         if (path === '/') {
//             setActivePage('home');
//         } else if (path === '/catalog') {
//             setActivePage('catalog');
//         } else if (path === '/contact') {
//             setActivePage('contact');
//         } else if (path === '/cart') {
//             setActivePage('cart');
//         } else if (path === '/login' || path === '/profile') {
//             setActivePage('login');
//         }
//     }, [location.pathname]);
//
//     useEffect(() => {
//         if (showSidebar) {
//             setCatalogButtonColor('initial');
//             setContactButtonColor('initial');
//         }
//     }, [showSidebar]);
//
//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (profileRef.current && !profileRef.current.contains(event.target)) {
//                 setIsProfileOpen(false);
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);
//
//     useEffect(() => {
//         if (location.pathname === '/') {
//             setSearchTerm('');
//             resetFilter();
//         }
//     }, [location.pathname, resetFilter]);
//
//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//         setCurrentPage(1);
//     };
//
//     const handleSearchSubmit = (e) => {
//         e.preventDefault();
//         onSearch(searchTerm);
//         history.push('/catalog');
//     };
//
//     const handleClearSearch = () => {
//         setSearchTerm('');
//         onSearch('');
//     };
//
//     const handleCartClick = () => {
//         if (cartItems.length > 0) {
//             setActivePage('cart');
//             history.push("/cart");
//         } else {
//             setActivePage('home');
//             history.push("/");
//         }
//     };
//
//     const handleTitleClick = () => {
//         setActivePage('home');
//         setSearchTerm("");
//         resetFilter();
//         history.push("/");
//     };
//
//     const handleContactClick = () => {
//         setActivePage('contact');
//         setSelectedOption('contact');
//         setShowSidebar(!showSidebar);
//         setContactButtonColor('lightblue');
//         setCatalogButtonColor('initial');
//     };
//
//     const handleCatalogClick = () => {
//         setActivePage('catalog');
//         setSelectedOption('catalog');
//         setShowSidebar(!showSidebar);
//         setCatalogButtonColor('lightblue');
//         setContactButtonColor('initial');
//     };
//
//     const handleProfileClick = () => {
//         setIsProfileOpen(!isProfileOpen);
//     };
//
//     const handleLoginClick = () => {
//         setActivePage('login');
//         if (isAuthenticated) {
//             history.push("/profile");
//         } else {
//             history.push("/login");
//         }
//         setIsProfileOpen(false);
//     };
//
//     const handleLogoutClick = () => {
//         localStorage.removeItem('token');
//         setActivePage('home');
//         history.push("/");
//         setIsProfileOpen(false);
//     };
//
//     const handlePartnerClick = () => {
//         setIsProfileOpen(false);
//         history.push("/sellers/register");
//     };
//
//     const dropdownMenuClose = () => {
//         setIsProfileOpen(false);
//     }
//
//     const totalItemsCount = cartItems.length > 0 ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
//
//     return (
//         <div className="header">
//             <div className="header-left">
//                 <div className="title" onClick={handleTitleClick}>
//                     <h1 className="titleH">kiosk<span className="titleN">.kg</span></h1>
//                 </div>
//                 <nav className="nav-links">
//                     <Link to="/" className={`nav-link ${activePage === 'home' ? 'active-title' : ''}`}>Главная</Link>
//                     <Link to="/catalog" className={`nav-link ${activePage === 'catalog' ? 'active-title' : ''}`}>Каталог</Link>
//                 </nav>
//             </div>
//             <div className="header-right">
//                 <div className="auth-buttons">
//                     <div className="profileIcon" ref={profileRef}>
//                         <span className={`profileIcon-text ${activePage === 'login' ? 'active-title' : ''}`} onClick={handleProfileClick}>Войти</span>
//                         {isProfileOpen && (
//                             <div className="dropdown-menu">
//                                 <span className="dropdown-menu-close" onClick={dropdownMenuClose}>&#10006;</span>
//                                 <button onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>
//                                 {!isAuthenticated && <button className="dropdown-menu-partner" onClick={handlePartnerClick}>Партнёр</button>}
//                                 {isAuthenticated && <button className="dropdown-menu-logout" onClick={handleLogoutClick}>Выход</button>}
//                             </div>
//                         )}
//                     </div>
//                     {showSellerRegistration && (
//                         <SellerRegistrationForm />
//                     )}
//                 </div>
//                 <Link to="/cart" className={`auth-button btn ${activePage === 'cart' ? 'active-title' : ''}`} onClick={handleCartClick}>
//                     <span className="cartIcon">
//                         {totalItemsCount > 0 && (
//                             <span className="totalItems">{totalItemsCount}</span>
//                         )}
//                         <span className="total-items-title">Корзина</span>
//                     </span>
//                 </Link>
//                 <div className="search">
//                     <form onSubmit={handleSearchSubmit}>
//                         <input
//                             type="text"
//                             placeholder="Поиск..."
//                             value={searchTerm}
//                             onChange={handleSearchChange}
//                         />
//                         {searchTerm && <button type="button" onClick={handleClearSearch}>&#10006;</button>}
//                         <button type="submit">&#128269;</button>
//                     </form>
//                 </div>
//             </div>
//             <div className="mobile-buttons">
//                 <div className={`btn1 ${catalogButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleCatalogClick} style={{ backgroundColor: catalogButtonColor }}>
//                     <Link style={{color:"white"}} to="/catalog" className="btn">Каталог товаров</Link>
//                 </div>
//                 <div className={`btn2 ${contactButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleContactClick} style={{ backgroundColor: contactButtonColor }}>
//                     <Link style={{color:"white"}} to="/contact" className="btn">Связаться с нами</Link>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Header;



// const Header = ({ onSearch, cartItems = [], showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter, setCurrentPage }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [catalogButtonColor, setCatalogButtonColor] = useState('initial');
//     const [contactButtonColor, setContactButtonColor] = useState('initial');
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
//     const isAuthenticated = localStorage.getItem('token');
//     const history = useHistory();
//     const profileRef = useRef(null);
//     const [showSellerRegistration, setShowSellerRegistration] = useState(false);
//     const location = useLocation();
//     const [activePage, setActivePage] = useState('');
//
//     useEffect(() => {
//         const path = location.pathname;
//         if (path === '/') {
//             setActivePage('home');
//         } else if (path === '/catalog') {
//             setActivePage('catalog');
//         } else if (path === '/contact') {
//             setActivePage('contact');
//         } else if (path === '/cart') {
//             setActivePage('cart');
//         } else if (path === '/login' || path === '/profile') {
//             setActivePage('login');
//         }
//     }, [location.pathname]);
//
//     useEffect(() => {
//         if (showSidebar) {
//             setCatalogButtonColor('initial');
//             setContactButtonColor('initial');
//         }
//     }, [showSidebar]);
//
//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (profileRef.current && !profileRef.current.contains(event.target)) {
//                 setIsProfileOpen(false);
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);
//
//     // useEffect(() => {
//     //     if (location.pathname === '/') {
//     //         setSearchTerm('');
//     //         resetFilter();
//     //     }
//     // }, [location.pathname, resetFilter]);
//
//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//         setCurrentPage(1);
//     };
//
//     const handleSearchSubmit = (e) => {
//         e.preventDefault();
//         onSearch(searchTerm);
//         history.push('/catalog');
//     };
//
//     const handleClearSearch = () => {
//         setSearchTerm('');
//         onSearch('');
//     };
//
//     const handleCartClick = () => {
//         if (cartItems.length > 0) {
//             setActivePage('cart');
//             history.push("/cart");
//         } else {
//             setActivePage('home');
//             history.push("/");
//         }
//     };
//
//     const handleTitleClick = () => {
//         setActivePage('home');
//         setSearchTerm("");
//         resetFilter();
//         history.push("/");
//     };
//
//     const handleContactClick = () => {
//         setActivePage('contact');
//         setSelectedOption('contact');
//         setShowSidebar(!showSidebar);
//         setContactButtonColor('lightblue');
//         setCatalogButtonColor('initial');
//     };
//
//     const handleCatalogClick = () => {
//         setActivePage('catalog');
//         setSelectedOption('catalog');
//         setShowSidebar(!showSidebar);
//         setCatalogButtonColor('lightblue');
//         setContactButtonColor('initial');
//     };
//
//     const handleProfileClick = () => {
//         setIsProfileOpen(!isProfileOpen);
//     };
//
//     const handleLoginClick = () => {
//         setActivePage('login');
//         if (isAuthenticated) {
//             history.push("/profile");
//         } else {
//             history.push("/login");
//         }
//         setIsProfileOpen(false);
//     };
//
//     const handleLogoutClick = () => {
//         localStorage.removeItem('token');
//         setActivePage('home');
//         history.push("/");
//         setIsProfileOpen(false);
//     };
//
//     const handlePartnerClick = () => {
//         setIsProfileOpen(false);
//         history.push("/sellers/register");
//     };
//
//     const dropdownMenuClose = () => {
//         setIsProfileOpen(false);
//     }
//
//     const totalItemsCount = cartItems.length > 0 ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
//
//     return (
//         <div className="header">
//             <div className="header-left">
//                 <div className="title" onClick={handleTitleClick}>
//                     <h1 className="titleH">kiosk<span className="titleN">.kg</span></h1>
//                 </div>
//                 <nav className="nav-links">
//                     <Link to="/" className={`nav-link ${activePage === 'home' ? 'active-title' : ''}`}>Главная</Link>
//                     <Link to="/catalog" className={`nav-link ${activePage === 'catalog' ? 'active-title' : ''}`}>Каталог</Link>
//                 </nav>
//             </div>
//             <div className="header-right">
//                 <div className="auth-buttons">
//                     <div className="profileIcon" ref={profileRef}>
//                         <span className={`profileIcon-text ${activePage === 'login' ? 'active-title' : ''}`} onClick={handleProfileClick}>Войти</span>
//                         {isProfileOpen && (
//                             <div className="dropdown-menu">
//                                 <span className="dropdown-menu-close" onClick={dropdownMenuClose}>&#10006;</span>
//                                 <button onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>
//                                 {!isAuthenticated && <button className="dropdown-menu-partner" onClick={handlePartnerClick}>Партнёр</button>}
//                                 {isAuthenticated && <button className="dropdown-menu-logout" onClick={handleLogoutClick}>Выход</button>}
//                             </div>
//                         )}
//                     </div>
//                     {showSellerRegistration && (
//                         <SellerRegistrationForm />
//                     )}
//                 </div>
//                 <Link to="/cart" className={`auth-button btn ${activePage === 'cart' ? 'active-title' : ''}`} onClick={handleCartClick}>
//                     <span className="cartIcon">
//                         {totalItemsCount > 0 && (
//                             <span className="totalItems">{totalItemsCount}</span>
//                         )}
//                         <span className="total-items-title">Корзина</span>
//                     </span>
//                 </Link>
//                 <div className="search">
//                     <form onSubmit={handleSearchSubmit}>
//                         <input
//                             type="text"
//                             placeholder="Поиск..."
//                             value={searchTerm}
//                             onChange={handleSearchChange}
//                         />
//                         {searchTerm && <button type="button" onClick={handleClearSearch}>&#10006;</button>}
//                         <button type="submit">&#128269;</button>
//                     </form>
//                 </div>
//             </div>
//             <div className="mobile-buttons">
//                 <div className={`btn1 ${catalogButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleCatalogClick} style={{ backgroundColor: catalogButtonColor }}>
//                     <Link style={{color:"white"}} to="/catalog" className="btn">Каталог товаров</Link>
//                 </div>
//                 <div className={`btn2 ${contactButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleContactClick} style={{ backgroundColor: contactButtonColor }}>
//                     <Link style={{color:"white"}} to="/contact" className="btn">Связаться с нами</Link>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Header;



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
    const [lastPath, setLastPath] = useState(location.pathname);

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

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
        history.push('/catalog');
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        onSearch('');
        history.push(lastPath);
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
        setShowSidebar(!showSidebar);
        setCatalogButtonColor('lightblue');
        setContactButtonColor('initial');
    };

    const handleProfileClick = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleLoginClick = () => {
        setActivePage('login');
        if (isAuthenticated) {
            history.push("/profile");
        } else {
            history.push("/login");
        }
        setIsProfileOpen(false);
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        setActivePage('home');
        history.push("/");
        setIsProfileOpen(false);
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
                        <span className={`profileIcon-text ${activePage === 'login' ? 'active-title' : ''}`} onClick={handleProfileClick}>Войти</span>
                        {isProfileOpen && (
                            <div className="dropdown-menu">
                                <span className="dropdown-menu-close" onClick={dropdownMenuClose}>&#10006;</span>
                                <button onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>
                                {!isAuthenticated && <button className="dropdown-menu-partner" onClick={handlePartnerClick}>Партнёр</button>}
                                {isAuthenticated && <button className="dropdown-menu-logout" onClick={handleLogoutClick}>Выход</button>}
                            </div>
                        )}
                    </div>
                    {showSellerRegistration && (
                        <SellerRegistrationForm />
                    )}
                </div>
                <Link to="/cart" className={`auth-button btn ${activePage === 'cart' ? 'active-title' : ''}`} onClick={handleCartClick}>
                    <span className="cartIcon">
                        {totalItemsCount > 0 && (
                            <span className="totalItems">{totalItemsCount}</span>
                        )}
                        <span className="total-items-title">Корзина</span>
                    </span>
                </Link>
                <div className="search">
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Поиск..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        {searchTerm && <button type="button" onClick={handleClearSearch}>&#10006;</button>}
                        <button type="submit">&#128269;</button>
                    </form>
                </div>
            </div>
            <div className="mobile-buttons">
                <div className={`btn1 ${catalogButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleCatalogClick} style={{ backgroundColor: catalogButtonColor }}>
                    <Link style={{color:"white"}} to="/catalog" className="btn">Каталог товаров</Link>
                </div>
                <div className={`btn2 ${contactButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleContactClick} style={{ backgroundColor: contactButtonColor }}>
                    <Link style={{color:"white"}} to="/contact" className="btn">Связаться с нами</Link>
                </div>
            </div>
        </div>
    );
};

export default Header;