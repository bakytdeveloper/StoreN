import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import SellerRegistrationForm from '../Header/SellerRegistrationForm/SellerRegistrationForm';
import './Footer.css';
import homeIcon from './home-icon.png';
import catalogPageIcon from './bucklet-icon.png';
import cartIcon from './cart-icon.png';
import profileIcon from './priffile-icon.png';
import contactIcon from './contact.png'
// import ContactInfo from "../Header/ContactInfo";
import ContactInfoModal from "./ContactInfoFooter";


// const Footer = ({ onSearch, cartItems = [], showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter, setCurrentPage }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
//     const [isContactModalOpen, setIsContactModalOpen] = useState(false); // Состояние для управления модальным окном контактов
//     const isAuthenticated = localStorage.getItem('token');
//     const history = useHistory();
//     const profileRef = useRef(null);
//     const [showSellerRegistration, setShowSellerRegistration] = useState(false);
//     const location = useLocation();
//     const [activeButton, setActiveButton] = useState(null);
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
//     };
//
//     const handleButtonClick = (buttonName) => {
//         setActiveButton(buttonName);
//     };
//
//     const handleCartClick = () => {
//         if (cartItems.length > 0) {
//             history.push("/cart");
//         } else {
//             setShowSidebar(true);
//         }
//         handleButtonClick('cart');
//     };
//
//     const handleContactClick = () => {
//         history.push('/sellers-contacts');
//         handleButtonClick('contact');
//     };
//
//
//     const handleCatalogClick = () => {
//         setSelectedOption('catalog');
//         history.push('/catalog');
//         setShowSidebar(!showSidebar);
//         handleButtonClick('catalog');
//     };
//
//     const handleProfileClick = () => {
//         setIsProfileOpen(!isProfileOpen);
//         handleButtonClick('profile');
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
//     const closeDropoutLogin = () => {
//         history.push("/catalog");
//     }
//
//     const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
//
//     return (
//         <div className="footer-page">
//             <div className={`home-icon ${activeButton === 'home' ? 'active' : ''}`} onClick={() => handleButtonClick('home')}>
//                 <Link  to="/" >
//                 <img className="home-icon-img" src={homeIcon} />
//                 <div>
//                     <span className="home-icon-link" >Главная</span>
//                 </div>
//                 </Link>
//             </div>
//
//             <div className={`catalog-icon ${activeButton === 'catalog' ? 'active' : ''}`} onClick={handleCatalogClick}>
//                 <img className="catalog-icon-img" src={catalogPageIcon} />
//                 <div>
//                     <span className="catalog-icon-link catalog-header">Каталог</span>
//                 </div>
//             </div>
//
//             <div className={`cart-icon ${activeButton === 'cart' ? 'active' : ''}`} onClick={handleCartClick}>
//                 <Link to="/cart" className="footer-auth-button btn">
//
//                 <img className="cart-icon-img" src={cartIcon} />
//                     {totalItemsCount > 0 && (
//                         <div className="total-items-count"><span>{totalItemsCount}</span></div>
//                     )}
//                 <div className="footer-totalItems">
//                         <span className="footer-totalItems">Корзина</span>
//                 </div>
//             </Link>
//             </div>
//
//             <div className={`contact-icon ${activeButton === 'contact' ? 'active' : ''}`} onClick={handleContactClick}>
//                 <img className="contact-icon-img" src={contactIcon} />
//                 <div>
//                     <span className="footer-btn">Контакты</span>
//                 </div>
//             </div>
//
//
//             <div className={`profile-icon ${activeButton === 'profile' ? 'active' : ''}`} onClick={handleProfileClick}>
//                 <img className="profile-icon-img" src={profileIcon} />
//                 <div className="footer-profileIcon" ref={profileRef}>
//                     {!isProfileOpen && (
//                         <span className="profile-icon-link">Войти</span>
//                     )}
//                     {isProfileOpen && (
//                         <div className="footer-dropdown-menu">
//                             <span className="footer-dropdown-menu-close" onClick={closeDropoutLogin}>&#10006;</span>
//                             {!isAuthenticated && <div className="footer-dropdown-menu-text" >
//                                При регистрации и логине ты сможешь стать нашим Клиентом или Партнёром
//                             </div>}
//                             <button style={{color:"black"}} onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>
//                             {!isAuthenticated && <button className="footer-dropdown-menu-partner" onClick={handlePartnerClick}>Партнёр</button>}
//                             {isAuthenticated && <button className="footer-dropdown-menu-logout" onClick={handleLogoutClick}>Выход</button>}
//                         </div>
//                     )}
//                 </div>
//                 {showSellerRegistration && (
//                     <SellerRegistrationForm />
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default Footer;





