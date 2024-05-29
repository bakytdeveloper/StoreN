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
import ContactInfoModal from "./ContactInfoModal";

// const Footer = ({ onSearch, cartItems = [], showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter, setCurrentPage }) => {
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
//             setActivePage('/');
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
//         const role = localStorage.getItem('role');
//         if (isAuthenticated) {
//             if (role === 'customer') {
//                 history.push("/profile");
//             } else if (role === 'seller') {
//                 history.push("/sellerProfile");
//             }
//         }
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
//     const handleCloseSidebar = () => {
//         setShowSidebar(false);
//     };
//
//     const totalItemsCount = cartItems.length > 0 ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
//
//     return (
//         <div className="footer-page">
//
//
//                    <div className="home-icon">
//                        <img className="home-icon-img" src={homeIcon} />
//                             <div>
//                                 <Link className="home-icon-link" to="/" >Главная</Link>
//
//                             </div>
//                        {/*<Link className="home-icon-link" to="/" className={`footer-nav-link ${activePage === 'home' ? 'active-title' : ''}`}>Главная</Link>*/}
//                    </div>
//
//                    <div className="catalog-icon">
//                        <img className="catalog-icon-img" src={catalogPageIcon} />
//                         <div>
//                             <Link className="catalog-icon-link catalog-header" to="/catalog" >Каталог</Link>
//
//                         </div>
//                        {/*<Link to="/catalog" className={`footer-nav-link ${activePage === 'catalog' ? 'active-title' : ''}`}>Каталог</Link>*/}
//                    </div>
//
//
//
//
//                 <div className="profile-icon">
//                     <img className="profile-icon-img" src={profileIcon} />
//                     <div className="footer-profileIcon" ref={profileRef}>
//                         {!isProfileOpen && (
//
//
//                             <span className="profile-icon-link" onClick={handleProfileClick}>Войти</span>
//                         )}
//                         {isProfileOpen && (
//                             <div className="footer-dropdown-menu">
//                                 <button onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>
//                                 {!isAuthenticated && <button className="footer-dropdown-menu-partner" onClick={handlePartnerClick}>Партнёр</button>}
//                                 {isAuthenticated && <button className="footer-dropdown-menu-logout" onClick={handleLogoutClick}>Выход</button>}
//                             </div>
//                         )}
//                     </div>
//
//                     {showSellerRegistration && (
//                         <SellerRegistrationForm />
//                     )}
//                 </div>
//
//             <div className="cart-icon">
//                 <img className="cart-icon-img" src={cartIcon}/>
//                 <span>({totalItemsCount})</span>
//                <div>
//                    <Link to="/cart" className="footer-auth-button btn" onClick={handleCartClick}>
//                        <span className="footer-totalItems">Корзина</span>
//                        {/*<span className="footer-totalItems">Корзина ({totalItemsCount})</span>*/}
//                    </Link>
//                </div>
//             </div>
//
//
//             <div className="contact-icon">
//                 <img className="contact-icon-img" src={contactIcon}/>
//                 <div>
//                     <Link to="/cart" className="footer-auth-button btn" onClick={handleCartClick}>
//                         <Link  style={{color:"black"}} to="/contact" className="footer-btn">Контакты</Link>
//                     </Link>
//                 </div>
//             </div>
//
//
//
//
//         </div>
//     );
// };
//
// export default Footer;




