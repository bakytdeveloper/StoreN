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
import ContactInfoFooter from "./ContactInfoFooter";
import cross from './cross.png';





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
//     const [buttonClick, setButtonClick] = useState(null);
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
//         setButtonClick(null);
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
//         if (isContactModalOpen) {
//             setActiveComponent(null);
//             setIsContactModalOpen(false);
//             history.push(prevPath || "/");
//         } else {
//             history.push("/catalog");
//             setIsContactModalOpen(true);
//             handleButtonClick('contact', 'contact');
//         }
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
//         if (activeComponent === 'profile') {
//             setActiveComponent(null);
//             setIsProfileOpen(false);
//             history.push(prevPath || "/");
//         } else {
//             setIsProfileOpen(true);
//             history.push('/catalog');
//             handleButtonClick('profile', 'profile');
//         }
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
//     const closeContactModal = () => {
//         setIsContactModalOpen(false);
//         setActiveComponent(null);
//     };
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
//                             <span className="footer-dropdown-menu-close" onClick={closeDropoutLogin}>
//                                 &#10006;
//                             </span>
//                             {!isAuthenticated && <div className="footer-dropdown-menu-text">
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
//
//             {isContactModalOpen && (
//                 <div className="modal-overlay" onClick={closeContactModal}>
//                     <div onClick={(e) => e.stopPropagation()}>
//                         <ContactInfoFooter setShowSidebar={setShowSidebar} onClose={closeContactModal} />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default Footer;




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
//     const [buttonClick, setButtonClick] = useState(null);
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
//         setButtonClick(null);
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
//         if (isContactModalOpen) {
//             setActiveComponent(null);
//             setIsContactModalOpen(false);
//             setButtonClick(null); // Добавлено для сброса состояния кнопки
//             history.push(prevPath || "/");
//         } else {
//             history.push("/catalog");
//             setIsContactModalOpen(true);
//             handleButtonClick('contact', 'contact');
//         }
//     };
//
//     const handleCatalogClick = () => {
//
//         history.push('/catalog');
//         setSelectedOption('catalog');
//         setShowSidebar(!showSidebar);
//         handleButtonClick('catalog', 'catalog');
//     };
//
//     const handleProfileClick = () => {
//         if (activeComponent === 'profile') {
//             setActiveComponent(null);
//             setIsProfileOpen(false);
//             history.push(prevPath || "/");
//         } else {
//             setIsProfileOpen(true);
//             history.push('/catalog');
//             handleButtonClick('profile', 'profile');
//         }
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
//     const closeContactModal = () => {
//         setIsContactModalOpen(false);
//         setActiveComponent(null);
//     };
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
//                             <span className="footer-dropdown-menu-close" onClick={closeDropoutLogin}>
//                                                                {/*&#10006;*/}
//                                  <img className="profile-footer-dropdown-menu" src={cross}/>
//                             </span>
//                             {!isAuthenticated && <div className="footer-dropdown-menu-text">
//                                 При регистрации и логине ты сможешь стать нашим Клиентом или Партнёром
//                             </div>}
//
//                             {isAuthenticated && <div className="footer-dropdown-menu-text">
//                                 Вам доступен ваш профиль. Вы можете войти в него
//                             </div>}
//
//                             <button className="profile-login"  onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>
//
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
//             {isContactModalOpen && (
//                 <div className="modal-overlay" onClick={closeContactModal}>
//                     <div onClick={(e) => e.stopPropagation()}>
//                         <ContactInfoFooter setShowSidebar={setShowSidebar} onClose={closeContactModal} />
//                     </div>
//                 </div>
//             )}
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
                    activeComponent,
                    setIsFooterCatalog
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
    const [buttonClick, setButtonClick] = useState(null);

    useEffect(() => {
        if (!showSidebar) {
            setActiveButton(null);
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
        setButtonClick(null);
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
        if (isContactModalOpen) {
            setActiveComponent(null);
            setIsContactModalOpen(false);
            setButtonClick(null);
            history.push(prevPath || "/");
        } else {
            // history.push("/catalog");
            setIsContactModalOpen(true);
            handleButtonClick('contact', 'contact');
        }
    };

    const handleCatalogClick = () => {
        history.push('/catalog');
        setSelectedOption('catalog');
        setShowSidebar(!showSidebar);
        setIsFooterCatalog(false);
        handleButtonClick('catalog', 'catalog');
    };

    const handleProfileClick = () => {
        if (activeComponent === 'profile') {
            setActiveComponent(null);
            setIsProfileOpen(false);
            // history.push(prevPath || "/");
        } else {
            setIsProfileOpen(true);
            // history.push('/catalog');
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

    const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const closeContactModal = () => {
        setIsContactModalOpen(false);
        setActiveComponent(null);
    };

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
                            <span className="footer-dropdown-menu-close" onClick={closeDropoutLogin}>
                                 <img className="profile-footer-dropdown-menu" src={cross}/>
                            </span>
                            {!isAuthenticated && <div className="footer-dropdown-menu-text">
                                При регистрации и логине ты сможешь стать нашим Клиентом или Партнёром
                            </div>}

                            {isAuthenticated && <div className="footer-dropdown-menu-text">
                                Вам доступен ваш профиль. Вы можете войти в него
                            </div>}

                            <button className="profile-login"  onClick={handleLoginClick}>{isAuthenticated ? "Профиль" : "Логин"}</button>

                            {!isAuthenticated && <button className="footer-dropdown-menu-partner" onClick={handlePartnerClick}>Партнёр</button>}
                            {isAuthenticated && <button className="footer-dropdown-menu-logout" onClick={handleLogoutClick}>Выход</button>}
                        </div>
                    )}
                </div>
                {showSellerRegistration && (
                    <SellerRegistrationForm />
                )}
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