// const Footer = ({ onSearch, cartItems = [], showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter, setCurrentPage }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
//     const [isContactModalOpen, setIsContactModalOpen] = useState(false);
//     const isAuthenticated = localStorage.getItem('token');
//     const history = useHistory();
//     const profileRef = useRef(null);
//     const [showSellerRegistration, setShowSellerRegistration] = useState(false);
//     const location = useLocation();
//     const [activeButton, setActiveButton] = useState(null);
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
//     };
//
//     const handleButtonClick = (buttonName) => {
//         setActiveButton(prevButton => {
//             // Если текущая активная кнопка совпадает с нажатой, то закрываем ее
//             if (prevButton === buttonName) {
//                 return null;
//             } else {
//                 return buttonName;
//             }
//         });
//     };
//
//     const handleCartClick = () => {
//         if (cartItems.length > 0) {
//             history.push("/cart");
//         } else {
//             setShowSidebar(true);
//         }
//         handleButtonClick('cart');
//     };
//
//     const handleContactClick = () => {
//         history.push('/sellers-contacts');
//         handleButtonClick('contact');
//     };
//
//
//     const handleCatalogClick = () => {
//         setSelectedOption('catalog');
//         history.push('/catalog');
//         setShowSidebar(!showSidebar);
//         handleButtonClick('catalog');
//     };
//
//     const handleProfileClick = () => {
//         setIsProfileOpen(!isProfileOpen);
//         handleButtonClick('profile');
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
//     const closeDropoutLogin = () => {
//         history.push("/catalog");
//     }
//
//     const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
//
//     return (
//         <div className="footer-page">
//             <div className={`home-icon ${activeButton === 'home' ? 'active' : ''}`} onClick={() => handleButtonClick('home')}>
//                 <Link  to="/" >
//                     <img className="home-icon-img" src={homeIcon} />
//                     <div>
//                         <span className="home-icon-link" >Главная</span>
//                     </div>
//                 </Link>
//             </div>
//
//             <div className={`catalog-icon ${activeButton === 'catalog' ? 'active' : ''}`} onClick={handleCatalogClick}>
//                 <img className="catalog-icon-img" src={catalogPageIcon} />
//                 <div>
//                     <span className="catalog-icon-link catalog-header">Каталог</span>
//                 </div>
//             </div>
//
//             <div className={`cart-icon ${activeButton === 'cart' ? 'active' : ''}`} onClick={handleCartClick}>
//                 <Link to="/cart" className="footer-auth-button btn">
//                     <img className="cart-icon-img" src={cartIcon} />
//                     {totalItemsCount > 0 && (
//                         <div className="total-items-count"><span>{totalItemsCount}</span></div>
//                     )}
//                     <div className="footer-totalItems">
//                         <span className="footer-totalItems">Корзина</span>
//                     </div>
//                 </Link>
//             </div>
//
//             <div className={`contact-icon ${activeButton === 'contact' ? 'active' : ''}`} onClick={handleContactClick}>
//                 <img className="contact-icon-img" src={contactIcon} />
//                 <div>
//                     <span className="footer-btn">Контакты</span>
//                 </div>
//             </div>
//
//
//             <div className={`profile-icon ${activeButton === 'profile' ? 'active' : ''}`} onClick={handleProfileClick}>
//                 <img className="profile-icon-img" src={profileIcon} />
//                 <div className="footer-profileIcon" ref={profileRef}>
//                     {!isProfileOpen && (
//                         <span className="profile-icon-link">Войти</span>
//                     )}
//                     {isProfileOpen && (
//                         <div className="footer-dropdown-menu">
//                             <span className="footer-dropdown-menu-close" onClick={closeDropoutLogin}>&#10006;</span>
//                             {!isAuthenticated && <div className="footer-dropdown-menu-text" >
//                                 При регистрации и логине ты сможешь стать нашим Клиентом или Партнёром
//                             </div>}
//                             <button style={{color:"black"}} onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>
//                             {!isAuthenticated && <button className="footer-dropdown-menu-partner" onClick={handlePartnerClick}>Партнёр</button>}
//                             {isAuthenticated && <button className="footer-dropdown-menu-logout" onClick={handleLogoutClick}>Выход</button>}
//                         </div>
//                     )}
//                 </div>
//                 {showSellerRegistration && (
//                     <SellerRegistrationForm />
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default Footer;






// const Footer = ({ onSearch, cartItems = [], showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter, setCurrentPage, setActiveComponent }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
//     const [isContactModalOpen, setIsContactModalOpen] = useState(false);
//     const isAuthenticated = localStorage.getItem('token');
//     const history = useHistory();
//     const profileRef = useRef(null);
//     const [showSellerRegistration, setShowSellerRegistration] = useState(false);
//     const location = useLocation();
//     const [activeButton, setActiveButton] = useState(null);
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
//     };
//
//     const handleButtonClick = (buttonName, component) => {
//         setActiveButton(prevButton => {
//             if (prevButton === buttonName) {
//                 setActiveComponent(null); // Если кнопка уже активна, деактивируем компонент
//                 return null;
//             } else {
//                 setActiveComponent(component);
//                 return buttonName;
//             }
//         });
//     };
//
//     const handleCartClick = () => {
//         if (cartItems.length > 0) {
//             history.push("/cart");
//         } else {
//             setShowSidebar(true);
//         }
//         handleButtonClick('cart', 'cart');
//     };
//
//     const handleContactClick = () => {
//         history.push('/sellers-contacts');
//         handleButtonClick('contact', 'sellers-contacts');
//     };
//
//     const handleCatalogClick = () => {
//         setSelectedOption('catalog');
//         history.push('/catalog');
//         setShowSidebar(!showSidebar);
//         handleButtonClick('catalog', 'catalog');
//     };
//
//     const handleProfileClick = () => {
//         setIsProfileOpen(!isProfileOpen);
//         handleButtonClick('profile', 'profile');
//     };
//
//     const handleLoginClick = () => {
//         if (isAuthenticated) {
//             history.push("/profile");
//         } else {
//             history.push("/login");
//         }
//         setIsProfileOpen(false);
//         handleButtonClick('profile', 'profile');
//     };
//
//     const handleLogoutClick = () => {
//         localStorage.removeItem('token');
//         history.push("/");
//         setIsProfileOpen(false);
//         handleButtonClick('profile', 'profile');
//     };
//
//     const handlePartnerClick = () => {
//         setIsProfileOpen(false);
//         history.push("/sellers/register");
//         handleButtonClick('profile', 'sellers/register');
//     };
//
//     const closeDropoutLogin = () => {
//         history.push("/catalog");
//     }
//
//     const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
//
//     return (
//         <div className="footer-page">
//             <div className={`home-icon ${activeButton === 'home' ? 'active' : ''}`} onClick={() => handleButtonClick('home', 'home')}>
//                 <Link to="/" >
//                     <img className="home-icon-img" src={homeIcon} />
//                     <div>
//                         <span className="home-icon-link">Главная</span>
//                     </div>
//                 </Link>
//             </div>
//
//             <div className={`catalog-icon ${activeButton === 'catalog' ? 'active' : ''}`} onClick={handleCatalogClick}>
//                 <img className="catalog-icon-img" src={catalogPageIcon} />
//                 <div>
//                     <span className="catalog-icon-link catalog-header">Каталог</span>
//                 </div>
//             </div>
//
//             <div className={`cart-icon ${activeButton === 'cart' ? 'active' : ''}`} onClick={handleCartClick}>
//                 <Link to="/cart" className="footer-auth-button btn">
//                     <img className="cart-icon-img" src={cartIcon} />
//                     {totalItemsCount > 0 && (
//                         <div className="total-items-count"><span>{totalItemsCount}</span></div>
//                     )}
//                     <div className="footer-totalItems">
//                         <span className="footer-totalItems">Корзина</span>
//                     </div>
//                 </Link>
//             </div>
//
//             <div className={`contact-icon ${activeButton === 'contact' ? 'active' : ''}`} onClick={handleContactClick}>
//                 <img className="contact-icon-img" src={contactIcon} />
//                 <div>
//                     <span className="footer-btn">Контакты</span>
//                 </div>
//             </div>
//
//             <div className={`profile-icon ${activeButton === 'profile' ? 'active' : ''}`} onClick={handleProfileClick}>
//                 <img className="profile-icon-img" src={profileIcon} />
//                 <div className="footer-profileIcon" ref={profileRef}>
//                     {!isProfileOpen && (
//                         <span className="profile-icon-link">Войти</span>
//                     )}
//                     {isProfileOpen && (
//                         <div className="footer-dropdown-menu">
//                             <span className="footer-dropdown-menu-close" onClick={closeDropoutLogin}>&#10006;</span>
//                             {!isAuthenticated && <div className="footer-dropdown-menu-text" >
//                                 При регистрации и логине ты сможешь стать нашим Клиентом или Партнёром
//                             </div>}
//                             <button style={{ color: "black" }} onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>
//                             {!isAuthenticated && <button className="footer-dropdown-menu-partner" onClick={handlePartnerClick}>Партнёр</button>}
//                             {isAuthenticated && <button className="footer-dropdown-menu-logout" onClick={handleLogoutClick}>Выход</button>}
//                         </div>
//                     )}
//                 </div>
//                 {showSellerRegistration && (
//                     <SellerRegistrationForm />
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default Footer;