// const Footer = ({ onSearch, cartItems = [], showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter, setCurrentPage }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
//     const isAuthenticated = localStorage.getItem('token');
//     const history = useHistory();
//     const profileRef = useRef(null);
//     const [showSellerRegistration, setShowSellerRegistration] = useState(false);
//     const location = useLocation();
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
//     const handleCartClick = () => {
//         if (cartItems.length > 0) {
//             history.push("/cart");
//         } else {
//             history.push("/");
//         }
//     };
//
//
//
//     const handleContactClick = () => {
//         setSelectedOption('contact');
//         setShowSidebar(!showSidebar);
//     };
//
//     const handleCatalogClick = () => {
//         setSelectedOption('catalog');
//         setShowSidebar(!showSidebar);
//     };
//
//     const handleProfileClick = () => {
//         setIsProfileOpen(!isProfileOpen);
//         const role = localStorage.getItem('role');
//         if (isAuthenticated) {
//             if (role === 'customer') {
//                 history.push("/profile");
//             } else if (role === 'seller') {
//                 history.push("/sellerProfile");
//             }
//         }
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
//     const handleCloseSidebar = () => {
//         setShowSidebar(false);
//     };
//
//     const totalItemsCount = cartItems.length > 0 ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
//
//     return (
//         <div className="footer-page">
//             <div className="home-icon">
//                 <img className="home-icon-img" src={homeIcon} />
//                 <div>
//                     <Link className="home-icon-link" to="/" >Главная</Link>
//                 </div>
//             </div>
//
//             <div className="catalog-icon">
//                 <img className="catalog-icon-img" src={catalogPageIcon} />
//                 <div>
//                     <Link className="catalog-icon-link catalog-header" to="/catalog" >Каталог</Link>
//                 </div>
//             </div>
//
//             <div className="profile-icon">
//                 <img className="profile-icon-img" src={profileIcon} />
//                 <div className="footer-profileIcon" ref={profileRef}>
//                     {!isProfileOpen && (
//                         <span className="profile-icon-link" onClick={handleProfileClick}>Войти</span>
//                     )}
//                     {isProfileOpen && (
//                         <div className="footer-dropdown-menu">
//                             <button onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>
//                             {!isAuthenticated && <button className="footer-dropdown-menu-partner" onClick={handlePartnerClick}>Партнёр</button>}
//                             {isAuthenticated && <button className="footer-dropdown-menu-logout" onClick={handleLogoutClick}>Выход</button>}
//                         </div>
//                     )}
//                 </div>
//                 {showSellerRegistration && (
//                     <SellerRegistrationForm />
//                 )}
//             </div>
//
//             <div className="cart-icon">
//                 <img className="cart-icon-img" src={cartIcon}/>
//                 <span>({totalItemsCount})</span>
//                 <div>
//                     <Link to="/cart" className="footer-auth-button btn" onClick={handleCartClick}>
//                         <span className="footer-totalItems">Корзина</span>
//                     </Link>
//                 </div>
//             </div>
//
//             <div className="contact-icon">
//                 <img className="contact-icon-img" src={contactIcon}/>
//                 <div>
//                     <Link to="/contact" className="footer-btn">Контакты</Link>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Footer;






