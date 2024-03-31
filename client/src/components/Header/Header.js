

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

// const Header = ({ onSearch, cartItems, showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [catalogButtonColor, setCatalogButtonColor] = useState('initial');
//     const [contactButtonColor, setContactButtonColor] = useState('initial');
//     const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
//     const history = useHistory();
//     const [isProfileOpen, setIsProfileOpen] = useState(false); // Добавляем состояние для открытой страницы профиля
//     const isAuthenticated = localStorage.getItem('token'); // Проверка аутентификации
//
//     useEffect(() => {
//         if (showSidebar) {
//             setCatalogButtonColor('initial');
//             setContactButtonColor('initial');
//         }
//     }, [showSidebar]);
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
//     const handleTitleClick = () => {
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
//         if (isAuthenticated) {
//             if (!isProfileOpen) {
//                 history.push("/profile");
//             } else {
//                 history.push("/");
//             }
//             setIsProfileOpen(!isProfileOpen);
//         } else {
//             history.push("/login");
//         }
//     };
//
//     const handleCloseSidebar = () => {
//         setShowSidebar(false);
//     };
//
//     return (
//         <div className="header">
//             <Link to="/" className="title" onClick={handleTitleClick}>
//                 <h1 className="titleH"> kiosk<span className="titleN">.kg</span></h1>
//             </Link>
//             {/* Показывать контактную информацию только на больших экранах */}
//             <div className="desktop-contact-info">
//                 <ContactInfo />
//             </div>
//             <div className="search">
//                 <input type="text" placeholder="Поиск...&#128269;" value={searchTerm} onChange={handleSearchChange} />
//             </div>
//             <div className="auth-buttons">
//                 <Link to="/cart" style={{ display: "inline-flex" }} className="auth-button btn" onClick={handleCartClick}>
//                     <img src={cart} alt="Cart Icon" />
//                     <span className="totalItems">({totalItems})</span>
//                 </Link>
//                 <div className="profileIcon" onClick={handleProfileClick}>
//                     <img src={profileIcon} alt="profileIcon" />
//                 </div>
//             </div>
//             <div className="mobile-buttons">
//                 <div className={`btn1 ${catalogButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleCatalogClick} style={{ backgroundColor: catalogButtonColor }}>
//                     <Link to="/catalog" className="btn">Каталог товаров</Link>
//                 </div>
//                 <div className={`btn2 ${contactButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleContactClick} style={{ backgroundColor: contactButtonColor }}>
//                     <Link to="/contact" className="btn">Связаться с нами</Link>
//                 </div>
//             </div>
//             {/*{showSidebar && <div className="closeBtn" onClick={handleCloseSidebar}>&#215;</div>}*/}
//         </div>
//     );
// };
//
// export default Header;




// const Header = ({ onSearch, cartItems, showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [catalogButtonColor, setCatalogButtonColor] = useState('initial');
//     const [contactButtonColor, setContactButtonColor] = useState('initial');
//     const [isProfileOpen, setIsProfileOpen] = useState(false); // Состояние для открытой страницы профиля
//     const isAuthenticated = localStorage.getItem('token'); // Проверка аутентификации
//     const history = useHistory();
//
//     useEffect(() => {
//         if (showSidebar) {
//             setCatalogButtonColor('initial');
//             setContactButtonColor('initial');
//         }
//     }, [showSidebar]);
//
//     const handleSearchChange = (e) => {
//         const value = e.target.value;
//         setSearchTerm(value);
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
//     const handlePartnerClick = () => {
//         // Handle partner click
//         setIsProfileOpen(false);
//     };
//
//     const handleCloseSidebar = () => {
//         setShowSidebar(false);
//     };
//
//     return (
//         <div className="header">
//             <Link to="/" className="title" onClick={handleTitleClick}>
//                 <h1 className="titleH"> kiosk<span className="titleN">.kg</span></h1>
//             </Link>
//             <div className="desktop-contact-info">
//                 {/* Контактная информация */}
//             </div>
//             <div className="search">
//                 <input type="text" placeholder="Поиск...&#128269;" value={searchTerm} onChange={handleSearchChange} />
//             </div>
//             <div className="auth-buttons">
//                 <Link to="/cart" style={{ display: "inline-flex" }} className="auth-button btn" onClick={handleCartClick}>
//                     <img src={cart} alt="Cart Icon" />
//                     <span className="totalItems">({cartItems.length})</span>
//                 </Link>
//                 <div className="profileIcon" onClick={handleProfileClick}>
//                     <img src={profileIcon} alt="profileIcon" />
//                     {isProfileOpen && (
//                         <div className="dropdown-menu">
//                             <button onClick={handleLoginClick}>Логин</button>
//                             <button onClick={handlePartnerClick}>Партнёр</button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <div className="mobile-buttons">
//                 <div className={`btn1 ${catalogButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleCatalogClick} style={{ backgroundColor: catalogButtonColor }}>
//                     <Link to="/catalog" className="btn">Каталог товаров</Link>
//                 </div>
//                 <div className={`btn2 ${contactButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleContactClick} style={{ backgroundColor: contactButtonColor }}>
//                     <Link to="/contact" className="btn">Связаться с нами</Link>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Header;