// const Footer = ({ onSearch, cartItems = [], showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter, setCurrentPage, setActiveComponent }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
//     const [isContactModalOpen, setIsContactModalOpen] = useState(false);
//     const isAuthenticated = localStorage.getItem('token');
//     const history = useHistory();
//     const profileRef = useRef(null);
//     const [showSellerRegistration, setShowSellerRegistration] = useState(false);
//     const location = useLocation();
//     const [activeButton, setActiveButton] = useState(null);
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
//     };
//
//     const handleButtonClick = (buttonName, component) => {
//         setActiveButton(prevButton => {
//             if (prevButton === buttonName) {
//                 setActiveComponent(null); // Если кнопка уже активна, деактивируем компонент
//                 return null;
//             } else {
//                 setActiveComponent(component);
//                 return buttonName;
//             }
//         });
//     };
//
//     const handleCartClick = () => {
//         if (cartItems.length > 0) {
//             history.push("/cart");
//         } else {
//             setShowSidebar(true);
//         }
//         handleButtonClick('cart', 'cart');
//         setShowSidebar(showSidebar);
//
//     };
//
//     const handleContactClick = () => {
//         history.push('/sellers-contacts');
//         handleButtonClick('contact', 'sellers-contacts');
//         setShowSidebar(showSidebar);
//
//     };
//
//     const handleCatalogClick = () => {
//         setSelectedOption('catalog');
//         history.push('/catalog');
//         setShowSidebar(!showSidebar);
//         handleButtonClick('catalog', 'catalog');
//     };
//
//     const handleProfileClick = () => {
//         setIsProfileOpen(!isProfileOpen);
//         handleButtonClick('profile', 'profile');
//         setShowSidebar(showSidebar);
//     };
//
//     const handleLoginClick = () => {
//         if (isAuthenticated) {
//             history.push("/profile");
//         } else {
//             history.push("/login");
//         }
//         setIsProfileOpen(false);
//         handleButtonClick('profile', 'profile');
//     };
//
//     const handleLogoutClick = () => {
//         localStorage.removeItem('token');
//         history.push("/");
//         setIsProfileOpen(false);
//         handleButtonClick('profile', 'profile');
//     };
//
//     const handlePartnerClick = () => {
//         setIsProfileOpen(false);
//         history.push("/sellers/register");
//         handleButtonClick('profile', 'sellers/register');
//         setShowSidebar(showSidebar);
//     };
//
//     const closeDropoutLogin = () => {
//         history.push("/catalog");
//     }
//
//     const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
//
//     return (
//         <div className="footer-page">
//             <div className={`home-icon ${activeButton === 'home' ? 'active' : ''}`} onClick={() => handleButtonClick('home', 'home')}>
//                 <Link to="/" >
//                     <img className="home-icon-img" src={homeIcon} />
//                     <div>
//                         <span className="home-icon-link">Главная</span>
//                     </div>
//                 </Link>
//             </div>
//
//             <div className={`catalog-icon ${activeButton === 'catalog' ? 'active' : ''}`} onClick={handleCatalogClick}>
//                 <img className="catalog-icon-img" src={catalogPageIcon} />
//                 <div>
//                     <span className="catalog-icon-link catalog-header">Каталог</span>
//                 </div>
//             </div>
//
//             <div className={`cart-icon ${activeButton === 'cart' ? 'active' : ''}`} onClick={handleCartClick}>
//                 <Link to="/cart" className="footer-auth-button btn">
//                     <img className="cart-icon-img" src={cartIcon} />
//                     {totalItemsCount > 0 && (
//                         <div className="total-items-count"><span>{totalItemsCount}</span></div>
//                     )}
//                     <div className="footer-totalItems">
//                         <span className="footer-totalItems">Корзина</span>
//                     </div>
//                 </Link>
//             </div>
//
//             <div className={`contact-icon ${activeButton === 'contact' ? 'active' : ''}`} onClick={handleContactClick}>
//                 <img className="contact-icon-img" src={contactIcon} />
//                 <div>
//                     <span className="footer-btn">Контакты</span>
//                 </div>
//             </div>
//
//             <div className={`profile-icon ${activeButton === 'profile' ? 'active' : ''}`} onClick={handleProfileClick}>
//                 <img className="profile-icon-img" src={profileIcon} />
//                 <div className="footer-profileIcon" ref={profileRef}>
//                     {!isProfileOpen && (
//                         <span className="profile-icon-link">Войти</span>
//                     )}
//                     {isProfileOpen && (
//                         <div className="footer-dropdown-menu">
//                             <span className="footer-dropdown-menu-close" onClick={closeDropoutLogin}>&#10006;</span>
//                             {!isAuthenticated && <div className="footer-dropdown-menu-text" >
//                                 При регистрации и логине ты сможешь стать нашим Клиентом или Партнёром
//                             </div>}
//                             <button style={{ color: "black" }} onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>
//                             {!isAuthenticated && <button className="footer-dropdown-menu-partner" onClick={handlePartnerClick}>Партнёр</button>}
//                             {isAuthenticated && <button className="footer-dropdown-menu-logout" onClick={handleLogoutClick}>Выход</button>}
//                         </div>
//                     )}
//                 </div>
//                 {showSellerRegistration && (
//                     <SellerRegistrationForm />
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default Footer;