// const Footer = ({ onSearch, cartItems = [], showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter, setCurrentPage }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
//     const [isContactModalOpen, setIsContactModalOpen] = useState(false); // Состояние для управления модальным окном контактов
//     const isAuthenticated = localStorage.getItem('token');
//     const history = useHistory();
//     const profileRef = useRef(null);
//     const [showSellerRegistration, setShowSellerRegistration] = useState(false);
//     const location = useLocation();
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
//     const handleCartClick = () => {
//         if (cartItems.length > 0) {
//             history.push("/cart");
//         } else {
//             history.push("/");
//         }
//     };
//
//     const handleContactClick = () => {
//         setIsContactModalOpen(true); // Открыть модальное окно
//     };
//
//     const handleCloseModal = () => {
//         setIsContactModalOpen(false); // Закрыть модальное окно
//     };
//
//     const handleCatalogClick = () => {
//         setSelectedOption('catalog');
//         setShowSidebar(!showSidebar);
//     };
//
//     const handleProfileClick = () => {
//         setIsProfileOpen(!isProfileOpen);
//         const role = localStorage.getItem('role');
//         if (isAuthenticated) {
//             if (role === 'customer') {
//                 history.push("/profile");
//             } else if (role === 'seller') {
//                 history.push("/sellerProfile");
//             }
//         }
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
//     const handleCloseSidebar = () => {
//         setShowSidebar(false);
//     };
//
//     const closeDropoutLogin = () => {
//         history.goBack();
//     }
//
//     const totalItemsCount = cartItems.length > 0 ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
//
//     return (
//         <div className="footer-page">
//             <div className="home-icon">
//                 <img className="home-icon-img" src={homeIcon} />
//                 <div>
//                     <Link className="home-icon-link" to="/" >Главная</Link>
//                 </div>
//             </div>
//
//             <div className="catalog-icon">
//                 <img className="catalog-icon-img" src={catalogPageIcon} />
//                 <div>
//                     <Link className="catalog-icon-link catalog-header" to="/catalog" >Каталог</Link>
//                 </div>
//             </div>
//
//             <div className="profile-icon"  onClick={handleProfileClick}>
//                 <img className="profile-icon-img" src={profileIcon} />
//                 <div className="footer-profileIcon" ref={profileRef}>
//                     {!isProfileOpen && (
//                         <span className="profile-icon-link" >Войти</span>
//                         // <span className="profile-icon-link" onClick={handleProfileClick}>Войти</span>
//                     )}
//                     {isProfileOpen && (
//                         <div className="footer-dropdown-menu">
//                             <span className="footer-dropdown-menu-close" onClick={closeDropoutLogin}>&#10006;</span>
//                             <button onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>
//                             {!isAuthenticated && <button className="footer-dropdown-menu-partner" onClick={handlePartnerClick}>Партнёр</button>}
//                             {isAuthenticated && <button className="footer-dropdown-menu-logout" onClick={handleLogoutClick}>Выход</button>}
//                         </div>
//                     )}
//                 </div>
//                 {showSellerRegistration && (
//                     <SellerRegistrationForm />
//                 )}
//             </div>
//
//             <div className="cart-icon"  onClick={handleCartClick}>
//                 <img className="cart-icon-img" src={cartIcon}/>
//                 <span>({totalItemsCount})</span>
//                 <div>
//                     <Link to="/cart" className="footer-auth-button btn" >
//                     {/*<Link to="/cart" className="footer-auth-button btn" onClick={handleCartClick}>*/}
//                         <span className="footer-totalItems">Корзина</span>
//                     </Link>
//                 </div>
//             </div>
//
//             <div className="contact-icon" onClick={handleContactClick}>
//                 <img className="contact-icon-img" src={contactIcon}/>
//                 <div>
//                     <span className="footer-btn">Контакты</span>
//                     {/*<span className="footer-btn" onClick={handleContactClick}>Контакты</span>*/}
//                 </div>
//             </div>
//
//             {isContactModalOpen && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <ContactInfoModal handleCloseModal={handleCloseModal} />
//                         {/*<button className="close-btn" onClick={handleCloseModal}>Закрыть</button>*/}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default Footer;