// const Header = ({ onSearch, cartItems, showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [catalogButtonColor, setCatalogButtonColor] = useState('initial');
//     const [contactButtonColor, setContactButtonColor] = useState('initial');
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
//     const isAuthenticated = localStorage.getItem('token');
//     const history = useHistory();
//     const profileRef = useRef(null);
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
//     const handlePartnerClick = () => {
//         // Handle partner click
//         setIsProfileOpen(false);
//     };
//
//     const handleCloseSidebar = () => {
//         setShowSidebar(false);
//     };
//
//     return (
//         <div className="header">
//             <Link to="/" className="title" onClick={handleTitleClick}>
//                 <h1 className="titleH"> kiosk<span className="titleN">.kg</span></h1>
//             </Link>
//             <div className="desktop-contact-info">
//                 <ContactInfo />
//                 {/* Контактная информация */}
//             </div>
//             <div className="search">
//                 <input type="text" placeholder="Поиск...&#128269;" value={searchTerm} onChange={handleSearchChange} />
//             </div>
//             <div className="auth-buttons">
//                 <Link to="/cart" style={{ display: "inline-flex" }} className="auth-button btn" onClick={handleCartClick}>
//                     <img src={cart} alt="Cart Icon" />
//                     <span className="totalItems">({cartItems.length})</span>
//                 </Link>
//                 <div className="profileIcon" ref={profileRef}>
//                     <img src={profileIcon} alt="profileIcon" onClick={handleProfileClick} />
//                     {isProfileOpen && (
//                         <div className="dropdown-menu">
//                             <button onClick={handleLoginClick}>Логин</button>
//                             <button onClick={handlePartnerClick}>Партнёр</button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <div className="mobile-buttons">
//                 <div className={`btn1 ${catalogButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleCatalogClick} style={{ backgroundColor: catalogButtonColor }}>
//                     <Link to="/catalog" className="btn">Каталог товаров</Link>
//                 </div>
//                 <div className={`btn2 ${contactButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleContactClick} style={{ backgroundColor: contactButtonColor }}>
//                     <Link to="/contact" className="btn">Связаться с нами</Link>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Header;





// const Header = ({ onSearch, cartItems, showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [catalogButtonColor, setCatalogButtonColor] = useState('initial');
//     const [contactButtonColor, setContactButtonColor] = useState('initial');
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
//     const isAuthenticated = localStorage.getItem('token');
//     const history = useHistory();
//     const profileRef = useRef(null);
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
//         localStorage.removeItem('token'); // Удаляем токен из localStorage
//         // Дополнительные действия, которые нужно выполнить при выходе из аккаунта, например, перенаправление на главную страницу
//         history.push("/");
//         setIsProfileOpen(false);
//     };
//
//     const handlePartnerClick = () => {
//         // Handle partner click
//         setIsProfileOpen(false);
//     };
//
//     const handleCloseSidebar = () => {
//         setShowSidebar(false);
//     };
//
//     return (
//         <div className="header">
//             <Link to="/" className="title" onClick={handleTitleClick}>
//                 <h1 className="titleH"> kiosk<span className="titleN">.kg</span></h1>
//             </Link>
//             <div className="desktop-contact-info">
//                 {/* Контактная информация */}
//             </div>
//             <div className="search">
//                 <input type="text" placeholder="Поиск...&#128269;" value={searchTerm} onChange={handleSearchChange} />
//             </div>
//             <div className="auth-buttons">
//                 <Link to="/cart" style={{ display: "inline-flex" }} className="auth-button btn" onClick={handleCartClick}>
//                     <img src={cart} alt="Cart Icon" />
//                     <span className="totalItems">({cartItems.length})</span>
//                 </Link>
//                 <div className="profileIcon" ref={profileRef}>
//                     <img src={profileIcon} alt="profileIcon" onClick={handleProfileClick} />
//                     {isProfileOpen && (
//                         <div className="dropdown-menu">
//                             <button onClick={handleLoginClick}>Логин</button>
//                             <button onClick={handlePartnerClick}>Партнёр</button>
//                             <button onClick={handleLogoutClick}>Выход</button> {/* Добавляем кнопку "Выход" */}
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <div className="mobile-buttons">
//                 <div className={`btn1 ${catalogButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleCatalogClick} style={{ backgroundColor: catalogButtonColor }}>
//                     <Link to="/catalog" className="btn">Каталог товаров</Link>
//                 </div>
//                 <div className={`btn2 ${contactButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleContactClick} style={{ backgroundColor: contactButtonColor }}>
//                     <Link to="/contact" className="btn">Связаться с нами</Link>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Header;



const Header = ({ onSearch, cartItems, showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [catalogButtonColor, setCatalogButtonColor] = useState('initial');
    const [contactButtonColor, setContactButtonColor] = useState('initial');
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const isAuthenticated = localStorage.getItem('token');
    const history = useHistory();
    const profileRef = useRef(null);

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
    };

    const handleCloseSidebar = () => {
        setShowSidebar(false);
    };

    return (
        <div className="header">
            <Link to="/" className="title" onClick={handleTitleClick}>
                <h1 className="titleH"> kiosk<span className="titleN">.kg</span></h1>
            </Link>
            <div className="desktop-contact-info">
                <ContactInfo />
                {/* Контактная информация */}
            </div>
            <div className="search">
                <input type="text" placeholder="Поиск...&#128269;" value={searchTerm} onChange={handleSearchChange} />
            </div>
            <div className="auth-buttons">
                <Link to="/cart" style={{ display: "inline-flex" }} className="auth-button btn" onClick={handleCartClick}>
                    <img src={cart} alt="Cart Icon" />
                    <span className="totalItems">({cartItems.length})</span>
                </Link>
                <div className="profileIcon" ref={profileRef}>
                    <img src={profileIcon} alt="profileIcon" onClick={handleProfileClick} />
                    {isProfileOpen && (
                        <div className="dropdown-menu">
                            <button onClick={handleLoginClick}>{isAuthenticated ? "Войти" : "Логин"}</button>
                            <button onClick={handlePartnerClick}>Партнёр</button>
                            {isAuthenticated && <button onClick={handleLogoutClick}>Выход</button>}
                            {/*<button onClick={handlePartnerClick}>Партнёр</button>*/}
                        </div>
                    )}
                </div>
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