// const Footer = ({ onSearch, cartItems = [], showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter, setCurrentPage, setActiveComponent }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
//     const [isContactModalOpen, setIsContactModalOpen] = useState(false);
//     const isAuthenticated = localStorage.getItem('token');
//     const history = useHistory();
//     const profileRef = useRef(null);
//     const [showSellerRegistration, setShowSellerRegistration] = useState(false);
//     const location = useLocation();
//     const [activeButton, setActiveButton] = useState(null);
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
//     };
//
//     const handleButtonClick = (buttonName, component) => {
//         setActiveButton(prevButton => {
//             if (prevButton === buttonName) {
//                 setActiveComponent(null); // Если кнопка уже активна, деактивируем компонент
//                 return null;
//             } else {
//                 setActiveComponent(component);
//                 return buttonName;
//             }
//         });
//     };
//
//     const handleCartClick = () => {
//         if (cartItems.length > 0) {
//             history.push("/cart");
//         } else {
//             setShowSidebar(true);
//         }
//         handleButtonClick('cart', 'cart');
//     };
//
//     const handleContactClick = () => {
//         history.push('/sellers-contacts');
//         handleButtonClick('contact', 'sellers-contacts');
//     };
//
//     const handleCatalogClick = () => {
//         setSelectedOption('catalog');
//         history.push('/catalog');
//         setShowSidebar(!showSidebar);
//         handleButtonClick('catalog', 'catalog');
//     };
//
//     const handleProfileClick = () => {
//         setIsProfileOpen(!isProfileOpen);
//         handleButtonClick('profile', 'profile');
//     };
//
//     const handleLoginClick = () => {
//         if (isAuthenticated) {
//             history.push("/profile");
//         } else {
//             history.push("/login");
//         }
//         setIsProfileOpen(false);
//         handleButtonClick('profile', 'profile');
//     };
//
//     const handleLogoutClick = () => {
//         localStorage.removeItem('token');
//         history.push("/");
//         setIsProfileOpen(false);
//         handleButtonClick('profile', 'profile');
//     };
//
//     const handlePartnerClick = () => {
//         setIsProfileOpen(false);
//         history.push("/sellers/register");
//         handleButtonClick('profile', 'sellers/register');
//     };
//
//     const closeDropoutLogin = () => {
//         history.push("/catalog");
//     }
//
//     const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
//
//     return (
//         <div className="footer-page">
//             <div className={`home-icon ${activeButton === 'home' ? 'active' : ''}`} onClick={() => handleButtonClick('home', 'home')}>
//                 <Link to="/" >
//                     <img className="home-icon-img" src={homeIcon} />
//                     <div>
//                         <span className="home-icon-link">Главная</span>
//                     </div>
//                 </Link>
//             </div>
//
//             <div className={`catalog-icon ${activeButton === 'catalog' ? 'active' : ''}`} onClick={handleCatalogClick}>
//                 <img className="catalog-icon-img" src={catalogPageIcon} />
//                 <div>
//                     <span className="catalog-icon-link catalog-header">Каталог</span>
//                 </div>
//             </div>
//
//             <div className={`cart-icon ${activeButton === 'cart' ? 'active' : ''}`} onClick={handleCartClick}>
//                 <Link to="/cart" className="footer-auth-button btn">
//                     <img className="cart-icon-img" src={cartIcon} />
//                     {totalItemsCount > 0 && (
//                         <div className="total-items-count"><span>{totalItemsCount}</span></div>
//                     )}
//                     <div className="footer-totalItems">
//                         <span className="footer-totalItems">Корзина</span>
//                     </div>
//                 </Link>
//             </div>
//
//             <div className={`contact-icon ${activeButton === 'contact' ? 'active' : ''}`} onClick={handleContactClick}>
//                 <img className="contact-icon-img" src={contactIcon} />
//                 <div>
//                     <span className="footer-btn">Контакты</span>
//                 </div>
//             </div>
//
//             <div className={`profile-icon ${activeButton === 'profile' ? 'active' : ''}`} onClick={handleProfileClick}>
//                 <img className="profile-icon-img" src={profileIcon} />
//                 <div className="footer-profileIcon" ref={profileRef}>
//                     {!isProfileOpen && (
//                         <span className="profile-icon-link">Войти</span>
//                     )}
//                     {isProfileOpen && (
//                         <div className="footer-dropdown-menu">
//                             <span className="footer-dropdown-menu-close" onClick={closeDropoutLogin}>&#10006;</span>
//                             {!isAuthenticated && <div className="footer-dropdown-menu-text" >
//                                 При регистрации и логине ты сможешь стать нашим Клиентом или Партнёром
//                             </div>}
//                             <button style={{ color: "black" }} onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>
//                             {!isAuthenticated && <button className="footer-dropdown-menu-partner" onClick={handlePartnerClick}>Партнёр</button>}
//                             {isAuthenticated && <button className="footer-dropdown-menu-logout" onClick={handleLogoutClick}>Выход</button>}
//                         </div>
//                     )}
//                 </div>
//                 {showSellerRegistration && (
//                     <SellerRegistrationForm />
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default Footer;