// const Footer = ({ onSearch, cartItems = [], showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter, setCurrentPage }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
//     const [isContactModalOpen, setIsContactModalOpen] = useState(false); // Состояние для управления модальным окном контактов
//     const isAuthenticated = localStorage.getItem('token');
//     const history = useHistory();
//     const profileRef = useRef(null);
//     const [showSellerRegistration, setShowSellerRegistration] = useState(false);
//     const location = useLocation();
//
//     const [isCatalogActive, setIsCatalogActive] = useState(false); // Состояние для активной кнопки каталога
//     const [isCartActive, setIsCartActive] = useState(false); // Состояние для активной кнопки корзины
//     const [isContactActive, setIsContactActive] = useState(false); // Состояние для активной кнопки контактов
//     const [isProfileActive, setIsProfileActive] = useState(false); // Состояние для активной кнопки профиля
//
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
//     // const handleCartClick = () => {
//     //
//     //     setIsCartActive(true); // Устанавливаем состояние активной кнопки корзины
//     //     setIsCatalogActive(false);
//     //     setIsContactActive(false);
//     //     setIsProfileActive(false);
//     //
//     //     if (cartItems.length > 0) {
//     //         history.push("/cart");
//     //     } else {
//     //         history.push("/");
//     //     }
//     // };
//     //
//     const handleCartClick = () => {
//         setIsCartActive(true); // Устанавливаем состояние активной кнопки корзины
//         setIsCatalogActive(false);
//         setIsContactActive(false);
//         setIsProfileActive(false);
//
//         if (cartItems.length > 0) {
//             history.push("/cart");
//         } else {
//             history.push("/cart"); // Открыть модальное окно корзины
//         }
//     };
//
//
//
//     const handleContactClick = () => {
//
//         setIsContactActive(true); // Устанавливаем состояние активной кнопки контактов
//         setIsCatalogActive(false);
//         setIsCartActive(false);
//         setIsProfileActive(false);
//
//         setIsContactModalOpen(true); // Открыть модальное окно
//     };
//
//     const handleCloseModal = () => {
//         setIsContactModalOpen(false); // Закрыть модальное окно
//     };
//
//     const handleCatalogClick = () => {
//
//         setIsCatalogActive(true); // Устанавливаем состояние активной кнопки каталога
//         setIsCartActive(false);
//         setIsContactActive(false);
//         setIsProfileActive(false);
//
//         setSelectedOption('catalog');
//         history.push('/catalog')
//         setShowSidebar(!showSidebar);
//
//     };
//
//     const handleProfileClick = () => {
//
//         setIsProfileActive(true); // Устанавливаем состояние активной кнопки профиля
//         setIsCatalogActive(false);
//         setIsCartActive(false);
//         setIsContactActive(false);
//
//         setIsProfileOpen(!isProfileOpen);
//         const role = localStorage.getItem('role');
//         if (isAuthenticated) {
//             if (role === 'customer') {
//                 history.push("/profile");
//             } else if (role === 'seller') {
//                 history.push("/sellerProfile");
//             }
//         }
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
//     const handleCloseSidebar = () => {
//         setShowSidebar(false);
//     };
//
//     const closeDropoutLogin = () => {
//         history.goBack();
//     }
//
//     const totalItemsCount = cartItems.length > 0 ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
//
//     return (
//         <div className="footer-page">
//             <div className={`home-icon ${location.pathname === '/' ? 'active' : ''}`}>
//                 <img className="home-icon-img" src={homeIcon} />
//                 <div>
//                     <Link className="home-icon-link" to="/" >Главная</Link>
//                 </div>
//             </div>
//
//             <div className={`catalog-icon ${isCatalogActive ? 'active' : ''}`} onClick={handleCatalogClick}>
//                 <img className="catalog-icon-img" src={catalogPageIcon} />
//                 <div>
//                     <span className="catalog-icon-link catalog-header">Каталог</span>
//                 </div>
//             </div>
//
//
//
//             <div className={`cart-icon ${isCartActive ? 'active' : ''}`} onClick={handleCartClick}>
//             {/*<div className="cart-icon" onClick={handleCartClick}>*/}
//                 <img className="cart-icon-img" src={cartIcon} />
//                 <span>({totalItemsCount})</span>
//                 <div>
//                     <Link to="/cart" className="footer-auth-button btn">
//                         <span className="footer-totalItems">Корзина</span>
//                     </Link>
//                 </div>
//             </div>
//
//             <div className={`contact-icon ${isContactActive ? 'active' : ''}`} onClick={handleContactClick}>
//             {/*<div className="contact-icon" onClick={handleContactClick}>*/}
//                 <img className="contact-icon-img" src={contactIcon} />
//                 <div>
//                     <span className="footer-btn">Контакты</span>
//                 </div>
//             </div>
//
//             {isContactModalOpen && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <ContactInfoModal handleCloseModal={handleCloseModal} />
//                     </div>
//                 </div>
//             )}
//
//             <div className={`profile-icon ${isProfileActive ? 'active' : ''}`} onClick={handleProfileClick}>
//             {/*<div className="profile-icon" onClick={handleProfileClick}>*/}
//                 <img className="profile-icon-img" src={profileIcon} />
//                 <div className="footer-profileIcon" ref={profileRef}>
//                     {!isProfileOpen && (
//                         <span className="profile-icon-link">Войти</span>
//                     )}
//                     {isProfileOpen && (
//                         <div className="footer-dropdown-menu">
//                             <span className="footer-dropdown-menu-close" onClick={closeDropoutLogin}>&#10006;</span>
//                             <button onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>
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


