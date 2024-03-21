//
// // src/components/Header/Header.js
// import React, {useState} from 'react';
// import './Header.css';
// import {Link, useHistory} from 'react-router-dom';
//
//
// import ins from "./instagram.png";
// import tel from "./telegram.png";
// import what from "./whatsapp.png";
// import tik from "./tik-tok.png";
// import profileIcon from "./profileIcon.png";
// import cart from './trolley.png';
// import burger from './burger.png';
//
//
// const Header = ({ onSearch, cartItems, setShowSidebar, showSidebar }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
//     const history = useHistory();
//
//     const [showBurgerMenu, setShowBurgerMenu] = useState(false);
//
//     const toggleBurgerMenu = () => {
//         setShowBurgerMenu(!showBurgerMenu);
//         setShowSidebar(!showSidebar);
//     };
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
//     const handleLogout = () => {
//         setIsLoggedIn(false);
//         window.location.reload();
//     };
//
//     const handleTitleClick = () => {
//             history.push("/");
//     };
//
//     return (
//         <div className="header">
//             <Link to="/" className="title" onClick={handleTitleClick}>
//                 <span className="burger" onClick={toggleBurgerMenu}>
//                     <img className="burger" src={burger} />
//                 </span>
//                 <h1 className="titleH"> kiosk<span className="titleN">.kg</span></h1>
//             </Link>
//             <div className="contact">
//                 <div className="phone">
//                     <a href="tel:+996508100777">0 (508) 100 777</a>
//                 </div>
//                 <div className="social-icons">
//                     <a href="https://www.tiktok.com/" >
//                         <img className="icon" src={tik} alt="Instagram Icon" />
//                     </a>
//                     <a href="https://api.whatsapp.com/send?phone=996508100777">
//                         <img className="icon" src={what} alt="WhatsApp Icon" />
//                     </a>
//
//                     <a  href="https://www.instagram.com/">
//                         <img className="icon ins" src={ins} alt="Instagram Icon" />
//                     </a>
//                     <a href="https://t.me/kanatasa?phone=+996508100777">
//                         <img className="icon" src={tel} alt="Telegram Icon" />
//                     </a>

//                 </div>
//             </div>
//             <div className="search">
//                 <input type="text"
//                        placeholder="Поиск...&#128269;"
//                        value={searchTerm}
//                        onChange={handleSearchChange} />
//             </div>
//             <div className="auth-buttons">
//                 <Link to="/cart" style={{display: "inline-flex"}} className="auth-button btn" onClick={handleCartClick}>
//                     <img src={cart} alt="Cart Icon" />
//                     <span className="totalItems">
//                         ({totalItems})
//                     </span>
//                 </Link>
//                 {isLoggedIn ? (
//                     <button className="auth-btn" onClick={handleLogout}>
//                         Logout
//                     </button>
//                 ) : (
//                     <Link to="/login" className="auth-btn" onClick={() => setIsLoggedIn(true)}>
//                         Login/Register
//                     </Link>
//                 )}
//                 <Link to="/profile" className="profileIcon">
//                     <img src={profileIcon} alt="profileIcon"/>
//                 </Link>
//             </div>
//         </div>
//     );
// };
//
// export default Header;
//
//
//
//
// // src/components/Header/Header.js
// import React, {useState} from 'react';
// import './Header.css';
// import {Link, useHistory} from 'react-router-dom';
//
//
// import ins from "./instagram.png";
// import tel from "./telegram.png";
// import what from "./whatsapp.png";
// import tik from "./tik-tok.png";
// import profileIcon from "./profileIcon.png";
// import cart from './trolley.png';
// import burger from './burger.png';
//
//
// const Header = ({ onSearch, cartItems, setShowSidebar, showSidebar, resetFilter }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
//     const history = useHistory();
//
//     const [showBurgerMenu, setShowBurgerMenu] = useState(false);
//
//     const toggleBurgerMenu = () => {
//
//         setShowSidebar(!showSidebar);
//         // setShowSidebar(prevState => !prevState);
//         setShowBurgerMenu(!showBurgerMenu);
//     };
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
//     const handleLogout = () => {
//         setIsLoggedIn(false);
//         window.location.reload();
//     };
//
//     const handleTitleClick = () => {
//         resetFilter(); // Вызов функции для сброса фильтрации
//         history.push("/");
//     };
//
//     return (
//         <div className="header">
//             <Link to="/" className="title" onClick={handleTitleClick}> {/* Добавлен обработчик события onClick */}
//                 <span className="burger" onClick={toggleBurgerMenu}>
//                     <img className="burger" src={burger} />
//                 </span>
//                 <h1 className="titleH"> kiosk<span className="titleN">.kg</span></h1>
//             </Link>
//             <div className="contact">
//                 <div className="phone">
//                     <a href="tel:+996508100777">0 (508) 100 777</a>
//                 </div>
//                 <div className="social-icons">
//                     <a href="https://www.tiktok.com/" >
//                         <img className="icon" src={tik} alt="Instagram Icon" />
//                     </a>
//                     <a href="https://api.whatsapp.com/send?phone=996508100777">
//                         <img className="icon" src={what} alt="WhatsApp Icon" />
//                     </a>
//
//                     <a  href="https://www.instagram.com/">
//                         <img className="icon ins" src={ins} alt="Instagram Icon" />
//                     </a>
//                     <a href="https://t.me/kanatasa?phone=+996508100777">
//                         <img className="icon" src={tel} alt="Telegram Icon" />
//                     </a>
//
//                 </div>
//             </div>
//             <div className="search">
//                 <input type="text"
//                        placeholder="Поиск...&#128269;"
//                        value={searchTerm}
//                        onChange={handleSearchChange} />
//             </div>
//             <div className="auth-buttons">
//                 <Link to="/cart" style={{display: "inline-flex"}} className="auth-button btn" onClick={handleCartClick}>
//                     <img src={cart} alt="Cart Icon" />
//                     <span className="totalItems">
//                         ({totalItems})
//                     </span>
//                 </Link>
//                 {isLoggedIn ? (
//                     <button className="auth-btn" onClick={handleLogout}>
//                         Logout
//                     </button>
//                 ) : (
//                     <Link to="/login" className="auth-btn" onClick={() => setIsLoggedIn(true)}>
//                         Login/Register
//                     </Link>
//                 )}
//                 <Link to="/profile" className="profileIcon">
//                     <img src={profileIcon} alt="profileIcon"/>
//                 </Link>
//             </div>
//         </div>
//     );
// };
//
// export default Header;