// const Footer = ({ onSearch, cartItems = [], showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter, setCurrentPage, setActiveComponent }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
//     const [isContactModalOpen, setIsContactModalOpen] = useState(false);
//     const isAuthenticated = localStorage.getItem('token');
//     const history = useHistory();
//     const profileRef = useRef(null);
//     const [showSellerRegistration, setShowSellerRegistration] = useState(false);
//     const location = useLocation();
//     const [activeButton, setActiveButton] = useState(null);
//     // const [activeButton, setActiveButton] = useState(null);
//     const [prevPath, setPrevPath] = useState(null); // Состояние для хранения предыдущего пути
//
//     useEffect(() => {
//         if (!showSidebar) {
//             setActiveButton(null); // Reset active button when the sidebar is closed
//         }
//     }, [showSidebar, setActiveButton]);
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
//     };
//
//     const handleButtonClick = (buttonName, component) => {
//         if (buttonName === 'cart' || buttonName === 'contact') {
//             // Сохраняем текущий путь при первом клике на "Корзина" или "Контакты"
//             if (!prevPath) {
//                 setPrevPath(location.pathname);
//             }
//         }
//         setActiveButton(prevButton => {
//             if (prevButton === buttonName) {
//                 setActiveComponent(null); // Если кнопка уже активна, деактивируем компонент
//                 if (prevPath) {
//                     history.push(prevPath); // Используем предыдущий путь при повторном клике
//                     setPrevPath(null); // Сбрасываем сохраненный путь
//                 }
//                 return null;
//             } else {
//                 setActiveComponent(component);
//                 return buttonName;
//             }
//         });
//     };
//
//     const handleCartClick = () => {
//         if (cartItems.length > 0) {
//             history.push("/cart");
//         } else {
//             setShowSidebar(true);
//         }
//         handleButtonClick('cart', 'cart');
//     };
//
//     const handleContactClick = () => {
//         history.push('/sellers-contacts');
//         handleButtonClick('contact', 'sellers-contacts');
//     };
//
//     const handleCatalogClick = () => {
//         setSelectedOption('catalog');
//         history.push('/catalog');
//         setShowSidebar(!showSidebar);
//         handleButtonClick('catalog', 'catalog');
//     };
//
//     const handleProfileClick = () => {
//         setIsProfileOpen(!isProfileOpen);
//         history.push('/')
//         handleButtonClick('profile', 'profile');
//     };
//
//     const handleLoginClick = () => {
//         if (isAuthenticated) {
//             history.push("/profile");
//         } else {
//             history.push("/login");
//         }
//         setIsProfileOpen(false);
//         handleButtonClick('profile', 'profile');
//     };
//
//     const handleLogoutClick = () => {
//         localStorage.removeItem('token');
//         history.push("/");
//         setIsProfileOpen(false);
//         handleButtonClick('profile', 'profile');
//     };
//
//     const handlePartnerClick = () => {
//         setIsProfileOpen(false);
//         history.push("/sellers/register");
//         handleButtonClick('profile', 'sellers/register');
//     };
//
//     const closeDropoutLogin = () => {
//         history.push("/catalog");
//     }
//
//     const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
//
//     return (
//         <div className="footer-page">
//             <div className={`home-icon ${activeButton === 'home' ? 'active' : ''}`} onClick={() => handleButtonClick('home', 'home')}>
//                 <Link to="/" >
//                     <img className="home-icon-img" src={homeIcon} />
//                     <div>
//                         <span className="home-icon-link">Главная</span>
//                     </div>
//                 </Link>
//             </div>
//
//             <div className={`catalog-icon ${activeButton === 'catalog' ? 'active' : ''}`} onClick={handleCatalogClick}>
//                 <img className="catalog-icon-img" src={catalogPageIcon} />
//                 <div>
//                     <span className="catalog-icon-link catalog-header">Каталог</span>
//                 </div>
//             </div>
//
//             <div className={`cart-icon ${activeButton === 'cart' ? 'active' : ''}`} onClick={handleCartClick}>
//                 <Link to="/cart" className="footer-auth-button btn">
//                     <img className="cart-icon-img" src={cartIcon} />
//                     {totalItemsCount > 0 && (
//                         <div className="total-items-count"><span>{totalItemsCount}</span></div>
//                     )}
//                     <div className="footer-totalItems">
//                         <span className="footer-totalItems">Корзина</span>
//                     </div>
//                 </Link>
//             </div>
//
//             <div className={`contact-icon ${activeButton === 'contact' ? 'active' : ''}`} onClick={handleContactClick}>
//                 <img className="contact-icon-img" src={contactIcon} />
//                 <div>
//                     <span className="footer-btn">Контакты</span>
//                 </div>
//             </div>
//
//             <div className={`profile-icon ${activeButton === 'profile' ? 'active' : ''}`} onClick={handleProfileClick}>
//                 <img className="profile-icon-img" src={profileIcon} />
//                 <div className="footer-profileIcon" ref={profileRef}>
//                     {!isProfileOpen && (
//                         <span className="profile-icon-link">Войти</span>
//                     )}
//                     {isProfileOpen && (
//                         <div className="footer-dropdown-menu">
//                             <span className="footer-dropdown-menu-close" onClick={closeDropoutLogin}>&#10006;</span>
//                             {!isAuthenticated && <div className="footer-dropdown-menu-text" >
//                                 При регистрации и логине ты сможешь стать нашим Клиентом или Партнёром
//                             </div>}
//                             <button style={{ color: "black" }} onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>
//                             {!isAuthenticated && <button className="footer-dropdown-menu-partner" onClick={handlePartnerClick}>Партнёр</button>}
//                             {isAuthenticated && <button className="footer-dropdown-menu-logout" onClick={handleLogoutClick}>Выход</button>}
//                         </div>
//                     )}
//                 </div>
//                 {showSellerRegistration && (
//                     <SellerRegistrationForm />
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default Footer;
//