const Footer = ({ onSearch, cartItems = [], showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter, setCurrentPage }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false); // Состояние для управления модальным окном контактов
    const isAuthenticated = localStorage.getItem('token');
    const history = useHistory();
    const profileRef = useRef(null);
    const [showSellerRegistration, setShowSellerRegistration] = useState(false);
    const location = useLocation();

    const [activeButton, setActiveButton] = useState(null);

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

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    const handleCartClick = () => {
        if (cartItems.length > 0) {
            history.push("/cart");
        } else {
            setShowSidebar(true);
        }
        handleButtonClick('cart');
    };

    const handleContactClick = () => {
        setIsContactModalOpen(true);
        handleButtonClick('contact');
    };

    const handleCloseModal = () => {
        setIsContactModalOpen(false);
        handleButtonClick(null);
    };

    const handleCatalogClick = () => {
        setSelectedOption('catalog');
        history.push('/catalog');
        setShowSidebar(!showSidebar);
        handleButtonClick('catalog');
    };

    const handleProfileClick = () => {
        setIsProfileOpen(!isProfileOpen);
        handleButtonClick('profile');
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

    const closeDropoutLogin = () => {
        history.goBack();
    }

    const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="footer-page">
            <div className={`home-icon ${activeButton === 'home' ? 'active' : ''}`} onClick={() => handleButtonClick('home')}>
                <img className="home-icon-img" src={homeIcon} />
                <div>
                    <Link  to="/" >
                    <span className="home-icon-link" >Каталог</span>
                    </Link>

                </div>
            </div>

            <div className={`catalog-icon ${activeButton === 'catalog' ? 'active' : ''}`} onClick={handleCatalogClick}>
                <img className="catalog-icon-img" src={catalogPageIcon} />
                <div>
                    <span className="catalog-icon-link catalog-header">Каталог</span>
                </div>
            </div>

            <div className={`cart-icon ${activeButton === 'cart' ? 'active' : ''}`} onClick={handleCartClick}>
                <img className="cart-icon-img" src={cartIcon} />
                <span>({totalItemsCount})</span>
                <div>
                    <Link to="/cart" className="footer-auth-button btn">
                        <span className="footer-totalItems">Корзина</span>
                    </Link>
                </div>
            </div>

            <div className={`contact-icon ${activeButton === 'contact' ? 'active' : ''}`} onClick={handleContactClick}>
                <img className="contact-icon-img" src={contactIcon} />
                <div>
                    <span className="footer-btn">Контакты</span>
                </div>
            </div>

            {isContactModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <ContactInfoModal handleCloseModal={handleCloseModal} />
                    </div>
                </div>
            )}

            <div className={`profile-icon ${activeButton === 'profile' ? 'active' : ''}`} onClick={handleProfileClick}>
                <img className="profile-icon-img" src={profileIcon} />
                <div className="footer-profileIcon" ref={profileRef}>
                    {!isProfileOpen && (
                        <span className="profile-icon-link">Войти</span>
                    )}
                    {isProfileOpen && (
                        <div className="footer-dropdown-menu">
                            <span className="footer-dropdown-menu-close" onClick={closeDropoutLogin}>&#10006;</span>
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
        </div>
    );
};

export default Footer;
