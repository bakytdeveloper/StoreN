

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
import {FaHeart, FaRegHeart} from "react-icons/fa";


// const Header = ({ onSearch, searchTerm, setSearchTerm, setIsFooterCatalog, cartItems = [], showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter, setCurrentPage }) => {
//     // const [searchTerm, setSearchTerm] = useState('');
//     const [catalogButtonColor, setCatalogButtonColor] = useState('initial');
//     const [contactButtonColor, setContactButtonColor] = useState('initial');
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
//     const isAuthenticated = localStorage.getItem('token');
//     const userRole = localStorage.getItem('role');
//     const history = useHistory();
//     const profileRef = useRef(null);
//     const [showSellerRegistration, setShowSellerRegistration] = useState(false);
//     const location = useLocation();
//     const [activePage, setActivePage] = useState('');
//     const [lastPath, setLastPath] = useState(location.pathname);
//     const [searchResultMessage, setSearchResultMessage] = useState('');
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
//         // Проверяем, если пользователь администратор и имеет токен
//         if (isAuthenticated && userRole === 'admin') {
//             history.push("/admin"); // Перенаправляем на страницу админа
//         }
//     }, [isAuthenticated, userRole, history]);
//
//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//         setCurrentPage(1);
//     };
//
//     const handleSearchSubmit = (e) => {
//         e.preventDefault();
//         onSearch(searchTerm);
//         setSearchResultMessage(searchTerm); // Устанавливаем значение для отображения в сообщении
//         history.push('/catalog');
//         setIsFooterCatalog(true);
//     };
//
//
//     const handleClearSearch = () => {
//         setSearchTerm('');
//         onSearch('');
//         history.push(lastPath);
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
//             if (userRole === 'admin') {
//                 history.push("/admin");
//             } else {
//                 history.push("/profile");
//             }
//         } else {
//             history.push("/login");
//         }
//         setIsProfileOpen(false);
//     };
//
//     const handleLogoutClick = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('role');
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
//     useEffect(() => {
//         if (searchTerm === '') {
//             setLastPath(location.pathname);
//         }
//     }, [searchTerm, location.pathname]);
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
//                     <form className="form-search" onSubmit={handleSearchSubmit}>
//                         <input
//                             className="search-input"
//                             type="text"
//                             placeholder="Поиск..."
//                             value={searchTerm}
//                             onChange={handleSearchChange}
//                         />
//                            <button className="search-cross" type="button" onClick={handleClearSearch}>
//                                <img src={cross}/>
//                            </button>
//                         {/*{searchTerm && <button type="button" onClick={handleClearSearch}>&#10006;</button>}*/}
//                         <button className="search-button" type="submit">
//                             <img className="search-button-img" src={search_header}/>
//                         </button>
//                         {/*<button type="submit">&#128269;</button>*/}
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
//





const Header = ({ onSearch, searchTerm, setSearchTerm, setIsFooterCatalog, cartItems = [], showSidebar, setShowSidebar, selectedOption, setSelectedOption, resetFilter, setCurrentPage }) => {
    const [catalogButtonColor, setCatalogButtonColor] = useState('initial');
    const [contactButtonColor, setContactButtonColor] = useState('initial');
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [userStatus, setUserStatus] = useState(null); // Новое состояние для хранения статуса пользователя
    const isAuthenticated = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    const history = useHistory();
    const profileRef = useRef(null);
    const [showSellerRegistration, setShowSellerRegistration] = useState(false);
    const location = useLocation();
    const [activePage, setActivePage] = useState('');
    const [lastPath, setLastPath] = useState(location.pathname);
    const [searchResultMessage, setSearchResultMessage] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5505';

    useEffect(() => {
        // Получите ID продавца из токена, если это продавец
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
        history.push('/catalog');
        setIsFooterCatalog(true);
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
        console.log("Profile button clicked");
        setIsProfileOpen(!isProfileOpen);
    };


    const handleLoginClick = () => {
        setActivePage('login');
        if (isAuthenticated) {
            if (userStatus === 'suspend') {
                // Пользователь с статусом "suspend" считается не залогиненным
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
        localStorage.removeItem('status'); // Очистите статус при выходе
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

    const [favoritesCount, setFavoritesCount] = useState(0);


    // const fetchFavoritesCount = async () => {
    //     const token = localStorage.getItem('token');
    //     const userId = jwtDecode(token)?.userId;
    //     if (userId) {
    //         try {
    //             const response = await fetch(`${apiUrl}/api/users/${userId}/favorites`, {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                 },
    //             });
    //             const favorites = await response.json();
    //             setFavoritesCount(favorites.length);
    //         } catch (error) {
    //             console.error('Error fetching favorites:', error);
    //         }
    //     }
    // };


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
                           <span className={`profileIcon-text ${activePage === 'login' ? 'active-title' : ''}`} onClick={handleProfileClick}>Войти</span>
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

                   <div className="favorites" onClick={handleFavoritesClick}>
                       <div className="favorites-header">
                           <FaRegHeart color={favoritesCount > 0 ? "red" : "grey"} className="fa-red-header" />
                           <span className={`favorites-count ${favoritesCount === 0 ? 'hidden' : ''}`}>{favoritesCount}</span>
                       </div>
                   </div>


                   <div className="search">
                       <form className="form-search" onSubmit={handleSearchSubmit}>
                           <input
                               className="search-input"
                               type="text"
                               placeholder="Поиск..."
                               value={searchTerm}
                               onChange={handleSearchChange}
                           />
                           <button className="search-cross" type="button" onClick={handleClearSearch}>
                               <img src={cross}/>
                           </button>
                           <button className="search-button" type="submit">
                               <img className="search-button-img" src={search_header}/>
                           </button>
                       </form>
                   </div>
               </div>
               <div className="mobile-buttons">
                   <div className={`btn1 ${catalogButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleCatalogClick} style={{ backgroundColor: catalogButtonColor }}>
                       <Link style={{color:"white"}} to="/catalog" className="btn">Каталог товаров</Link>
                   </div>
                   <div className={`btn2 ${contactButtonColor === 'lightblue' ? 'blueText' : ''}`} onClick={handleContactClick} style={{ backgroundColor: contactButtonColor }}>
                       <Link style={{color:"white"}} to="/contact" className="btn">Контакты</Link>
                   </div>
               </div>
           </div>
       </div>
    );
};

export default Header;