//
// const Footer = ({ onSearch, cartItems = [], showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter, setCurrentPage, setActiveComponent }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
//     const [isContactModalOpen, setIsContactModalOpen] = useState(false);
//     const isAuthenticated = localStorage.getItem('token');
//     const history = useHistory();
//     const profileRef = useRef(null);
//     const [showSellerRegistration, setShowSellerRegistration] = useState(false);
//     const location = useLocation();
//     const [activeButton, setActiveButton] = useState(null);
//     const [prevPath, setPrevPath] = useState(null);
//     const [buttonClick, setButtonClick] = useState(null); // New state to store the clicked button
//
//     useEffect(() => {
//         if (!showSidebar) {
//             setActiveButton(null);
//         }
//     }, [showSidebar, setActiveButton]);
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
//         if (buttonClick === 'login') {
//             if (isAuthenticated) {
//                 history.push("/profile");
//             } else {
//                 history.push("/login");
//             }
//             setIsProfileOpen(false);
//         } else if (buttonClick === 'logout') {
//             localStorage.removeItem('token');
//             history.push("/");
//             setIsProfileOpen(false);
//         } else if (buttonClick === 'partner') {
//             setIsProfileOpen(false);
//             history.push("/sellers/register");
//         }
//         setButtonClick(null); // Reset button click state
//     }, [buttonClick, isAuthenticated, history]);
//
//     const handleSearchChange = (e) => {
//         const value = e.target.value;
//         setSearchTerm(value);
//         setCurrentPage(1);
//         onSearch(value);
//     };
//
//     const handleButtonClick = (buttonName, component) => {
//         if (buttonName === 'cart' || buttonName === 'contact' || buttonName === 'profile') {
//             if (!prevPath) {
//                 setPrevPath(location.pathname);
//             }
//         }
//
//         setActiveButton(prevButton => {
//             if (prevButton === buttonName) {
//                 setActiveComponent(null);
//                 if (prevPath) {
//                     history.push(prevPath);
//                     setPrevPath(null);
//                 }
//                 return null;
//             } else {
//                 setActiveComponent(component);
//                 return buttonName;
//             }
//         });
//     };
//
//
//     const handleCartClick = () => {
//         if (cartItems.length > 0) {
//             history.push("/cart");
//         } else {
//             setShowSidebar(true);
//         }
//         handleButtonClick('cart', 'cart');
//     };
//
//
//     const handleContactClick = () => {
//         history.push('/sellers-contacts');
//         handleButtonClick('contact', 'sellers-contacts');
//     };
//
//
//     const handleCatalogClick = () => {
//         setSelectedOption('catalog');
//         history.push('/catalog');
//         setShowSidebar(!showSidebar);
//         handleButtonClick('catalog', 'catalog');
//     };
//
//     const handleProfileClick = () => {
//         setIsProfileOpen(!isProfileOpen);
//         handleButtonClick('profile', 'profile');
//     };
//
//     const handleLoginClick = () => {
//         setButtonClick('login');
//     };
//
//     const handleLogoutClick = () => {
//         setButtonClick('logout');
//     };
//
//     const handlePartnerClick = () => {
//         setButtonClick('partner');
//     };
//
//     const closeDropoutLogin = () => {
//         history.push("/catalog");
//     };
//
//     const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
//
//     return (
//         <div className="footer-page">
//             <div className={`home-icon ${activeButton === 'home' ? 'active' : ''}`} onClick={() => handleButtonClick('home', 'home')}>
//                 <Link to="/" >
//                     <img className="home-icon-img" src={homeIcon} />
//                     <div>
//                         <span className="home-icon-link">Главная</span>
//                     </div>
//                 </Link>
//             </div>
//
//             <div className={`catalog-icon ${activeButton === 'catalog' ? 'active' : ''}`} onClick={handleCatalogClick}>
//                 <img className="catalog-icon-img" src={catalogPageIcon} />
//                 <div>
//                     <span className="catalog-icon-link catalog-header">Каталог</span>
//                 </div>
//             </div>
//
//             <div className={`cart-icon ${activeButton === 'cart' ? 'active' : ''}`} onClick={handleCartClick}>
//                 <Link to="/cart" className="footer-auth-button btn">
//                     <img className="cart-icon-img" src={cartIcon} />
//                     {totalItemsCount > 0 && (
//                         <div className="total-items-count"><span>{totalItemsCount}</span></div>
//                     )}
//                     <div className="footer-totalItems">
//                         <span className="footer-totalItems">Корзина</span>
//                     </div>
//                 </Link>
//             </div>
//
//             <div className={`contact-icon ${activeButton === 'contact' ? 'active' : ''}`} onClick={handleContactClick}>
//                 <img className="contact-icon-img" src={contactIcon} />
//                 <div>
//                     <span className="footer-btn">Контакты</span>
//                 </div>
//             </div>
//
//             <div className={`profile-icon ${activeButton === 'profile' ? 'active' : ''}`} onClick={handleProfileClick}>
//                 <img className="profile-icon-img" src={profileIcon} />
//                 <div className="footer-profileIcon" ref={profileRef}>
//                     {!isProfileOpen && (
//                         <span className="profile-icon-link">Войти</span>
//                     )}
//                     {isProfileOpen && (
//                         <div className="footer-dropdown-menu">
//                             <span className="footer-dropdown-menu-close" onClick={closeDropoutLogin}>&#10006;</span>
//                             {!isAuthenticated && <div className="footer-dropdown-menu-text" >
//                                 При регистрации и логине ты сможешь стать нашим Клиентом или Партнёром
//                             </div>}
//                             <button style={{ color: "black" }} onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>
//                             {!isAuthenticated && <button className="footer-dropdown-menu-partner" onClick={handlePartnerClick}>Партнёр</button>}
//                             {isAuthenticated && <button className="footer-dropdown-menu-logout" onClick={handleLogoutClick}>Выход</button>}
//                         </div>
//                     )}
//                 </div>
//                 {showSellerRegistration && (
//                     <SellerRegistrationForm />
//                 )}
//             </div>
//         </div>
//     );
//
// };
//
// export default Footer;
//