// src/components/Header/Header.js
import React, { useState } from 'react';
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

const Header = ({ onSearch, cartItems, showSidebar, setShowSidebar, resetFilter }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showContactInfo, setShowContactInfo] = useState(false);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const history = useHistory();

    const [showBurgerMenu, setShowBurgerMenu] = useState(false);

    const toggleBurgerMenu = () => {
        setShowSidebar(!showSidebar);
        setShowBurgerMenu(!showBurgerMenu);
    };

    const toggleContactInfo = () => {
        setShowContactInfo(!showContactInfo);
    };

    const hideContactInfo = () => {
        setShowContactInfo(false);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleCartClick = () => {
        if (totalItems > 0) {
            history.push("/cart");
        } else {
            history.push("/");
        }
    };

    const handleTitleClick = () => {
        resetFilter();
        history.push("/");
    };

    return (
        <div className="header">
            <Link to="/" className="title" onClick={handleTitleClick}>
                {/*<span className="burger" onClick={toggleBurgerMenu}>*/}
                {/*    <img className="burger" src={burger} alt="burger" />*/}
                {/*</span>*/}
                <h1 className="titleH"> kiosk<span className="titleN">.kg</span></h1>
            </Link>
            {/* Показывать контактную информацию только на больших экранах */}
            <div className="desktop-contact-info">
                <ContactInfo />
            </div>
            <div className="search">
                <input type="text"
                       placeholder="Поиск...&#128269;"
                       value={searchTerm}
                       onChange={handleSearchChange} />
            </div>
            <div className="auth-buttons">
                <Link to="/cart" style={{ display: "inline-flex" }} className="auth-button btn" onClick={handleCartClick}>
                    <img src={cart} alt="Cart Icon" />
                    <span className="totalItems">
                        ({totalItems})
                    </span>
                </Link>
                <Link to="/profile" className="profileIcon">
                    <img src={profileIcon} alt="profileIcon" />
                </Link>
            </div>
            <div className="mobile-buttons"> {/* Новый блок для мобильных кнопок */}

            <div className="btn1">
                <Link to="/catalog" className="btn" onClick={() => setShowSidebar(!showSidebar)}>Каталог товаров</Link>
            </div>

            <div  className="btn2">
                <Link to="/contact" className="btn" onClick={toggleContactInfo}>Связаться с нами</Link>
            </div>

                {/*<Link to="/catalog" className="btn1" onClick={() => setShowSidebar(!showSidebar)}>Каталог товаров</Link>*/}
                {/*<Link to="/contact" className="btn2" onClick={toggleContactInfo}>Связаться с нами</Link>*/}
            </div>
            {/* Показывать контактную информацию только на маленьких экранах и только после клика на "Связаться с нами" */}
            {showContactInfo && (
                <div className="mobile-contact-info">
                    <ContactInfo />
                </div>
            )}
        </div>
    );
};

export default Header;