// const Footer = ({
//                     onSearch,
//                     cartItems = [],
//                     showSidebar,
//                     setShowSidebar,
//                     selectedOption,
//                     setSelectedOption,
//                     resetFilter,
//                     setCurrentPage,
//                     setActiveComponent,
//                     activeComponent
//                 }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
//     const [isContactModalOpen, setIsContactModalOpen] = useState(false);
//     const isAuthenticated = localStorage.getItem('token');
//     const history = useHistory();
//     const profileRef = useRef(null);
//     const [showSellerRegistration, setShowSellerRegistration] = useState(false);
//     const location = useLocation();
//     const [activeButton, setActiveButton] = useState(null);
//     const [prevPath, setPrevPath] = useState(null);
//     const [buttonClick, setButtonClick] = useState(null); // New state to store the clicked button
//
//     useEffect(() => {
//         if (!showSidebar) {
//             setActiveButton(null);
//         }
//     }, [showSidebar, setActiveButton]);
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
//         if (buttonClick === 'login') {
//             if (isAuthenticated) {
//                 history.push("/profile");
//             } else {
//                 history.push("/login");
//             }
//             setIsProfileOpen(false);
//         } else if (buttonClick === 'logout') {
//             localStorage.removeItem('token');
//             history.push("/");
//             setIsProfileOpen(false);
//         } else if (buttonClick === 'partner') {
//             setIsProfileOpen(false);
//             history.push("/sellers/register");
//         }
//         setButtonClick(null); // Reset button click state
//     }, [buttonClick, isAuthenticated, history]);
//
//     const handleSearchChange = (e) => {
//         const value = e.target.value;
//         setSearchTerm(value);
//         setCurrentPage(1);
//         onSearch(value);
//     };
//
//     const handleButtonClick = (buttonName, component) => {
//         if (buttonName === 'cart' || buttonName === 'contact') {
//             if (!prevPath) {
//                 setPrevPath(location.pathname);
//             }
//         }
//         setActiveComponent((prevComponent) => {
//             if (prevComponent === component) {
//                 return null;
//             } else {
//                 return component;
//             }
//         });
//     };
//
//     const handleCartClick = () => {
//         if (activeComponent === 'cart') {
//             setActiveComponent(null);
//             setShowSidebar(false);
//             history.push(prevPath || "/");
//         } else {
//             if (cartItems.length > 0) {
//                 history.push("/cart");
//             } else {
//                 setShowSidebar(true);
//             }
//             handleButtonClick('cart', 'cart');
//         }
//     };
//
//     const handleContactClick = () => {
//         history.push('/sellers-contacts');
//         handleButtonClick('contact', 'contact');
//     };
//
//     const handleCatalogClick = () => {
//             setSelectedOption('catalog');
//         history.push('/catalog');
//         setShowSidebar(!showSidebar);
//         handleButtonClick('catalog', 'catalog');
//     };
//
//     const handleProfileClick = () => {
//         setIsProfileOpen(!isProfileOpen);
//         history.push('/catalog')
//         handleButtonClick('profile', 'profile');
//     };
//
//     const handleLoginClick = () => {
//         setButtonClick('login');
//     };
//
//     const handleLogoutClick = () => {
//         setButtonClick('logout');
//     };
//
//     const handlePartnerClick = () => {
//         setButtonClick('partner');
//     };
//
//     const closeDropoutLogin = () => {
//         history.push("/catalog");
//     };
//
//     const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
//
//     return (
//         <div className="footer-page">
//             <div className={`home-icon ${activeComponent === 'home' ? 'active' : ''}`} onClick={() => handleButtonClick('home', 'home')}>
//                 <Link to="/" >
//                     <img className="home-icon-img" src={homeIcon} />
//                     <div>
//                         <span className="home-icon-link">Главная</span>
//                     </div>
//                 </Link>
//             </div>
//
//             <div className={`catalog-icon ${activeComponent === 'catalog' ? 'active' : ''}`} onClick={handleCatalogClick}>
//                 <img className="catalog-icon-img" src={catalogPageIcon} />
//                 <div>
//                     <span className="catalog-icon-link catalog-header">Каталог</span>
//                 </div>
//             </div>
//
//             <div className={`cart-icon ${activeComponent === 'cart' ? 'active' : ''}`} onClick={handleCartClick}>
//                 <Link to="/cart" className="footer-auth-button btn">
//                     <img className="cart-icon-img" src={cartIcon} />
//                     {totalItemsCount > 0 && (
//                         <div className="total-items-count"><span>{totalItemsCount}</span></div>
//                     )}
//                     <div className="footer-totalItems">
//                         <span className="footer-totalItems">Корзина</span>
//                     </div>
//                 </Link>
//             </div>
//
//             <div className={`contact-icon ${activeComponent === 'contact' ? 'active' : ''}`} onClick={handleContactClick}>
//                 <img className="contact-icon-img" src={contactIcon} />
//                 <div>
//                     <span className="footer-btn">Контакты</span>
//                 </div>
//             </div>
//
//             <div className={`profile-icon ${activeComponent === 'profile' ? 'active' : ''}`} onClick={handleProfileClick}>
//                 <img className="profile-icon-img" src={profileIcon} />
//                 <div className="footer-profileIcon" ref={profileRef}>
//                     {!isProfileOpen && (
//                         <span className="profile-icon-link">Войти</span>
//                     )}
//                     {isProfileOpen && (
//                         <div className="footer-dropdown-menu">
//                             <span className="footer-dropdown-menu-close" onClick={closeDropoutLogin}>&#10006;</span>
//                             {!isAuthenticated && <div className="footer-dropdown-menu-text" >
//                                 При регистрации и логине ты сможешь стать нашим Клиентом или Партнёром
//                             </div>}
//                             <button style={{ color: "black" }} onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>
//                             {!isAuthenticated && <button className="footer-dropdown-menu-partner" onClick={handlePartnerClick}>Партнёр</button>}
//                             {isAuthenticated && <button className="footer-dropdown-menu-logout" onClick={handleLogoutClick}>Выход</button>}
//                         </div>
//                     )}
//                 </div>
//                 {showSellerRegistration && (
//                     <SellerRegistrationForm />
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default Footer;







const Footer = ({
                    onSearch,
                    cartItems = [],
                    showSidebar,
                    setShowSidebar,
                    selectedOption,
                    setSelectedOption,
                    resetFilter,
                    setCurrentPage,
                    setActiveComponent,
                    activeComponent
                }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const isAuthenticated = localStorage.getItem('token');
    const history = useHistory();
    const profileRef = useRef(null);
    const [showSellerRegistration, setShowSellerRegistration] = useState(false);
    const location = useLocation();
    const [activeButton, setActiveButton] = useState(null);
    const [prevPath, setPrevPath] = useState(null);
    const [buttonClick, setButtonClick] = useState(null); // New state to store the clicked button

    useEffect(() => {
        if (!showSidebar) {
            setActiveButton(null);
        }
    }, [showSidebar, setActiveButton]);

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
        if (buttonClick === 'login') {
            if (isAuthenticated) {
                history.push("/profile");
            } else {
                history.push("/login");
            }
            setIsProfileOpen(false);
        } else if (buttonClick === 'logout') {
            localStorage.removeItem('token');
            history.push("/");
            setIsProfileOpen(false);
        } else if (buttonClick === 'partner') {
            setIsProfileOpen(false);
            history.push("/sellers/register");
        }
        setButtonClick(null); // Reset button click state
    }, [buttonClick, isAuthenticated, history]);

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
        if (activeComponent === 'contact') {
            setActiveComponent(null);
            history.push(prevPath || "/");
        } else {

            history.push('/sellers-contacts');

            handleButtonClick('contact', 'contact');
        }
    };

    const handleCatalogClick = () => {
        setSelectedOption('catalog');
        history.push('/catalog');
        setShowSidebar(!showSidebar);
        handleButtonClick('catalog', 'catalog');
    };

    const handleProfileClick = () => {
        if (activeComponent === 'profile') {
            setActiveComponent(null);
            setIsProfileOpen(false);
            history.push(prevPath || "/");
        } else {
            setIsProfileOpen(true);
            history.push('/catalog');
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
        history.push("/catalog");
    };

    const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

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

            <div className={`catalog-icon ${activeComponent === 'catalog' ? 'active' : ''}`} onClick={handleCatalogClick}>
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

            <div className={`contact-icon ${activeComponent === 'contact' ? 'active' : ''}`} onClick={handleContactClick}>
                <img className="contact-icon-img" src={contactIcon} />
                <div>
                    <span className="footer-btn">Контакты</span>
                </div>
            </div>

            <div className={`profile-icon ${activeComponent === 'profile' ? 'active' : ''}`} onClick={handleProfileClick}>
                <img className="profile-icon-img" src={profileIcon} />
                <div className="footer-profileIcon" ref={profileRef}>
                    {!isProfileOpen && (
                        <span className="profile-icon-link">Войти</span>
                    )}
                    {isProfileOpen && (
                        <div className="footer-dropdown-menu">
                            <span className="footer-dropdown-menu-close" onClick={closeDropoutLogin}>&#10006;</span>
                            {!isAuthenticated && <div className="footer-dropdown-menu-text" >
                                При регистрации и логине ты сможешь стать нашим Клиентом или Партнёром
                            </div>}
                            <button style={{ color: "black" }} onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>
                            {!isAuthenticated && <button className="footer-dropdown-menu-partner" onClick={handlePartnerClick}>Партнёр</button>}
                            {isAuthenticated && <button className="footer-dropdown-menu-logout" onClick={handleLogoutClick}>Выход</button>}
                        </div>
                    )}
                </div>
                {showSellerRegistration && (
                    <SellerRegistrationForm />
                )}
            </div>
        </div>
    );
};

export default Footer;